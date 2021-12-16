import {
	Heading,
	IconButton,
	Flex,
	Box,
	UnorderedList,
	ListItem,
} from '@chakra-ui/react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSession, useLogout } from '../contexts/AuthProvider';

const navStyling = {
	fontSize: '1.4em',
	position: 'absolute',
	top: '0.5rem',
	left: '0.5rem',
};

const linkStyling = {
	border: '1px solid black',
	borderRadius: '8px',
	padding: '3px',
};

export default function Hoofding() {
	const { isAuthed } = useSession();
	const logout = useLogout();
	const [isDark, setIsDark] = useState(false);
	const initialRender = useRef(true);

	const toggleDarkMode = useCallback(() => {
		setIsDark(!isDark);
	}, [isDark]);

	useLayoutEffect(() => {
		// don't change the theme on initial render
		if (initialRender.current) {
			initialRender.current = false;
			return;
		}
		if (document.body.style.backgroundColor === 'black') {
			document.body.style.backgroundColor = 'white';
			document.body.style.color = 'black';
		} else {
			document.body.style.backgroundColor = 'black';
			document.body.style.color = 'grey';
		}
	}, [isDark]);

	const handleLogout = useCallback(() => {
		logout();
	}, [logout]);

	return (
		<Flex
			width='100%'
			position='relative'
			justifyContent='center'
			padding='2'
			paddingTop='2'>
			<Box style={navStyling}>
				<UnorderedList listStyleType='none' margin='0'>
					<ListItem marginBottom='2'>
						<Link to='/about' style={linkStyling}>
							About
						</Link>
					</ListItem>
					<ListItem marginBottom='2'>
						<Link to='/contact' style={linkStyling}>
							Contact
						</Link>
					</ListItem>
					{isAuthed ? (
						<button style={linkStyling} onClick={handleLogout}>
							Logout
						</button>
					) : (
						<ListItem>
							<Link to='/login' style={linkStyling}>
								Login
							</Link>
						</ListItem>
					)}
				</UnorderedList>
			</Box>
			<Link to='/home'>
				<Heading size='2xl' justifySelf='center'>
					Movies
				</Heading>
			</Link>
			<IconButton
				data-cy='darkmode_button'
				onClick={toggleDarkMode}
				bg='lightgrey'
				position='absolute'
				top='2'
				right='2'
				icon={isDark ? <MdOutlineDarkMode /> : <MdDarkMode />}
			/>
		</Flex>
	);
}
