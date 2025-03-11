
export const MovieCard = ({movie : {title, poster_path, release_date, original_language, vote_average}
}) => {
    return (
        <div className="bg-dark-100 p-5 rounded-md cursor-pointer">
            <img className="rounded-md max-h-[310px] w-full" src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'}/>
            <h3 className="text-white font-bold mt-4">{title}</h3>
            <div className="flex mt-2">
                <img className="w-4 mb-[2px] mr-1" src="./movie-website/star.svg" alt="star" />
                <p className="text-white font-medium mr-2">{vote_average ? vote_average.toFixed(1) : 'N/A'} </p>
                <p className="font-medium text-gray-100 uppercase"><span className="text-sm mr-1">•</span> {original_language} <span className="text-sm mr-1">•</span> {release_date ? release_date.split('-')[0] : 'N/A'}</p>
            </div>
        </div>
    )
}