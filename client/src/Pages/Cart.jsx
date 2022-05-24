import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { IoMdRemove } from "react-icons/io";
import { GrAdd } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";
import { BASE_URL, userRequest } from "../axiosRequest";
// import { useHistory } from "react-router-dom";
import axios from "axios";
import { cartQuantityValue, cartTotalPrice } from "../Redux/cartRedux";

const Container = styled.div`
	height: auto;
`;

const Title = styled.h1`
	text-align: center;
	color: #333;
	margin-top: 20px;
`;
const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;
const TopButton = styled.button`
	padding: 10px 25px;
	cursor: pointer;
	background-color: rgb(58, 206, 88);
	color: white;
	border: none;
	font-size: 19px;
	border-radius: 5px;
`;
const TopTexts = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
`;
const TopText = styled.div``;
// 4
const Bottom = styled.div`
	padding: 20px;
	display: flex;
	/* height: 100vh; */
`;
const Image = styled.img`
	width: 15%;
`;
const Info = styled.div`
	flex: 2;
`;
const Product = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;
const ProductDetail = styled.div`
	display: flex;
	gap: 10px;
	border: 0.5px dotted;
`;
const Details = styled.div`
	flex: 2;
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-right: 30px;
	padding: 10px;
	color: #333;
	font-size: 20px;
`;
const ProductName = styled.div``;
const ProductId = styled.div``;
const ProductLanguage = styled.div``;
const ProductSize = styled.div``;

const PriceDetail = styled.div`
	flex: 1;
	padding: 10px;
	color: #333;
	/* border: 0.5px dotted; */
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	/* justify-content: center; */
`;
const ProductAmountContainer = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	margin-bottom: 20px;
`;
const ProductAmount = styled.div`
	font-size: 24px;
	margin: 5px;
`;
const ProductPrice = styled.div`
	font-size: 40px;
`;

//
const Summary = styled.div`
	flex: 1;
	padding: 20px;
`;

const SummaryTitle = styled.h1`
	font-weight: 200;
`;
const SummaryItem = styled.div`
	margin: 30px 0px;
	display: flex;
	justify-content: space-between;
	font-weight: ${(props) => props.type === "total" && "500"};
	font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
	width: 100%;
	padding: 10px 25px;
	cursor: pointer;
	background-color: rgb(58, 206, 88);
	color: white;
	border: none;
	font-size: 19px;
	border-radius: 5px;
`;

