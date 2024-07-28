import React, { useContext, useEffect, useRef } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext)
  const { data } = useContext(ChatContext)
  

  const ref = useRef()
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message])

  const isOwn = message.senderId === currentUser.uid

  // Function to format the timestamp
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return "Just now";
    
    const messageDate = timestamp.toDate();
    const now = new Date();
    
    const diffInSeconds = Math.floor((now - messageDate) / 1000);
    
    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    
    return messageDate.toLocaleDateString();
  }

  return (
    <div 
      ref={ref}
      className={`message ${isOwn ? "owner" : ""}`}
    >
      <div className="messageInfo">
        <img 
          src={isOwn ? currentUser.photoURL : data.user.photoURL} 
          alt="" 
        />
        <span>{formatTimestamp(message.timestamp)}</span>
      </div>
      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}

export default Message