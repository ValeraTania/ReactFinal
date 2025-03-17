import { useEffect, useState } from "react";

export default function Home(){
    const [movies, setMovies] = useState([]);

    console.log('movies000', movies);

    const handleSearch = async () => {
        try {
            const url = 'https://api.themoviedb.org/3//movie/popular';
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization:
                        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzRjM2ZlOWIyZGQ5YmQxNTQzYzhlZWRiYTU0ZTkzMSIsIm5iZiI6MTc0MjE1NzE2My4wMjksInN1YiI6IjY3ZDczNTZiMzE1MzhkZTYwOGYxYmFhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g1NFgZQFkQCTa6A5ffKDJXyLcmnKxXKA2xoTRTViHcE',
                },
            };

            fetch(url, options)
                .then((res) => res.json())
                .then((movies) => setMovies(movies.results))
                .catch((err) => console.error(err));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(()=>{
        handleSearch()
    },[])

    return (
        <h1>Teste home</h1>


    )
}