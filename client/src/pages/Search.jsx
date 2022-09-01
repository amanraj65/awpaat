import React from "react";
import styled from "styled-components";
import { SearchRounded } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import { publicRequest } from "../axiosRequest";
import RowItem from "../components/RowItem";

const api_key = process.env.REACT_APP_API_KEY;

const Search = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const handleSearch = async () => {
      const res = await publicRequest.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${api_key}&query=${search}`
      );
      setMovies(res.data.results);
    };
    handleSearch();
  }, [search]);
  //console.log(movies)
  return (
    <Container>
      <div className="search-container">
        <input
          type="search"
          name="search"
          onChange={(e) => setSearch(e.target.value)}
          className="input"
          placeholder="search movies and Tv Shows"
        />
        <SearchRounded className="search-icon" />
      </div>
      <Rows>
        {movies.map((movie, index) => {
          return <RowItem movieData={movie} media_type={movie.media_type} index={index} key={movie.id} />;
        })}
      </Rows>
      {movies.length === 0 && (
        <>
          <h5>No Movies Found</h5>
        </>
      )}
    </Container>
  );
};

export default Search;

const Container = styled.div`
  width: 100%;
  padding: 0 50px;

  @media (max-width: 600px) {
    padding: 0 10px;
  }

  h5 {
    text-align: center;
    margin-top: 30vh;
    font-size: 20px;
  }

  .search-container {
    width: 40%;
    margin-top: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #040714;
    border: 1px solid #fff;

    @media (max-width: 600px) {
      width: 250px;
    }
    .input {
      width: 400px;
      padding: 10px 15px;
      background-color: #040714;
      border: none;
      outline: none;
      border-radius: 4px;
      color: #fff;
    }

    .search-icon {
      margin-right: 20px;
    }
  }

  &:after {
    background: url("/images/home-bg6.jpg") center center / cover
      no-repeat fixed;

    //6,7,8
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 0.3;
    z-index: -1;
  }
`;

const Rows = styled.div`
  width: 100%;
  margin: 50px 10px;
  gap: 0.3rem;
  display: flex;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    margin: 10px 0px;
    padding: 6px;
  }
`;
