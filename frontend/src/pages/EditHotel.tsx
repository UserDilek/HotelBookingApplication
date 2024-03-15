import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../apiClient";
import { useAppContext } from "../contexts/AppContext";
import { Link,useNavigate } from "react-router-dom";
import ManageHotelForm from "../components/ManageHotelForm";

const EditHotel = () => {

  const navigate = useNavigate();
  const { hotelId } = useParams();
  const { showToast } = useAppContext();

  
  
  var { data: hotel } = useQuery(
    "fetchMyHotelById",
    () => {  return apiClient.fetchMyHotelById(hotelId || "")},
    {
      enabled: !!hotelId,
    }
  );




    const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
      onSuccess: () => {
        showToast({ message: "Hotel Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error Saving Hotel", type: "ERROR" });
      },
    });

    const { mutate:deleteHotel, isLoading :isDeleting} = useMutation(apiClient.deleteMyHotelById, {
      onSuccess: () => {
        showToast({ message: "Hotel Deleted!", type: "SUCCESS" });
       
        navigate("/my-hotels");
      },
      onError: () => {
        showToast({ message: "Error deleting Hotel", type: "ERROR" });
      },
    });


  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  };

  const handleDelete = (hotelFormData: FormData) => {
   deleteHotel(hotelFormData);
  };


  return (
    <ManageHotelForm actionMethod ="Edit" hotel={hotel} onSave={handleSave} onDelete={handleDelete} isLoading={isLoading} isDeleting={isDeleting} />
  );
};

export default EditHotel;