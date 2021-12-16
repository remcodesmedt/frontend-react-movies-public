import { Box, Heading, Flex, Button, Text } from '@chakra-ui/react';
import { useCallback, useContext, useState } from 'react';
import { DirectorContext } from '../../contexts/DirectorProvider';
import Director from './Director';
import DirectorForm from './DirectorForm';

const responsiveWidth = {
	base: '100%',
	md: '50%',
	lg: '33%',
};

export default function DirectorOverview() {
	const [editDirPressed, setEditDirPressed] = useState(false);
	const [addDirPressed, setAddDirPressed] = useState(false);

	// get data from context
	const { DIRECTOR_DATA, loading, error } = useContext(DirectorContext);

	const handleSetAddDirPressed = useCallback(() => {
		setAddDirPressed(!addDirPressed);
	}, [addDirPressed]);

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
					Directors
				</Heading>
				<Button
					marginLeft='3'
					disabled={addDirPressed}
					onClick={handleSetAddDirPressed}>
					Add director
				</Button>
			</Flex>
			<Flex wrap='wrap' marginLeft='10' marginRight='10'>
				{addDirPressed ? (
					<DirectorForm
						isPost={true}
						setAddDirPressed={setAddDirPressed}
					/>
				) : DIRECTOR_DATA.length > 0 ? (
					DIRECTOR_DATA.map((el) => (
						<Box width={responsiveWidth} key={el.directorID}>
							<Director
								{...el}
								editDirPressed={editDirPressed}
								setEditDirPressed={setEditDirPressed}
							/>
						</Box>
					))
				) : (
					<Text>No directors found!</Text>
				)}
			</Flex>
		</Box>
	);
}
