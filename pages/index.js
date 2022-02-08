import Head from 'next/head'
import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Schedule from '../components/Schedule'
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { DateRange } from 'react-date-range';
import Card from '../components/Card';
import scheduleContext from '../context/scheduleContext';
import Head from 'next/head'

export default function Home() {
  // initialising router 
  const router = useRouter();

  const { loggedstate, setloggedstate, schedule, getdata, add_data } = useContext(scheduleContext);

  // schedule title 
  const [title, settitle] = useState('');

  // date picker state
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: 'selection'
    }
  ]);

  // function to check is token cookie exists or not , if false then redirecting to login page 
  const cookiecheck = () => {
    if (!cookie.get('token')) {
      router.push('/login');
    } else {
      setloggedstate(true);
    }
  }


  useEffect(() => {
    cookiecheck();
    getdata();
  }, []);

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Planner</title>
      </Head>

      <Navbar loggedstate={loggedstate} />

      <div className='max-w-lg mx-auto my-12 shadow-md p-4'>

        <label className='text-xl font-medium' htmlFor="title">Title</label>
        <input type="text" value={title} onChange={(e) => settitle(e.target.value)} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4' id='title' name='title' placeholder='enter title here...' />

        <DateRange editableDateInputs={true} onChange={item => setState([item.selection])} moveRangeOnFirstSelection={false} ranges={state} />

        <div className='border-2 border-emerald-400 hover:bg-emerald-600 hover:text-white text-gray-500 font-medium text-xl text-center py-2 px-4 rounded' onClick={() => { add_data(title, state[0].startDate, state[0].endDate) }}>Add</div>

      </div>

      {/* schedule component to show fetched schedules  */}
      <Schedule data={schedule} />
    </>
  )
}
