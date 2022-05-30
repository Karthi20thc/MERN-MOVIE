import React from "react";
import styled from "styled-components";
import { BsSearch } from "react-icons/bs";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import { logout } from "../Redux/userRedux";

const Container = styled.div`
	/* height: 50px; */
	/* border: 0.5px solid; */
	background-color: rgb(58, 206, 88);
	color: white;
	position: sticky;
	top: 0;
	z-index: 99;
`;
const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 10px;
`;
// 1
const Left = styled.div``;
const Logo = styled.h1`
	font-weight: bold;
	margin-left: 15px;
`;

// 2
const Center = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 15px;
`;
const SearchCon = styled.div`
	display: flex;
	align-items: center;
	border: 0.5px solid;
	background-color: white;
	padding: 0 10px;
	border-radius: 5px;
`;
// const Language = styled.span``;
const Input = styled.input`
	width: 350px;
	font-size: 20px;
	padding: 5px;
	outline: none;
	border: none;
`;

// 3
const Right = styled.div`
	display: flex;
	align-items: center;
	gap: 15px;
	font-size: 20px;
	margin-right: 20px;
`;
const MenuItem = styled.div`
	border: 0.5px solid;
	padding: 5px 10px;
	background-color: #c46060;
	cursor: pointer;
	&:hover {
		background-color: white;
		color: #00a321;
	}
`;
const CartItem = styled.div`
	display: flex;
	align-items: center;
	border: 0.5px solid;
	background-color: #c46060;
	gap: 5px;
	padding: 5px 10px;
	cursor: pointer;
	&:hover {
		background-color: white;
		color: black;
	}
`;
const Badge = styled.span``;

const Navbar = (props) => {
	// const { cartquantity } = props;
	// const dispatch = useDispatch();
	const cartstate = useSelector((state) => {
		return state;
	});
	const userState = useSelector((state) => {
		return state.user;
	});

	const logoutHandler = () => {
		// dispatch(logout());
		localStorage.removeItem("user");
		window.location.replace("/login");
	};

	return (
		<Container>
			<Wrapper>
				{/* 1 */}
				<Left>
					<Link to='/'>
						<Logo>MOVIEFLIX</Logo>
					</Link>
				</Left>
				{/* 2 */}
				<Center>
					<SearchCon>
						<Input placeholder='Search here....' />
						<BsSearch style={{ color: "grey", cursor: "pointer" }} />
					</SearchCon>
				</Center>
				{/* 3 */}
				<Right>
					{userState.currentUser && <span>Welcome {userState.currentUser.username}</span>}
					{/* <MenuItem>Register</MenuItem> */}
					{userState.currentUser ? (
						<MenuItem onClick={logoutHandler}>LogOff</MenuItem>
					) : (
						<Link to='/login'>
							<MenuItem>LogIn</MenuItem>
						</Link>
					)}
					<Link to={"/myOrders"}>
						<MenuItem>My Orders</MenuItem>
					</Link>

					<Link to={`/cart`}>
						<CartItem>
							<AiOutlineShoppingCart />
							<Badge>{cartstate.cart.cartQuantity}</Badge>
							{/* <Badge>{cartquantity}</Badge> */}
						</CartItem>
					</Link>
				</Right>
			</Wrapper>
		</Container>
	);
};

export default Navbar;
