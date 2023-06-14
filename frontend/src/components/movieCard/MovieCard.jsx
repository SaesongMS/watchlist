import { faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const MovieCard = (props) => {

  const user = JSON.parse(localStorage.getItem("user"));
  const [watchedList, setWatchedList] = useState([]);
  const [plannedList, setPlannedList] = useState([]);
  const [movieState, setMovieState] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkMovie = () => {
      if(user!=null){
        watchedList.forEach(element => {
          if(element.id === props.movie.id){
            setMovieState("watched");
            return;
          }
        });
        plannedList.forEach(element => {
          if(element.id === props.movie.id){
            setMovieState("planned");
            return;
          }
         }); 
        }
      }
    if(props.watched!=null){
      setWatchedList(props.watched);
    }
    if(props.planned!=null){
      setPlannedList(props.planned);
    }
    checkMovie();
  }, [plannedList, watchedList, props.watched, props.planned, props.movie, user]);

  
  const handleAdd = () => {
    navigate("/list-add", {state: {movie: props.movie, location: props.location}});
  }
  
  const handleEdit = () => {
    navigate("/list-edit", {state: {movie: props.movie, location: props.location, movieState: movieState}});
  }
  
  const setButton = () => {
    if(user!=null){
      if(movieState==="watched" || movieState==="planned")
        return <button className=" text-[#fea1a1] ml-auto"><FontAwesomeIcon icon={faPen} onClick={handleEdit}/></button>
      else
        return <button className=" text-[#fea1a1] ml-auto"><FontAwesomeIcon icon={faPlus} onClick={handleAdd}/></button>
    }else{
      return;
    }
  }
    
  return (
      <div>
          <div className="flex flex-row  h-fit items-center  border p-3 bg-[#f9fbe7] border-[#fea1a1] rounded-lg ">
        <img className="h-[120px] border-4 border-[#fea1a1]" src={props.movie.url} alt=""/>
        <div className="ml-3 flex flex-col">  
        <span className="text-[#fea1a1]">{props.movie.tittle}</span>
        <span className="text-[#fea1a1]">{props.movie.year}</span>
        </div>
        {setButton()}
      </div>
      </div>
      
  )};

export default MovieCard;