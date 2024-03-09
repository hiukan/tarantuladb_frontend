import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const EditSellerPage = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [seller, setSeller] = useState({
        name: "",
        contactDetails: "",
        website: "",
        location: "",
        shipsAnimals: false
    })

    const getSeller = async () => {
        setIsLoading(true);
        try{
            const response = await axios.get(`${VITE_BACKEND_URL}sellers/${id}`);
            console.log(response)
            setSeller({
                name: response.data.name,
                contactDetails: JSON.stringify(response.data.contactDetails),
                website: response.data.website,
                location: response.data.location,
                shipsAnimals: response.data.shipsAnimals
            })
            setIsLoading(false);

        } catch(error){
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    const updateSeller = async (e) => {
        e.preventDefault();
        let parsedContactDetails;
        try{
            parsedContactDetails = JSON.parse(seller.contactDetails)
            console.log("this is parsy", parsedContactDetails)
        } catch (error){
            console.log(error)
            toast.error(`Please enter valid JSON format e.g.: {"phone": "0323455667", "E-Mail": "info@tarantuladb.ch"}`);
            return;
        }
        setIsLoading(true);
        try{
            const response = await axios.put(`${VITE_BACKEND_URL}sellers/${id}`, {
                name: seller.name,
                contactDetails: parsedContactDetails,
                website: seller.website,
                location: seller.location,
                shipsAnimals: seller.shipsAnimals
            });
            toast.success(`Updated seller successfully`);
            navigate("/");
            setIsLoading(false);
        }catch (error){
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getSeller();
    }, [])

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 blocl text-center">Update {seller.name}</h2>
            {isLoading ? ("Loading..") : (
                <>
                    <form onSubmit={updateSeller}>
                        <div className="space-y-2">
                            <div>
                                <label>Name</label>
                                <input type="text" value={seller.name} onChange={(e) => setSeller({...seller, name: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name" />
                            </div>
                            <div>
                                <label>Contact Details</label>
                                <input type="text"value={seller.contactDetails} onChange={(e) => setSeller({...seller, contactDetails: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Contact Details (JSON)" />
                            </div>
                            <div>
                                <label>Website</label>
                                <input type="text" value={seller.website} onChange={(e) => setSeller({...seller, website: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Website" />
                            </div>
                            <div>
                                <label>Location</label>
                                <input type="text" value={seller.location} onChange={(e) => setSeller({...seller, location: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Location" />
                            </div>
                            <div>
                                <label>Ships Animals</label>
                                <input type="text" value={seller.shipsAnimals} onChange={(e) => setSeller({...seller, shipsAnimals: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Ships Animals" />
                            </div>
                            <div>
                                {!isLoading && <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover-cursor-pointer">Update</button>}
                            </div>
                        </div>
                    </form>
                </>
            )}
            
        </div>
    )
}

export default EditSellerPage;