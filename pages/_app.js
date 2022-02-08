import '../styles/globals.css'

// css files for datepicker 
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

import ScheduleState from '../context/scheduleState';

function MyApp({ Component, pageProps }) {
  return(
  <ScheduleState>
  <Component {...pageProps} />
  </ScheduleState>
  );
}

export default MyApp
