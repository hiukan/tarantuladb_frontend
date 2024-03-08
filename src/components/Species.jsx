import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../App";

const Species = ({species, getSpecies}) => {

    const deleteSpecies = async (id) => {
        const result = await Swal.fire({
            title: "Do you really want to delete this species?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6"
        })
        if(result.isConfirmed){
            try{
                await axios.delete(`${VITE_BACKEND_URL}species/${id}`);
                toast.success("Deleted species successfully");
                getSpecies();
            } catch (error){
                toast.error(error.message)
            }
        }
    }

    return (
        <div className="bg-white rounded shadow-lg overflow-hidden flex flex-col justify-between">
            <img src={species.image ? species.image : "https://cdn-icons-png.flaticon.com/512/47/47415.png"} className="w-full max-h-96 p-2 object-cover"/>
            <div className="px-4 pt-2 pb-4">
                <h2 className="text font-semibold">{species.genus} {species.species}</h2>
                {species.origin && <div className="text-sm">Origin: {species.origin}</div>}
                {species.type && <div className="text-sm">Type: {species.type}</div>}
                {species.adultSize && <div className="text-sm">Adult Size: {species.adultSize}</div>}
                {species.urticatingHairs && <div className="text-sm">Urticating Hairs: {species.urticatingHairs ? "yes" : "no"}</div>}
                {species.growthRate && <div className="text-sm">Growth Rate: {species.growthRate}</div>}
                {species.lifeExpectancy && <div className="text-sm">Life Expectancy: {species.lifeExpectancy}</div>}
                {species.recommendedExperienceLevel && <div className="text-sm">Recommended Experience Level: {species.recommendedExperienceLevel}</div>}
                {species.idealTemperatureRange && <div className="text-sm">Ideal Temperature Range: {species.idealTemperatureRange}</div>}
                {species.idealHumidityLevel && <div className="text-sm">Ideal Humidity Level: {species.idealHumidityLevel}</div>}
                {species.recommendedEnclosureSize && <div className="text-sm">Recommended Enclosure Size: {species.recommendedEnclosureSize}</div>}
                {species.bitePotency && <div className="text-sm">Bite Potency: {species.bitePotency}</div>}
                {species.temperament && <div className="text-sm">Temperament: {species.temperament}</div>}
                
            </div>
            <div className="mt-2 flex gap-4 px-4 pt-2 pb-4">
                <Link to={`/edit/${species._id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer">Edit</Link>
                <button onClick={() => deleteSpecies(species._id)} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer">Delete</button>
                </div>
            
            
        </div>
    )
}

export default Species;