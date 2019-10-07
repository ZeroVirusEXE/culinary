import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";

function SideDrawer(props) {
	const { drawerOpen, drawerWidth } = props;

	const useStyles = makeStyles(theme => ({
		root: {
			display: "flex"
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0
		},
		drawerPaper: {
			width: drawerWidth
		},
		drawerHeader: {
			display: "flex",
			alignItems: "center",
			marginTop: theme.spacing(8),
			padding: theme.spacing(0, 1),
			...theme.mixins.toolbar,
			justifyContent: "flex-end"
		},
	}));

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={drawerOpen}
				classes={{
					paper: classes.drawerPaper
				}}
			>
			</Drawer>
		</div>
	);
}

export default SideDrawer;
