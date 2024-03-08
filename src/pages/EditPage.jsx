import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const EditPage = () => {
    let {id} = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [species, setSpecies] = useState({
        genus: "",
        species: "",
        image: "",
        type: "",
        origin: "",
        adultSize: "",
        urticatingHairs: "",
        growthRate: "",
        lifeExpectancy: "",
        recommendedExperienceLevel: "",
        idealTemperatureRange: "",
        idealHumidityLevel: "",
        recommendedEnclosureSize: "",
        bitePotency: "",
        temperament: ""
    })

    const getSpecies = async () => {
        setIsLoading(true);
        try{
            const response = await axios.get(`${VITE_BACKEND_URL}species/${id}`);
            setSpecies({
                genus: response.data.genus,
                species: response.data.species,
                image: response.data.image,
                type: response.data.type,
                origin: response.data.origin,
                adultSize: response.data.adultSize,
                urticatingHairs: response.data.urticatingHairs,
                growthRate: response.data.growthRate,
                lifeExpectancy: response.data.lifeExpectancy,
                recommendedExperienceLevel: response.data.recommendedExperienceLevel,
                idealTemperatureRange: response.data.idealTemperatureRange,
                idealHumidityLevel: response.data.idealHumidityLevel,
                recommendedEnclosureSize: response.data.recommendedEnclosureSize,
                bitePotency: response.data.bitePotency,
                temperament: response.data.temperament
            })
            setIsLoading(false);

        } catch(error){
            setIsLoading(false);
            toast.error(error.message);
        }
    }

    const updateSpecies = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try{
            const response = await axios.put(`${VITE_BACKEND_URL}species/${id}`, species);
            toast.success(`Updated species successfully`);
            navigate("/");
            setIsLoading(false);
        }catch (error){
            setIsLoading(false);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        getSpecies();
    }, [])

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 blocl text-center">Update {species.genus} {species.species}</h2>
            {isLoading ? ("Loading..") : (
                <>
                    <form onSubmit={updateSpecies}>
                        <div className="space-y-2">
                            <div>
                                <label>Genus</label>
                                <input type="text" value={species.genus} onChange={(e) => setSpecies({...species, genus: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Genus" />
                            </div>
                            <div>
                                <label>Species</label>
                                <input type="text"value={species.species} onChange={(e) => setSpecies({...species, species: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Species" />
                            </div>
                            <div>
                                <label>Image URL</label>
                                <input type="text" value={species.image} onChange={(e) => setSpecies({...species, image: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Image URL" />
                            </div>
                            <div>
                                <label>Type</label>
                                <input type="text" value={species.type} onChange={(e) => setSpecies({...species, type: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Type" />
                            </div>
                            <div>
                                <label>Origin</label>
                                <input type="text" value={species.origin} onChange={(e) => setSpecies({...species, origin: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Origin" />
                            </div>
                            <div>
                                <label>Adult Size</label>
                                <input type="text" value={species.adultSize} onChange={(e) => setSpecies({...species, adultSize: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Adult Size" />
                            </div>
                            <div>
                                <label>Urticating Hair</label>
                                <input type="text" value={species.urticatingHairs} onChange={(e) => setSpecies({...species, urticatingHairs: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Urticating Hair" />
                            </div>
                            <div>
                                <label>Growth Rate</label>
                                <input type="text" value={species.growthRate} onChange={(e) => setSpecies({...species, growthRate: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Growth Rate" />
                            </div>
                            <div>
                                <label>Life Expectancy</label>
                                <input type="text" value={species.lifeExpectancy} onChange={(e) => setSpecies({...species, lifeExpectancy: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Life Expectancy" />
                            </div>
                            <div>
                                <label>Recommended Experience Level</label>
                                <input type="text" value={species.recommendedExperienceLevel} onChange={(e) => setSpecies({...species, recommendedExperienceLevel: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Recommended Experience Level" />
                            </div>
                            <div>
                                <label>Ideal Temperature Range</label>
                                <input type="text" value={species.idealTemperatureRange} onChange={(e) => setSpecies({...species, idealTemperatureRange: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Ideal Temperature Range" />
                            </div>
                            <div>
                                <label>Ideal Humidity Level</label>
                                <input type="text" value={species.idealHumidityLevel} onChange={(e) => setSpecies({...species, idealHumidityLevel: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Ideal Humidity Level" />
                            </div>
                            <div>
                                <label>Recommended Enclosure Size</label>
                                <input type="text" value={species.recommendedEnclosureSize} onChange={(e) => setSpecies({...species, recommendedEnclosureSize: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Recommended Enclosure Size" />
                            </div>
                            <div>
                                <label>Bite Potency</label>
                                <input type="text" value={species.bitePotency} onChange={(e) => setSpecies({...species, bitePotency: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Bite Potency" />
                            </div>
                            <div>
                                <label>Temperament</label>
                                <input type="text" value={species.temperament} onChange={(e) => setSpecies({...species, temperament: e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Temperament" />
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

export default EditPage;