using FireSharp.Config;
using FireSharp.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Firebase_CRUD.Models;
using FireSharp.Response;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Firebase_CRUD.Controllers
{
    public class FirebaseCRUD : Controller
    {
        #region Firebase Config
        
        IFirebaseConfig config = new FirebaseConfig
        {
            //Firebase Secrets
            AuthSecret = "jaWywL3euBbpxPN9a5wvyXEqcdOThH97wKRbP9NP",
            BasePath = "https://fir-integration-with-mvc-default-rtdb.firebaseio.com"
        };
        IFirebaseClient client;

        #endregion

        public IActionResult Index()
        {
            client = new FireSharp.FirebaseClient(config);
            FirebaseResponse response = client.Get("Students");
            dynamic data = JsonConvert.DeserializeObject<dynamic>(response.Body);
            var list = new List<Student>();
            if (data != null)
            {
                foreach (var item in data)
                {
                    list.Add(JsonConvert.DeserializeObject<Student>(((JProperty)item).Value.ToString()));
                }
            }

            return View(list);
        }
        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Create(Student student)
        {
            try
            {
                client = new FireSharp.FirebaseClient(config);
                var data = student;
                PushResponse response = client.Push("Students/", data);
                data.Id = response.Result.name;
                SetResponse setResponse = client.Set("Students/" + data.Id, data);

                if (setResponse.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    ModelState.AddModelError(string.Empty, "Added Succesfully");
                }
                else
                {
                    ModelState.AddModelError(string.Empty, "Something went wrong!!");
                }
            }
            catch (Exception ex)
            {

                ModelState.AddModelError(string.Empty, ex.Message);
            }

            return View();
        }
        [HttpGet]
        public ActionResult Edit(string id)
        {
            //client = new FireSharp.FirebaseClient(config);
            //FirebaseResponse response = client.Get("Students/" + id);
            //Student data = JsonConvert.DeserializeObject<Student>(response.Body);
            //return View(data);
            return View();
        }
        //[HttpPost]
        //public ActionResult Edit(Student student)
        //{
        //    client = new FireSharp.FirebaseClient(config);
        //    SetResponse response = client.Set("Students/" + student.Id, student);
        //    return RedirectToAction("Index");
        //}
        public ActionResult Delete(string id)
        {
            client = new FireSharp.FirebaseClient(config);
            FirebaseResponse response = client.Delete("Students/" + id);
            return RedirectToAction("Index");
        }
    }
}
