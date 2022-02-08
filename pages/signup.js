import { useState } from "react";
import Navbar from "../components/Navbar";
import cookie from 'js-cookie'
import { useRouter } from "next/router";
import Head from 'next/head'


export default function login() {

    // initialising router 
    const router = useRouter();

    // setting name,email and password in a state
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })

    // function to submit to name,email and password for signup
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            cookie.set('token', json.authtoken);
            console.log(cookie.get('token'));
            router.push('/');
        }
        if (json.success === false) {
            // alert if user already exists 
            alert(json.error)
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
            <form onSubmit={handleSubmit} className="max-w-md shadow-md p-8 mx-auto my-12">

                <label htmlFor="name">Name</label>
                <input type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" id="name" value={credentials.name} name='name' onChange={onChange} placeholder='Enter your name ' />

                <label htmlFor="email">Email</label>
                <input type="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" id="email" value={credentials.email} name='email' onChange={onChange} placeholder='Enter your email' />

                <label htmlFor="password">Password</label>
                <input type="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4" id="password" value={credentials.password} name='password' onChange={onChange} placeholder='Enter your password' />

                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Signup</button>

            </form>
        </>
    )
}