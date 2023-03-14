import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

function DraftSignup({onLogin, setLoading}){

    const history = useHistory();

    const [errors, setErrors] = useState(false) 

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        password_confirmation:""
    })

    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        setLoading(true)
        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        }).then((r)=>{
            if (r.ok){
                r.json().then((user)=> {
                    onLogin(user)
                    history.push("/")
                })
            }
            else {
                r.json().then((errorData)=>{
                    console.log(errorData)
                    setErrors(errorData)
                    setLoading(false)
                })
            }
        })}



    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>Username: </label>
                <input name = "username" type={"text"} onChange = {handleChange} value = {formData.username}/>
                <label>Password: </label>
                <input name = "password" type={"text"} onChange = {handleChange} value = {formData.password}/>
                <label>Confirm Password: </label>
                <input name = "password_confirmation" type={"text"} onChange = {handleChange} value = {formData.password_confirmation}/>
                <input type={"submit"}/>
            </form>
            {errors? <p>{errors.errors}</p>: null}
        </>
    )
}

export default DraftSignup;