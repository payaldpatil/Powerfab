import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";


function Sidebar({ sidebarOpen }) {


  const [openMenu, setOpenMenu] = useState(null);


  const toggleMenu = (menuName) => {

    setOpenMenu(
      openMenu === menuName ? null : menuName
    );

  };



  return (

    <aside 
      className={`sidebar ${sidebarOpen ? "mobile-open" : ""}`}
    >


      <nav className="sidebar-menu">


        {/* Dashboard */}

        <div className="menu-item active">

          <span className="menu-icon">
            ▦
          </span>

          <span>
            Dashboard
          </span>

        </div>



        {/* Sales */}

        <div className="menu-group">


          <div
            className="menu-item"
            onClick={()=>toggleMenu("sales")}
          >

            <span className="menu-icon">
              ▧
            </span>


            <span>
              Sales / Invoice
            </span>


            <span className="arrow">
              {
              openMenu==="sales" 
              ? "⌃"
              : "⌄"
              }
            </span>


          </div>



          {
          openMenu==="sales" &&

          <div className="submenu">


            <div className="submenu-item">
              Create New Invoice
            </div>


            <div className="submenu-item">
              View All Invoices
            </div>


            <div className="submenu-item">
              Customer Wise Invoices
            </div>


          </div>

          }



        </div>





        {/* Purchase */}


        <div className="menu-group">


          <div
          className="menu-item"
          onClick={()=>toggleMenu("purchase")}
          >


            <span className="menu-icon">
              🛒
            </span>


            <span>
              Purchase / Orders
            </span>


            <span className="arrow">

            {
            openMenu==="purchase"
            ?"⌃"
            :"⌄"
            }

            </span>


          </div>



          {
          openMenu==="purchase" &&

          <div className="submenu">


            <div className="submenu-item">
              Add Purchase Order
            </div>


            <div className="submenu-item">
              View All Orders
            </div>


            <div className="submenu-item">
              Purchase History
            </div>


          </div>
          }


        </div>






        <div className="menu-item">

          <span className="menu-icon">
            ◇
          </span>

          <span>
            Products / Inventory
          </span>

        </div>





        <div className="menu-item">

          <span className="menu-icon">
            ♙
          </span>

          <span>
            Customers
          </span>

        </div>





        <div className="menu-item">

          <span className="menu-icon">
            ♧
          </span>

          <span>
            Suppliers
          </span>

        </div>





        <Link
        to="/invoice-pdfs"
        className="menu-item"
        >

          <span className="pdf-icon">
            PDF
          </span>

          <span>
            Invoice PDFs
          </span>


        </Link>






        {/* Reports */}


        <div className="menu-group">


          <div
          className="menu-item"
          onClick={()=>toggleMenu("reports")}
          >

            <span className="menu-icon">
              ▤
            </span>


            <span>
              Reports
            </span>


            <span className="arrow">

            {
            openMenu==="reports"
            ?"⌃"
            :"⌄"
            }

            </span>


          </div>




          {
          openMenu==="reports" &&

          <div className="submenu">

            <div className="submenu-item">
              Sales Report
            </div>

            <div className="submenu-item">
              Purchase Report
            </div>


            <div className="submenu-item">
              Profit & Loss
            </div>


            <div className="submenu-item">
              GST Report
            </div>


          </div>

          }


        </div>






        <div className="menu-item">

          <span className="menu-icon">
            ▤
          </span>

          <span>
            Payments
          </span>

        </div>





        <div className="menu-item">

          <span className="menu-icon">
            ⚙
          </span>

          <span>
            Settings
          </span>

        </div>





        <div className="menu-item">

          <span className="menu-icon">
            ♙
          </span>

          <span>
            User Management
          </span>

        </div>




      </nav>





      <div className="help-box">


        <div className="help-icon">
          🎧
        </div>


        <div>

          <strong>
            Need Help?
          </strong>


          <p>
            (+91) 12345 67890
          </p>


          <p>
            support@powerfab.in
          </p>


        </div>


      </div>



    </aside>

  );

}


export default Sidebar;