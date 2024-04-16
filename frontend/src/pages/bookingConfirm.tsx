import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../bookingCon.css'; 
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useLocation } from 'react-router-dom';
import jwt from 'jsonwebtoken';

interface Hotel {
  _id: string;
  name: string;
  city: string;
  starRating: number;
  imageUrls: string[];
  pricePerNight: number;
}

const BookingConfirm: React.FC = () => {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState<string>('');
  const [checkOutDate, setCheckOutDate] = useState<string>('');
  const [guests, setGuests] = useState<number>(1);
  const location = useLocation();

  const extractUserIdFromToken = (token: string): string | null => {
    try {
      const decodedToken = jwt.decode(token);
      if (!decodedToken || typeof decodedToken !== 'object') {
        return null;
      }
      const userId = (decodedToken as any).userId;
      return userId;
    } catch (error) {
      console.error('Error extracting user ID from token:', error);
      return null;
    }
  };
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const hotelId = params.get('hotelId');

    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/my-hotels/${hotelId}`);
        setHotel(response.data);
      } catch (error) {
        setError('Error fetching hotel details');
      } finally {
        setLoading(false);
      }
    };

    if (hotelId) {
      fetchHotelDetails();
    } else {
      setError('No hotel ID found in URL');
      setLoading(false);
    }
  }, [location]);

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOutDate(e.target.value);
  };

  const handleGuestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuests(parseInt(e.target.value));
  };

  const calculatebasePrice = () => {
    if (!hotel || !checkInDate || !checkOutDate) return 0;

    const pricePerNight = hotel.pricePerNight;
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const daysDifference = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const basePrice = pricePerNight * daysDifference;
    return basePrice;
  }

  const calculateTotal = () => {
    if (!hotel || !checkInDate || !checkOutDate) return 0;

    const pricePerNight = hotel.pricePerNight;
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const daysDifference = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const basePrice = pricePerNight * daysDifference;
    const serviceFee = basePrice * 0.13; 
    return basePrice + serviceFee;
  };

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
  
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const daysDifference = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    return daysDifference;
  };

  const calculateServiceFee = () => {
    if (!hotel || !checkInDate || !checkOutDate) return 0;
  
    const pricePerNight = hotel.pricePerNight;
    const startDate = new Date(checkInDate);
    const endDate = new Date(checkOutDate);
    const daysDifference = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    const basePrice = pricePerNight * daysDifference;
    const serviceFee = basePrice * 0.13; 
    return serviceFee;
  };

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      
      const token = localStorage.getItem('auth_token'); 
      const userId = token ? extractUserIdFromToken(token) : null;
      
      if (!userId) {
        throw new Error('User ID not found in token');
      }


        const response = await axios.post('http://localhost:7000/api/bookings', {
        
        checkInDate,
        checkOutDate,
        guests,
        userId: userId,
        hotelId: hotel?._id,
        
      });
      console.log('Booking successful:', response.data);
      // You can redirect the user to another page or show a success message here
    } catch (error) {
      console.error('Error making booking:', error);
      // Handle error, show error message to user, etc.
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!hotel) return <div>No hotel found.</div>;

  const total = calculateTotal();

  return (
    <>
    <Header/>
    <div className="new-container">
      <div className="new-left-pane">
        <div className="your-trip">
          <h2>Your Booking</h2>
          <form onSubmit={handleSubmit}>
            <div className='new-container check-in-container'>
              <label htmlFor="checkInDate">Check-in:</label>
              <input type="date" id="checkInDate" name="checkInDate" value={checkInDate} onChange={handleCheckInChange} required />
            </div>
            <div className='new-container check-out-container'>
              <label htmlFor="checkOutDate">Check-out:</label>
              <input type="date" id="checkOutDate" name="checkOutDate" value={checkOutDate} onChange={handleCheckOutChange} required />
            </div>
            <div className='new-container'>
              <label className='guest' htmlFor="guests">Guests:</label>
              <input type="number" id="guests" name="guests" min="1" value={guests} onChange={handleGuestsChange} required />
            </div>
            <hr style={{border: '0.1px solid black', margin:'25px 0px'}}/>
            <h2>Pay With</h2>
            <div className="new-payment-form">
              <select id="new-card-type">
                <option>Select Card Type:</option>
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
              </select>
              <br />
              <input type="text" id="new-card-number" name="new-card-number" placeholder="Enter card number" required />
              <br />
              <div className="new-container">
                <input type="text" id="new-expiry-month" name="new-expiry-month" placeholder="MM" required />
                <input type="text" id="new-expiry-year" name="new-expiry-year" placeholder="YYYY" required />
              </div>
              <br />
              <input type="text" id="new-cvv" name="new-cvv" placeholder="CVV" required />
              <br />
              <input type="text" id="new-postal-code" name="new-postal-code" placeholder="Enter postal code" required />
              <br />
              <select id="new-region" name="new-region">
                <option value="north">Select Region</option>
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="east">East</option>
                <option value="west">West</option>
              </select>
              <br />
              <input type="submit" value="Confirm and Pay" />
            </div>
          </form>
        </div>
      </div>
      <div className="new-right-pane">
        <div className="new-hotel-detail">
          <div className="new-container">
            <div>
              <img src={hotel.imageUrls[0]} alt="hotel img" className='booking-img' />
            </div>
            <div className="new-data">
              <h3>{hotel.name}</h3>
              <p>{hotel.city}</p>
              <p>&#9733; &nbsp; {hotel.starRating}</p>
            </div>
          </div>
          <hr style={{border: '1px solid black', margin:'25px 0px'}}/>
            <h3>Price details</h3>
            <p>&emsp; ${hotel.pricePerNight.toFixed(2)} CAD per night * {calculateNights()} nights &emsp; ${calculatebasePrice()}</p>
            <p>&emsp; Airbnb Service Fee: &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; ${calculateServiceFee().toFixed(2)}</p>
            <p></p>
            <hr style={{border: '1px solid black', margin:'25px 0px'}}/>
            <h3>Total(CAD) &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; ${total.toFixed(2)}</h3>
          </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default BookingConfirm;
