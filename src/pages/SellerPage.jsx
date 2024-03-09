import { useState, useEffect } from "react";
import axios from "axios";
import Seller from "../components/Seller";
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";

const SellerPage = () => {
    const [sellers, setSellers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getSellers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${VITE_BACKEND_URL}sellers`);
            console.log(response.data);
            setSellers(response.data);
            setIsLoading(false);
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getSellers();
    }, [])

    return (
        <div>
            <div>
                <Link to="/createSeller" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Create a Seller</Link>
            </div>
            <div className="w-full mt-5 overflow-x-auto table-auto">
                {isLoading ? (
                    "Loading..."
                    ) : (
                    <>
                    <table className="table-auto w-full mt-5 text-center">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Contact Details</th>
                            <th>Website</th>
                            <th>Location</th>
                            <th>Ships Animals</th>
                            <th>Offers</th>
                            <th></th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sellers.length > 0 ? (
                                <>
                                {
                                    sellers.map((seller, index) => {
                                        return (
                                        <Seller key={index} seller={seller} getSellers={getSellers}/>
                                        )
                                    })
                                }
                                </>
                            )                     
                                : (
                                    <tr>
                                        <td>
                                            There are no sellers
                                        </td>
                                    </tr>
                            )}
                        </tbody>
                    </table>
                </>
                    )  }                   
            </div>
        </div>
    )
};

export default SellerPage;