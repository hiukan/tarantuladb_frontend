import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const CreateOfferPage = () => {

    const [sellerId, setSellerId] = useState("")
    const [speciesId, setSpeciesId] = useState("")
    const [sex, setSex] = useState("")
    const [price, setPrice] = useState("")
    const [legspan, setLegspan] = useState("")
    const [sellers, setSeller] = useState([])
    const [species, setSpecies] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const getSpecies = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${VITE_BACKEND_URL}species`);
            console.log(response.data);
            setSpecies(response.data);
            setIsLoading(false);
        } catch (error){
            console.log(error)
        }
    }

    const getSeller = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${VITE_BACKEND_URL}sellers`);
            console.log(response.data);
            setSeller(response.data);
            setIsLoading(false);
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getSpecies();
        getSeller();
    }, [])

    const saveOffer = async(e) => {
        e.preventDefault();
        if(sellerId === "" || speciesId === "" || price == "" || sex == ""){
            toast.warn("Please fill in all fields marked with *")
            return;
        }
        try{
            setIsLoading(true);
            const response = await axios.post(`${VITE_BACKEND_URL}offers`, {
                sellerId: sellerId,
                speciesId: speciesId,
                sex: sex,
                price: price,
                legspan: legspan
            });
            toast.success(`Saved offer successfully`)
            setIsLoading(false);
            navigate("/offers")
        }catch (error) {
            toast.error(error.message)
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 blocl text-center">Create a seller</h2>
            <form onSubmit={saveOffer}>
                <div className="space-y-2">
                    <div>
                        <label>Seller *</label>
                        <select
                            value={sellerId}
                            onChange={(e) => setSellerId(e.target.value)}
                            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                        >
                            <option value="">Select Seller</option>
                            {sellers.map(seller => (
                                <option key={seller._id} value={seller._id}>{seller.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Species *</label>
                        <select
                            value={speciesId}
                            onChange={(e) => setSpeciesId(e.target.value)}
                            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                        >
                            <option value="">Select Species</option>
                            {species.map(species => (
                                <option key={species._id} value={species._id}>{species.genus} {species.species}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Price *</label>
                        <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Price" />
                    </div>
                    <div>
                        <label>Sex *</label>
                        <input type="text" value={sex} onChange={(e) => setSex(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Sex" />
                    </div>
                    <div>
                        <label>Legspan</label>
                        <input type="text" value={legspan} onChange={(e) => setLegspan(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Legspan" />
                    </div>
                    <div>
                        {!isLoading && <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover-cursor-pointer">Save</button>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreateOfferPage;