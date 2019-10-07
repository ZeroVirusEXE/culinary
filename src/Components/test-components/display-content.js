import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

function DisplayContent(props) {
    const { drawerOpen, drawerWidth } = props;

	const useStyles = makeStyles(theme => ({
		root: {
			display: "flex"
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
    }));
    
    const classes = useStyles();

    return(
        <main
            className={clsx(classes.content, {
                [classes.contentShift]: drawerOpen
            })}
        >
            <div className={classes.drawerHeader} style={{ marginTop: 0 }} />
            Test
        </main>
    );
}

export default DisplayContent;