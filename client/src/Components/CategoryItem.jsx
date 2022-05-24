import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
	flex: 1;
	height: 70vh;
	position: relative;
`;
const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	/* opacity: 0.6; */
`;
// 2
const Info = styled.div`
	/* opacity: 0; */
	position: absolute;
	top: 0;
	left: 0;
	/* responsible for centering */
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.534);
`;
const Title = styled.h1`
	font-size: 65px;
	color: white;
`;
const Button = styled.button`
	border: none;
	padding: 10px 25px;
	cursor: pointer;
	background-color: rgb(58, 206, 88);
	color: white;
	border: none;
	font-size: 19px;
	border-radius: 5px;
`;

const CategoryItem = (props) => {
	const { title, img, category } = props;
	return (
		<Container>
			{/* 1 */}
			<Image src={img} />
			{/* 2 */}
			<Info>
				<Title>{title}</Title>
				<Link to={`/products/${category}`}>
					<Button>View</Button>
				</Link>
			</Info>
		</Container>
	);
};

export default CategoryItem;
