import {Link} from "react-router-dom";

const Header = () =>{
    return(
        <div className="bg-blue-800 py-6">
            <div className="container mx-auto flex justify-content">
                <span className="text-3xl text-white font-bold tracking-tight">
                    <Link to="/">Voyagio</Link>
                </span>
            </div> 
        </div>
    )
}

export default Header;