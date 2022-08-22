import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";

const ImgSlider = () => {
  return (
    <div>
      <Carousel
        dots={true}
        infinite={true}
        speed={500}
        slidesToShow={1}
        slidesToScroll={1}
        autoplay={true}
      >
        <Wrap>
          <a>
          <img className="pulse" src="/images/slider1.jpg" alt="" />
            {/* <img className="pulse" src="/images/slider-badging.jpg" alt="" /> */}
          </a>
        </Wrap>

        
        <Wrap>
          <a>
            <img className="pulse" src="/images/slider-scale.jpg" alt="" />
          </a>
        </Wrap>
        <Wrap>
          <a>
            <img className="pulse" src="/images/slider2.jpg" alt="" />
          </a>
        </Wrap>

        <Wrap>
          <a>
            <img className="pulse" src="/images/slider3.jpg" alt="" />
          </a>
        </Wrap>

        <Wrap>
          <a>
            <img className="pulse" src="/images/slider5.jpg" alt="" />
          </a>
        </Wrap>
      </Carousel>
    </div>
  );
};

export default ImgSlider;

const Carousel = styled(Slider)`
  margin-top: 0px;
  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
    z-index: 1;
    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }
  ul li button {
    &:before {
      font-size: 10px;
      color: rgb(150, 158, 171);
    }
  }
  li.slick-active button:before {
    color: white;
  }
  .slick-list {
    overflow: initial;
  }
  .slick-prev {
    left: -30px;
  }
  .slick-next {
    right: -30px;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;
  
  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    //padding: 3px;
    //border: 4px solid transparent;
    img {
      width: 100%;
      height: 100%;
    }
    margin-right: 10px;
    &:hover {
      padding: 0;
      //border: 3px solid rgba(249, 249, 249, 0.8);
      transition-duration: 300ms;
    }
  }
  @media (max-width: 768px) {
    a{
      img{
        height: 170px;

        object-fit: cover;
        object-position: 100%;
        /* object-fit: calc(100px, 100px); */
      }
    }
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
      -moz-box-shadow: 0 0 0 0 rgba(114, 238, 255, 0.6);
      box-shadow: 0 0 0 0 rgba(114, 238, 255, 0.6);
    }
    70% {
        -moz-box-shadow: 0 0 0 10px  rgba(114, 238, 255, 0);
        box-shadow: 0 0 0 10px rgba(114, 238, 255, 0);
    }
    100% {
        -moz-box-shadow: 0 0 0 0 rgba(114, 238, 255, 0);
        box-shadow: 0 0 0 0 rgba(114, 238, 255, 0);
    }
  }

  //end
`;
