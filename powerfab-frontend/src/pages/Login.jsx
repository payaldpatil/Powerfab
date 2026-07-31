import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Powerfab_Enterprises from "../assets/Powerfab_Enterprises.png";

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = async (e) => {

    e.preventDefault();


    if (!username || !password) {

      alert("Please enter Username and Password");
      return;

    }


    setLoading(true);


    try {

      const response = await fetch(
        // "http://localhost:8080/api/auth/login",
        "https://railway.app",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username,
            password
          })

        }
      );



      if (response.ok) {


        // Save logged user details

        localStorage.setItem(
          "username",
          username
        );


        // If backend sends token later

        // const data = await response.json();
        // localStorage.setItem("token", data.token);



        navigate("/dashboard");


      } 
      else {


        alert("Invalid Username or Password");


      }



    } 
    catch(error) {


      console.log(error);

      alert("Server Not Running");


    }


    setLoading(false);

  };



  return (

    <div className="login-page">


      <div className="login-card">


        <div className="login-left">


          <div className="logo">

            <img
              src={Powerfab_Enterprises}
              alt="PowerFab Enterprises Logo"
            />

          </div>



          <form onSubmit={handleLogin}>


            <label>
              Username
            </label>


            <input

              type="text"

              placeholder="Enter Username"

              value={username}

              onChange={
                (e)=>setUsername(e.target.value)
              }

            />



            <label>
              Password
            </label>


            <input

              type="password"

              placeholder="Enter Password"

              value={password}

              onChange={
                (e)=>setPassword(e.target.value)
              }

            />




            <div className="remember">


              <label className="remember-me">

                <input type="checkbox"/>

                Remember Me

              </label>



              <a href="/">
                Forgot Password?
              </a>


            </div>




            <button
              type="submit"
              disabled={loading}
            >

              {
                loading
                ?
                "Logging In..."
                :
                "Login"
              }


            </button>



          </form>



        </div>


      </div>


    </div>

  );

}


export default Login;