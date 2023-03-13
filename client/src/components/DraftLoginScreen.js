import React from "react";

function DraftLoginScreen({user, onLogout}){

    return(
        <div>
            <h1>{user.username}</h1>
            <button onClick={onLogout}>Log Out</button>
        </div>
    )
}

export default DraftLoginScreen;