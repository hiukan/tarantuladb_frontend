import { useState, useEffect } from "react";
import axios from "axios";
import Offer from "../components/Offer";
import { Link } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";

const OffersPage = () => {
    const [offers, setOffers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getOffers = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${VITE_BACKEND_URL}offers`);
            console.log(response.data);
            setOffers(response.data);
            setIsLoading(false);
        } catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        getOffers();
    }, [])

    return (
        <div>
            <div>
                <Link to="/createOffer" className="inline-block mt-4 shadow-md bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600 hover:cursor-pointer">Create an Offer</Link>
            </div>
            <div className="w-full mt-5 overflow-x-auto table-auto">
                {isLoading ? (
                    "Loading..."
                    ) : (
                    <>
                    <table className="table-auto w-full mt-5 text-center">
                        <thead>
                            <tr>
                            <th></th>
                            <th>Species</th>
                            <th>Sex</th>
                            <th>Legspan</th>
                            <th>Price</th>
                            <th>Seller</th>
                            <th></th>
                            <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {offers.length > 0 ? (
                                <>
                                {
                                    offers.map((offer, index) => {
                                        return (
                                        <Offer key={index} offer={offer} getOffers={getOffers}/>
                                        )
                                    })
                                }
                                </>
                            )                     
                                : (
                                    <tr>
                                        <td>
                                            There are no offers
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

export default OffersPage;