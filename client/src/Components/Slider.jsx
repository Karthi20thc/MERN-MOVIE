import React, { useState } from "react";
import styled from "styled-components";
import { sliderItems } from "../dummyData";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Container = styled.div`
	display: flex;
	width: 100%;
	position: relative;
	overflow: hidden;
`;
// 1 and 3
const Arrow = styled.div`
	/* border: 0.5px solid; */
	position: absolute;
	color: grey;
	top: 0;
	bottom: 0;
	left: ${(props) => props.direction === "left" && "10px"};
	right: ${(props) => props.direction === "right" && "10px"};
	margin: 0;
	cursor: pointer;
	z-index: 2;

	/* for centering the arrows inside the container */
	display: flex;
	align-items: center;
`;
// 2
const Wrapper = styled.div`
	display: flex;
	transform: translateX(${(props) => props.slideIndex * -100}vw);
	transition: all 0.5s ease-in-out;
`;
const Slide = styled.div`
	display: flex;
	width: 100vw;
	/* border: 0.5px dotted; */
	/* background-color: rgb(124, 202, 140);
	color: white; */
`;
const ImgContainer = styled.div`
	padding-top: 10px;
	padding-left: 10px;
`;
const Image = styled.img`
	/* padding: 10px; */
	padding-left: 15px;
	object-fit: cover;
`;
const InfoContainer = styled.div`
	padding: 40px;
	display: flex;
	flex-direction: column;
	gap: 15px;
	color: #333;
`;
const Title = styled.h1`
	font-style: italic;
`;
const Desc = styled.p`
	color: #333;
`;
const Button = styled.button`
	width: 15%;
	padding: 10px 25px;
	cursor: pointer;
	background-color: rgb(58, 206, 88);
	color: white;
	border: none;
	font-size: 19px;
	border-radius: 5px;
	/* align-self: center; */
`;

const Slider = () => {
	const [slideIndex, setSlideIndex] = useState(0);

	const handleClick = (direction) => {
		if (direction === "left") {
			slideIndex > 0
				? setSlideIndex((prevState) => prevState - 1)
				: setSlideIndex(sliderItems.length - 1);
		} else {
			slideIndex > sliderItems.length - 2
				? setSlideIndex(0)
				: setSlideIndex((prevstate) => prevstate + 1);
		}
	};
	return (
		<Container>
			{/* 1 */}
			<Arrow direction='left' onClick={() => handleClick("left")}>
				<AiOutlineLeft style={{ width: "70px", height: "70px" }} />
			</Arrow>
			{/* 2 */}
			<Wrapper slideIndex={slideIndex}>
				{sliderItems.map((item) => (
					<Slide key={item.id}>
						{/* 2a */}
						<ImgContainer>
							<Image src={item.img}></Image>
						</ImgContainer>
						{/* 2b */}
						<InfoContainer>
							<Title>{item.title}</Title>
							<Desc>{item.desc}</Desc>
							<Button>Shop Now</Button>
						</InfoContainer>
					</Slide>
				))}
			</Wrapper>
			{/* 3 */}
			<Arrow direction='right' onClick={() => handleClick("right")}>
				<AiOutlineRight style={{ width: "70px", height: "70px" }} />
			</Arrow>
		</Container>
	);
};

export default Slider;
