import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { useCallback, useContext, useState } from 'react';
import { MovieContext } from '../../contexts/MovieProvider';
import MovieForm from './MovieForm';
import Movie from './Movie';

const responsiveWidth = {
	base: '100%',
	md: '50%',
	lg: '33%',
};

export default function MovieOverview() {
	const [editMovPressed, setEditMovPressed] = useState(false);
	const [addMovPressed, setAddMovPressed] = useState(false);

	// get data from ctx
	const { MOVIE_DATA, loading, error } = useContext(MovieContext);

	const toggleSetAddMovPressed = useCallback(() => {
		setAddMovPressed(!addMovPressed);
	}, [addMovPressed]);

	if (loading) return <Text>Loading</Text>;

	if (error) {
		return <Text marginLeft='3'>{error.message}</Text>;
	}

	return (
		<Box>
			<Flex>
				<Heading size='lg' marginLeft='10' marginBottom='5'>
					Movies
				</Heading>
				<Button
					disabled={addMovPressed}
					marginLeft='3'
					onClick={toggleSetAddMovPressed}>
					Add movie
				</Button>
			</Flex>
			<Flex wrap='wrap' marginLeft='10' marginRight='10'>
				{addMovPressed ? (
					<MovieForm
						isPost={true}
						setAddMovPressed={setAddMovPressed}
					/>
				) : MOVIE_DATA.length > 0 ? (
					MOVIE_DATA.map((el) => (
						<Box width={responsiveWidth} key={el.movieID}>
							<Movie
								{...el}
								editMovPressed={editMovPressed}
								setEditMovPressed={setEditMovPressed}
							/>
						</Box>
					))
				) : (
					<Text>No movies found!</Text>
				)}
			</Flex>
		</Box>
	);
}
