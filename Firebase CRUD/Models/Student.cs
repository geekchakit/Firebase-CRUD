namespace Firebase_CRUD.Models
{
    public class Student
    {
        public string? Id { get; set; } // firebase unique id (Primary key)
        public string? Student_id { get; set; }
        public string? fullname { get; set; }
        public string? degree_title { get; set; }
        public string? address { get; set; }
        public string? phone { get; set; }
    }
}
