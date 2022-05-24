import React, { useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { publicRequest } from "../axiosRequest";

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
`;
const Logbtn = styled.button`
	padding: 10px 25px;
	cursor: pointer;
	background-color: rgb(58, 206, 88);
	color: white;
	border: none;
	font-size: 19px;
	border-radius: 5px;
	/* text-align: center; doesnt work */
	align-self: center;
`;
const LogCon = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	margin-top: 15px;
	gap: 10px;
`;

const Register = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const history = useHistory();

	const signupHandler = (event) => {
		event.preventDefault();
		try {
			const sendDataToApi = async () => {
				const response = await publicRequest.post("/auth/register", {
					username: username,
					email: email,
					password: password,
				});
				console.log(response);
				history.push("/login");
			};
			sendDataToApi();
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<Container>
			<Wrapper>
				<Title>CREATE AN ACCOUNT</Title>
				<Form>
					{/* <Input placeholder='name' />
					<Input placeholder='last name' /> */}
					<Input
						placeholder='username'
						onChange={(event) => {
							setUsername(event.target.value);
						}}
					/>
					<Input
						placeholder='email'
						onChange={(event) => {
							setEmail(event.target.value);
						}}
					/>
					<Input
						placeholder='password'
						onChange={(event) => {
							setPassword(event.target.value);
						}}
					/>
					{/* <Input placeholder='confirm password' /> */}
					<Button onClick={signupHandler}>Sign Up</Button>
				</Form>
				<LogCon>
					<span>Already have a account? </span>
					<Link to={`/login`}>
						<Logbtn>Login</Logbtn>
					</Link>
				</LogCon>
			</Wrapper>
		</Container>
	);
};

export default Register;
