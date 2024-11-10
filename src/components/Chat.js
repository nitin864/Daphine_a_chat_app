import React, { useState, useEffect, useRef } from "react";
import { formatRelative } from "date-fns";
import { db, auth } from "../firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import SendMessage from "./SendMessage";
//import pp from "../img/pp.png";

import SignOut from "./SignOut";

function Chat() {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      const q = query(collection(db, "messages"), orderBy("createdAt"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messageData = [];
        snapshot.forEach((doc) => {
          messageData.push({ id: doc.id, ...doc.data() });
          // console.log(messageData)
        });
        setMessages(messageData);
      });

      return unsubscribe;
    };

    fetchMessages();
  }, []);

  const formatDate = (date) => {
    let formattedDate = "";
    if (date) {
      // Convert the date in words relative to the current date
      formattedDate = formatRelative(date, new Date());
      // Uppercase the first letter
      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
    return formattedDate;
  };

  return (
    <>
      <SignOut></SignOut>
      <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gray-600 text-gray-800">
        <div className="flex flex-col flex-grow w-full bg-gray-600 shadow-xl rounded-lg overflow-hidden mb-28">
          <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
            {messages.map(
              ({ id, text, photoURL, uid, Img, displayName, createdAt }) => (
                <div
                  className={`${
                    uid === auth.currentUser.uid
                      ? "flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end"
                      : "flex w-full mt-2 space-x-3 max-w-xs"
                  }`}
                  key={id}
                >
                  <div className="px-4 py-4 rounded-md hover:bg-gray-50 dark:hover:bg-coolDark-600 overflow-hidden flex items-start ">
                  <img
                        src={photoURL}
                        alt="Avatar"
                        className="h-12 w-12 mt-{20px} rounded-full"
 
                      />
                  </div>
                  <div
                    className={`${
                      uid === auth.currentUser.uid
                        ? "bg-slate-200 text-gray-700 p-3 rounded-l-lg rounded-br-lg"
                        : "bg-gray-300 p-3 rounded-r-lg rounded-bl-lg"
                    }`}
                  >
                    <p
                      className={`${
                        uid === auth.currentUser.uid
                          ? "text-sm text-gray-500"
                          : "text-sm text-gray-500"
                      }`}
                    >
                      {createdAt?.seconds ? (
                        <span className="text-white-500 text-xs">
                          {formatDate(new Date(createdAt.seconds * 1000))}
                        </span>
                      ) : null}
                      <div>
                        {" "}
                        <span className="text-rose-600 text-s mt-3">
                          {displayName}
                        </span>
                      </div>
                    </p>
                    <p className="text-lg">{text}</p>
                    {Img && (
                      <img
                        src={Img}
                        className=" mt-2 h-[17rem] w-[27rem] "
                        alt=""
                      />
                    )}
                  </div>
                </div>
              )
            )}
            <SendMessage scroll={scroll} />
            <div ref={scroll}></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
