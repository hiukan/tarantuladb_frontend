import { useState, useEffect } from "react";
import axios from "axios";
import Species from "../components/Species";
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";

const HomePage = () => {

    const [species, setSpecies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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

    useEffect(() => {
        getSpecies();
    }, [])

    return (
        <div>
            <div>
                <Link to="/create" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Create a Species</Link>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-3 mt-5 gap-4">
                {isLoading ? (
                    "Loading..."
                    ) : (
                    <>
                    {species.length > 0 ? (
                        <>
                        {
                            species.map((species, index) => {
                                return (
                                <Species key={index} species={species} getSpecies={getSpecies}/>
                                )
                            })
                        }
                        </>
                    ) : (
                    <div>
                        There are no species
                    </div>
                )}
                </>
                    )  }                   
            </div>
        </div>
    )
}

export default HomePage;