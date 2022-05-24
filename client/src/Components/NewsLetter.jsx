import React from "react";
import styled from "styled-components";

const Container = styled.div`
	height: 70vh;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	border: 0.5px dotted;
	color: white;
	background-size: cover;
	background-image: url(https://images.pexels.com/photos/2507025/pexels-photo-2507025.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1);
`;
// 1
const Title = styled.h1`
	font-size: 40px;
	margin-bottom: 20px;
`;
// 2
const Desc = styled.div`
	font-size: 24px;
	font-weight: 300;
	margin-bottom: 20px;
`;
// 3
const InputContainer = styled.div`
	display: flex;
	justify-content: space-between;
	gap: 10px;
	width: 50%;
	height: 40px;
	padding: 5px;
	border-radius: 5px;
`;
const Input = styled.input`
	border: none;
	flex: 6;
	padding-left: 20px;
	font-size: 19px;
	outline: none;
	border-radius: 5px;
`;
const Button = styled.button`
	padding: 10px 25px;
	cursor: pointer;
	background-color: rgb(58, 206, 88);
	color: white;
	border: none;
	font-size: 19px;
	border-radius: 5px;
`;

const NewsLetter = () => {
	return (
		<Container>
			{/* 1 */}
			<Title>Newsletter</Title>
			{/* 2 */}
			<Desc>Get timely updates from your favorite Movies.</Desc>
			{/* 3 */}
			<InputContainer>
				<Input placeholder='Your Email here'></Input>
				<Button>Subscribe</Button>
			</InputContainer>
		</Container>
	);
};

export default NewsLetter;
