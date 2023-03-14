import React from "react";

function DraftLoginScreen({user, onLogout, setLoading}){


    console.log(user)
    function handleLogout(){
        setLoading(true);
        onLogout();
    }

    return(
        <div>
            <h1>Hi {user.username}</h1>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default DraftLoginScreen;