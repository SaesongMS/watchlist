import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import TopMovies from "./pages/top_movies/TopMovies";
import TopAnime from "./pages/top_anime/TopAnime";
import GetXML from "./pages/xml/GetXML";
import TopMoviesList from "./pages/top_movies/TopMoviesList";
import TopAnimeList from "./pages/top_anime/TopAnimeList";
import List from "./pages/list/List";
import AddListElement from "./pages/list/AddListElement";
import EditListElement from "./pages/list/EditListElement";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/top-movies" element={<TopMovies />} />
        <Route path="/top-movies-list" element={<TopMoviesList />} />
        <Route path="/top-anime" element={<TopAnime />} />
        <Route path="/top-anime-list" element={<TopAnimeList />} />
        <Route path="/get-xml" element={<GetXML />} />
        <Route path="/list" element={<List />} />
        <Route path="/list-add" element={<AddListElement />} />
        <Route path="/list-edit" element={<EditListElement />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
