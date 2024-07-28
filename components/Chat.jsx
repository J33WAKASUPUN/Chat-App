import React, { useContext } from 'react'
import Cam from "../images/cam.png"
import Add from "../images/add.png"
import More from "../images/mor.png"
import Messages from "./Messages"
import Input from "./Input"
import { ChatContext } from '../context/ChatContext'

function Chat() {
  const { data } = useContext(ChatContext);


  return (
    <div className='chat'>
      <div className='chatInfo'>
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
        <img src={Add} alt="" />
          <img src={Cam} alt="" />
          <img src={More} alt="" />
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat
