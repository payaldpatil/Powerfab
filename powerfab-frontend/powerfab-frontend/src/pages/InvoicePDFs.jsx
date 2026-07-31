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

  const loadInvoices = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        // "http://localhost:8080/api/invoices/pdfs"
        // "https://railway.app"
        "https://powerfab-production.up.railway.app"
      );


      if (!response.ok) {

        throw new Error(
          "API Error : " + response.status
        );

      }


      const data = await response.json();


      console.log("Invoice API Response:", data);



      // Check API response is Array

      if (Array.isArray(data)) {

        setInvoices(data);

      } 
      else if(data.data && Array.isArray(data.data)) {

        setInvoices(data.data);

      }
      else {

        console.error(
          "Invalid API Response",
          data
        );

        setInvoices([]);

      }



    } catch(error) {


      console.error(
        "Error loading PDFs : ",
        error
      );

      setInvoices([]);


    } finally {

      setLoading(false);

    }

  };



  // ============================
  // Upload PDF
  // ============================


  const uploadPDF = async () => {


    if(!selectedFile){

      alert(
        "Please select PDF file"
      );

      return;

    }



    const formData = new FormData();


    formData.append(
      "invoiceId",
      1
    );


    formData.append(
      "file",
      selectedFile
    );



    try{


      const response = await fetch(

        // "http://localhost:8080/api/invoices/pdfs/upload",
        "https://powerfab-production.up.railway.app/api/invoices/pdfs/upload",

        {

          method:"POST",

          body:formData

        }

      );



      if(response.ok){


        alert(
          "PDF Uploaded Successfully"
        );


        setSelectedFile(null);


        loadInvoices();



      }
      else{


        alert(
          "Upload Failed"
        );


      }



    }
    catch(error){


      console.error(
        error
      );


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