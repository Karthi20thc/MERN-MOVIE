import React from "react";
import styled from "styled-components";
import { categories } from "../dummyData";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
	display: flex;
	padding: 10px;
	justify-content: space-between;
`;

const Categories = () => {
	return (
		<div>
			<h1 style={{ margin: "10px", color: "#333" }}>Go By Genre</h1>
			<Container>
				{categories.map((item) => (
					<CategoryItem
						img={item.img}
						title={item.title}
						key={item.id}
						category={item.category}
					/>
				))}
			</Container>
		</div>
	);
};

export default Categories;
