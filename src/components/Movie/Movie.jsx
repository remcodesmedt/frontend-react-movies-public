import { IconButton } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Box, Flex, Heading, Text } from '@chakra-ui/layout';
import { useCallback, useContext, useState } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import { Redirect, useLocation } from 'react-router';
import { MovieContext } from '../../contexts/MovieProvider';
import MovieForm from './MovieForm';

const formatDuration = (minutes) => {
	const hours = Math.floor(minutes / 60);
	const restMin = minutes - hours * 60;

	return `${hours}h ${restMin}m`;
};

export default function Movie(props) {
	const {
		movieID,
		linkMov,
		category,
		director,
		title,
		yearOfRelease,
		rating,
		durationInMinutes,
		editMovPressed,
		setEditMovPressed,
		isDetail,
	} = props;

	const { removeMovie } = useContext(MovieContext);

	const { pathname } = useLocation();

	const [editMovPressedComp, setEditMovPressedComp] = useState(false);

	const [redirect, setRedirect] = useState(false);

	const redirectLink = `/movie/${movieID}`;

	const handleRemove = useCallback(() => {
		removeMovie(movieID);
	}, [removeMovie, movieID]);

	const toggleKeuze = useCallback(() => {
		// setEditPressedComp is om het form component in te laden, setEditPressed is om de andere buttons te disablen
		setEditMovPressedComp(!editMovPressedComp);
		setEditMovPressed(!editMovPressed);
	}, [editMovPressed, editMovPressedComp, setEditMovPressed]);

	const toggleRedirect = useCallback(() => {
		setRedirect(!redirect);
	}, [redirect]);

	return (
		<Box padding='3' paddingLeft='0' paddingTop='0' width='100%'>
			<Box border='1px' borderRadius='15px' padding='3'>
				<Box width='100%' height='200' marginBottom='2'>
					<Image
						src={linkMov}
						alt='movieImage'
						boxSize='100%'
						objectFit='contain'
						marginBottom='3'
						borderRadius='15px'
						cursor='pointer'
						onClick={toggleRedirect}
					/>
					{redirect ? (
						<Redirect
							from={pathname}
							to={redirectLink}
							push={true}
						/>
					) : null}
				</Box>
				<Flex marginBottom='2' justifyContent='space-between'>
					<Heading size='md'>{title}</Heading>
					{!isDetail ? (
						<Box>
							<IconButton
								disabled={editMovPressed}
								marginLeft='2'
								size='sm'
								icon={<AiOutlineEdit size={25} />}
								onClick={toggleKeuze}
							/>

							<IconButton
								disabled={editMovPressed}
								marginLeft='2'
								size='sm'
								icon={<MdDeleteForever size={25} />}
								onClick={handleRemove}
							/>
						</Box>
					) : null}
				</Flex>

				<Text>Category: {category.categoryName}</Text>
				<Text>
					Director: {director.firstName} {director.lastName}
				</Text>
				<Text>Year of release: {yearOfRelease ?? 'UNKNOWN'}</Text>
				<Text>Rating: {rating ?? 'No rating yet'}</Text>
				<Text>
					Duration:{' '}
					{durationInMinutes
						? formatDuration(durationInMinutes)
						: 'UNKNOWN'}
				</Text>
				{editMovPressedComp ? (
					<MovieForm
						isPost={false}
						movieID={movieID}
						linkMov={linkMov}
						category={category}
						director={director}
						title={title}
						yearOfRelease={yearOfRelease}
						rating={rating}
						durationInMinutes={durationInMinutes}
						setEditMovPressed={setEditMovPressed}
						setEditMovPressedComp={setEditMovPressedComp}
					/>
				) : null}
			</Box>
		</Box>
	);
}
