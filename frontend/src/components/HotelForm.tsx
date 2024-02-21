import { useState } from "react";
import { useForm } from "react-hook-form";


export type HotelFormData = {
    name: string;
    description: string;
    rating: number;
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

const typeOptions = [
    { label: "Budget", value: "budget" },
    { label: "Luxury", value: "luxury" },
    { label: "Family", value: "family" },
    { label: "Business", value: "business" },
]

const facilitiyOptions = [
    { label: "Free wifi", value: "free wifi" },
    { label: "Parking", value: "parking" },
    { label: "Family rooms", value: "family rooms" },
    { label: "Spa", value: "spa" },
    { label: "Fitness center", value: "fitness center" },
]

interface HotelFormInterface {
    label: string,
    handleFormSubmit: (data:any) => void
}
const HotelForm = ({ label, handleFormSubmit }: HotelFormInterface) => {
    const { register, handleSubmit, formState: { errors }, } = useForm<HotelFormData>();
    const [type, setType] = useState<string[]>([]);
    const [facilities, setFacilities] = useState<string[]>([]);

    const onSubmit = handleSubmit((data) => {
        handleFormSubmit(data);
    });

    const handleSelected = (value: string) => {
        const index = type.indexOf(value);

        if (index !== -1) {
            const updatedType = [...type];
            updatedType.splice(index, 1);
            setType(updatedType);
        } else {
            setType((prevType) => [...prevType, value]);
        }
    }

    const handleFacilitySelected = (value: string) => {
        const index = facilities.indexOf(value);

        if (index !== -1) {
            const updatedFacilities = [...facilities];
            updatedFacilities.splice(index, 1);
            setFacilities(updatedFacilities);
        } else {
            setFacilities((prevFacilities) => [...prevFacilities, value]);
        }
    }

    return (
        <div className="p-5 w-full">
            <form onSubmit={onSubmit} className="max-w-[850px] mx-auto text-start">
                <h1 className="text-4xl mb-5 text-[#88BDBC] mt-5">{label}</h1>
                <label className="text-[#88BDBC] m-3">Name</label>
                <div className="input-block mb-4 mt-1">
                    <input type="text" placeholder="Enter hotel name" className="w-full"
                        {...register("name", { required: "Please enter hotel name." })} ></input>
                </div>
                {errors.name && (
                    <p className="text-red m-3"  >{"*" + errors.name.message}</p>
                )}

                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <label className="text-[#88BDBC] m-3">City</label>
                        <div className="input-block mb-4 mt-1">
                            <input type="text" placeholder="Enter hotel city" className="w-full"
                                {...register("address.city", { required: "Please enter hotel city." })} ></input>
                        </div>
                        {errors?.address?.city && (
                            <p className="text-red m-3"  >{"*" + errors.address.city.message}</p>
                        )}
                    </div>
                    <div className="flex-1">
                        <label className="text-[#88BDBC] m-3">Country</label>
                        <div className="input-block mb-4 mt-1">
                            <input type="text" placeholder="Enter hotel country" className="w-full"
                                {...register("address.country", { required: "Please enter hotel country." })} ></input>
                        </div>
                        {errors.address?.country && (
                            <p className="text-red m-3"  >{"*" + errors.address?.country.message}</p>
                        )}
                    </div>
                </div>

                <label className="text-[#88BDBC] m-3">Description</label>
                <div className="input-block mb-4 mt-1">

                    <input type="text" placeholder="Enter hotel descripiton" className="w-full"
                        {...register("description", { required: "Please enter hotel description." })} ></input>
                </div>
                {errors.description && (
                    <p className="text-red m-3"  >{"*" + errors.description.message}</p>
                )}

                <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <label className="text-[#88BDBC] m-3">Price</label>
                        <div className="input-block mb-4 mt-1">
                            <input type="number" placeholder="Enter hotel price" className="w-full"
                                {...register("pricePerNight", { required: "Please enter hotel price." })} ></input>
                        </div>
                        {errors.pricePerNight && (
                            <p className="text-red m-3"  >{"*" + errors.pricePerNight.message}</p>
                        )}
                    </div>

                    <div className="flex-1">
                        <label className="text-[#88BDBC] m-3">Rating</label>
                        <div className="input-block mb-4 mt-1">
                            <select className="w-full"
                                {...register("rating", { required: "Please select hotel rating." })} >
                                <option value="">Select rating</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                        {errors.rating && (
                            <p className="text-red m-3"  >{"*" + errors.rating.message}</p>
                        )}
                    </div>
                </div>

                <div className="mb-4 mt-1">
                    <label className="text-[#88BDBC] m-3">Type</label>
                    <div className="flex flex-wrap gap-4 mt-1">
                        {typeOptions.map(({ label, value }, index) =>
                            <SelectTag key={index} label={label} value={value} isSelected={type.indexOf(value) !== -1} onClick={handleSelected} />

                        )}

                    </div>
                </div>

                <div className="mb-4 mt-1">
                    <label className="text-[#88BDBC] m-3">Facilities</label>
                    <div className="flex flex-wrap gap-4 mt-1">
                        {facilitiyOptions.map(({ label, value }, index) =>
                            <SelectTag key={index} label={label} value={value} isSelected={facilities.indexOf(value) !== -1} onClick={handleFacilitySelected} />
                        )}
                    </div>
                </div>

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

                <label className="text-[#88BDBC] m-3">Images</label>
                <div className="input-block mb-4 mt-1">
                    <label
                        htmlFor="fileInput"
                        className="block w-full cursor-pointer text-start"
                    >
                        <input
                            id="fileInput"
                            type="file"
                            {...register("images", { required: "Please select hotel image." })}
                        />
                    </label>

                </div>
                {errors.images && (
                    <p className="text-red m-3"  >{"*" + errors.images.message}</p>
                )}


                <button type="submit" className="btn">Submit</button>
            </form>
        </div >
    )
}

const SelectTag = ({ label, value, isSelected, onClick }: { label: string, value: string, isSelected: boolean, onClick: (value: string) => void }) => {
    return (
        <div onClick={() => onClick(value)} className={`input-block hover:cursor-pointer ${isSelected ? 'bg-[#88BDBC] text-white' : ''}`}>
            {label}
        </div>
    )
}
export default HotelForm;