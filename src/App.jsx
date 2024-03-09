import {Routes, Route, Link } from "react-router-dom"
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import CreateSellerPage from "./pages/CreateSellerPage";
import EditPage from "./pages/EditPage";
import OffersPage from "./pages/OffersPage";
import SellerPage from "./pages/SellerPage";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EditSellerPage from "./pages/EditSellerPage";
import SellerOffersPage from "./pages/SellerOffersPage";
import EditOfferPage from "./pages/EditOfferPage";
import CreateOfferPage from "./pages/CreateOfferPage";

export const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  return (
    <div>
      <nav className="bg-gray-800 ">
        <div className="container mx-auto p-2 flex gap-10 items-center">
          <Link to="/"><h2 className="text-white text-2xl font-bold">TarantulaDB</h2></Link>
          <Link to="/sellers"><h3 className="text-white text-1xl font-bold">Sellers</h3></Link>
          <Link to="/offers"><h3 className="text-white text-1xl font-bold">Offers</h3></Link>
        </div>
      </nav>
      <div className="container mx-auto p-2 h-full">
      <Routes>
        <Route index element={<HomePage/>}></Route>
        <Route path="/create" element={<CreatePage/>}></Route>
        <Route path="/edit/:id" element={<EditPage/>}></Route>
        <Route path="/sellers" element={<SellerPage/>}></Route>
        <Route path="/offers" element={<OffersPage/>}></Route>
        <Route path="/offers/:id" element={<SellerOffersPage/>}></Route>
        <Route path="/createSeller" element={<CreateSellerPage/>}></Route>
        <Route path="/createOffer" element={<CreateOfferPage/>}></Route>
        <Route path="/editSeller/:id" element={<EditSellerPage/>}></Route>
        <Route path="/editOffer/:id" element={<EditOfferPage/>}></Route>
      </Routes>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;