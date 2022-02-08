import { useContext } from 'react'
import Navbar from '../components/Navbar'
import scheduleContext from '../context/scheduleContext'
import Head from 'next/head'

export default function About() {

    const { loggedstate } = useContext(scheduleContext);
    return (
        <>
            <Head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Planner</title>
            </Head>
            <Navbar loggedstate={loggedstate} />
            <div className='max-w-4xl my-12 mx-auto text-xl'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, corrupti consectetur? Molestias amet at distinctio perspiciatis adipisci? Laborum eligendi quae deserunt, ducimus nostrum, officiis aspernatur eius, quia voluptas aliquid similique? Nulla obcaecati, amet itaque eaque sequi sapiente laudantium reiciendis. Facilis esse est doloremque fugiat tempora labore, exercitationem pariatur nemo totam adipisci minus similique porro quos. Repudiandae corporis atque hic at, reprehenderit quas ullam consequatur provident soluta itaque delectus sunt recusandae dicta labore vero nostrum in ratione iure illum tempora a laborum voluptatem. Eveniet totam ut deleniti animi maiores. Ipsum numquam nam fugiat ex ab recusandae, esse quae doloremque. Atque, consequuntur?
            </div>
        </>
    )
}