import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext"; 
import SignOutButton from "../components/SignOutButton";  

const Header = () => {
   const {isLogged} = useAppContext();
   
    return (
      <div className="bg-mainColor py-6">
      <div className=" flex justify-between">
        <span className="text-xl text-white font-bold bg-white ml-5    ">
          <Link to="/"><img className="w-70 h-70" src="white-logo.png" alt="logo"></img></Link>
        </span>
        <span className="flex ">
          { isLogged ? ( <>
                       <Link to="/my-bookings"  className="flex bg-mainColor items-center text-white px-2 font-bold hover:text-black ">My Bookings</Link>
                       <Link to="/my-hotels"  className="flex bg-mainColor items-center text-white px-2 font-bold hover:text-black">My Hotels</Link>
                       <Link to="/signout"  className="flex bg-mainColor  items-center text-white px-2 font-bold hover:text-black"><button><SignOutButton></SignOutButton></button></Link>
                       </>)
                    :
                    (
                      <Link
                      to="/signin"
                      className="flex bg-mainColor items-center text-white px-2 font-bold hover:text-black "
                    >
                      SignIn
                    </Link>
                    )}
        </span>
      </div>
    </div>
    );
  };
  
  export default Header;