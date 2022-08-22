import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { publicRequest } from "../axiosRequest";
import Row from "../components/Row";
//import RowItem from "../components/RowItem";
//import {media_type} from "../components/Row";
import { useDispatch, useSelector } from "react-redux";
import {
  ShareRounded,
  AddRounded,
  PlayArrowRounded,
  Done,
  StarRateRounded,
} from "@mui/icons-material";
import {
  addtoLikedMovies,
  removeFromLikedMovies,
} from "../redux/moviesReducer";
import toast from "react-hot-toast";
import LoadingSpinner from "../components/Spinner";

const api_key = process.env.REACT_APP_API_KEY;

const SingleMovie = () => {
  const navigate = useNavigate()
  const email = useSelector((state) => state.user?.currentUser?.user?.email);
  const likedMovies = useSelector((state) => state.movies?.likedMovies);
  const dispatch = useDispatch();
  const location = useLocation();
  const mediaId = location?.pathname.split("/")[2];
  const mediatype = location?.pathname.split("/")[1];
  const [isLoading, setIsLoading] = useState(false)

  const [movieData, setMovieData] = useState();
  const [isLiked, setIsLiked] = useState(false);
  //const [type, settype] = useState("");

  const setisLikedFunc = () => {
    likedMovies.forEach((movieElement) => {
      movieElement.id === movieData?.id && setIsLiked(true);
    });
  };
  //console.log(movieData)
//console.log(likedMovies);
 //console.log(RowItem.type);
  useEffect(() => {
    const fetchMedia = async () => {
      
      try
      {
        const res = mediatype === "movie" ? await publicRequest.get(
        `/movie/${mediaId}?api_key=${api_key}`
      ) :

      await publicRequest.get(
        `/tv/${mediaId}?api_key=${api_key}`
      );

      setMovieData(res.data);
    }

      catch {
        const res = await publicRequest.get(
          `/movie/${mediaId}?api_key=${api_key}`
        );
        setMovieData(res.data);
      }



      
      // if(mediatype === "movie" || mediatype === "all") {
      //   const res = await publicRequest.get(
      //     `/movie/${mediaId}?api_key=${api_key}`
      //   );
      //   setMovieData(res.data);
      // } 
      // else() {
      //   const tvData = await publicRequest.get(
      //     `/tv/${mediaId}?api_key=${api_key}`
      //   );
      //   setMovieData(tvData.data);
      // }
    };
    fetchMedia();
    setisLikedFunc();
    //movieData?.seasons ? settype("tv"):settype("movie") ;
    window.scrollTo(0, 0);
    return () => {};
  }, [location]);

  //console.log(isLiked);
  const link = `https://www.youtube.com/results?search_query=${movieData?.name || movieData?.title}+trailer`;
  const date = (movieData?.release_date || movieData?.first_air_date);
  const year = date && date.slice(0,4);
  const runTime = () => {
    let time = movieData?.runtime;
    if (time / 60 !== 0) {
      const hour = time / 60;
      const hr = hour.toString()[0];
      const min = time % 60;
      return `${hr}hr ${min}min`;
    } else {
      return `${time / 60}hr`;
    }
  };
  return (
    <Container>
    {isLoading && <LoadingSpinner />}
      <Media>
        <div className="infoContainer">
          <div className="info">
            {movieData?.name ? (
              <h2>{movieData?.name || movieData?.title}</h2>
              ) : (
                <h2>{movieData?.title}</h2>
                )}
            <h3>{year}</h3>
            <ul>
              {!movieData?.seasons && <li>{runTime()}</li>}
              {movieData?.genres.map((genre) => {
                return <li className="gener" key={genre.id}>{genre.name}</li>;
              })}
              <StarRateRounded className="rating"/>
              <li className="rating"> {movieData?.vote_average && Math.round(movieData?.vote_average*10)/10}</li>
            </ul>
            <p>{movieData?.overview}</p>
            <div className="icons">
              <a href={link} target="blank">
              <div className="iconCont play" >
              {/* onClick={() => navigate('/watch')} */}
                <PlayArrowRounded className="icon" />
                <span>Watch Trailer</span>
              </div>
                </a>
              <div className="icon2">
                <div className="iconCont2 list">
                  {isLiked ? (
                    <Done
                      className="icon"
                      title="Remove from liked movies."
                      onClick={async () => {
                        setIsLoading(true)
                        const res = await dispatch(
                          removeFromLikedMovies({
                            movieId: movieData.id,
                            email,
                          })
                        );
                        console.log(res)
                        toast.success(
                          "Movie successfully removed from the Watchlist."
                        );
                        setIsLiked(false);
                        setIsLoading(false)
                      }}
                   
                    />
                  ) : (
                    <AddRounded
                      className="icon"
                      onClick={async () => {
                        setIsLoading(true)
                        const res = await dispatch(
                          addtoLikedMovies({ movieData: movieData, email })
                        );
                        console.log(res)
                        if (res.type === "moviefy/user/remove/movie/rejected") {
                          toast.error("Movie is alredy in the Watchlist.");
                        } else {
                          toast.success(
                            "Movie successfully added to the Watchlist."
                          );
                        }
                        setIsLiked(true);
                        setIsLoading(false)
                      }}
                    />
                  )}
                

                  <span>Watchlist</span>
                </div>
                <div className="iconCont2 share">
                  <ShareRounded className="icon" />
                  <span>Share</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          src={
            movieData?.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${movieData?.backdrop_path}`
              : `https://image.tmdb.org/t/p/w500${movieData?.poster_path}`
          }
          alt=""
        />
      </Media>
      <Rows>
        <Row title="Latest and Trending" media_type="all" />
        <Row title="Popular Movies" media_type="movie" />
        <Row title="Popular Shows" media_type="tv" />
        <Row title="Action" genre="28" />
        <Row title="Thriller" genre="53" />
        <Row title="Drama" genre="18" />
      </Rows>
    </Container>
  );
};

