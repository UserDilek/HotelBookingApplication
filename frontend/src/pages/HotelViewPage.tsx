import '../styles.css'; 
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../apiClient";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";



const HotelView = ()=>{

    const { hotelId } = useParams();


    const { data: hotel } = useQuery(
      "fetchHotelById",
      () => apiClient.fetchMyHotelById(hotelId || ""),
      {
        enabled: !!hotelId,
      }
    );
    
   
    if (!hotel) {
      return <></>;
    }

    return (
        <div>
            
          
        <nav>
            <ul>
            <li>OVERVIEW</li>
            <li>|</li>
            <li>AMENITIES</li>
            <li>|</li>
            <li>ROOMS</li>
            <li>|</li>
            <li>ACCESSIBILITY</li>
            <li>|</li>
            <li>POLICIES</li>
            </ul>
        </nav>
    
        <div className="container">
            <img className="image" src="banner.jpg" alt="banner image" />
            <div className="overlay-text">{hotel.name}</div>
        </div>
    
        <div className="map" style={{ marginTop: '20px' }}>
            <div className="rating">
            <div>
                <h1 style={{ fontSize: '28px' }}>{hotel.name}</h1>
                <p> Hotel in {hotel.city}</p>
                <div>
        <span className="flex justify-center">
          {Array.from({ length: hotel.starRating }).map(() => (
            <AiFillStar className="fill-yellow-400 text-3xl" />
          ))}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
      </div>
               
            
                
                <hr style={{ height: '2px', backgroundColor: 'black', margin: '10px' }} />
            </div>
            <div className="amenities">
                <h3>Popular Amenities</h3>
                <ul>
                {hotel.facilities.map((facility) => (
      
           <li> {facility}</li>
        ))}
               
                </ul>
            </div>
            </div>
            <div className="location">
            <h1 style={{ fontSize: '28px' }}>Explore the area</h1>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2897.601982619188!2d-80.44131092401025!3d43.427141971113734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b8ad8c3c49607%3A0xeca6c52ce71cd9!2s16%20Cedarwoods%20Crescent%2C%20Kitchener%2C%20ON%20N2C%202L4!5e0!3m2!1sen!2sca!4v1708372613717!5m2!1sen!2sca"
                width="450"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <p>16 cedarwood cres, Kitchener, ON N2C 2L4</p>
            </div>
        </div>
    
        <hr style={{ height: '2px', backgroundColor: 'black', margin: '10px auto', width: '70%' }} />
    
        <div className="guest">
            <h1>Guest Room</h1>
            <img className="guestRoom" src="guest.jpg" alt="Guest Room" />
        </div>
    
        <div className="reservation" style={{ marginTop: '20px' }}>
            <div className="details">
            <h2 style={{ fontSize: '28px' }}>Luxury suite, 2 Double beds</h2>
            <p>8.6/10 Excellent</p>
            <hr style={{ height: '2px', backgroundColor: 'black', margin: '15px 0px', width: '45%' }} />
            <h2 style={{ fontSize: '24px' }}>What this place offers</h2>
            <ul>
                <li>Free Wi-Fi</li>
                <li>Breakfast included</li>
                <li>Sleeps 4</li>
                <li>750 sq</li>
                <li>2 Double beds</li>
            </ul>
            <hr style={{ height: '2px', backgroundColor: 'black', margin: '15px 0px', width: '45%' }} />
            <p>
                Experience the charm of the 16 cedarwood Cres Boathouse with a stunning lake view, just a short walk from downtown.
                Enjoy the cozy atmosphere, Sonos speakers in every room, and a comfortable bed with luxurious linens. Please note that
                this apartment may not be suitable for guests taller than 6'3" due to some ductwork. Unfortunately, the fireplace is
                currently not operable, and we've adjusted the price accordingly to offer you great value during your stay.
            </p>
            <hr style={{ height: '2px', backgroundColor: 'black', margin: '15px 0px', width: '45%' }} />
            <h3 style={{ fontSize: '24px' }}>Cancellation Policy</h3>
            <ul>
                <li>Non-Refundable +CA $0</li>
                <li>Partially-Refundable +CA $25</li>
            </ul>
            <hr style={{ height: '2px', backgroundColor: 'black', margin: '15px 0px', width: '45%' }} />
            </div>
            <div className="reservation-container">
            <GuestInfoForm  pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}/>
            </div>
        </div>
    
        <hr style={{ height: '2px', backgroundColor: 'black', margin: '10px auto', width: '70%' }} />
        <div className="Accessibility">
            <div className="alist">
            <h2 style={{ fontSize: '24px' }}>Accessibility</h2>
            <ul>
                <li>Wheelchair Accessibility</li>
                <li>Elevator</li>
                <li>Handrails in stairways</li>
                <li>Stair-free path to entrance</li>
                <li>Well-lit path to entrance</li>
            </ul>
            </div>
            <div className="adetail">
            <p>If you have requests for specific accessibility needs, please contact the property using the information on the reservation confirmation received after booking</p>
            </div>
        </div>
    
        <hr className="aprop" style={{ height: '2px', backgroundColor: 'black', margin: '10px auto', width: '70%' }} />
        <div className="proprety">
            <h2 style={{ fontSize: '24px' }}>About property</h2>
        </div>
    
        <hr style={{ height: '2px', backgroundColor: 'black', margin: '10px auto', width: '70%' }} />
        <div className="info">
            <h2 style={{ fontSize: '24px' }}>Important information</h2>
            <ul>
            <h3 style={{ fontSize: '24px' }}>Fees</h3>
            <li>You will be asked to pay the following charges at the property</li>
            <li>Deposit: CAD 100 per accommodation, per stay</li>
            <li>We have included all charges provided to us by the property</li>
            </ul>
            <ul>
            <h3 style={{ fontSize: '24px' }}>You need to know</h3>
            <li>Extra-person charges may apply and vary depending on property policy</li>
            <li>Government-issued photo identification and a "credit card may be required at check-in for incidental charges</li>
            <li>Special requests are subject to availability upon check-in and may incur additional charges, special requests cannot be guaranteed</li>
            <li>This property accepts credit cards; cash is not accepted</li>
            <li>Safety features at this property include a fire extinguisher</li>
            <li>Please note that cultural norms and guest policies may differ by country and by property; the policies listed are provided by the property</li>
            </ul>
        </div>
        
        </div>
    );
}



export default HotelView;