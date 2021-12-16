import { Flex, Text } from '@chakra-ui/layout';
import { useContext } from 'react';
import { useParams } from 'react-router';
import { MovieContext } from '../contexts/MovieProvider';
import Movie from '../components/Movie/Movie';
import Category from '../components/Category/Category';
import Director from '../components/Director/Director';
import Hoofding from '../components/Hoofding';

export default function MoviePage() {
	const { id } = useParams();
	const idNumber = Number(id);

	//movie weergeven + zijn category + director

	// get data from ctx
	const { MOVIE_DATA, loading, error } = useContext(MovieContext);

	if (loading) return <Text>Loading</Text>;

	if (error) {
		return (
			<Text marginLeft='3'>
				Could not fetch movies, the web server may be down.
			</Text>
		);
	}

	//juiste movie uithalen
	const movie = MOVIE_DATA.filter((el) => el.movieID === idNumber)[0];

	//categorie uithalen
	const category = movie.category;

	//director uithalen
	const director = movie.director;

	//aanpassen voor mobile: flexdir column mss

	return (
		<>
			<Hoofding />
			<Flex justifyContent='center' margin='4' marginTop='100px'>
				<Category
					categoryID={category.categoryID}
					categoryName={category.categoryName}
					description={category.description}
					linkCat={category.linkCat}
					isDetail={true}
				/>
				<Movie
					movieID={movie.movieID}
					linkMov={movie.linkMov}
					category={category}
					director={director}
					title={movie.title}
					yearOfRelease={movie.yearOfRelease}
					rating={movie.rating}
					durationInMinutes={movie.durationInMinutes}
					isDetail={true}
				/>
				<Director
					directorID={director.directorID}
					directorLastName={director.directorLastName}
					directorFirstName={director.directorFirstName}
					birthdate={director.birthdate}
					country={director.country}
					linkDir={director.linkDir}
					isDetail={true}
				/>
			</Flex>
		</>
	);
}
