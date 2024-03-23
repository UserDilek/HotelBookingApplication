import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

type Props = {

    actionMethod:String,
  }; 
const DetailArea = ({ actionMethod  }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
     <h1 className="text-4xl mb-5 text-[#88BDBC] mt-5">{actionMethod} Hotel</h1>

      <label className="text-gray-700 text-sm font-bold flex-1">
      <h2 className="text-2xl font-bold mb-3 text-mainColor">Name</h2>
                <div className="input-block mb-4 mt-1">
                    <input type="text" placeholder="Enter hotel name" className="w-full"
                        {...register("name", { required: "Please enter hotel name." })} ></input>
                </div>

                {errors.name && (
                    <p className="text-red m-3"  >{"*" + errors.name.message}</p>
                )}
      </label>

      <div className="flex items-center gap-4">
                    <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3 text-mainColor">City</h2>
                        <div className="input-block mb-4 mt-1">
                            <input type="text" placeholder="Enter hotel city" className="w-full"
                                {...register("city", { required: "Please enter hotel city." })} ></input>
                        </div>
                        {errors?.city && (
                            <p className="text-red m-3"  >{"*" + errors.city.message}</p>
                        )}
                    </div>
                    <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3 text-mainColor">Country</h2>
                        <div className="input-block mb-4 mt-1">
                            <input type="text" placeholder="Enter hotel country" className="w-full"
                                {...register("country", { required: "Please enter hotel country." })} ></input>
                        </div>
                        {errors.country && (
                            <p className="text-red m-3"  >{"*" + errors.country.message}</p>
                        )}
                    </div>
                </div>

                <h2 className="text-2xl font-bold mb-3 text-mainColor">Description</h2>
                <div className="input-block mb-4 mt-1">

                  
 <textarea rows={10} placeholder="Enter hotel descripiton" className="w-full py-1 px-2"
                        {...register("description", { required: "Please enter hotel description." })} ></textarea>

                </div>
                {errors.description && (
                    <p className="text-red m-3"  >{"*" + errors.description.message}</p>
                )}

   

<div className="flex items-center gap-4">
                    <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3 text-mainColor">Price</h2>
                        <div className="input-block mb-4 mt-1">
                            <input type="number" placeholder="Enter hotel price" className="w-full"
                                {...register("pricePerNight", { required: "Please enter hotel price." })} ></input>
                        </div>
                        {errors.pricePerNight && (
                            <p className="text-red m-3"  >{"*" + errors.pricePerNight.message}</p>
                        )}
                    </div>

                    <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-3 text-mainColor">Rating</h2>
                        <div className="input-block mb-4 mt-1">
                            <select className="w-full"
                                {...register("starRating", { required: "Please select hotel rating." })} >
                                <option value="">Select rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        {errors.starRating && (
                            <p className="text-red m-3"  >{"*" + errors.starRating.message}</p>
                        )}
                    </div>
                </div>
    </div>
  );
};

export default DetailArea;