import { Box, Heading, Image, Flex, IconButton, Text } from '@chakra-ui/react';
import { MdDeleteForever } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import React, { useCallback, useContext, useState } from 'react';
import { DirectorContext } from '../../contexts/DirectorProvider';
import DirectorForm from './DirectorForm';

const formatDate = (date) => {
	if (date === null || date === '') {
		return null;
	}
	const options = {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	};
	return new Intl.DateTimeFormat('en-UK', options).format(
		new Date(Date.parse(date))
	);
};

export default function Director(props) {
	const {
		directorID,
		directorLastName,
		directorFirstName,
		birthdate,
		country,
		linkDir,
		editDirPressed,
		setEditDirPressed,
		isDetail,
	} = props;

	const { removeDirector } = useContext(DirectorContext);

	const [editDirPressedComp, setEditDirPressedComp] = useState(false);

	const handleRemove = useCallback(() => {
		removeDirector(directorID);
	}, [removeDirector, directorID]);

	const toggleKeuze = useCallback(() => {
		// setEditPressedComp is om het form component in te laden, setEditCatPressed is om de andere buttons te disablen
		setEditDirPressedComp(!editDirPressedComp);
		setEditDirPressed(!editDirPressed);
	}, [editDirPressed, editDirPressedComp, setEditDirPressed]);

	return (
		<Box padding='3' paddingLeft='0' paddingTop='0' width='100%'>
			<Box border='1px' borderRadius='15px' padding='3'>
				<Box width='100%' height='200' marginBottom='2'>
					<Image
						src={linkDir}
						alt='directorImage'
						boxSize='100%'
						objectFit='contain'
						marginBottom='3'
						borderRadius='15px'
					/>
				</Box>
				<Flex marginBottom='2' justifyContent='space-between'>
					<Heading size='md'>
						{directorFirstName} {directorLastName}
					</Heading>
					{!isDetail ? (
						<Box>
							<IconButton
								disabled={editDirPressed}
								marginLeft='2'
								size='sm'
								icon={<AiOutlineEdit size={25} />}
								onClick={toggleKeuze}
							/>
							<IconButton
								disabled={editDirPressed}
								marginLeft='2'
								size='sm'
								icon={<MdDeleteForever size={25} />}
								onClick={handleRemove}
							/>
						</Box>
					) : null}
				</Flex>
				<Text>
					Birthdate: {''}
					{birthdate === null || birthdate === '' ? (
						<b>No birthdate found!</b>
					) : (
						formatDate(birthdate)
					)}
				</Text>
				<Text>Country: {country ?? <b>No country found!</b>}</Text>
				{editDirPressedComp ? (
					<DirectorForm
						isPost={false}
						directorID={directorID}
						directorLastName={directorLastName}
						directorFirstName={directorFirstName}
						birthdate={birthdate}
						country={country}
						link={linkDir}
						setEditDirPressedComp={setEditDirPressedComp}
						setEditDirPressed={setEditDirPressed}
					/>
				) : null}
			</Box>
		</Box>
	);
}
