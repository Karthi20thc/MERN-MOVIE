import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import { IoMdRemove } from "react-icons/io";
import { GrAdd } from "react-icons/gr";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL, publicRequest } from "../axiosRequest";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../Redux/cartRedux";

const Container = styled.div``;

// 2
const Wrapper = styled.div`
	/* height: 100vh; */
	padding: 50px;
	display: flex;
	gap: 55px;
`;
const ImageContainer = styled.div``;
const Image = styled.img``;
const InfoContainer = styled.div`
	display: flex;
	flex-direction: column;
	gap: 15px;
`;
const Title = styled.h1`
	font-size: 50px;
	color: #333;
	font-style: italic;
`;
const Desc = styled.p`
	color: #333;
	font-size: 19px;
`;
const Price = styled.span`
	font-weight: 100;
	font-size: 40px;
	color: #333;
`;
const FilterContainer = styled.div`
	display: flex;
	gap: 25px;
`;
const Filter = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`;
const FilterTitle = styled.span`
	font-size: 20px;
	font-weight: 200;
	color: #333;
`;
// const FilterLanguage = styled.option`
// 	cursor: pointer;
// `;
const FilterTypeSelect = styled.select`
	padding: 10px 25px;
	cursor: pointer;
	font-size: 17px;
`;
const FilterType = styled.option``;
const AddContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 25px;
	margin-top: 25px;
`;
const AmountContainer = styled.div`
	display: flex;
	align-items: center;
	font-weight: 700;
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
const Amount = styled.span`
	width: 30px;
	height: 30px;
	border: 1px solid teal;
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 0px 5px;
`;
const YTG = styled.div`
	display: flex;
	gap: 15px;
`;
const Year = styled.span`
	font-weight: bold;
`;
const Time = styled.span``;
const Genre = styled.span``;

const SingleProductPage = () => {
	const location = useLocation();
	const id = location.pathname.split("/")[2];
	const [product, setProduct] = useState({});
	const [quantity, setQuantity] = useState(1);
	// varients for each product
	const [language, setLanguage] = useState("English");
	const [quality, setQuality] = useState("HD");
	const dispatch = useDispatch();
	const userState = useSelector((state) => {
		return state.user;
	});
	const TOKEN = userState.currentUser.accessToken;
	useEffect(() => {
		const getProduct = async () => {
			try {
				const res = await publicRequest.get("/products/find/" + id);
				setProduct(res.data);
				console.log(res.data);
			} catch (error) {
				console.log(error);
			}
		};
		getProduct();
	}, [id]);

	const quantityHandler = (type) => {
		if (type === "increment") {
			setQuantity(quantity + 1);
		} else {
			quantity > 1 && setQuantity(quantity - 1);
		}
	};

	const handleClick = () => {
		try {
			const addProductToApi = async () => {
				const instance = axios.create({
					baseURL: BASE_URL,
					headers: { token: `Bearer ${TOKEN}` },
				});
				const response = instance.post("/cart", {
					userId: userState.currentUser._id,
					productId: product._id,
					productImg: product.img,
					productTitle: product.title,
					productYear: product.year,
					productRunTime: product.runtime,
					desc: product.desc,
					price: product.price,
					quantity: quantity,
					quality: quality,
					language: language,
				});
				// const response = await userRequest.post("/cart", {
				// 	...product,
				// 	language,
				// 	quality,
				// 	quantity,
				// });
				console.log(response);
				dispatch(addProduct({ ...product, language, quality, quantity }));
			};
			addProductToApi();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Container>
			{/* 1 */}
			<Navbar />
			{/* 2 */}
			<Wrapper>
				{/* 2a */}
				<ImageContainer>
					<Image src={product.img} />
				</ImageContainer>
				{/* 2b */}
				<InfoContainer>
					{/*  */}
					<Title>{product.title}</Title>
					<YTG>
						<Year>{product.year}</Year>
						<Time>{product.runtime} minutes</Time>
						<Genre>{product.categories}</Genre>
					</YTG>
					{/*  */}
					<Desc>{product.desc}</Desc>
					{/*  */}
					<Price>₹ {product.price}</Price>
					{/*  */}
					<FilterContainer>
						<Filter>
							<FilterTitle>Language</FilterTitle>
							<FilterTypeSelect onChange={(event) => setLanguage(event.target.value)}>
								{product.language &&
									product.language.map((eachlanguage) => (
										<FilterType key={eachlanguage}>{eachlanguage}</FilterType>
									))}
								{/* <FilterType value={"English"}>English</FilterType>
								<FilterType>French</FilterType>
								<FilterType>Spanish</FilterType>
								<FilterType>Hindi</FilterType>
								<FilterType>Tamil</FilterType> */}
							</FilterTypeSelect>
						</Filter>
						<Filter>
							<FilterTitle>Buy in</FilterTitle>
							<FilterTypeSelect onChange={(event) => setQuality(event.target.value)}>
								{product.quality &&
									product.quality.map((quality) => (
										<FilterType key={quality}>{quality}</FilterType>
									))}
								{/* <FilterType value={"HD"}>HD</FilterType>
								<FilterType>Ultra HD</FilterType>
								<FilterType>BluRay</FilterType>
								<FilterType>4k</FilterType> */}
							</FilterTypeSelect>
						</Filter>
					</FilterContainer>
					{/*  */}
					<AddContainer>
						<AmountContainer>
							<GrAdd
								style={{ fontSize: "25px", cursor: "pointer" }}
								// type='increment'
								onClick={() => quantityHandler("increment")}
							/>
							<Amount>{quantity}</Amount>
							<IoMdRemove
								style={{ fontSize: "25px", cursor: "pointer" }}
								onClick={() => quantityHandler("decrement")}
							/>
						</AmountContainer>
						<Button onClick={handleClick}>Add to Cart</Button>
					</AddContainer>
				</InfoContainer>
			</Wrapper>
			<Footer />
		</Container>
	);
};

export default SingleProductPage;
