
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useState, useEffect } from "react";
import MovieCard from "../../components/movieCard/MovieCard";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
const TopMovies = () => {
    const [roles, setRoles] = useState([]);
    const [data, setData] = useState([]);
    const [hidden, setHidden] = useState(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const [genre, setGenre] = useState("Drama");
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate()
    

    useEffect(() => {
      getData("http://localhost:8000/api/anime/top_db");
    }, []);
    
    const onClick = () => {
        getData("http://localhost:8000/api/anime/top_api");
    }

    const getData = async (uri) => {
        
        let jwt;
        let headers;
        if(user === null){
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }else{
            jwt = user.accessToken;
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + jwt, 
            }
        }
        const response = await axios.get(uri, { headers: headers });

        setData(response.data);

        const response2 = await axios.get("http://localhost:8000/api/anime/animes-by-genre?genre=" + genre, { headers: headers });
        setMovies(response2.data);
    }

    const getList = () => {
      return movies.slice(0, 3).map((movie) => {
        return (<MovieCard movie={movie} />);
      });
    }

    const handleList = () => {
      navigate("/top-anime-list");
    }



const COLORS = ["#ffe7cc", "#eac6aa", "#ffa392", "#cd8873"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
return (
  <div className="flex w-screen h-screen">
  <Navbar/>
  <div className="shadow-lg h-[100%] w-[100%] flex items-center flex-grow bg-[#ffe7cc]">
      <div className="overflow-y-auto shadow-lg mr-16 h-5/6 w-[100%] flex-grow rounded-br-3xl rounded-tr-3xl border-b-2 border-r-2 border-t-2 border-[#fea1a1] bg-[#f9fbe7] flex flex-col items-center justify-center">
        <button className="mr-[70%] border shadow-md hover:shadow-lg border-[#fea1a1] bg-[#f9fbe7] text-[#fea1a1] mt-2 pt-2 pb-2 pl-6 pr-6 rounded-3xl" onClick={handleList}>List</button>
        <ResponsiveContainer width="80%" height="80%">
        <PieChart>
    <Pie
      data={data}
      // cx={200}
      // cy={200}
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius={200}
      fill="#8884d8"
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Legend wrapperStyle={{backgroundColor: "#495057", borderRadius: "24px"}} /> 
    <Tooltip />
  </PieChart>
        </ResponsiveContainer>
  
      
      
  

            

          
          
        
      </div>

    </div>
  </div>
  );
}

export default TopMovies;
