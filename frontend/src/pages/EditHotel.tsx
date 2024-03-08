import HotelForm from "../components/HotelForm";
// import axios from 'axios';

const EditHotel = () => {
    const handleSubmit = (data:any) => {
        console.log(data);
    };

    const handleDelete = (hotelId: string) => {
        axios.post("/delete", { _id: hotelId })
            .then(res => {
                console.log(res.data.message);
            })
            .catch(error => {
                console.log(error.response.data.Message);
            });
    };

    return (
        <HotelForm label="Edit Hotel" handleFormSubmit={handleSubmit} handleDelete={handleDelete}/>
    )
}

export default EditHotel;