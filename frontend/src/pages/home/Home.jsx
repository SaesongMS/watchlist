import Navbar from "../../components/navbar/Navbar";
import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { RxDotFilled } from 'react-icons/rx';
import { useEffect } from 'react';

import { useState } from 'react';
// import "./home.css";

const Home = () => {

  const [slides, setSlides] = useState([{
    url: ""
  }]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getSlides();
  }, []);


  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }

    return array;
}

  const getSlides = async () => {
    const response_movie = await fetch("http://localhost:8000/api/movies/top3");
    const movies = await response_movie.json();

    const response_anime = await fetch("http://localhost:8000/api/anime/top3");
    const anime = await response_anime.json();

    let content = movies.concat(anime);

    content = shuffleArray(content);

    setSlides(content);
  };

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="flex w-screen h-screen">
      <Navbar />
      <div className="h-[100%] w-[100%] flex items-center flex-grow bg-[#ffe7cc]">
        <div className="mr-16 h-5/6 w-[83.333333%] flex-grow rounded-br-3xl shadow-lg rounded-tr-3xl border-b-2 border-r-2 border-t-2 border-[#fea1a1] bg-[#f9fbe7]">
          <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group flex flex-col items-center justify-center'>
            <h1 className='text-5xl font-bold mb-4 drop-shadow text-center text-[#fea1a1]'>Currently Top Rated</h1>
            <div className='h-full rounded-2xl bg-center bg-cover duration-500'>
              <img src={slides[currentIndex].url} alt="" className='h-full rounded-2xl bg-center bg-cover duration-500'/>
            </div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactLeft onClick={prevSlide} size={30} />
            </div>
            <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronCompactRight onClick={nextSlide} size={30} />
            </div>
            <div className='flex top-4 justify-center py-2'>
            {slides.map((slide, slideIndex) => (
              <div
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className='text-2xl cursor-pointer'
              >
                <RxDotFilled/>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
