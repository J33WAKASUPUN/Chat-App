import React, { useContext, useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import Message from './Message';
import { ChatContext } from '../context/ChatContext';
import { AuthContext } from '../context/AuthContext'; // Add this import
import { db } from '../Firebase';

function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { currentUser } = useContext(AuthContext); // Add this line

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      if (doc.exists()) {
        setMessages(doc.data().messages);
      }
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((msg) => (
        <Message 
          key={msg.id} 
          message={msg} 
          isOwn={msg.senderId === currentUser.uid} // Add this prop
        />
      ))}
    </div>
  );
}

export default Messages;