export default SingleMovie;

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 1vw;
  @media (max-width: 600px) {
    width: 100vw;
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

const Media = styled.main`
  width: 100%;
  height: 70vh;
  padding: 0px 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 600px) {
    padding: 0px;
    height: 50vh;
  }
  img {
    flex: 2;
    width: 100%;
    height: 100%;
    object-fit: cover;
    -webkit-mask-image:-webkit-gradient(linear, left, right, from(rgba(0,0,0,1)), to(rgba(0,0,0,0.7)));
    mask-image: linear-gradient(to left, rgba(12, 17, 27, 1) 60%, transparent 100%);
  }
  .infoContainer {
    flex: 1;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 7;
    background-image: linear-gradient(to right, rgba(12, 17, 27, 0.6) 40%, transparent 100%);
    background-color:rgba(12, 17, 27, 0.03);

    .info {
      position: absolute;
      top: 30px;
      left: 50px;
      width: 500px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex-wrap: wrap;
      @media (max-width: 600px) {
        top: 15px;
        left: 15px;
        width: 350px;
      }
      .icon2 {
        display: flex;
        align-items: center;
        .iconCont2 {
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-right: 20px;
          .icon {
            margin-bottom: 10px;
            cursor: pointer;
          }
        }
        span {
          font-size: 1rem;
        }
      }
      span {
        font-weight: 600;
        font-size: 1.1rem;
        padding-bottom: 20px;
      }
      h2 {
        font-weight: 800;
        font-size: 2rem;
        margin: 0;
        margin-bottom: 10px;
        @media (max-width: 600px) {
          font-size: 1.4rem;
          display: inline-block;
        }
      }
      h3{
        margin-top:0;
        color:gold;
      }
      ul {
        list-style-type: none;
        display: flex;
        align-items: center;
        margin-left: -40px;
        li {
          margin-right: 20px;
          @media (max-width: 600px) {
            margin-right: 18px;
          }
        }
        .gener{
          color:cyan;
        }
        .rating{
          color:greenyellow;
        }
      }
      .icons {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 50px;
        margin-right: 10px;
        @media (max-width: 600px) {
          margin-top: 20px;
        }
        .iconCont {
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          .icon {
            font-size: 2.5rem;
            margin-bottom: 20px;
          }
        }
        list {
          margin-left: 100px;
        }
      }
      p {
        font-weight: 300;
        font-size: 1.1rem;
        @media (max-width: 600px) {
          font-size: 0.9rem;
          margin-right: 20px;
        }
      }
    }
  }
`;

const Rows = styled.div`
  width: 100%;
  margin: 0 50px;
  @media (max-width: 600px) {
    margin: 0 10px;
  }
`;