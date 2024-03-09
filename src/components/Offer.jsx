import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../App";
import { useEffect, useState } from "react";

const Offer = ({offer, getOffers}) => {

    const [species, setSpecies] = useState({});
    const [seller, setSeller] = useState({});
    const [isLoading, setIsLoading] = useState(false)

    const getSpecies = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${VITE_BACKEND_URL}species/${offer.speciesId}`);
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
            const response = await axios.get(`${VITE_BACKEND_URL}sellers/${offer.sellerId}`);
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

    const deleteOffer = async (id) => {
        const result = await Swal.fire({
            title: "Do you really want to delete this offer?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6"
        })
        if(result.isConfirmed){
            try{
                await axios.delete(`${VITE_BACKEND_URL}offers/${id}`);
                toast.success("Deleted offer successfully");
                getOffers();
            } catch (error){
                toast.error(error.message)
            }
        }
    }

    return (
        <>
            <tr>
            <td><image href={species.image}/></td>
            <td>{species.genus} {species.species}</td>
            <td>{offer.sex}</td>
            <td>{offer.legspan}</td>
            <td>{offer.price}</td>
            <td>
                <div>{seller.name}</div>
                {/* {Object.keys(seller.contactDetails).map(key => (
                    <div key={key}>
                        {key}: {seller.contactDetails[key]}
                    </div>
                ))} */}
            </td>
            <td><Link to={`/editOffer/${offer._id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer">Edit</Link></td>
            <td><button onClick={() => deleteOffer(offer._id)} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer">Delete</button></td>
            </tr>
        </>
    )
}

export default Offer;