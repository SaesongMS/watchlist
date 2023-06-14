import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../../components/movieCard/MovieCard";
import Navbar from "../../components/navbar/Navbar";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline"

import { useNavigate } from "react-router-dom";

const TopMoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [active, setActive] = React.useState(1);
    const [watchedList, setWatchedList] = useState([]);
    const [plannedList, setPlannedList] = useState([]);
    const [list, setList] = useState("all");
    const user = JSON.parse(localStorage.getItem("user"));
 

 
  const next = () => {
    if (active === 5) return;
 
    setActive(active + 1);
    set_i(i+24);
  };
 
  const prev = () => {
    if (active === 1) return;
 
    setActive(active - 1);
    if(i-24 >= 0)
        set_i(i-24);
    else 
        set_i(1);
  };

    
    const navigate = useNavigate()
    useEffect(() => {
      getUserList();
      getData();
      setMovies(plannedList.concat(watchedList));
    }, []);
    
   

    const getUserList = async () => {
      if(user!=null){
        const response = await axios.post("http://localhost:8000/api/list/get/all",user);
        setWatchedList(response.data.watched);
        setPlannedList(response.data.planned);
      }
    }

    const getData = async () => {
      const response = await axios.post("http://localhost:8000/api/list/get/" + list, user);
      if(list==="all")
        setMovies(response.data.watched.concat(response.data.planned));
      else
        setMovies(response.data);
    }
    
    const [i, set_i] = useState(1);
    const getList = () => {
        return(
            movies.slice(i-1, i+24).map((movie) => <MovieCard movie={movie} watched={watchedList} planned={plannedList} location="/list"/>)
        );
    }

    const handleChange = (e) => {
        const value = e.target.value;
        setList(value);
        if(value==="all")
          setMovies(plannedList.concat(watchedList));
        else if(value==="watched")
          setMovies(watchedList);
        else if(value==="planned")
          setMovies(plannedList);
        set_i(1);
    }

    return(
      <div className="flex h-screen w-screen">
        <Navbar/>
        <div className="shadow-lg h-[100%] w-[100%] flex items-center flex-grow bg-[#ffe7cc]">
          <div className="overflow-y-auto flex flex-col w-[83.333333%] shadow-lg  mr-16 h-5/6 flex-grow rounded-br-3xl rounded-tr-3xl border-b-2 border-r-2 border-t-2 border-[#fea1a1] bg-[#f9fbe7] items-start">
            <div className="flex flex-col items-center ml-auto mr-auto">
            <select className="mt-6 border shadow-md hover:shadow-lg border-[#fea1a1] bg-[#f9fbe7] text-[#fea1a1] pt-2 pb-2 pl-6 pr-6 rounded-3xl" value={list} onChange={handleChange}>
              <option value="all">All</option>
              <option value="watched">Watched</option>
              <option value="planned">Planned</option>
            </select>
            <div className=" grid xl:grid-cols-5 sm:grid-cols-2 m-6 w-[95%]">
              {getList()}
            </div>
            <div className="flex items-center gap-4 text-[#fea1a1] mb-5">
              <Button
              variant="text"
              color="blue-gray"
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

export default TopMoviesList;