import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import Cars from "./components/Cars.jsx";
import Car from "./components/Car.jsx";
import Parts from "./components/Parts.jsx";
import Contact from "./components/Contact.jsx";
import Shops from "./components/Shops.jsx";
import Shop from "./components/Shop.jsx";
import CreateShop from "./components/CreateShop.jsx";
import AddCar from "./components/AddCar.jsx";
import AddPart from "./components/AddPart.jsx";
import EditShop from "./components/EditShop.jsx";
import EditCar from "./components/EditCar.jsx";
import Part from "./components/Part.jsx";
import EditPart from "./components/EditPart.jsx";
import Footer from "./components/Footer.jsx";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Cars" element={<Cars />} />
        <Route path="/Car/:shopId/:carId" element={<Car />} />
        <Route path="/AddCar/:shopId" element={<AddCar />} />
        <Route path="/EditCar/:shopId/:carId" element={<EditCar />} />
        <Route path="/Parts/:makeId/:modelId/:partName" element={<Parts />} />
        <Route path="/Part/:shopId/:carId/:partId" element={<Part />} />
        <Route path="/CreatePart/:shopId/:carId" element={<AddPart />} />
        <Route path="/EditPart/:shopId/:carId/:partId" element={<EditPart />} />
        <Route path="/Shops" element={<Shops />} />
        <Route path="/CreateShop" element={<CreateShop />} />
        <Route path="/EditShop/:shopId" element={<EditShop />} />
        <Route path="/Shop/:shopId" element={<Shop />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
