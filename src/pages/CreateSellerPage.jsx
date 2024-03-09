import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const CreateSellerPage = () => {

    const [name, setName] = useState("")
    const [contactDetails, setContactDetails] = useState("")
    const [website, setWebsite] = useState("")
    const [location, setLocation] = useState("")
    const [shipsAnimals, setShipsAnimals] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const saveSeller = async(e) => {
        e.preventDefault();
        let parsedContactDetails;
        try{
            parsedContactDetails = JSON.parse(contactDetails)
            console.log(contactDetails)
        } catch (error){
            console.log(error)
            toast.error(`Please enter valid JSON format e.g.: {"phone": "0323455667", "E-Mail": "info@tarantuladb.ch"}`);
            return;
        }
        if(name === "" || parsedContactDetails === ""){
            toast.warn("Please fill in all fields marked with *")
            return;
        }
        try{
            setIsLoading(true);
            const response = await axios.post(`${VITE_BACKEND_URL}sellers`, {
                name: name,
                contactDetails: parsedContactDetails,
                website: website,
                location: location,
                shipsAnimals: shipsAnimals
            });
            toast.success(`Saved ${response.data.name} successfully`)
            setIsLoading(false);
            navigate("/sellers")
        }catch (error) {
            toast.error(error.message)
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 blocl text-center">Create a seller</h2>
            <form onSubmit={saveSeller}>
                <div className="space-y-2">
                    <div>
                        <label>Name *</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name" />
                    </div>
                    <div>
                        <label>Contact Details *</label>
                        <input type="text"value={contactDetails} onChange={(e) => setContactDetails(e.target.value)}className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Contact Details (JSON Format)" />
                    </div>
                    <div>
                        <label>Website</label>
                        <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Website" />
                    </div>
                    <div>
                        <label>Location</label>
                        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Location" />
                    </div>
                    <div>
                        <label>Ships Animals</label>
                        <input type="text" value={shipsAnimals} onChange={(e) => setShipsAnimals(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter if seller ships animals" />
                    </div>
                    <div>
                        {!isLoading && <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover-cursor-pointer">Save</button>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateSellerPage;