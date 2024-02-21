import HotelForm from "../components/HotelForm";

const EditHotel = () => {
    const handleSubmit = (data:any) => {
        console.log(data);
    };

    return (
        <HotelForm label="Edit Hotel" handleFormSubmit={handleSubmit} />
    )
}

export default EditHotel;