import React from 'react'
import {auth} from "../firebase"
import pp from "../img/pp.png"
import SignOut from './SignOut';
function Profile() {
  const { uid,   photoURL , email , displayName  } = auth.currentUser;
 

  return (
    <>
    <SignOut/>
    <div class="wrapper bg-white-400 antialiased text-gray-900">
<div >
    
     
    
 <div class="  relative px-4 -mt-16  ">
   <div class="bg-white p-6 rounded-lg shadow-lg">
    <div class="flex items-baseline">
      <span class=" bg-teal-200 text-teal-800 text-xs px-2 inline-block rounded-full  uppercase font-semibold tracking-wide">
        Daphin Profile
      </span>
  
    </div>
    
    <h4 class="flex justify-center mt-5 mb-5  text-xl font-semibold uppercase leading-tight truncate">Profile Details</h4>
    
 
  <div class="mt-4">
    <div class="flex justify-center mt-5 mb-5"><img src={photoURL ? photoURL : pp} alt="" className="h-auto w-auto mt-{20px} rounded-full" /></div>
    <div class="text-teal-600 text-md font-bold">Name : {displayName}</div>
    <div class="text-teal-600 text-md font-bold">Email : {email}</div>
    <div class="text-teal-600 text-md font-bold">Uid : {uid}</div>
    <div class="flex justify-center mt-5 mb-5 text-teal-600 text-md font-semibold"> A User of Daphine</div>
  </div>  
  </div>
 </div>
  
</div>
  </div>
  </>
  )

}

export default Profile
