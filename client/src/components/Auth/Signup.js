import React from "react";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";

function Signup({onLogin, setLoading, signUpErrors, setSignupErrors, setLoginErrors}){

    const history = useHistory();



    const [formData, setFormData] = useState({
        username: "",
        password: "",
        password_confirmation:"",
        remember_me: false
    })

    const [showErrors, setShowErrors] = useState(false) 

    useEffect(()=>{
        setShowErrors(signUpErrors)
        setLoginErrors("")
    }, [])


    function handleChange(e){

        if (e.target.id === "remember-me"){

            setFormData({
                ...formData,
                remember_me: !formData.remember_me
            })

        }
         else {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
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
                    history.push("/messages")
                })
            }
            else {
                r.json().then((errorData)=>{
                    console.log(errorData)
                    setSignupErrors(errorData)
                    setLoading(false)
                })
            }
        })}



    return (
        <>
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                    <img className="mx-auto h-12 w-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrj9NjU28zWCx-Cz-GvfjNdOgXa8zKJgdyBsHnFT45zgIdLnO7vZ9Yiwqaw_UeoLeu6Y&usqp=CAU" alt="Your Company"/>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign Up</h2>
                    </div>
                    <form onSubmit = {handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
                    <input type="hidden" name="remember" value="true"/>
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                        <label htmlFor="username" className="font-bold">Username</label>
                        <input value = {formData.username} onChange = {handleChange} id="username" name="username" type="username" autoComplete="username" required className="relative block w-full rounded border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Username"/>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="font-bold">Password</label>
                        <input value = {formData.password} onChange = {handleChange}id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full rounded border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password"/>
                        </div>

                    <div>
                        <label htmlFor="confirm password" className="font-bold">Confirm Password</label>
                        <input value = {formData.password_confirmation} onChange = {handleChange}id="password_confirmation" name="confirm password" type="password" autoComplete="current-password" required className="relative block w-full rounded border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Confirm Password"/>
                    </div>

                    {showErrors.errors?<div className="flex"><p className="text-red-500 text-xs italic"> {showErrors.errors[0]}</p></div>: null}

                    <div className="flex items-end justify-between">
                        <div className="flex items-center">
                        <input value = {formData.remember_me} onChange = {handleChange} id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                        <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                        </div>
                        <div className="text-sm">
                                <Link to = "/login" className="font-medium text-indigo-600 hover:text-indigo-500">Already have an account?</Link>
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                            </svg>
                        </span>
                        Sign in
                        </button>
                    </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup;