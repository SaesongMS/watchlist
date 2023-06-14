// import "./navbar.css";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const getRoles = async () => {
        const jwt = user.accessToken;
        const response = await fetch("http://localhost:8000/api/authenticate/user", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + jwt,
            }
        });
        const content = await response.json();
        if(response.status === 400){
          dispatch({ type: "LOGOUT" });
          return;
        }
        setRoles(content.roles);
    }
    if (user != null)
      getRoles();
  }, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleAnime = () => {
    navigate("/top-anime");
  };

  const handleMovies = () => {
    navigate("/top-movies");
  };

  const handleList = () => {
    navigate("/list");
  };

  const  handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate(0);
  };

  const handleReturn = () => {
    navigate("/");
  };

  const handleGetXML = () => {
    navigate("/get-xml");
  };


  return (
    
    <div className="m-0 flex h-screen w-1/6 flex-col bg-[#f0edd4] border-r border-b border-[#fea1a1]">
    <div className="top-0 shadow-md hover:shadow-lg h-auto w-auto border-b cursor-pointer rounded-br-lg border-[#fea1a1] bg-[#f9fbe7] mb-8"><img onClick={handleReturn} src="https://i.imgur.com/CurXliU.png"/></div>
    <div className="flex-grow">
      <button onClick={handleAnime} className="shadow-lg hover:shadow-inner relative flex w-[100%] justify-end rounded-tr-lg border-b border-r border-t border-[#fea1a1] bg-[#f9fbe7] pb-2 pr-2 pt-2 text-[#fea1a1]">Anime</button>
      <button onClick={handleMovies} className="shadow-lg hover:shadow-inner relative flex w-[100%] justify-end border-b border-r border-[#fea1a1] bg-[#f9fbe7] pb-2 pr-2 pt-2 text-[#fea1a1]">Movies</button>
      {user ? (<button onClick={handleList} className="shadow-lg hover:shadow-inner relative flex w-[100%] justify-end border-b rounded-br-lg border-r border-[#fea1a1] bg-[#f9fbe7] pb-2 pr-2 pt-2 text-[#fea1a1]">List</button>) : () => {return null}}
    </div>
    <div>
      {user ? (<button onClick={handleLogout} className="hover:shadow-inner relative flex w-[100%] justify-end rounded-tr-lg border-b border-r border-t border-[#fea1a1] bg-[#f9fbe7] pb-2 pr-2 pt-2 text-[#fea1a1]">Logout</button>) : () => {return null}}
      {roles.includes("Admin") ? <button onClick={handleGetXML} className="hover:shadow-inner relative flex w-[100%] justify-end  border-b border-r border-[#fea1a1] bg-[#f9fbe7] pb-2 pr-2 pt-2 text-[#fea1a1]">Import/Export</button> : () => {return null}}
    </div>
    <div className="cursor-default shadow-md hover:shadow-inner border-r border-t border-b border-[#f9fbe7] bg-[#fea1a1] pb-2 pr-2 pt-2 text-[#f9fbe7] text-right">{user ? (user.email) : (
      <button onClick={handleLogin} className="shadow-lg hover:shadow-inner relative flex w-[100%] justify-end border-b border-r border-t border-[#fea1a1] bg-[#f9fbe7] pb-2 pr-2 pt-2 text-[#fea1a1]">Login</button>
    )}
    
    </div>
  </div>
  );
};

export default Navbar;
