import React, { useState } from "react";
import {  db, auth, storage } from "../firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";

function SendMessage({ scroll }) {
  const [msg, setMsg] = useState("");
  const [Img, setImg] = useState(null);

  const sendMessage = async (event) => {
    event.preventDefault();
    if (Img) {
      const storageRef = ref(storage, uuid());
      await uploadBytesResumable(storageRef, Img).then(()=>{
        getDownloadURL(storageRef).then(async(downloadURL) =>{
          //console.log(downloadURL)
            const { uid, photoURL, email, displayName } = auth.currentUser;
            await addDoc(collection(db, "messages"), {
              text: msg,
              photoURL,
              uid,
              email,
              displayName,
              createdAt: serverTimestamp(),
              Img : downloadURL,
            });
        })
      })
    } else {
      if (msg.trim() === "") {
        alert("Enter a valid message");
        return;
      }
      const { uid, photoURL, email, displayName } = auth.currentUser;
      await addDoc(collection(db, "messages"), {
        text: msg,
        photoURL,
        uid,
        email,
        displayName,
        createdAt: serverTimestamp(),
      });
    }
    scroll.current.scrollIntoView({ behavior: "smooth" });
    setMsg("")
    setImg(null)
  };
 

  return (
    <form className=" flex flex-row bg-gray-5z00 dark:bg-coolDark-400 rounded-md px-4 py-3 z-10 max-w-screen-lg mx-auto dark:text-white shadow-md" onSubmit={(event) => sendMessage(event)}>
      <div>
        <input
          className="flex-1 bg-transparent outline-none mt-2"
          type="text"
          placeholder="Type your message…"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <div><input
          type="file"
          id="file"
           
          onChange={(e) => setImg(e.target.files[0])}
        /></div>
        <div><button className="btn btn-primary" type="submit" onClick={sendMessage}>
          Send
        </button></div>
        </div> 
    </form>
  );
}

export default SendMessage;