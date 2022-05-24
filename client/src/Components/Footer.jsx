import React from "react";
import styled from "styled-components";
import {
	FaFacebook,
	FaInstagram,
	FaTwitter,
	FaPinterest,
} from "react-icons/fa";
import { MdLocationOn, MdPhone, MdMail, MdPayments } from "react-icons/md";
const Container = styled.div`
	display: flex;
`;
// 1
const Left = styled.div`
	flex: 1;
	padding: 20px;
	margin: auto;
`;
const Logo = styled.h1`
	color: rgb(58, 206, 88);
	font-size: 40px;
`;
const Desc = styled.p`
	margin: 20px 0px;
	color: #333;
`;
const SocialContainer = styled.div`
	display: flex;
	gap: 5px;
	font-size: 20px;
	color: grey;
	flex-direction: row;
	align-self: flex-end;
`;
// 2
const Center = styled.div`
	flex: 1;
	padding: 20px;
`;
const List = styled.ul`
	list-style: none;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 10px;
`;
const ListItem = styled.li`
	cursor: pointer;
	color: #333;
`;
// 3
const Right = styled.div`
	flex: 1;
	padding: 20px;
	margin: auto;
`;
const Title = styled.h3`
	margin-bottom: 30px;
	color: #333;
`;
const ContactItem = styled.div`
	display: flex;
	align-items: center;

	gap: 10px;
	margin-bottom: 15px;
	color: grey;
`;
const Payment = styled.img``;
const Footer = () => {
	return (
		<Container>
			{/* 1 */}
			<Left>
				{/* 1a */}
				<Logo>MOVIEFLIX</Logo>
				{/* 1b */}
				<Desc>
					Pick up a camera. Shoot something. No matter how small, no matter how cheesy, no
					matter whether your friends and your sister star in it. Put your name on it as
					director. Now you're a director. Everything after that you're just negotiating
					your budget and your fee.
				</Desc>
				{/* 1c */}
				<SocialContainer>
					<FaFacebook />
					<FaInstagram />
					<FaTwitter />
					<FaPinterest />
				</SocialContainer>
			</Left>
			{/* 2 */}
			<Center>
				{/* 2a */}
				<Title>UseFul Links</Title>
				{/* 2b */}
				<List>
					<ListItem>Home</ListItem>
					<ListItem>Cart</ListItem>
					<ListItem>Accessories</ListItem>
					<ListItem>My Account</ListItem>
					<ListItem>Order Tracking</ListItem>
					<ListItem>Wishlist</ListItem>
					<ListItem>Terms & Conditions</ListItem>
				</List>
			</Center>
			{/* 3 */}
			<Right>
				<Title>Contact</Title>
				<ContactItem>
					<MdLocationOn style={{ fontSize: "59px" }} />
					3rd Floor VR Mall MetroZone 44, Pillaiyar Koil Street, 44, Jawaharlal Nehru Rd,
					Anna Nagar, Chennai, Tamil Nadu 600040
				</ContactItem>
				<ContactItem>
					<MdPhone style={{ fontSize: "29px" }} />
					+91 8450239527
				</ContactItem>
				<ContactItem>
					<MdMail style={{ fontSize: "29px" }} />
					movieflix@gmail.com
				</ContactItem>
				<ContactItem>
					<MdPayments style={{ fontSize: "29px" }} />
					<Payment src='https://i.ibb.co/Qfvn4z6/payment.png' />
				</ContactItem>
			</Right>
		</Container>
	);
};

export default Footer;
