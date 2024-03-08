import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const CreatePage = () => {

    const [genus, setGenus] = useState("")
    const [species, setSpecies] = useState("")
    const [image, setImage] = useState("")
    const [type, setType] = useState("")
    const [origin, setOrigin] = useState("")
    const [adultSize, setAdultSize] = useState("")
    const [urticatingHairs, setUrticatingHairs] = useState("")
    const [growthRate, setGrowthRate] = useState("")
    const [lifeExpectancy, setLifeExpectancy] = useState("")
    const [recommendedExperienceLevel, setRecommendedExperienceLevel] = useState("")
    const [idealTemperatureRange, setIdealTemperatureRange] = useState("")
    const [idealHumidityLevel, setIdealHumidityLevel] = useState("")
    const [recommendedEnclosureSize, setRecommendedEnclosureSize] = useState("")
    const [bitePotency, setBitePotency] = useState("")
    const [temperament, setTemperament] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const saveSpecies = async(e) => {
        e.preventDefault();
        if(genus === "" || species === ""){
            toast.warn("Please fill in all fields marked with *")
            return;
        }
        try{
            setIsLoading(true);
            const response = await axios.post(`${VITE_BACKEND_URL}species`, {
                genus: genus,
                species: species,
                image: image,
                type: type,
                origin: origin,
                adultSize: adultSize,
                urticatingHairs: urticatingHairs,
                growthRate: growthRate,
                lifeExpectancy: lifeExpectancy,
                recommendedExperienceLevel: recommendedExperienceLevel,
                idealTemperatureRange: idealTemperatureRange,
                idealHumidityLevel: idealHumidityLevel,
                recommendedEnclosureSize: recommendedEnclosureSize,
                bitePotency: bitePotency,
                temperament: temperament
            });
            toast.success(`Saved ${response.data.genus} ${response.data.species} successfully`)
            setIsLoading(false);
            navigate("/")
        }catch (error) {
            toast.error(error.message)
            setIsLoading(false);
        }
    }

    return (
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 blocl text-center">Create a species</h2>
            <form onSubmit={saveSpecies}>
                <div className="space-y-2">
                    <div>
                        <label>Genus *</label>
                        <input type="text" value={genus} onChange={(e) => setGenus(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Genus" />
                    </div>
                    <div>
                        <label>Species *</label>
                        <input type="text"value={species} onChange={(e) => setSpecies(e.target.value)}className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Species" />
                    </div>
                    <div>
                        <label>Image URL</label>
                        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Image URL" />
                    </div>
                    <div>
                        <label>Type</label>
                        <input type="text" value={type} onChange={(e) => setType(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Type" />
                    </div>
                    <div>
                        <label>Origin</label>
                        <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Origin" />
                    </div>
                    <div>
                        <label>Adult Size</label>
                        <input type="text" value={adultSize} onChange={(e) => setAdultSize(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Adult Size" />
                    </div>
                    <div>
                        <label>Urticating Hair</label>
                        <input type="text" value={urticatingHairs} onChange={(e) => setUrticatingHairs(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Urticating Hair" />
                    </div>
                    <div>
                        <label>Growth Rate</label>
                        <input type="text" value={growthRate} onChange={(e) => setGrowthRate(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Growth Rate" />
                    </div>
                    <div>
                        <label>Life Expectancy</label>
                        <input type="text" value={lifeExpectancy} onChange={(e) => setLifeExpectancy(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Life Expectancy" />
                    </div>
                    <div>
                        <label>Recommended Experience Level</label>
                        <input type="text" value={recommendedExperienceLevel} onChange={(e) => setRecommendedExperienceLevel(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Recommended Experience Level" />
                    </div>
                    <div>
                        <label>Ideal Temperature Range</label>
                        <input type="text" value={idealTemperatureRange} onChange={(e) => setIdealTemperatureRange(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Ideal Temperature Range" />
                    </div>
                    <div>
                        <label>Ideal Humidity Level</label>
                        <input type="text" value={idealHumidityLevel} onChange={(e) => setIdealHumidityLevel(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Ideal Humidity Level" />
                    </div>
                    <div>
                        <label>Recommended Enclosure Size</label>
                        <input type="text" value={recommendedEnclosureSize} onChange={(e) => setRecommendedEnclosureSize(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Recommended Enclosure Size" />
                    </div>
                    <div>
                        <label>Bite Potency</label>
                        <input type="text" value={bitePotency} onChange={(e) => setBitePotency(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Bite Potency" />
                    </div>
                    <div>
                        <label>Temperament</label>
                        <input type="text" value={temperament} onChange={(e) => setTemperament(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Temperament" />
                    </div>
                    <div>
                        {!isLoading && <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover-cursor-pointer">Save</button>}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default CreatePage;