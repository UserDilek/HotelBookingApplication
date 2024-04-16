import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import './App.css';
import Layout from './layouts/Layout';
import Register from './pages/Register'  ;
import Home from './pages/Home'  ;
import SignIn from './pages/SignIn'  ;

import SearchPage from './pages/SearchPage';
import CreateHotel from './pages/CreateHotel';
import MyHotels from './pages/MyHotels';
import EditHotel from './pages/EditHotel';
import { useAppContext } from "./contexts/AppContext";

import HotelView from './pages/HotelViewPage';
import HotelDetails from "./pages/HotelViewPage";
import BookingConfirm from "./pages/bookingConfirm";


const App = () =>{

  const { isLogged } = useAppContext();
  

  return (
    <Router>
      <Routes>
      <Route path='/' element={
        <Layout
          showHeroSection={true}
          showSearchBar={true}>
          <Home />
        </Layout>}/>
      <Route path='/search' element={<Layout><SearchPage /></Layout>}/>
      <Route path='/create-hotel' element={<Layout><CreateHotel /></Layout>}/>
      
      <Route path='/edit-hotel' element={<Layout><EditHotel /></Layout>}/>
      <Route path='/my-hotels' element={<Layout><MyHotels /></Layout>}/>
      <Route path='/signin' element={<SignIn></SignIn>}/>
      <Route path='/register' element={<Register></Register>}/>  
      <Route path='/hotelview/:hotelId' element={<HotelView/>}/>
      <Route path='/hotel-details/:hotelId' element={<HotelDetails/>}/>
      <Route path='/booking-confirm' element={<BookingConfirm/>}/>
      <Route path="*" element={<Navigate to="/" />} />
      
      {isLogged && (
          <>
           <Route path='/add-hotel' element={<Layout><CreateHotel /></Layout>}/>
           <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel /></Layout> } />
           <Route path='/hotelview' element={<HotelView/>}/>                                                        
          </>
        )}
       
      </Routes>
    </Router>
   
  );
};

export default App;