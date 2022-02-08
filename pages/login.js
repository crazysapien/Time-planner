import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import cookie from 'js-cookie'
import { useRouter } from "next/router";
import Link from "next/link";
import Head from 'next/head'


export default function login() {

    // initialising router 
    const router = useRouter();

    // setting email and password in a state 
    const [credentials, setCredentials] = useState({ email: "", password: "" })

    // function to submit to email and password for logging in 
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        if (json.success) {
            // saving the token in cache 
            cookie.set('token', json.authtoken);
            // if loggen in then push to homepage 
            router.push('/');
        }
    }


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }


    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Planner</title>
            </Head>
            <Navbar />
            <form onSubmit={handleSubmit} className="max-w-md shadow-lg p-8 mx-auto my-12">

                <label htmlFor="email">Email</label>
                <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" id="email" value={credentials.email} name='email' onChange={onChange} placeholder='enter email' />

                <label htmlFor="password">Password</label>
                <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" id="password" value={credentials.password} name='password' onChange={onChange} placeholder='enter password' />

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</button>

                <Link href="/signup"><a className="border-2 ml-4 border-blue-500 hover:bg-blue-700 hover:bg-opacity-5 text-gray-700 font-bold py-2 px-4 rounded">Signup</a></Link>
            </form>
        </>
    )
}