const Cart = () => {
	// const history = useHistory();
	const [tokenFromStripe, setTokenFromStripe] = useState(null);
	const [cartFromApi, SetCartFromApi] = useState([]);
	const KEY =
		"pk_test_51Kt9XQSChdbo5Stnd5mTHloYr1Xtim7RVYBCsaJ9x8EpmifsgGarVzhmvTQ7TgmhDEOfE2VNDrQpf31Yb2p2zVSP001evS55PI";
	const dispatch = useDispatch();

	const cartstate = useSelector((state) => {
		return state.cart;
	});
	// console.log(cartstate);

	const userState = useSelector((state) => {
		return state.user;
	});
	const TOKEN = userState.currentUser.accessToken;

	//calculating Total Price
	// let totalPrice = 0;
	// cartFromApi.map((element) => {
	// 	totalPrice = totalPrice + element.price * element.quantity;
	// });
	useEffect(() => {
		dispatch(cartTotalPrice({ value: cartFromApi }));
	}, [cartFromApi]);

	const onToken = (token) => {
		setTokenFromStripe(token);
	};
	console.log(tokenFromStripe);

	useEffect(() => {
		const makeRequest = async () => {
			try {
				const res = await userRequest.post("/checkout/payment", {
					tokenId: tokenFromStripe.id,
					amount: cartstate.total,
				});
				console.log(res);
				// history.push("/success", {
				// 	stripeData: res.data,
				// });
			} catch (error) {
				console.log(error);
			}
		};
		tokenFromStripe && makeRequest();
	}, [tokenFromStripe]);

	// for getting the user cart
	useEffect(() => {
		try {
			const getAllCartsData = async () => {
				const instance = axios.create({
					baseURL: BASE_URL,
					headers: { token: `Bearer ${TOKEN}` },
				});
				const response = await instance.get(`/cart/find/${userState.currentUser._id}`);
				// console.log(response.data);
				SetCartFromApi(response.data);
			};
			getAllCartsData();
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		dispatch(cartQuantityValue({ value: cartFromApi.length }));
	}, [cartFromApi.length]);

	return (
		<Container>
			<Navbar />
			<Title>YOUR CART</Title>
			<Top>
				<TopButton>Continue Shopping</TopButton>
				<TopTexts>
					<TopText>Shopping Bag({cartFromApi.length})</TopText>
					<TopText>Your Wishlist (0)</TopText>
				</TopTexts>
				<TopButton>CHECKOUT NOW</TopButton>
			</Top>
			{/*4*/}
			<Bottom>
				{/* 4a */}
				<Info>
					<Product>
						{cartFromApi.map((product) => (
							<ProductDetail key={product.productId}>
								{/* 1*/}
								<Image src={product.productImg} />
								{/* 2 */}
								<Details>
									<ProductName>
										<b>Name:</b> {product.productTitle}
									</ProductName>
									<ProductId>
										<b>ID:</b> {product.productId}
									</ProductId>
									<ProductLanguage>
										<b>Language:</b>
										{product.language}
									</ProductLanguage>
									<ProductSize>
										<b>Quality:</b> {product.quality}
									</ProductSize>
								</Details>
								{/* 3 */}
								<PriceDetail>
									<ProductAmountContainer>
										<GrAdd style={{ fontSize: "25px", cursor: "pointer" }} />
										<ProductAmount>{product.quantity}</ProductAmount>
										<IoMdRemove style={{ fontSize: "25px", cursor: "pointer" }} />
									</ProductAmountContainer>
									<ProductPrice>$ {product.price}</ProductPrice>
								</PriceDetail>
							</ProductDetail>
						))}
					</Product>
				</Info>
				{/*  */}
				<Summary>
					<SummaryTitle>ORDER SUMMARY</SummaryTitle>
					<SummaryItem>
						<SummaryItemText>Subtotal</SummaryItemText>
						<SummaryItemPrice>$ {cartstate.total}</SummaryItemPrice>
					</SummaryItem>
					<SummaryItem>
						<SummaryItemText>Estimated Shipping</SummaryItemText>
						<SummaryItemPrice>$ 5.90</SummaryItemPrice>
					</SummaryItem>
					<SummaryItem>
						<SummaryItemText>Shipping Discount</SummaryItemText>
						<SummaryItemPrice>$ -5.90</SummaryItemPrice>
					</SummaryItem>
					<SummaryItem type='total'>
						<SummaryItemText>Total</SummaryItemText>
						<SummaryItemPrice>$ {cartstate.total}</SummaryItemPrice>
					</SummaryItem>

					{/* stripe payment */}
					<StripeCheckout
						name='MOVIEFLIX' // the pop-in header title
						description={`Your Total Amout to Pay is $ ${cartstate.total}`} // the pop-in header subtitle
						image='' // the pop-in header image (default none)
						// ComponentClass='div'
						// panelLabel='Pay' // prepended to the amount in the bottom pay button
						amount={cartstate.total * 100} // cents
						// currency='USD'
						stripeKey={KEY}
						// locale='zh'
						// email='MOVIEFLIX@gmail.com'
						// Note: Enabling either address option will give the user the ability to
						// fill out both. Addresses are sent as a second parameter in the token callback.
						shippingAddress
						billingAddress
						// Note: enabling both zipCode checks and billing or shipping address will
						// cause zipCheck to be pulled from billing address (set to shipping if none provided).
						token={onToken} // submit callback
					>
						<Button>Check Out Now</Button>
					</StripeCheckout>
				</Summary>
			</Bottom>
			<Footer />
		</Container>
	);
};

export default Cart;
