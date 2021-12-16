import { Button, Stack } from '@chakra-ui/react';
import CategoryOverview from '../components/Category/CategoryOverview';
import DirectorOverview from '../components/Director/DirectorOverview';
import MovieOverview from '../components/Movie/MovieOverview';
import { useCallback, useState } from 'react';
import Hoofding from '../components/Hoofding';

export default function Home(props) {
	const [keuze, setkeuze] = useState('Movies');

	const pressButton = useCallback((e) => {
		setkeuze(e.target.innerText);
	}, []);

	let overzicht;

	if (keuze === 'Categories') {
		overzicht = <CategoryOverview />;
	}

	if (keuze === 'Directors') {
		overzicht = <DirectorOverview />;
	}

	if (keuze === 'Movies') {
		overzicht = <MovieOverview />;
	}

	const isActive = useCallback(
		(e) => {
			return keuze === e;
		},
		[keuze]
	);

	return (
		<>
			<Hoofding />
			<Stack
				margin='2'
				marginTop='10'
				marginBottom='10'
				direction='row'
				spacing={5}
				justifyContent='center'>
				<Button
					colorScheme='teal'
					onClick={pressButton}
					isActive={isActive('Categories')}
					data-cy='home_category_button'>
					Categories
				</Button>
				<Button
					colorScheme='teal'
					onClick={pressButton}
					isActive={isActive('Movies')}>
					Movies
				</Button>
				<Button
					colorScheme='teal'
					onClick={pressButton}
					isActive={isActive('Directors')}>
					Directors
				</Button>
			</Stack>
			{overzicht}
		</>
	);
}
