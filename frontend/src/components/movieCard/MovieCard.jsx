import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const MovieCard = (props) => {
    
return (
    <div>
        <div className="flex flex-row  h-fit items-center  border p-3 bg-[#f9fbe7] border-[#fea1a1] rounded-lg ">
      <img className="h-[120px] border-4 border-[#fea1a1]" src={props.movie.url} />
      <div className="ml-3 flex flex-col">  
      <span className="text-[#fea1a1]">{props.movie.tittle}</span>
      <span className="text-[#fea1a1]">{props.movie.year}</span>
      </div>
      <button className=" text-[#fea1a1] ml-auto"><FontAwesomeIcon icon={faPlus}/></button>
    </div>
    </div>
    
)};

export default MovieCard;