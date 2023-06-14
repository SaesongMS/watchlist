import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../../components/movieCard/MovieCard";
import Navbar from "../../components/navbar/Navbar";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"

import { useNavigate } from "react-router-dom";

const TopanimeList = () => {
    const [genre, setGenre] = useState("Drama");
    const [anime, setanime] = useState([]);
    const [active, setActive] = useState(1);
    const [dbGenre, setDbGenre] = useState([]);
    const [watchedList, setWatchedList] = useState([]);
    const [plannedList, setPlannedList] = useState([]);
    const [n, setN] = useState(0);
 
 
  const next = () => {
    setActive(active + 24);
    if (active > n){
      setActive(n)
      return;
    }
    
    set_i(i+24);
  };
 
  const prev = () => {
    setActive(active - 24);
    if (active < n){
      setActive(1)
      return;
    } 
 
    if(i-24 >= 0)
        set_i(i-24);
    else 
        set_i(1);
  };

    
    const navigate = useNavigate()
    useEffect(() => {
        getUserList();
        getData(genre);
        getGenresDB();
      }, []);
    
    const getData = async (genre) => {
        const response2 = await axios.get("http://localhost:8000/api/anime/animes-by-genre?genre=" + genre);
        setanime(response2.data);
        setN(response2.data.length);
    }
    const getGenresDB = async () => {
        const response = await axios.get("http://localhost:8000/api/anime/top_db");
        setDbGenre(response.data);
    }

    const getUserList = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if(user!=null){
        const response = await axios.post("http://localhost:8000/api/list/get/all",user);
        setWatchedList(response.data.watched);
        setPlannedList(response.data.planned);
      }
    }

    const handleChart = () => {
      navigate("/top-anime")
      }

    const [i, set_i] = useState(1);
    const getList = () => {
        return(
            anime.slice(i-1, i+24).map((movie) => <MovieCard movie={movie} watched={watchedList} planned={plannedList} location="top-anime-list"/>)
        );
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setGenre(value);
        getData(value); 
        set_i(1);
    }

    return(
      <div className="flex h-screen w-screen">
        <Navbar/>
        <div className="shadow-lg h-[100%] w-[100%] flex items-center flex-grow bg-[#ffe7cc]">
          <div className="overflow-y-auto flex flex-col w-[83.333333%] shadow-lg  mr-16 h-5/6 flex-grow rounded-br-3xl rounded-tr-3xl border-b-2 border-r-2 border-t-2 border-[#fea1a1] bg-[#f9fbe7] items-start">
            <div className="flex flex-col items-center">
            <button className="mr-[70%] mt-6 border shadow-md hover:shadow-lg border-[#fea1a1] bg-[#f9fbe7] text-[#fea1a1] pt-2 pb-2 pl-6 pr-6 rounded-3xl" onClick={handleChart}>Chart</button>
            <select className="mt-6 border shadow-md hover:shadow-lg border-[#fea1a1] bg-[#f9fbe7] text-[#fea1a1] pt-2 pb-2 pl-6 pr-6 rounded-3xl" value={genre} onChange={handleChange}>
              {dbGenre.map((genre) => <option value={genre.name}>{genre.name}</option>)}
            </select>
            <div className=" grid xl:grid-cols-4 sm:grid-cols-2 m-6 w-[95%]">
              {getList()}
            </div>
            <div className="flex items-center gap-4 text-[#fea1a1] mb-5">
              <Button
              variant="text"
              
              className="flex items-center gap-2"
              onClick={prev}
              >
              <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
              Previous
              </Button>
              <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-2"
              onClick={next}
              >
              Next
              <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
              </Button>
            </div>
            </div>
          </div>
        </div>
      </div>
      )
}

export default TopanimeList;