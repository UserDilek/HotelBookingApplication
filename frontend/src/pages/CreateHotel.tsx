import { useForm } from "react-hook-form";


export type HotelFormData = {
    name: string;
    description: string;
    type: string;
    adultCount: string;
    childCount: string;
    facilitites: string;
    pricePerNight: string;
    images: string;
    address: {
        city: string,
        country: string
    };
};

const CreateHotel = () => {
    const { register, watch, handleSubmit, formState: { errors }, } = useForm<HotelFormData>();

    const onSubmit = handleSubmit((data) => {
        console.log(data);
    });

    return (
        <div className="p-5 w-full">
            <form onSubmit={onSubmit} className="max-w-[850px] mx-auto">
                <h1 className="text-2xl font-bold mb-5">Create Hotel</h1>

                <div className="input-block mb-4">
                    <label
                        htmlFor="fileInput"
                        className="block w-full cursor-pointer text-start"
                    >
                        <span className="text-gray-400">Choose hotel image</span>
                        <input
                            id="fileInput"
                            type="file"
                            className="hidden"
                            {...register("images", { required: "Please select hotel image." })}
                        />
                    </label>

                </div>
                {errors.images && (
                    <p className="text-red m-3"  >{"*" + errors.images.message}</p>
                )}

                <div className="input-block mb-4">
                    <input type="text" placeholder="Enter hotel name" className="w-full"
                        {...register("name", { required: "Please enter hotel name." })} ></input>
                </div>
                {errors.name && (
                    <p className="text-red m-3"  >{"*" + errors.name.message}</p>
                )}
                <div className="input-block mb-4">
                    <input type="text" placeholder="Enter hotel descripiton" className="w-full"
                        {...register("description", { required: "Please enter hotel description." })} ></input>
                </div>
                {errors.description && (
                    <p className="text-red m-3"  >{"*" + errors.description.message}</p>
                )}

                <div className="flex items-center gap-4">
                    <div className="flex-1">

                        <div className="input-block mb-4">
                            <input type="number" placeholder="Enter hotel adult capacity" className="w-full"
                                {...register("adultCount", { required: "Please enter hotel adult capacity." })} ></input>
                        </div>
                        {errors.adultCount && (
                            <p className="text-red m-3"  >{"*" + errors.adultCount.message}</p>
                        )}
                    </div>
                    <div className="flex-1">

                        <div className="input-block mb-4">
                            <input type="number" placeholder="Enter hotel child capacity" className="w-full"
                                {...register("childCount", { required: "Please enter hotel child capacity." })} ></input>
                        </div>
                        {errors.childCount && (
                            <p className="text-red m-3"  >{"*" + errors.childCount.message}</p>
                        )}
                    </div>
                </div>
                <div className="input-block mb-4">
                    <input type="number" placeholder="Enter hotel price" className="w-full"
                        {...register("pricePerNight", { required: "Please enter hotel price." })} ></input>
                </div>
                {errors.pricePerNight && (
                    <p className="text-red m-3"  >{"*" + errors.pricePerNight.message}</p>
                )}

                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <div className="input-block mb-4">
                            <input type="text" placeholder="Enter hotel city" className="w-full"
                                {...register("address.city", { required: "Please enter hotel city." })} ></input>
                        </div>
                        {errors?.address?.city && (
                            <p className="text-red m-3"  >{"*" + errors.address.city.message}</p>
                        )}
                    </div>
                    <div className="flex-1">
                        <div className="input-block mb-4">
                            <input type="text" placeholder="Enter hotel country" className="w-full"
                                {...register("address.country", { required: "Please enter hotel country." })} ></input>
                        </div>
                        {errors.address?.country && (
                            <p className="text-red m-3"  >{"*" + errors.address?.country.message}</p>
                        )}
                    </div>
                </div>

                <button type="submit" className="btn">Submit</button>
            </form>
        </div >
    )
}

export default CreateHotel;