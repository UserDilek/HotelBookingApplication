import { FormProvider, useForm } from "react-hook-form";
import TypeArea from "./TypeArea";
import DetailArea from "./DetailArea";
import FacilitiesArea from "./FacilitiesArea";
import GuessArea from "./GuessArea";
import ImageArea from "./ImageArea";
import { HotelType } from "../../../../backend/src/shared/types";
import { useEffect } from "react";

export type HotelFormData = {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  pricePerNight: number;
  starRating: number;
  facilities: string[];
  imageFiles: FileList;
  imageUrls: string[];
  adultCount: number;
  childCount: number;
};

type Props = {
  hotel?: HotelType;
  onSave: (hotelFormData: FormData) => void;
  actionMethod:String,
  isLoading: boolean;
  onDelete: (hotelFormData: FormData) => void;
  isDeleting: boolean;
};

const ManageHotelForm = ({ onSave,isLoading,onDelete,isDeleting,hotel,actionMethod  }: Props) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);



  const onSubmit = handleSubmit((formDataJson: HotelFormData) => {
    const formData = new FormData();

    if (hotel) {
        formData.append("hotelId", hotel._id);
      }

    formData.append("name", formDataJson.name);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
    formData.append("description", formDataJson.description);
    formData.append("type", formDataJson.type);
    formData.append("pricePerNight", formDataJson.pricePerNight.toString());
    formData.append("starRating", formDataJson.starRating.toString());
    formData.append("adultCount", formDataJson.adultCount.toString());
    formData.append("childCount", formDataJson.childCount.toString());

    formDataJson.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    if (formDataJson.imageUrls) {
      formDataJson.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    Array.from(formDataJson.imageFiles).forEach((imageFile) => {
      formData.append(`imageFiles`, imageFile);
    });

    onSave(formData);
  });

  const deleteHotel = handleSubmit(() => {
    const formData = new FormData();

    if (hotel) {
        formData.append("hotelId", hotel._id);
      }

    onDelete(formData);
  });



  return (
  
    <FormProvider {...formMethods}>
      <form className="pl-10 pr-10 ml-10 mr-10 mx-auto text-start" onSubmit={onSubmit}> 
      <div className="p-5 w-full">
        <DetailArea actionMethod= {actionMethod} /> 
        <TypeArea />
        <FacilitiesArea />
        <GuessArea />
        <ImageArea /> 
        
    
          <button
            disabled={isLoading}
            type="submit"
            className="btn mt-10"
          >
            {isLoading ? "Saving..." : "Save"}
          </button>

          {actionMethod == "Edit" ? <button
            disabled={isDeleting}
            type="submit"
            className="btn-red bg-red mt-5"
            onClick={deleteHotel}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button> : " " } 

          
          </div>
      </form>
    
    </FormProvider>
  
  );
};

export default ManageHotelForm;