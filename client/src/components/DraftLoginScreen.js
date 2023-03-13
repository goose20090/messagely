import React from "react";

function DraftLoginScreen({user, onLogout, setLoading}){

    function handleLogout(){
        setLoading(true);
        onLogout();
    }

    return(
        <div>
            <h1>{user.username}</h1>
            <button onClick={handleLogout}>Log Out</button>
        </div>
    )
}

export default DraftLoginScreen;