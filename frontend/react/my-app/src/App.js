import { Routes, Route, BrowserRouter} from 'react-router-dom';
import ShowMembers from './Components/ShowMember';
import ShowSpaces from './Components/ShowSpaces';
import ManageBooking from './Components/ShowBooking';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/members' element={<ShowMembers></ShowMembers>}></Route>
        <Route path='/spaces' element={<ShowSpaces></ShowSpaces>}></Route>
        <Route path='/bookings' element={<ManageBooking></ManageBooking>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
