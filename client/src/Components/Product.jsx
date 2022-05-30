import React from "react";
import styled from "styled-components";
import { AiOutlineSearch } from "react-icons/ai";
// import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router-dom";

// 1
const Circle = styled.div``;
// 2
const Image = styled.img`
	z-index: 2;
	object-fit: cover;
`;
// 3
const Info = styled.div`
	opacity: 0;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.534);
	z-index: 3;
`;
const Icon = styled.div`
	display: flex;
`;
const Container = styled.div`
	position: relative;
	transition: all 0.3s;
	overflow: hidden;
	&:hover {
		transform: scale(1.2);
	}
	&:hover ${Info} {
		opacity: 1;
	}
`;
const PriceItem = styled.div`
	color: greenyellow;
	/* background-color: white; */
	font-weight: 600;
	font-size: 25px;
	/* padding: 5px 10px; */
`;
const Product = (props) => {
	const { img, _id, price } = props.item; // This item object is coming from the backend.
	return (
		<Container>
			{/* 1 */}
			<Circle></Circle>
			{/* 2 */}
			<Image src={img} />
			{/* 3 */}
			<Info>
				<Icon>
					{/* <AiOutlineShoppingCart
						style={{ width: "40px", height: "40px", color: "white", cursor: "pointer" }}
					/> */}
					<Link to={`/product/${_id}`}>
						<AiOutlineSearch
							style={{ width: "40px", height: "40px", color: "white", cursor: "pointer" }}
						/>
					</Link>

					{/* <MdFavoriteBorder
						style={{ width: "40px", height: "40px", color: "white", cursor: "pointer" }}
					/> */}
				</Icon>
				<PriceItem>₹ {price}</PriceItem>
			</Info>
		</Container>
	);
};

export default Product;
