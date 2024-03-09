import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const EditOfferPage = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [sellers, setSeller] = useState([])
    const [species, setSpecies] = useState([])
    const [offer, setOffer] = useState({
        sellerId: "",
        speciesId: "",
        price: "",
        sex: "",
        legspan: ""
    })

    const getOffer = async () => {
        setIsLoading(true);
        try{
            const response = await axios.get(`${VITE_BACKEND_URL}offers/${id}`);
            console.log(response)
            setOffer(response)
            setIsLoading(false);

        } catch(error){
            setIsLoading(false);
            toast.error(error.message);
        }
    }

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

    const getSellers = async () => {
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

    const updateOffer = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const response = await axios.put(`${VITE_BACKEND_URL}offers/${id}`, {
                sellerId: offer.sellerId,
                speciesId: offer.speciesId,
                price: offer.price,
                sex: offer.sex,
                legspan: offer.legspan
            });
            toast.success(`Updated offer successfully`);
            navigate("/offers");
            setIsLoading(false);
        }catch (error){
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getOffer();
        getSellers();
        getSpecies();
    }, [])

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 blocl text-center">Update offer</h2>
            {isLoading ? ("Loading..") : (
                <>
                    <form onSubmit={updateOffer}>
                        <div className="space-y-2">
                            <div>
                                <label>Seller</label>
                                <select
                                    value={offer.sellerId}
                                    onChange={(e) => setOffer({...offer, sellerId: e.target.value})} 
                                    className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                >
                                    <option value="">Select Seller</option>
                                    {sellers.map(seller => (
                                        <option key={seller._id} value={seller._id}>{seller.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Species</label>
                                <select
                                    value={offer.speciesId}
                                    onChange={(e) => setOffer({...offer, speciesId: e.target.value})} 
                                    className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
                                >
                                    <option value="">Select Species</option>
                                    {species.map(species => (
                                        <option key={species._id} value={species._id}>{species.genus} {species.species}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>Price</label>
                                <input type="text" value={offer.price} onChange={(e) => setOffer({...offer, price: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter price" />
                            </div>
                            <div>
                                <label>Sex</label>
                                <input type="text" value={offer.sex} onChange={(e) => setOffer({...offer, sex: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter sex" />
                            </div>
                            <div>
                                <label>Legspan</label>
                                <input type="text" value={offer.legspan} onChange={(e) => setOffer({...offer, legspan: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter legspan" />
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

export default EditOfferPage;