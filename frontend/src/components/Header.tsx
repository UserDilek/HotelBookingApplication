import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext"; 
import SignOutButton from "../components/SignOutButton";  

const Header = () => {
   const {isLogged} = useAppContext();
    return (
      <div className="bg-mainColor py-6">
        <div className=" flex justify-between">
          <span className="text-xl text-white font-bold bg-white ml-5    ">
            <Link to="/"><img className="w-20 h-10" src="/logo.png"></img></Link>
          </span>
          <span className="flex ">
            { isLogged ? ( <>
                         <Link to="/">My Bookings</Link>
                         <Link to="/">My Hotels</Link>
                         <Link to="/signout"><button><SignOutButton></SignOutButton></button></Link>
                         </>)
                      :
                      (
                        <Link
                        to="/signin"
                        className="flex bg-white items-center text-mainColor px-3 font-bold hover:bg-gray-100"
                      >
                        SignIn
                      </Link>
                      )};
          </span>
        </div>
      </div>
    );
  };
  
  export default Header;