import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../App";

const Seller = ({seller, getSellers}) => {

    const deleteSeller = async (id) => {
        const result = await Swal.fire({
            title: "Do you really want to delete this seller?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!",
            cancelButtonColor: "#d33",
            confirmButtonColor: "#3085d6"
        })
        if(result.isConfirmed){
            try{
                await axios.delete(`${VITE_BACKEND_URL}sellers/${id}`);
                toast.success("Deleted seller successfully");
                getSellers();
            } catch (error){
                toast.error(error.message)
            }
        }
    }

    return (
        <>
            <tr>
            <td>{seller.name}</td>
            <td>{Object.keys(seller.contactDetails).map(key => (
                    <div key={key}>
                        {key}: {seller.contactDetails[key]}
                    </div>
                ))}</td>
            <td>{seller.website}</td>
            <td>{seller.location}</td>
            <td>{seller.shipsAnimals ? "yes" : "no"}</td>
            <td><Link to={`/offers/${seller._id}`}>Offers</Link></td>
            <td><Link to={`/editSeller/${seller._id}`} className="inline-block w-full text-center shadow-md text-sm bg-gray-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-gray-600 hover:cursor-pointer">Edit</Link></td>
            <td><button onClick={() => deleteSeller(seller._id)} className="inline-block w-full text-center shadow-md text-sm bg-red-700 text-white rounded-sm px-4 py-1 font-bold hover:bg-red-600 hover:cursor-pointer">Delete</button></td>
            </tr>
        </>
    )
}

export default Seller;