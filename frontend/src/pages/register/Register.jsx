import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: undefined,
    username: undefined,
    fullName: undefined,
    password: undefined,
    confirmPassword: undefined
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    empty: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const checkEmptyForm = () => {
    var check = true;
    if (credentials.email === undefined) {
      check = false;
    }
    if (credentials.username === undefined) {
      check = false;
    }
    if (credentials.fullName === undefined) {
      check = false;
    }
    if (credentials.password === undefined) {
      check = false;
    }
    if (credentials.confirmPassword === undefined) {
      check = false;
    }
    if(!check)
      errors.empty = "Please fill out all fields";
    setErrors((prev) => ({ ...prev, errors }));
    return check;
  };

  const validateForm = () => {
    var check = true;
    if(!credentials.email.includes("@")){
      errors.email = "Email must contain @";
      check = false;
    }
    if (credentials.fullName.startsWith(" ") || credentials.fullName.endsWith(" ")) {
      errors.fullName = "Name cannot start or end with a space";
      check = false;
    }
    if (credentials.fullName[0] !== credentials.fullName[0].toUpperCase()) {
      errors.fullName = "Name must start with an uppercase letter";
      check = false;
    }
    if (credentials.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      check = false;
    }
    if (credentials.password !== credentials.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
      check = false;
    }
    if(check){
      setErrors({
        email: "",
        username: "",
        fullName: "",
        password: "",
        confirmPassword: "",
      });
      return true;
    }else{
      setErrors((prev) => ({ ...prev, errors }));
      return false;
    }
  };  

  const handleClick = async (e) => {
    if(!checkEmptyForm())
      return;
    else
      errors.empty = "";
    if(validateForm()){
      try {
        await axios.post("http://localhost:8000/api/authenticate/register", credentials);
        navigate("/login")
      } catch (err) {
        console.log(err.response.data);
      }
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
              <button onClick={handleReturn} className="block ml-auto mr-0">&#10006;</button>
              <p className="text-[#fea1a1] text-lg pb-6">Register</p>
              <input type="text" placeholder="email" id="email" onChange={handleChange} className="p-1 mb-1 bg-[#f9fbe7] border border-[#fea1a1] text-[#fea1a1]" />
                <span className="text-red-500 mb-4">{errors.email}</span>
              <input type="text" placeholder="username" id="username" onChange={handleChange} className="p-1 mb-1 bg-[#f9fbe7] border border-[#fea1a1] text-[#fea1a1]" />
                <span className="text-red-500 mb-4">{errors.username}</span>
              <input type="text" placeholder="Name" id="fullName" onChange={handleChange} className="p-1 mb-1 bg-[#f9fbe7] border border-[#fea1a1] text-[#fea1a1]" />
                <span className="text-red-500 mb-4">{errors.fullName}</span>
              <input type="password" placeholder="password" id="password" onChange={handleChange} className="p-1 mb-1 bg-[#f9fbe7] border border-[#fea1a1] text-[#fea1a1]" />
                <span className="text-red-500 mb-4">{errors.password}</span>
              <input type="password" placeholder="confirm password" id="confirmPassword" onChange={handleChange} className="p-1 mb-1 bg-[#f9fbe7] border border-[#fea1a1] text-[#fea1a1]" />
                <span className="text-red-500 mb-4">{errors.confirmPassword}</span>
              <button  onClick={handleClick} className="border shadow-md hover:shadow-lg border-[#fea1a1] bg-[#f9fbe7] text-[#fea1a1] mt-2 pt-2 pb-2 pl-6 pr-6 rounded-3xl">Register</button>
                <span className="text-red-500 mb-1">{errors.empty}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
