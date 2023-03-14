import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

function Login({setLoading, onLogin, loginErrors, setLoginErrors}){

    const history = useHistory();

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const [showErrors, setShowErrors] = useState({})

    useEffect(()=>{
        setShowErrors(loginErrors)
    }, [])


    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    function handleSubmit(e){
        setLoading(true)
        e.preventDefault()

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
                r.json().then((user)=> {
                    onLogin(user)
                    history.push("/messages")
                })
            }
            else {
                r.json().then((errorData)=> {
                    console.log(errorData.error);
                    setLoginErrors(errorData)
                    setLoading(false)
                })
            }
        })
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen ">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
            <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                    Username
                </label>
                <input value = {formData.username} onChange = {handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
                </div>
                <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input value = {formData.password} onChange = {handleChange} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
                <p className="text-red-500 text-xs italic"> {showErrors.error ? showErrors.error : "Please enter your password."}</p>
                </div>
                <div className="flex items-center justify-between">
                <button onClick= {handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign In
                </button>
                <Link to = "/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Sign Up
                </Link>
                </div>
            </form>
            <p className="text-center text-gray-500 text-xs">
                &copy;2023 Messagely Corp. All rights reserved.
            </p>
            </div>
        </div>
    )
}

export default Login;