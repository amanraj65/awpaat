import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const RowItem = ({ movieData, media_type="movie" }) => {  
  const navigate = useNavigate();
  const [isHovered, setisHovered] = useState(false);

  const handleClick = () => {
    navigate(`/${media_type}/${movieData.id}`);
  };

  return (
    <>
      <RowItemContainer onClick={handleClick}>
        <img className="pulse"
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt=""
        />
        {isHovered && <></>}
      </RowItemContainer>
    </>
  );
};

export default RowItem;
const RowItemContainer = styled.div`
  width: 180px;
  height: 235px;
  margin-right: 5px;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  margin-right: 10px;
  margin-bottom: 15px;

  @media (max-width: 768px){
     width: 100px;
     height: 140px;
  }

  img {
    width: 100%;
    height: 100%;
    border-radius: 8px;
    object-fit: cover;
   
  }

  //start

  .pulse {
    
    cursor: pointer;
    box-shadow: 0 0 0 rgba(204,169,44, 0.4);
  }
  .pulse:hover {
    animation: pulse 2s infinite;
    //animation: none;
  }
  
  @-webkit-keyframes pulse {
    0% {
      -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
    }
    70% {
        -webkit-box-shadow: 0 0 0 10px rgba(204,169,44, 0);
    }
    100% {
        -webkit-box-shadow: 0 0 0 0 rgba(204,169,44, 0);
    }
  }
  @keyframes pulse {
    0% {
      -moz-box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
      box-shadow: 0 0 0 0 rgba(114, 238, 255, 0.4);
    }
    70% {
        -moz-box-shadow: 0 0 0 10px rgba(114, 238, 255, 0);
        box-shadow: 0 0 0 10px rgba(114, 238, 255, 0);
    }
    100% {
        -moz-box-shadow: 0 0 0 0 rgba(114, 238, 255, 0);
        box-shadow: 0 0 0 0 rgba(114, 238, 255, 0);
    }
  }

  //end
  
  
  &:hover {
    -webkit-box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.3);
    box-shadow: 0px 0px 15px 0px rgba(255, 255, 255, 0.3);
    transition: transform 450ms;
    transform: scale(1.2);
    z-index: 99;

}
`;
