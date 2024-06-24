import { Link } from "react-router-dom";

const SideNav = () => {
	return (
		<>
			<nav>
				<ul>
					<li>
						<Link to="/">Home</Link>
					</li>
					<li>
						<Link to="/landing">Landing</Link>
					</li>
				</ul>
			</nav>
		</>
	);
};

export default SideNav;
