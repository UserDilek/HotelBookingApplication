import HotelForm from "../components/HotelForm";

const CreateHotel = () => {
    const handleSubmit = (data:any) => {
        console.log(data);
    };

    return (
        <HotelForm label="Add New Hotel" handleFormSubmit={handleSubmit} />
    )
}

export default CreateHotel;