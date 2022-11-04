// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyALQVjnS_KdpItEO-YggjOTgdHYFyXqWAE",
    authDomain: "fir-integration-with-mvc.firebaseapp.com",
    databaseURL: "https://fir-integration-with-mvc-default-rtdb.firebaseio.com",
    projectId: "fir-integration-with-mvc",
    storageBucket: "fir-integration-with-mvc.appspot.com",
    messagingSenderId: "859868930338",
    appId: "1:859868930338:web:33a6aad0fc308196e3857b",
    measurementId: "G-RMDPF6656H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

import {
    getFirestore, doc, getDoc, setDoc, collection, addDoc, updateDoc, deleteDoc, deleteField
}
    from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

const db = getFirestore();
//index page firebase object
firebase.initializeApp(firebaseConfig);
let dba = firebase.firestore();
export async function AddDocument(sid, fn, add, dt, phn) {
    //create collection
    //var ref = doc(db, "StudentTable", sid);

    //await setDoc(
    //    ref, {
    //    Studentid: sid,
    //    StudentName: fn,
    //    adderess: add,
    //    degree: dt,
    //    phoneno: phn
    //}
    //)
    var ref = doc(db, sid, fn);
    dba.collection(sid).doc(fn).collection(add).doc('control_no').set({
        Studentid: sid,
        StudentName: fn,
        adderess: add,
        degree: dt,
        phoneno: phn

    })
        .then(() => {
            alert("added");
        })
        .catch((error) => {
            alert("error" + error)
        });
}

export async function Update(sid, fn, add, dt, phn) {
    var ref = doc(db, "StudentTable", sid);

    await updateDoc(
        ref, {
        Studentid: sid,
        StudentName: fn,
        adderess: add,
        degree: dt,
        phoneno: phn
    }
    )
        .then(() => {
            alert("added");
        })
        .catch((error) => {
            alert("error" + error)
        });
}

export async function Delete(sid) {
    var ref = doc(db, "StudentTable", sid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
        alert("doesnotexist");
        return;
    }
    await deleteDoc(ref)
        .then(() => {
            alert("deleted");
        })
        .catch((error) => {
            alert(error);
        })
}

export async function GetAllList() {
    dba.collection("StudentTable").onSnapshot((querySnapshot) => {
        var students = [];
        querySnapshot.forEach(documents => {
            students.push(documents.data());
        });
        IndexTableFill(students);
    });

}

export async function GetOne() {
    let sid = localStorage.getItem("StudentId");
    if (sid != null) {
        var ref = doc(db, "StudentTable", sid);
        console.log(sid);
    }
}
export async function Query() {
    dba.collection('sff')
        .doc('fwfsf')
        .collection('wfwqf')
        .onSnapshot((querySnapshot) => {
            var dta = [];
            querySnapshot.forEach(documents => {
                dta.push(documents.data());
            });
            console.log(dta);
        })
}