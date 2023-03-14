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
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-8">
                    <div>
                    <img className="mx-auto h-12 w-auto" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrj9NjU28zWCx-Cz-GvfjNdOgXa8zKJgdyBsHnFT45zgIdLnO7vZ9Yiwqaw_UeoLeu6Y&usqp=CAU" alt="Your Company"/>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST" onSubmit = {handleSubmit}>
                        <input type="hidden" name="remember" value="true"/>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="username" className="sr-only">Username</label>
                                <input value = {formData.username} onChange = {handleChange} id="username" name="username" type="username" autoComplete="username" required className="relative block w-full rounded-t border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Username"/>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <input value = {formData.password} onChange = {handleChange} id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full rounded-b border-0 py-1.5 px-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Password"/>
                            </div>
                        </div>

                        <p className="text-red-500 text-xs italic"> {showErrors.error ? showErrors.error : null}</p>

                        <div className="flex items-end justify-between">
                            <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"/>
                            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
                            </div>

                            <div class="text-sm">
                                <Link to = "/signup" class="font-medium text-indigo-600 hover:text-indigo-500">Not signed up yet?</Link>
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

        
    )
}





export default Login;

    //     <div className="flex flex-col items-center justify-center h-screen ">
    //         <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    //         <div className="w-full max-w-xs">
    //         <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    //             <div className="mb-4">
    //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
    //                 Username
    //             </label>
    //             <input value = {formData.username} onChange = {handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username"/>
    //             </div>
    //             <div className="mb-6">
    //             <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
    //                 Password
    //             </label>
    //             <input value = {formData.password} onChange = {handleChange} className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************"/>
    //             <p className="text-red-500 text-xs italic"> {showErrors.error ? showErrors.error : "Please enter your password."}</p>
    //             </div>
    //             <div className="flex items-center justify-between">
    //             <button onClick= {handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
    //                 Sign In
    //             </button>
    //             <Link to = "/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
    //                 Sign Up
    //             </Link>
    //             </div>
    //         </form>
    //         <p className="text-center text-gray-500 text-xs">
    //             &copy;2023 Messagely Corp. All rights reserved.
    //         </p>
    //         </div>
    //     </div>