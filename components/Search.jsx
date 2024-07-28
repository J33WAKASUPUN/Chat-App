import React, { useContext, useState } from 'react';
import { db } from "../Firebase";
import { AuthContext } from "../context/AuthContext"
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  getDoc,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp 
} from "firebase/firestore";

function Search() {
   const [username, setUsername] = useState("");
   const [user, setUser] = useState(null);
   const [error, setError] = useState(false);

   const { currentUser } = useContext(AuthContext);

    const handleSearch = async () => {
      const q = query(collection(db, "users"), where("displayName", "==", username));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
        setError(false);
      } catch (error) {
        setError(true);
        console.error("Error in handleSearch:", error);
      }
    };

   const handleKey = e => {
    if (e.code === "Enter") {
      handleSearch();
    }
   };

   const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid 
      ? currentUser.uid + user.uid 
      : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp()
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp()
        });
      }
    } catch (error) {
      console.error("Error in handleSelect:", error);
    }

    setUser(null);
    setUsername("");
   };

  return (
    <div className='search'>
      <div className='searchFrom'>
        <input 
          type="text" 
          placeholder='Find a user' 
          onKeyDown={handleKey} 
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {error && <span>User not found!</span>}
      {user && (
        <div className='userChat' onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className='userChatInfo'>
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Search