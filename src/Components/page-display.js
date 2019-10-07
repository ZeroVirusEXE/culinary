import React, { useState, useEffect, Fragment } from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ClearIcon from "@material-ui/icons/Clear";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Tooltip from "@material-ui/core/Tooltip";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import firebase from "./firebase";

import RecipeForm from "./recipe-form";
import logo from "../assets/Culinary-Logo-Text.png";

const SORT_OPTIONS = {
	"TITLE_ASC": {column: "title", direction: "asc"},
	"TITLE_DESC": {column: "title", direction: "desc"}
};

function useRecipes(sortBy = "TITLE_ASC") {
	const [recipes, setRecipes] = useState([]);
	
	useEffect(() => {
		const unsubscribe = firebase
			.firestore()
			.collection("recipes")
			.orderBy(SORT_OPTIONS[sortBy].column, SORT_OPTIONS[sortBy].direction)
			.onSnapshot((snapshot) => {
				const newRecipes = snapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data()
				}));

				setRecipes(newRecipes);
			});

		return () => unsubscribe;
	}, [sortBy]);

	return recipes;
}

function deleteRecipe(docObj) {
	firebase
		.firestore()
		.collection("recipes")
		.doc(docObj.id)
		.delete()
		.then(() => {
			console.log("Document Deleted!")
		})
		.catch(error => {
			console.log(error);
		})
}

