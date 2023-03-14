import React from "react"
import { useState } from "react";

function LoginDraft({onLogin, setLoading, setErrors}){

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        setLoading(true)

        fetch("/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        })
        .then((r)=> {
            console.log(r)
            if (r.ok){
                r.json().then((user)=> onLogin(user))
            }
            else {
                r.json().then((errorData)=> {
                    console.log(errorData);
                    setLoading(false)
                    setErrors(errorData.error)
                })
            }
        })
    }
    return(
        <>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input name = "username" type={"text"} onChange = {handleChange} value = {formData.username}/>
                <label>Password: </label>
                <input name = "password" type={"text"} onChange = {handleChange} value = {formData.password}/>
                <input type={"submit"}/>
            </form>
        </>
    )
}

export default LoginDraft;