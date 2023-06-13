import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";
import Navbar from "../../components/navbar/Navbar";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    username: undefined,
    fullName: undefined,
    password: undefined,
    confirmPassword: undefined,
  });

  const {error} = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    try {
      await axios.post("http://localhost:8000/api/authenticate/register", credentials);
      navigate("/login")
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleReturn = () => {
    navigate("/")
  }

  return (
    <div className="flex w-screen h-screen">
      <Navbar />
      <div className="h-[100%] w-[100%] flex items-center flex-grow bg-[#ffe7cc]">
        <div className="mr-16 h-5/6 w-[83.333333%] flex-grow rounded-br-3xl rounded-tr-3xl border-b-2 border-r-2 border-t-2 border-[#fea1a1] bg-[#f9fbe7] flex items-center justify-center">
          <div className="border h-min border-[#fea1a1] rounded-3xl bg-[#ffe7cc] flex flex-col items-center justify-center pt-4 pb-8 pl-16 pr-16">
              <button onClick={handleReturn} className="returnButton">&#10006;</button>
              <p className="text-[#fea1a1] text-lg pb-6">Register</p>
              <input type="text" placeholder="email" id="email" onChange={handleChange} className="p-1 mb-4 bg-[#f9fbe7] border border-[#fea1a1] text-[#fea1a1]" />
              <input type="text" placeholder="username" id="username" onChange={handleChange} className="p-1 mb-4 bg-[#f9fbe7] border border-[#fea1a1] text-[#fea1a1]" />
              <input type="text" placeholder="Name" id="fullName" onChange={handleChange} className="p-1 mb-4 bg-[#f9fbe7] border border-[#fea1a1] text-[#fea1a1]" />
              <input type="password" placeholder="password" id="password" onChange={handleChange} className="p-1 mb-4 bg-[#f9fbe7] border border-[#fea1a1] text-[#fea1a1]" />
              <input type="password" placeholder="confirm password" id="confirmPassword" onChange={handleChange} className="p-1 mb-4 bg-[#f9fbe7] border border-[#fea1a1] text-[#fea1a1]" />
              <button  onClick={handleClick} className="border shadow-md hover:shadow-lg border-[#fea1a1] bg-[#f9fbe7] text-[#fea1a1] mt-2 pt-2 pb-2 pl-6 pr-6 rounded-3xl">Register</button>
              {error && <span>{error.message}</span>}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
