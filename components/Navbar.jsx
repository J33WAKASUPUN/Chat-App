import React, { useContext } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../Firebase'
import { AuthContext } from '../context/AuthContext'


function Navbar() {

  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <span className='logo'>Space Chat</span>
      <div className='user'>
      <span className='userName'>{currentUser.displayName}</span>
        <img src={currentUser.photoURL} alt="" />
        <button onClick={()=>signOut(auth)}>Logout</button>
      </div>
    </div>
  )
}

export default Navbar
