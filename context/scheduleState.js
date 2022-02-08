import cookie from "js-cookie";
import { useState } from "react";
import scheduleContext from './scheduleContext';

const ScheduleState = (props) => {

  // storing the fetched schedule data in schedule state 
  const [schedule, setschedule] = useState([]);

  // creating a logged state -> providing to navbar to switch between (login,signup) and logout buttons 
  const [loggedstate, setloggedstate] = useState(false);


  // fetching all available schedule relating to a particular id , id access from jwt provided as header 
  const getdata = async () => {
    const response = await fetch('/api/schedule/getschedule', {
      method: 'GET',
      headers: {
        'token': cookie.get('token')
      },
    });
    const json = await response.json();
    // console.log(json);
    setschedule(json.schedule);
  }

  // function to add a new schedule to database 
  const add_data = async (title, start, end) => {
    const response = await fetch('/api/schedule/createschedule', {
      method: 'POST',
      headers: {
        'token': cookie.get('token'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, start, end })
    });
    const json = await response.json();
    // console.log(json);
    getdata();
  }

  // deleting a schedule of which an id is provided 
  const deletedata = async (id) => {
    const response = await fetch(`/api/schedule/deleteschedule/${id}`, {
      method: 'DELETE',
      headers: {
        'token': cookie.get('token'),
      },
    });
    const json = await response.json();
    // console.log(json);
    getdata();
  }


  return (
    <scheduleContext.Provider value={{ loggedstate, setloggedstate, schedule, getdata, add_data, deletedata }}>
      {props.children}
    </scheduleContext.Provider>
  )
}

export default ScheduleState;