function PageDisplay(props) {
	const [open, setOpen] = useState(false);
	const [tip, setTip] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [loginError, setLoginError] = useState(false);
	const [createOpen, setCreateOpen] = useState(false);
	
	const recipes = useRecipes("TITLE_ASC");

	const drawerWidth = 240;

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
		cardContainer: {
			display: "inline-block",
			margin: "10px"
		},
		card: {
			maxWidth: 345,
		},
		media: {
			height: 140,
		},
	}));

	const handleLogoClick = () => {
		setTip(true);
	};

	const login = (user) => {
		firebase
			.auth()
			.signInWithEmailAndPassword(user.email, user.password)
			.then((res) => {
				if(res.user) {
					setUser(res.user);
					console.log(user);
				}
			})
			.catch((error) => { console.log(error);});
	}

	const createUser = (email, password) => {
		firebase
			.auth()
			.createUserWithEmailAndPassword(email, password)
			.then(() => {
				const user = {
					email,
					password
				};

				handleCreateClose();
				login(user);
			})
			.catch(error => {
				console.log(error);
			});
	}

	const logout = () => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				setUser(null);
			})
			.catch(error => {
				console.log(error);
			});
	}

	const handleLogin = () => {
		const userInfo = {
			email: email,
			password: password
		}

		login(userInfo);

		setEmail("");
		setPassword("");
		//setLoginError(false);
		handleDialogClose();
	}

	const handleDialogOpen = () => {
		setDialogOpen(true);
	}
	const handleDialogClose = () => {
		setDialogOpen(false);
	}

	const handleCreateOpen = () => {
		setCreateOpen(true);
	}
	const handleCreateClose = () => {
		setCreateOpen(false)
	}
	const handleCreateUser = () => {
		createUser(email, password);
	}
	const handleLogout = () => {
		logout();
	}

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleLogoClick}
						edge="start"
						className={classes.menuButton}
					>
						<Typography>
							<img height="50" alt="chef-hat" src={logo} />
						</Typography>
					</IconButton>
					<div style={{ flex: 1 }}>
						<Typography
							variant="subtitle2"
							className={!tip && classes.hide}
							noWrap
						>
							More Options Coming Soon!
						</Typography>
					</div>
					<IconButton 
						color="inherit"
						aria-label="open drawer"
						onClick={handleDialogOpen}>
						<AccountCircleIcon style={{paddingRight: "3"}} />
						{ user ? 
							<Typography
								variant="subtitle2"
								noWrap
							>
								Welcome {user.email.split("@")[0]}!
							</Typography>
							:
							<Typography
								variant="subtitle2"
								noWrap
							>
								Login Here!
							</Typography>
						}
					</IconButton>
					<Dialog open={dialogOpen} onClose={handleDialogClose} aria-labelledby="form-dialog-title" onKeyPress={e => { if(e.key === 'Enter') handleLogin() }}>
						<DialogTitle id="form-dialog-title">Login</DialogTitle>
						<DialogContent>
							<TextField
								autoFocus
								margin="dense"
								id="username"
								label="Email Address"
								type="email"
								value={email}
								onChange={ e => setEmail(e.currentTarget.value) }
								fullWidth
							/>
							<TextField
								autoFocus
								margin="dense"
								id="password"
								label="Password"
								type="password"
								value={password}
								onChange={ e => setPassword(e.currentTarget.value) }
								fullWidth
							/>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleLogin} color="primary">
								Login
							</Button>
							<Button onClick={handleDialogClose} color="primary">
								Cancel
							</Button>
						</DialogActions>
						<DialogContent className={!loginError && classes.hide}>
							<DialogContentText color="error">Sorry, that login was incorrect. Try Again!</DialogContentText>
						</DialogContent>
					</Dialog>

					{user ? 
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleLogout}>
						<ExitToAppIcon style={{paddingRight: "3"}} />
						<Typography
							variant="subtitle2"
							noWrap
						>
							Logout
						</Typography>
					</IconButton>
					:
					<Fragment>
						<IconButton 
							color="inherit"
							aria-label="open drawer"
							onClick={handleCreateOpen}>
							<AssignmentIcon style={{paddingRight: "3"}} />
							<Typography
								variant="subtitle2"
								noWrap
							>
								Or Create a new Account
							</Typography>
						</IconButton>
						<Dialog open={createOpen} onClose={handleCreateClose} aria-labelledby="form-dialog-title" onKeyPress={e => { if(e.key === 'Enter') handleCreateUser() }}>
							<DialogTitle id="form-create-title">Create Account</DialogTitle>
							<DialogContent>
								<TextField
									autoFocus
									margin="dense"
									id="username"
									label="Email Address"
									type="email"
									value={email}
									onChange={ e => setEmail(e.currentTarget.value) }
									fullWidth
								/>
								<TextField
									autoFocus
									margin="dense"
									id="password"
									label="Password"
									type="password"
									value={password}
									onChange={ e => setPassword(e.currentTarget.value) }
									fullWidth
								/>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleCreateUser} color="primary">
									Create
								</Button>
								<Button onClick={handleCreateClose} color="primary">
									Cancel
								</Button>
							</DialogActions>
							<DialogContent className={!loginError && classes.hide}>
								<DialogContentText color="error">Sorry, that login was incorrect. Try Again!</DialogContentText>
							</DialogContent>
						</Dialog>
					</Fragment>
					}
				</Toolbar>
			</AppBar>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: open
				})}
			>
				<div className={classes.drawerHeader} style={{ marginTop: 0 }} />
				<Grid
					container
					direction="column"
					justify="space-between"
					alignItems="center"
					spacing={3}
					>
					{user ? <RecipeForm user={user}/> : <Grid item><Typography variant="h4" component="h2">Welcome, Feel Free to Browse or Login to Contribute!</Typography></Grid>}
					<Grid item>
						<Grid
							container
							direction="row"
							justify="space-evenly"
							alignItems="baseline"
							spacing={3}
							>
							{
								recipes.map((recipe) =>
									<Grid item>
										<Grid 
											container
											direction="row"
											justify="space-between"
											alignItems="right"
											>
												<Grid item>
													<Card className={classes.card} >
														<CardMedia
														className={classes.media}
														image={recipe.image}
														title="Contemplative Reptile"
														/>
														<CardContent>
															<Typography gutterBottom variant="h5" component="h2">
																{recipe.title}
															</Typography>
															<Typography variant="h6" color="textSecondary" component="p">
																Category: {recipe.category}
															</Typography>
															<ExpansionPanel>
																<ExpansionPanelSummary
																expandIcon={<ExpandMoreIcon />}
																aria-controls="panel1a-content"
																id="panel1a-header"
																>
																<Typography className={classes.heading}>Ingredients</Typography>
																</ExpansionPanelSummary>
																<ExpansionPanelDetails>
																<Typography>
																	{recipe.ingredients.split(",").map((ingredient) => {
																		return(
																			<List>
																				{ingredient}
																			</List>
																		);
																	})}
																</Typography>
																</ExpansionPanelDetails>
															</ExpansionPanel>
															<ExpansionPanel>
																<ExpansionPanelSummary
																expandIcon={<ExpandMoreIcon />}
																aria-controls="panel1a-content"
																id="panel1a-header"
																>
																<Typography className={classes.heading}>Directions</Typography>
																</ExpansionPanelSummary>
																<ExpansionPanelDetails>
																<Typography>
																	{recipe.directions.split("#").slice(1).map((direction) => {
																		return(
																			<List>
																				{direction}
																			</List>
																		);
																	})}
																</Typography>
																</ExpansionPanelDetails>
															</ExpansionPanel>
															<Typography variant="caption" color="textSecondary" component="p" caption>
																Submitted by '{recipe.username ? recipe.username.split("@")[0] : null}'
															</Typography>
														</CardContent>
													</Card>
												</Grid>
												{ user && user.email === recipe.username ? 
													<Grid item>
														<Tooltip title={`Delete ${recipe.title}`}>
															<IconButton onClick={ e => deleteRecipe(recipe)}>
																<ClearIcon />
															</IconButton>
														</Tooltip>
													</Grid>
													: null
												}
											</Grid>
									</Grid>
								)
							}
						</Grid>
					</Grid>
				</Grid>
			</main>
		</div>
	);
}

export default PageDisplay;
