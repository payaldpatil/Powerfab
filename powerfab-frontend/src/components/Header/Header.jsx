import React, { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

import LogoutIcon from "../../assets/logout.png";


function Header({ toggleSidebar }) {


  const navigate = useNavigate();


  const [username, setUsername] = useState("");



  useEffect(()=>{


    const user = localStorage.getItem("username");


    if(user){

      setUsername(user);

    }


  },[]);



  const logout = () => {


    localStorage.removeItem("username");

    localStorage.removeItem("token");


    navigate("/");


  };



  return (

    <header className="top-header">



      {/* Logo */}

      <div className="brand-logo">


        <div className="logo-icon">

          P

        </div>



        <div className="brand-text">

          <h1>
            POWERFAB
          </h1>

          <span>
            ENTERPRISES
          </span>


        </div>


      </div>





      {/* User */}

      <div className="header-user">


        <div className="user-name">


          <span className="user-icon">
            👤
          </span>


          <span>
            {username || "User"}
          </span>


        </div>




        <button

          className="logout-icon-btn"

          onClick={logout}

        >

          <img

            src={LogoutIcon}

            alt="Logout"

          />


        </button>


      </div>





      {/* Mobile */}

      <button

        className="mobile-menu-btn"

        onClick={toggleSidebar}

      >

        ☰ Menu


      </button>



    </header>

  );

}


export default Header;