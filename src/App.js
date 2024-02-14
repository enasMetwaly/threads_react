
import React, { useState, useEffect } from 'react';

import Nav from "./components/Nav";
import Header from "./components/Header";
import Feed from "./components/Feed";
import PopUp from "./components/PopUp";
import WriteIcon from './WriteIcon';


const App = () => {

  const [user, setUser] = useState(null)
  const [threads, setThreads] = useState(null)
  const [viewThreadsFeed, setViewThreadsFeed] = useState(true)
  const [filteredThreads, setFilteredThreads] = useState(null)
  const [openPopUp, setOpenPopUp] = useState(false)
  const [interactingThread,setInteractingThread]=useState(null)
  const [popUpFeedThreads,setPopUpFeedThreads]=useState(null)
  const [text,setText]=useState("")
  const userId = "c63f866b-1487-4761-8f0b-86d9ed1191a4"
  const getUser = async () => {
    try {
      const response = await fetch(`http://localhost:3000/users?user_uuid=${userId}`);
      const data = await response.json();  // Corrected: Await the JSON parsing
      setUser(data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getThreads = async () => {
    try {
      const response = await fetch("http://localhost:3000/threads?thread_from=c63f866b-1487-4761-8f0b-86d9ed1191a4")
      const data = await response.json()
      setThreads(data)
    } catch (error) {
      console.error(error)
    }
  }

  const getThreadsFeed = () => {
    if (viewThreadsFeed) {
      const standAloneThreads = threads?.filter(thread => thread.reply_to === null)
      setFilteredThreads(standAloneThreads)
    }
    if (!viewThreadsFeed) {
      const replyThreads = threads?.filter(thread => thread.reply_to !== null)
      setFilteredThreads(replyThreads)
    }
  }
  

  const getReplies= async () =>{ 
    try{
      const response= await fetch(`http://localhost:3000/threads?reply_to${interactingThread?.id}`)
      const data= await response.json()
      setPopUpFeedThreads(data)

    }catch(error){
      console.log(error)
    }

  }
const postThread = async () => {
  const thread={
    
          "timestamp": new Date(),
          "thread_from": user.user_uuid,
          "thread_to": user.user_uuid||null,
          "reply_to": interactingThread?.id||null,
          "text": "Any tech enthusiasts here? Let's connect! 💻",
          "likes": []
    
  }
  try {
    const response = await fetch("http://localhost:3000/threads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",  // Corrected header syntax
      },
      body: JSON.stringify({
        // Your request payload goes here
      }),
    });
    const result=await response.json()
    console.log(result)
    getThreads()
    getReplies()
    setText("")

    // Handle the response here, e.g., check response.ok and response.json()
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error("Error posting thread:", error);
  }
};


const handleClick=() =>{
  setPopUpFeedThreads(null)
  setInteractingThread(null)
  setOpenPopUp(true)
}

  useEffect(() => {
    getUser()
    getThreads()
  }, [])


  useEffect(() => {
    getThreadsFeed()

  }, [user, threads, viewThreadsFeed])

  useEffect(() => {
    getReplies()
  }, [interactingThread])

  // console.log(filteredThreads)

  console.log('interactingThread',interactingThread)

  console.log('popUpFeedThreads',popUpFeedThreads)



  return (
    <>
      {user && <div className="app">
        <Nav url={user.instgram_url} />
        <Header
          user={user}
          viewThreadsFeed={viewThreadsFeed}
          setViewThreadsFeed={setViewThreadsFeed}
        />
        <Feed
          user={user}
          filteredThreads={filteredThreads}
          setOpenPopUp={setOpenPopUp}
          getThreads={getThreads}
          setInteractingThread={setInteractingThread}
        />
        {openPopUp && <PopUp
                user={user}
                setOpenPopUp={setOpenPopUp}
                popUpFeedThreads={popUpFeedThreads}
                text={text}
                setText={setText}
                postThread={postThread}
                
                />
        }
        <div onClick={() => setOpenPopUp(true)}>
          <WriteIcon  onClick={handleClick}/>
        </div>
      </div>
      }

    </>

  );
}

export default App;


