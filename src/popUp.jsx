import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { SubscribeEvent } from "./broker";

const Container = styled(animated.div)`
  position: absolute;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: ${(props) => (props.interact ? "auto" : "none")};
  background-color: rgba(60, 62, 79, 1);
`;

const InnerContainer = styled.div`
  width: 60vw;
  height: 500px;
  color: #ffffff;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleDiv = styled.div`
  padding: 15px;
  border-left: 2px solid white;
  text-align: initial;
  user-select: none;
  font-size: ${(props) => props.fontSize}px;
`;

export const Popup = (props) => {
  const styleProps = useSpring({
    config: { tension: 20 },
    backgroundColor: "rgba(60, 62, 79, 0)",
    from: { backgroundColor: "rgba(60, 62, 79, 1)" },
  });

  const [clickable, setClickable] = useState(true);
  return (
    <Container
      style={styleProps}
      interact={clickable ? 1 : 0}
      onClick={() => setClickable(false)}
    >
      <InnerContainer>
        <Intro intro={clickable ? 1 : 0} />
        <TheatrePick />
      </InnerContainer>
    </Container>
  );
};

const TheatrePickContainer = styled(animated.div)``;
const TheatrePick = (props) => {
  const [picked, setPicked] = useState(false);
  const [theatre, setTheatre] = useState({});
  const styleProps = useSpring({
    opacity: 1,
    from: {
      opacity: 0,
    },
    reset: picked,
    reverse: !picked,
    config: {
      tension: 60,
      mass: 3,
    },
  });
  useEffect(() => {
    SubscribeEvent("PICK_THEATRE", (theatre) => {
      setTheatre(theatre);
      setPicked(true);
    });

    SubscribeEvent("UNPICK_THEATRE", () => setPicked(false));
  }, [setPicked]);
  return (
    <TheatrePickContainer style={styleProps} picked={picked ? 1 : 0}>
      <TitleDiv>{theatre.theaterName}</TitleDiv>
      <TitleDiv>lat : {Number.parseFloat(theatre.lat).toFixed(5)}</TitleDiv>
      <TitleDiv>lon : {Number.parseFloat(theatre.lon).toFixed(5)}</TitleDiv>
    </TheatrePickContainer>
  );
};

const Intro = (props) => {
  const transform = useSpring({
    transform: props.intro
      ? "rotateY(0) translate3d(0px, 0px, 0px) "
      : "rotateY(90deg) translate3d(200px, 0px, 0px) ",
    opacity: props.intro ? 1 : 0,

    from: {
      transform: "rotateY(90deg) translate3d(-200px, 0px, 0px) ",
      opacity: 0,
    },
    config: {
      tension: 60,
      mass: 3,
    },
  });
  return (
    <animated.div style={transform}>
      <TitleDiv fontSize={20}>Good</TitleDiv>
      <TitleDiv fontSize={20}>Theatres</TitleDiv>
      <TitleDiv fontSize={20}>Here</TitleDiv>
    </animated.div>
  );
};
