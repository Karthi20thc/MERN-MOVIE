import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import NewsLetter from "../Components/NewsLetter";
import Products from "../Components/Products";

const Container = styled.div``;
const Title = styled.h1`
	margin: 20px;
`;
// 3
const FilterContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 20px;
`;
const Filter = styled.div``;
const FilterText = styled.span`
	font-size: 20px;
	font-weight: 600;
	margin-right: 20px;
	color: #333;
`;
const Select = styled.select`
	padding: 10px 25px;
	cursor: pointer;
	background-color: rgb(58, 206, 88);
	color: white;
	border: none;
	border-radius: 5px;
	font-size: 17px;
	margin-right: 20px;
`;
const Option = styled.option`
	/* cursor: pointer;
	background-color: rgb(58, 206, 88);
	color: white; */
	/* doesnt work */
`;

const ProductPage = () => {
	const location = useLocation();
	// filters will be an object which will collect(using setFilters) the key(event.target.name) and value(event.target.value) of the Genre and Quality of the user selcetion seperately.
	const [filters, setFilters] = useState({});
	const [sort, setSort] = useState("newest");
	const category = location.pathname.split("/")[2];

	const handleFilters = (event) => {
		const value = event.target.value; // common for both Genre and Quality
		setFilters({
			...filters,
			[event.target.name]: value, // this key value pair updates the previous key value pair.
		});
		// Object {  } // default
		// Object { genre: "Action" }  // first click
		// Object { genre: "Action", quality: "Ultra HD" } // second click (selected quality only)
		// Object { genre: "SitCom", quality: "Ultra HD" }  // third click (selected genre only)
	};

	const sortHandler = (event) => {
		setSort(event.target.value);
	};
	console.log("From product Page ->", category, filters, sort);
	return (
		<Container>
			{/* 1 */}
			<Navbar />
			{/* 2 */}
			<Title>{category}</Title>
			{/* 3 */}
			<FilterContainer>
				{/* 3a */}
				<Filter>
					<FilterText>Filter By </FilterText>
					<Select name='categories' onChange={handleFilters}>
						<Option disabled>Genre</Option>
						<Option>comedy</Option>
						<Option>action</Option>
						<Option>horror</Option>
						<Option>adventure</Option>
						<Option>fantasy</Option>
						<Option>documentry</Option>
						<Option>sitcom</Option>
					</Select>
					<Select name='quality' onChange={handleFilters}>
						<Option disabled>quality</Option>
						<Option>HD</Option>
						<Option>Ultra HD</Option>
						<Option>Blu-Ray</Option>
						<Option>4k</Option>
					</Select>
					<Select name='language' onChange={handleFilters}>
						<Option disabled>language</Option>
						<Option>English</Option>
						<Option>Tamil</Option>
						<Option>Hindi</Option>
					</Select>
				</Filter>
				{/* 3b */}
				<Filter>
					<FilterText>Sort By </FilterText>
					<Select onChange={sortHandler}>
						<Option value='latest'>Latest</Option>
						<Option value='asc'>Price (asc)</Option>
						<Option value='desc'>Price (desc)</Option>
					</Select>
				</Filter>
			</FilterContainer>
			{/* 4 */}
			{/* we are sending 3 props to Products, so that we can able to make request */}
			<Products category={category} filters={filters} sort={sort} />
			{/* 5 */}
			<NewsLetter />
			{/* 6 */}
			<Footer />
		</Container>
	);
};

export default ProductPage;
