import { BiLogoFacebookCircle } from "react-icons/bi";
import { BiLogoInstagramAlt } from "react-icons/bi";
import { BiLogoTwitter } from "react-icons/bi";
import { BiLogoYoutube } from "react-icons/bi";

const Footer = () => {
  const style = { color: "white", fontSize: "2.5em" }
    return (
      <div className="bg-mainColor pt-8 pb-5">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-white font-bold">
          <p>About Us</p>
          <p>Help Center</p>
        </span>
        <span className="text-white font-bold">
          <p className="">Careers</p>
          <p className="">Complains</p>
        </span>
      </div>
      <div className="container flex flex-row mx-auto justify-center items-center">

      
     
      <BiLogoFacebookCircle style={style}/>
      <BiLogoInstagramAlt style={style}/>
      <BiLogoTwitter style={style}/>
      <BiLogoYoutube style={style}/>

    
      </div>
      <div className="container flex mx-auto justify-center items-center">

    
  <p className="text-white">© 2024 Hotel booking All rights reserved.</p>
</div>
      </div>
    );
  };
  

export default Footer;