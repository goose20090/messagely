import React from "react";
import { Redirect } from "react-router-dom";

function MessagesPage({user, setUser, setLoading}){

    if (!user) return <Redirect to ="/"/>

    function onLogout(){
        setLoading(true)
        setUser(false)
        fetch("/logout", {
          method: "DELETE",
        }).then(()=> {
          console.log("logout successful");
          setLoading(false);
        });
      }

      console.log(user)
    
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1>Hi {user.username}</h1>
            <button onClick={onLogout} className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                Log Out
            </button>
        </div>
    )
}

export default MessagesPage;