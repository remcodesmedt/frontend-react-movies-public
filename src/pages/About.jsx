import { Heading, Flex } from '@chakra-ui/react';
import Hoofding from '../components/Hoofding';

export default function About() {
	return (
		<>
			<Hoofding />
			<Flex justifyContent='center' marginTop='3'>
				<Heading size='md'>This is the about page</Heading>
			</Flex>
		</>
	);
}
