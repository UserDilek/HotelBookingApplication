import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";

const TypeArea = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  return (

    <div className="mb-4 mt-1">
      <label className="text-[#88BDBC] m-3">Type</label>
      <div className="flex flex-wrap gap-4 mt-1">



        {hotelTypes.map((type) => (
          <label
            className={ `input-block hover:cursor-pointer
              ${typeWatch === type
                ? "cursor-pointer bg-[#88BDBC] text-sm rounded-full px-4 py-2 font-semibold"
                : "cursor-pointer bg-white text-sm rounded-full px-4 py-2 font-semibold"}
                `}
          >
            <input
              type="radio"
              value={type}
              {...register("type", {
                required: "This field is required",
              })}
              className="hidden"
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm font-bold">
          {errors.type.message}
        </span>
      )}
    </div>
  );
};

export default TypeArea;