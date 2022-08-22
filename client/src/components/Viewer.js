import styled from "styled-components";

const Viewers = (props) => {
  return (
    <Container>
      <Wrap>
        <img src="/images/viewers-disney.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true} muted={true}>
          <source src="/videos/disney.mp4" alt="disney" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-dc.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true} muted={true}>
          <source src="/videos/dc.mp4" alt="dc" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap> 
        <img src="/images/viewers-marvel.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true} muted={true}>
          <source src="/videos/marvel.mp4" alt="marvel" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-starwars.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true} muted={true}>
          <source src="/videos/star-wars.mp4" alt="starwars" type="video/mp4" />
        </video>
      </Wrap>
      <Wrap>
        <img src="/images/viewers-national.png" alt="" />
        <video autoPlay={true} loop={true} playsInline={true} muted={true}>
          <source
            src="/videos/national-geographic.mp4"
            type="video/mp4"
          />
        </video>
      </Wrap>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 30px;
  padding: 30px 0px 26px;
  display: grid;
  grid-gap: 25px;
  gap: 25px;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  @media (max-width: 600px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Wrap = styled.div`
  padding-top: 56.25%;
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
  //border: 3px solid rgba(256, 256, 256, 0.5);

  //background: rgba(158, 222, 255, 0.2);
  background-color:rgba(142, 197, 252, 0.1);
background-image: linear-gradient(62deg, rgba(142, 197, 252, 0.3) 30%, rgba(255, 255, 255, 0) 80%);

  
  border-radius: 15px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(3px);
-webkit-backdrop-filter: blur(5px);


//   background: rgba(249, 249, 249, 0.01);
// border-radius: 16px;
// box-shadow: 0 4px 10px rgba(257, 257, 257, 0.1);
// backdrop-filter: blur(10px);
// -webkit-backdrop-filter: blur(5px);
  img {
    inset: 0px;
    display: block;
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 1;
    position: absolute;
    transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
    z-index: 1;
    top: 0;
  }
  video {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    opacity: 0;
    z-index: 0;
  }
  &:hover {
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    transform: scale(1.05);
    border-color: rgba(249, 249, 249, 0.8);
    video {
      opacity: 1;
    }
    img{
      opacity: 0.7;
      height: 50%;
      width: 50%;

      
    }
  }
`;

export default Viewers