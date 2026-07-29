import React from "react";
import "./Header.css";


function Header({ toggleSidebar }) {


  return (

    <header className="top-header">


      {/* Logo Section */}

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



      {/* Mobile Menu Button */}

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