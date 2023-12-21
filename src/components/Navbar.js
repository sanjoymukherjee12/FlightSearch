import React, { useContext } from 'react'
import '../components/searchInputs/SearchPage.css'
import { myContext1 } from '../App';

const Navbar = () => {


    const { handleLogOut } = useContext(myContext1);

  return (
    <div className="nav">
    <button href="#home" onClick={handleLogOut}>
      Logout
    </button>
    <button href="#link">Cart</button>
  </div>
  )
}

export default Navbar