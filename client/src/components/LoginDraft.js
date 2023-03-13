import React from "react"
import { useState } from "react";

function LoginDraft({onLogin, setLoading}){

    const [username, setUsername] = useState('')

    function handleChange(e){
        setUsername(e.target.value)
    }

    function handleSubmit(e){
        e.preventDefault()
        setLoading(true)

        fetch("/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username})
        })
        .then((r)=> r.json())
        .then((user)=> onLogin(user))
    }
    return(
        <form onSubmit={handleSubmit}>
            <label>Username: </label>
            <input name = "username" type={"text"} onChange = {handleChange} value = {username}/>
            <input type={"submit"}/>
        </form>
    )
}

export default LoginDraft;