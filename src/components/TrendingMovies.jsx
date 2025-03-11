import React from "react";

export const TrendingMovies = ({trendingMovies}) => {
    return (
        <ul className="flex align-center overflow-y-auto hide-scrollbar -mt-9">
            {trendingMovies.map((movie, index) => (
                <li className="flex justify-center items-center overflow-hidden mr-17 cursor-pointer" key={movie.$id}>
                    <p className="text-[180px] fancy-text text-nowrap pt-5 text-transparent">{index + 1}</p>
                    <img className="w-[117px] h-[163px] rounded-lg -ml-4" src={movie.poster_url} alt={movie.title}/>
                </li>
            ))}
        </ul>
    )
}