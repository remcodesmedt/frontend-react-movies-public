import { Box, Heading, Flex, Text, Button } from '@chakra-ui/react';
import { useCallback, useContext, useState } from 'react';
import Category from './Category';
import { CategoryContext } from '../../contexts/CategoryProvider';
import CategoryForm from './CategoryForm';

const responsiveWidth = {
	base: '100%',
	md: '50%',
	lg: '33%',
};

export default function CategoryOverview() {
	const [editCatPressed, setEditCatPressed] = useState(false);
	const [addCatPressed, setAddCatPressed] = useState(false);

	// get data from context
	const { CATEGORY_DATA, loading, error } = useContext(CategoryContext);

	const toggleSetAddCatPressed = useCallback(() => {
		setAddCatPressed(!addCatPressed);
	}, [addCatPressed]);

	if (loading) return <Text>Loading...</Text>;

	// alster nen error is bij het fetchen van de data, de pagina niet laden en de error gwn opt scherm zetten
	// if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>;

	if (error) {
		return <Text marginLeft='3'>{error.message} </Text>;
	}

	return (
		<Box>
			<Flex>
				<Heading size='lg' marginLeft='10' marginBottom='5'>
					Categories
				</Heading>
				<Button
					disabled={addCatPressed}
					marginLeft='3'
					marginRight='3'
					onClick={toggleSetAddCatPressed}>
					Add category
				</Button>
			</Flex>
			<Flex wrap='wrap' marginLeft='10' marginRight='10' data-cy='category_overview_cats'>
				{addCatPressed ? (
					<CategoryForm
						isPost={true}
						setAddCatPressed={setAddCatPressed}
					/>
				) : CATEGORY_DATA.length > 0 ? (
					CATEGORY_DATA.map((el) => (
						<Box width={responsiveWidth} key={el.categoryID}>
							<Category
								{...el}
								editCatPressed={editCatPressed}
								setEditCatPressed={setEditCatPressed}
							/>
						</Box>
					))
				) : (
					<Text>No Categories found!</Text>
				)}
			</Flex>
		</Box>
	);
}
