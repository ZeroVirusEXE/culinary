import React, { useState, Fragment } from 'react';

import PageDisplay from "./Components/page-display";

function App() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [tip, setTip] = useState(false);
	const [content, setContent] = useState(false);
	const [drawerWidth, setDrawerWidth] = useState(240);

	const handleDrawer = () => {
		setDrawerOpen(!drawerOpen);
		setTip(true);
	}

	const handleTip = (e) => {
		setTip(e);
	}

	const handleContent = (e) => {
		setContent(e);
	}

	return (
		<Fragment>
			<PageDisplay />
		</Fragment>
	);
}

export default App;
