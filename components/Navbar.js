import Link from "next/link";
import cookie from 'js-cookie';
import { useRouter } from "next/router";

export default function Navbar({ loggedstate }) {

    // initialising router 
    const router = useRouter();

    return (
        <nav className="w-full h-12 text-white bg-slate-900 px-8 py-8 flex items-center justify-between">
            <div className="flex gap-4 items-center">
                <Link href={'/'}><a className="text-2xl">Navbar</a></Link>
                <Link href={'/'}>
                    <a>Home</a>
                </Link>
                <Link href={'/about'}>
                    <a>About</a>
                </Link>
            </div>

            {/* if not logged in then show login and signup button else logout button  */}
            {!loggedstate ? <div className="flex gap-4">
                <Link href='/login'>
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Login</a>
                </Link>
                <Link href='/signup'>
                    <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Signup</a>
                </Link>
            </div> : <a onClick={() => { cookie.remove('token'); router.push('/login') }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">Logout</a>}
        </nav>
    )

}