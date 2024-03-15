import { useMutation } from "react-query";
import ManageHotelForm from "../components/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext"
import * as apiClient from "../apiClient";

const CreateHotel = () => {
    const { showToast } = useAppContext();

    const { mutate, isLoading } = useMutation(apiClient.createMyHotel, {
      onSuccess: () => {
        showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error Saving Hotel", type: "ERROR" });
      },
    });

    const handleSave = (hotelFormData: FormData) => {
        mutate(hotelFormData);
      };
    
      return <ManageHotelForm actionMethod={"Add"} onSave={handleSave} isLoading={isLoading} />;
}

export default CreateHotel;