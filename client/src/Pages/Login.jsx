import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/apiCalls";
import { Link } from "react-router-dom";

const Container = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	align-items: center;
	justify-content: center;
	background: linear-gradient(rgba(59, 59, 59, 0.473), rgba(82, 82, 82, 0.445)),
		url(https://images.pexels.com/photos/7234265/pexels-photo-7234265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)
			center;
	background-size: cover;
`;
const Wrapper = styled.div`
	width: 30%;
	padding: 20px;
	box-shadow: 0 0 5px rgb(25, 87, 37);
	background-color: white;
	border-radius: 5px;
`;
const Title = styled.h1`
	/* font-size: 24px; */
	color: grey;
	font-weight: 300;
	/* align-self: center; doesnt work */
	text-align: center;
`;
const Form = styled.div`
	display: flex;
	flex-direction: column;
	/* gap: 5px; */
`;
const Input = styled.input`
	/* flex: 1; */
	/* min-width: 40%; */
	margin: 20px 10px 0px 0px;
	padding: 10px;
	font-size: 19px;
`;
const Button = styled.button`
	width: 40%;
	margin-top: 15px;
	padding: 10px 25px;
	cursor: pointer;
	background-color: rgb(58, 206, 88);
	color: white;
	border: none;
	font-size: 19px;
	border-radius: 5px;
	/* text-align: center; doesnt work */
	align-self: center;
	&:disabled {
		background-color: grey;
		cursor: not-allowed;
	}
`;
const LinkComp = styled.div`
	margin: 5px 0px;
	font-size: 12px;
	margin-top: 15px;
`;

const RegisterContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const RegButton = styled.button`
	margin-top: 15px;
	padding: 10px 25px;
	cursor: pointer;
	background-color: rgb(58, 206, 181);
	color: white;
	border: none;
	/* font-size: 19px; */
	border-radius: 5px;
`;

const Login = () => {
	const { isFetching, error } = useSelector((state) => state.user);
	console.log(isFetching);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const loginHandler = (event) => {
		event.preventDefault();
		login(dispatch, { username: username, password: password }); // dispatch is passed to the placeholder variable in apicalls.js
	};
	return (
		<Container>
			<Wrapper>
				<Title>Log In</Title>
				<Form>
					<Input
						placeholder='username'
						onChange={(event) => setUsername(event.target.value)}
					/>
					<Input
						placeholder='password'
						type='password'
						onChange={(event) => setPassword(event.target.value)}
					/>
					<Button disabled={isFetching} onClick={loginHandler}>
						{isFetching ? "Fetching" : "Log In"}
					</Button>
					{error && (
						<span style={{ textAlign: "center", color: "red" }}>Something went Wrong</span>
					)}
				</Form>
				<RegisterContainer>
					<LinkComp>DONT HAVE A ACCOUNT ?</LinkComp>
					<Link to={`/register`}>
						<RegButton>CREATE A NEW ACCOUNT</RegButton>
					</Link>
				</RegisterContainer>
			</Wrapper>
		</Container>
	);
};

export default Login;
