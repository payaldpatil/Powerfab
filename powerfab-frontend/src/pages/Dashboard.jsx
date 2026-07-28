import React, { useState } from "react";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

import "./Dashboard.css";


function Dashboard() {


  const [sidebarOpen, setSidebarOpen] = useState(false);



  return (

    <div className="dashboard">


      {/* Header */}

      <Header

        toggleSidebar={() =>
          setSidebarOpen(!sidebarOpen)
        }

      />



      {/* Sidebar */}

      <Sidebar

        sidebarOpen={sidebarOpen}

      />



      {/* Main Content */}

      <main className="dashboard-content">


      </main>



    </div>

  );

}


export default Dashboard;