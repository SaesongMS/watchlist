import Navbar from "../../components/navbar/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const EditListElement = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const movie = location.state.movie;
    const state = location.state.movieState;
    const user = JSON.parse(localStorage.getItem("user"));
    
    const handleReturn = () => {
        // navigate(location.state.location)
        navigate(-1);
    }

    const handleDelete = async () => {
        await axios.delete("http://localhost:8000/api/list/delete/" + state, {data: {user: user, subject: movie}})
        navigate(-1);
    }


    const changeToPlanned = async () => {
        await axios.delete("http://localhost:8000/api/list/delete/" + state, {data: {user: user, subject: movie}})
        await axios.post("http://localhost:8000/api/list/add/planned", {user: user, subject: movie})
        navigate(-1);
    }

    const changeToWatched = async () => {
        await axios.delete("http://localhost:8000/api/list/delete/" + state, {data: {user: user, subject: movie}})
        await axios.post("http://localhost:8000/api/list/add/watched", {user: user, subject: movie})
        navigate(-1);
    }

    const handleChange = () => {
        if(state==="watched")
            return (
                <button onClick={changeToPlanned} className="border shadow-md hover:shadow-lg border-[#fea1a1] bg-[#f9fbe7] text-[#fea1a1] mt-2 pt-2 pb-2 pl-6 pr-6 rounded-3xl">Change to planned</button>
            );
        else if(state==="planned")
            return (
                <button onClick={changeToWatched} className="border shadow-md hover:shadow-lg border-[#fea1a1] bg-[#f9fbe7] text-[#fea1a1] mt-2 pt-2 pb-2 pl-6 pr-6 rounded-3xl">Change to watched</button>
            );
    }
    
    return (
        <div className="flex w-screen h-screen">
          <Navbar />
          <div className="h-[100%] w-[100%] flex items-center flex-grow bg-[#ffe7cc]">
            <div className=" shadow-lg mr-16 h-5/6 w-[83.333333%] flex-grow rounded-br-3xl rounded-tr-3xl border-b-2 border-r-2 border-t-2 border-[#fea1a1] bg-[#f9fbe7] flex items-center justify-center">
              <div className="shadow-lg border h-min border-[#fea1a1] rounded-3xl bg-[#ffe7cc] flex flex-col items-center justify-center pt-4 pb-8 pl-16 pr-16">
                <button onClick={handleReturn} className="returnButton">&#10006;</button>
                <p className="text-[#fea1a1] text-3xl pb-6">Edit element</p>
                <p className="text-[#fea1a1] text-lg">Element is on your {state} list</p>
                <div className="flex flex-row  h-fit items-center  border p-3 bg-[#f9fbe7] border-[#fea1a1] rounded-lg ">
                    <img className="h-[120px] border-4 border-[#fea1a1]" src={movie.url} />
                    <div className="ml-3 flex flex-col">  
                        <span className="text-[#fea1a1]">{movie.tittle}</span>
                        <span className="text-[#fea1a1]">{movie.year}</span>
                        <span className="text-[#fea1a1]">{movie.genre}</span>
                    </div>
                </div>
                {handleChange()}
                <button onClick={handleDelete} className="border shadow-md hover:shadow-lg border-[#fea1a1] bg-[#f9fbe7] text-[#fea1a1] mt-2 pt-2 pb-2 pl-6 pr-6 rounded-3xl">Delete</button>
              </div>
            </div>
          </div>
        </div>
    );
}

export default EditListElement;