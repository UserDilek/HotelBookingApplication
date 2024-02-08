import DatePicker from "react-datepicker";
import { MdTravelExplore } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";

const searchBar = ()=>{
    return (
        <div className="container mx-auto">
  <form
        className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
      >
        <div className="flex flex-row items-center flex-1 bg-white p-2">
          <MdTravelExplore size={25} className="mr-2" />
          <input
            placeholder="Where are you going?"
            className="text-md w-full focus:outline-none"

          />
        </div>
  
        <div className="flex bg-white px-2 py-1 gap-2">
          <label className="items-center flex">
            Adults:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              min={1}
              max={20}
            />
          </label>
          <label className="items-center flex">
            Children:
            <input
              className="w-full p-1 focus:outline-none font-bold"
              type="number"
              min={0}
              max={20}
            />
          </label>
        </div>
        <div>
        <div>
          <DatePicker
            selectsStart
            placeholderText="Check-In Date"
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full" 
            onChange={()=>{}}
          />
        </div>
        </div>
        <div>
          <DatePicker
            selectsStart
            placeholderText="Check-out Date"
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full" 
            onChange={()=>{}}
          />
        </div>
        <div className="flex gap-1">
          <button className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500">
            Search
          </button>
          <button className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500">
            Clear
          </button>
        </div>
      </form>
        </div>
      
    );
}

export default searchBar;