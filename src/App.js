import "./App.css";
import Login from "./components/Login/Login";
import { Routes, Route, useNavigate } from "react-router-dom";
import SearchPage from "./components/searchInputs/SearchPage";
import Protected from "./components/Protected";
import FlightList from "./components/showDatas/FlightList";
import { createContext, useContext } from "react";

export const myContext1 = createContext("");

const CryptoJS = require("crypto-js");

function App() {
  const navigate = useNavigate();
  const handleLogOut = () => {
    navigate("/");
  };

  return (
    <div className="App">
      <myContext1.Provider value={{ handleLogOut }}>
        <Routes>
          <Route path="/" element={<Protected Component = {Login}/>} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/search-flight"
            element={<SearchPage/>}
          />
          <Route
            path="/flight-list"
            element= {<FlightList/>}
          />
        </Routes>
      </myContext1.Provider>
    </div>
  );
}

export default App;
