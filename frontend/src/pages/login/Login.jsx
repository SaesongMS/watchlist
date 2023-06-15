import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";


const Login = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined,
  });
  const [error, setError] = useState("");
  const { loading , dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if(!credentials.email || !credentials.password)
      return setError("Please fill out all fields");
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("http://localhost:8000/api/authenticate/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
      setError("Invalid credentials")
    }
  };

  const handleReturn = () => {
    navigate("/")
  }

  const handleRegister = () => {
    navigate("/register")
  }

  return (
    <div className="flex w-screen h-screen">
      <Navbar />
      <div className="h-[100%] w-[100%] flex items-center flex-grow bg-[#ffe7cc]">
        <div className=" shadow-lg mr-16 h-5/6 w-[83.333333%] flex-grow rounded-br-3xl rounded-tr-3xl border-b-2 border-r-2 border-t-2 border-[#fea1a1] bg-[#f9fbe7] flex items-center justify-center">
          <div className="shadow-lg border h-min border-[#fea1a1] rounded-3xl bg-[#ffe7cc] flex flex-col items-center justify-center pt-4 pb-8 pl-16 pr-16">
              <button onClick={handleReturn} className="block ml-auto mr-0">&#10006;</button>
              <p className="text-[#fea1a1] text-lg pb-6">Login</p>
              <input type="text" placeholder="email" id="email" onChange={handleChange} className="p-1 mb-4 bg-[#f9fbe7] border border-[#fea1a1] text-[#fea1a1]" />
              <input type="password" placeholder="password" id="password" onChange={handleChange} className="p-1 mb-4 bg-[#f9fbe7] border border-[#fea1a1] text-[#fea1a1]" />
              <button  onClick={handleClick} className="border shadow-md hover:shadow-lg border-[#fea1a1] bg-[#f9fbe7] text-[#fea1a1] mt-2 mb-1 pt-2 pb-2 pl-6 pr-6 rounded-3xl">Login</button>
               <span className="text-red-500">{error}</span>
              <button onClick={handleRegister} className="border shadow-md hover:shadow-lg border-[#fea1a1] bg-[#f9fbe7] text-[#fea1a1] mt-8 pt-2 pb-2 pl-6 pr-6 rounded-3xl">Register</button>
            
          </div>
        </div>
      </div>
    </div>

    
  );
};

export default Login;
