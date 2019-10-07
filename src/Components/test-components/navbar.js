import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

function Navbar(props) {
	const { handleDrawer, tip, drawerWidth } = props;

	const useStyles = makeStyles(theme => ({
		root: {
			display: "flex"
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1
		},
		toolbar: theme.mixins.toolbar,
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
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen
			}),
			marginLeft: -drawerWidth
		},
		contentShift: {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen
			}),
			marginLeft: 0
		},
		menuButton: {
			marginRight: theme.spacing(2)
		},
		hide: {
			display: "none"
		},
		heading: {
			fontSize: theme.typography.pxToRem(15),
			fontWeight: theme.typography.fontWeightRegular
		},
		groupDrpdwn: {
			width: drawerWidth
		}
	}));

	const classes = useStyles();

	return (
		<div className={classes.root}>
			{console.log(handleDrawer)}
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={ handleDrawer }
						edge="start"
						className={classes.menuButton}
					>
						<Typography>
							{/* <img height="100" width="100" alt="chef-hat" src="https://p7.hiclipart.com/preview/113/85/280/chef-s-uniform-icon-chef.jpg"/> */}
							Culin.ary
						</Typography>
					</IconButton>
					<div style={{ flex: 1 }}>
						<Typography
							variant="subtitle2"
							className={tip && classes.hide}
							noWrap
						>
							&larr; Click Here for More
						</Typography>
					</div>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						//onClick={}
					>
						<AccountCircleIcon />
					</IconButton>
					<Typography
						variant="subtitle2"
						//className={classes.navGreeting}
						noWrap
					>
						Admin? Login Here
					</Typography>
				</Toolbar>
			</AppBar>
		</div>
	);
}

export default Navbar;
