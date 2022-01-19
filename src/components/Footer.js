import logo from '../assets/logo.png';

const Footer = () => {
	return (
		<div className="footer">
			<a href="/">
				<img src={logo} className="logo" />
			</a>
			<div className="footer-info">
				<span>Thank you for visiting. Hope your journey was entertaining!</span>
			</div>
		</div>
	);
};

export default Footer;
