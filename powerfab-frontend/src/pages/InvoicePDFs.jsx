import React, { useEffect, useState } from "react";
import "./InvoicePDFs.css";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";

function InvoicePDFs() {

  const [invoices, setInvoices] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    loadInvoices();
  }, []);


  // ============================
  // Load Invoice PDFs
  // ============================

//  const API_URL = "http://localhost:8080/api/invoices";

// const API_URL = "https://railway.app";
const API_URL = "https://powerfab-production.up.railway.app";

const loadInvoices = async () => {
  try {
    setLoading(true);

    const response = await fetch(`${API_URL}/pdfs`);

    console.log("Status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    console.log("Invoice API Response:", data);

    if (Array.isArray(data)) {
      setInvoices(data);
    } else if (Array.isArray(data.data)) {
      setInvoices(data.data);
    } else {
      setInvoices([]);
    }
  } catch (err) {
    console.error("Load Error:", err);
    setInvoices([]);
  } finally {
    setLoading(false);
  }
};


  // ============================
  // Upload PDF
  // ============================


  const uploadPDF = async () => {
  if (!selectedFile) {
    alert("Please select a PDF.");
    return;
  }

  const formData = new FormData();
  formData.append("invoiceId", "1");
  formData.append("file", selectedFile);

  try {
    const response = await fetch(`${API_URL}/pdfs/upload`, {
      method: "POST",
      body: formData,
    });

    console.log("Upload Status:", response.status);

    if (!response.ok) {
      const text = await response.text();
      console.log(text);
      throw new Error("Upload failed");
    }

    alert("Upload Successful");

    setSelectedFile(null);

    loadInvoices();
  } catch (err) {
    console.error(err);
    alert("Upload Failed");
  }
};



  // ============================
  // Search Filter
  // ============================


  const filteredInvoices = invoices.filter(

    (invoice)=>


      invoice.fileName

      ?.toLowerCase()

      .includes(

        searchText.toLowerCase()

      )


  );




  return (


    <div className="invoice-pdf-page">


      <Header />


      <Sidebar />



      <main className="invoice-main-content">



        <div className="page-header">


          <div>

            <h1>
              Invoice PDFs
            </h1>


            <p>
              View, Upload and Download Invoice PDF Files
            </p>


          </div>



          <div className="upload-section">


            <input

              type="file"

              accept="application/pdf"

              onChange={(e)=>

                setSelectedFile(
                  e.target.files[0]
                )

              }

            />



            <button

              className="upload-btn"

              onClick={uploadPDF}

            >

              + Upload PDF


            </button>


          </div>



        </div>




        <div className="pdf-card">



          <div className="search-pdf">


            <input

              type="text"

              placeholder="Search File Name..."

              value={searchText}

              onChange={(e)=>

                setSearchText(
                  e.target.value
                )

              }

            />


          </div>





          <div className="table-container">


            <table>


              <thead>


                <tr>

                  <th>No.</th>

                  <th>Upload Date</th>

                  <th>File Name</th>

                  <th>Action</th>


                </tr>


              </thead>




              <tbody>



              {

              loading ?


              (

                <tr>

                  <td 
                    colSpan="4"
                    className="empty-message"
                  >

                    Loading PDFs...

                  </td>


                </tr>


              )



              : filteredInvoices.length === 0 ?



              (

                <tr>


                  <td

                    colSpan="4"

                    className="empty-message"

                  >

                    No PDF Files Found


                  </td>


                </tr>


              )



              :



              filteredInvoices.map(

                (invoice,index)=>(


                <tr key={invoice.id}>


                  <td>

                    {index+1}

                  </td>



                  <td>

                  {

                  invoice.uploadDate

                  ?

                  new Date(

                    invoice.uploadDate

                  )

                  .toLocaleDateString(
                    "en-IN"
                  )

                  :

                  "-"

                  }


                  </td>




                  <td>

                    📄 {invoice.fileName}


                  </td>




                  <td>


                    <button

                      className="view-btn"

                      onClick={()=>


                        window.open(

                          // `http://localhost:8080/api/invoices/pdfs/${invoice.id}/view`,
                          `https://powerfab-production.up.railway.app/api/invoices/pdfs/${invoice.id}/view`,

                          "_blank"

                        )


                      }


                    >

                      View

                    </button>





                    <button

                      className="download-btn"

                      onClick={()=>


                        window.open(

                          // `http://localhost:8080/api/invoices/pdfs/${invoice.id}/download`
                          `https://powerfab-production.up.railway.app/api/invoices/pdfs/${invoice.id}/download`

                        )


                      }


                    >

                      Download

                    </button>



                  </td>


                </tr>


                )


              )

              }



              </tbody>



            </table>


          </div>



        </div>



      </main>



    </div>


  );


}


export default InvoicePDFs;