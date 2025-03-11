import React from 'react'
import Spinner from "./Spinner.jsx";
import {MovieCard} from "./MovieCard.jsx";
import {TrendingMovies} from "./TrendingMovies.jsx";

const Header = ({ searchTerm, setSearchTerm, error, movieList, isLoading, trendingMovies }) =>  {
    return (
        <div className="container relative z-10 mx-auto flex justify-center items-center flex-col z-10">
            <div className="mt-10">
                <img className="w-full max-w-lg h-auto mx-auto" src="./movie-website/hero.png" alt="Hero" />
                <h1 className="text-white font-bold max-w-3xl text-6xl text-center leading-tight">Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>
            </div>

            <div className="search relative flex justify-center items-center bg-light-100/5 max-w-3xl w-full mx-auto py-3 rounded-md mt-8 mb-5">
                <img className="absolute left-6" src="./movie-website/search.svg" alt="Search Term" />`

                <input className="w-full pl-15 outline-hidden py-2 text-gray-200 placeholder-light-200"
                    type="text"
                    placeholder="Search by title"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="all-movies max-w-[1200px] w-full">

                <section className="trending-movies">
                    <h2 className="text-white font-bold max-w-3xl text-3xl leading-tight">Trending Movies</h2>
                    <TrendingMovies trendingMovies={trendingMovies} />
                </section>

                <section className="all-movies w-full flex flex-col items-start relative z-10 mb-10">
                    <h2 className="text-white font-bold max-w-3xl text-3xl leading-tight mb-7">All Movies</h2>

                    {isLoading ? ( <Spinner /> ) : error ? (<p className="text-red-500">{error}</p>
                    ) : (
                        <ul className="grid grid-cols-1 gap-x-12 gap-y-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {movieList.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                        </ul>
                    )}
                </section>

            </div>
        </div>
    )
}

export default Header