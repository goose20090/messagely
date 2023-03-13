import React from "react"
import { useState } from "react";

function LoginDraft(){

    const [formData, setFormData] = useState({username: "", password: ""})

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }
    return(
        <form>
            <label>Username: </label>
            <input name = "username" type={"text"} onChange = {handleChange} value = {formData.username}/>
            <label>Password: </label>
            <input name = "password" type={"text"} onChange = {handleChange} value = {formData.password}/>
            <input type={"submit"}/>
        </form>
    )
}

export default LoginDraft;