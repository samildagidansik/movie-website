import React, {useEffect, useState} from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import Background from "./components/Background.jsx";
import { useDebounce } from "react-use";
import { getTrendMovies, updateSearchCount } from "./appwrite.js";

const API_BASE_URL = "https://api.themoviedb.org/3";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization: `Bearer ${API_KEY}`
    }
}

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([])
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

    useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

    const fetchMovies = async (query = '') => {
        setIsLoading(true);

        console.log("VITE_TMDB_API_KEY:", import.meta.env.VITE_TMDB_API_KEY);

        try {

            const endpoint = query
                ? `${API_BASE_URL}/search/movie?query=${query}`
                : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

            const response = await fetch(endpoint, API_OPTIONS);

            if(!response.ok) {
                throw new Error("Failed to fetch movies.");
            }

            const data = await response.json();

            if(data.Response === 'False'){
                setError(data.Error || 'Failed to fetch movies.');
                setMovieList([]);
                return;
            }

            setMovieList(data.results);

            if(query && data.results.length > 0){
                await updateSearchCount(query, data.results[0]);
            }

        } catch(error) {
            console.log(`Error fetching movies: ${error}`);
            setError('Error fetching movies. Please try again later');
        } finally {
            setIsLoading(false);
        }
    }

    const loadTrendingMovies = async () => {
        try {
            const movies = await getTrendMovies();

            setTrendingMovies(movies);
        } catch (e) {
            console.error(`Error fetching trending movies: ${e}`);
            return [];
        }
    }

    useEffect(() => {
        fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);

    useEffect(() => {
        loadTrendingMovies();
    }, []);

  return (
      <main>
          <Background />

          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} error={error} movieList={movieList} isLoading={isLoading} trendingMovies={trendingMovies} />


      </main>
  )
}

export default App
