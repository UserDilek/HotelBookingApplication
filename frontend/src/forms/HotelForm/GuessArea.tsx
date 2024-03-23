import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const GuestsArea = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
       <label className="text-[#88BDBC] m-3">Guests</label>
                <div className="flex items-center gap-4 p-5 pb-2 bg-[#efefef] rounded-lg mb-4 mt-1">
                    <div className="flex-1">
                        <label className="text-[#88BDBC] m-3">Adults</label>
                        <div className="input-block bg-white mb-4 mt-1">
                            <input type="number" placeholder="Enter hotel adult capacity" className="w-full"
                                {...register("adultCount", { required: "Please enter hotel adult capacity." })} ></input>
                        </div>
                        {errors.adultCount && (
                            <p className="text-red m-3"  >{"*" + errors.adultCount.message}</p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="text-[#88BDBC] m-3">Child</label>
                        <div className="input-block bg-white mb-4 mt-1">
                            <input type="number" placeholder="Enter hotel child capacity" className="w-full"
                                {...register("childCount", { required: "Please enter hotel child capacity." })} ></input>
                        </div>
                        {errors.childCount && (
                            <p className="text-red m-3"  >{"*" + errors.childCount.message}</p>
                        )}
                    </div>
                </div>
    </div>
  );
};

export default GuestsArea;  