import { useState } from 'react';
import { BsEnvelopeFill, BsClock } from 'react-icons/bs';

const Header = () => {
	const [currentTime, setCurrentTime] = useState('');

	setTimeout(
		() =>
			setCurrentTime(
				new Date().toLocaleString('en-US', {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
					hour12: true,
					hour: 'numeric',
					minute: 'numeric',
					second: 'numeric',
				})
			),
		1000
	);

	return (
		<div className="header">
			<div className="header-component" style={{ userSelect: 'none' }}>
				<BsClock />
				{currentTime}
			</div>
			<div className="header-component">
				<BsEnvelopeFill />
				<a href="mailto:omerfurkansen@gmail.com" target="_blank">
					omerfurkansen@gmail.com
				</a>
			</div>
		</div>
	);
};

export default Header;
