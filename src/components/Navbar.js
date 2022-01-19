import logo from '../assets/logo.png';
import { MdMenu } from 'react-icons/md';
import { useState } from 'react';
import Modal from 'react-modal';

const desktopStyle = {
	overlay: {
		zIndex: 10000,
		position: 'fixed',
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		backdropFilter: 'blur(8px)',
	},
	content: {
		position: 'absolute',
		top: '25%',
		left: '30%',
		right: '30%',
		bottom: '25%',
		border: '1px solid #ccc',
		background: '#fff',
		overflow: 'auto',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '4px',
		outline: 'none',
		padding: '30px',
	},
};

const mobileStyle = {
	overlay: {
		zIndex: 10000,
		position: 'fixed',
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		backdropFilter: 'blur(8px)',
	},
	content: {
		position: 'absolute',
		top: '100px',
		left: '40px',
		right: '40px',
		bottom: '100px',
		border: '1px solid #ccc',
		background: '#fff',
		overflow: 'scroll',
		WebkitOverflowScrolling: 'touch',
		borderRadius: '4px',
		outline: 'none',
		padding: '30px',
	},
};

const Navbar = () => {
	const [modalIsOpen, setIsOpen] = useState(false);

	const openModal = () => {
		setIsOpen(true);
	};

	const closeModal = () => {
		setIsOpen(false);
	};

	const toggleMenuElements = () => {
		let components = document.getElementsByClassName('element');
		for (let i = 0; i < 4; i++) {
			components[i].style.display === 'none'
				? (components[i].style.display = 'flex')
				: (components[i].style.display = 'none');
		}
	};

	return (
		<div className="navbar">
			<a href="/">
				<img src={logo} className="brandLogo" />
			</a>
			<div className="rightPart">
				<div className="menu">
					<MdMenu className="menuIcon" onClick={toggleMenuElements} />
					<div className="element" style={{ fontSize: 40 }}>
						👨‍💻
					</div>
					<div
						className="element"
						style={{ cursor: 'pointer' }}
						onClick={openModal}
					>
						About
					</div>
					<Modal
						isOpen={modalIsOpen}
						onRequestClose={closeModal}
						style={
							window.matchMedia('(min-width: 576px)').matches
								? desktopStyle
								: mobileStyle
						}
						contentLabel="About Modal"
					>
						<p style={{ fontFamily: 'monospace', fontSize: 20 }}>
							Hello there, guest! My name is{' '}
							<a
								href="https://github.com/omerfurkansen"
								target="_blank"
								rel="noreferrer"
								style={{ textDecoration: 'none', color: 'purple' }}
							>
								Ömer Furkan
							</a>
							, and I am an enthusiastic Web Developer. 👋 This is an example of
							a one-page application that I made, and please feel free to
							contact me via email! This program allows you to view the date,
							check the weather, explore the world through map, and learn new
							things about adorable animals, space, and numbers. This website
							was developed to entertain you and bring a smile to your face. 😊
							I utilized free open APIs to create this webpage, and I have no
							idea how lengthy each paragraph might be, thus the content sizes
							may change, be patient some images my tight a bit longer to
							download though. Fully responsive, please visit the page along
							your mobile device as well!
						</p>
					</Modal>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
