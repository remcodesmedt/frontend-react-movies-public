import { Flex, Heading } from '@chakra-ui/layout';
import Hoofding from '../components/Hoofding';

export default function Contact() {
	return (
		<>
			<Hoofding />
			<Flex justifyContent='center' marginTop='3'>
				<Heading size='md'>This is the contact page</Heading>
			</Flex>
		</>
	);
}
