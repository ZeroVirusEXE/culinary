import React, { useState, useEffect } from "react";

import clsx from 'clsx';
import { makeStyles } from "@material-ui/core/styles";
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import firebase from "./firebase";

const width = 200;

const useStyles = makeStyles(theme => ({
    grid: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    button: {
        marginTop: theme.spacing(5)
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width,
    },
    textFieldMulti: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: (width * 2) + 15,
    }
}));

const RecipeForm = (props) => {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [directions, setDirections] = useState("");
    const [image, setImage] = useState("");

    const classes = useStyles();

    function onSubmit(e) {
        e.preventDefault();
        console.log(props);

        firebase
            .firestore()
            .collection("recipes")
            .add({
                username: props.user.email,
                title,
                category,
                ingredients,
                directions,
                image
            })
            .then(() => {
                setTitle("");
                setCategory("");
                setIngredients("");
                setDirections("");
                setImage("");
            });
    }

	return (
		<form onSubmit={onSubmit}>
            <Grid
                className={classes.grid}
                container
                direction="column"
                justify="center"
                alignItems="center">
                <FormLabel variant="h2" color="primary">
                    Upload New Recipe
                </FormLabel>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start">
                    <Grid item>
                        <TextField
                            id="standard-required"
                            label="Title"
                            className={classes.textField}
                            value={title}
                            onChange={ e => setTitle(e.currentTarget.value) }
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="standard-required"
                            label="Category"
                            className={classes.textField}
                            value={category}
                            onChange={ e => setCategory(e.currentTarget.value) }
                            margin="normal"
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Ingredients"
                        multiline
                        rowsMax="4"
                        value={ingredients}
                        onChange={ e => setIngredients(e.currentTarget.value) }
                        className={classes.textFieldMulti}
                        margin="normal"
                        helperText="Use , to seperate ingredients (Don't use commas otherwise)"
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Directions"
                        multiline
                        rowsMax="4"
                        value={directions}
                        onChange={ e => setDirections(e.currentTarget.value) }
                        className={classes.textFieldMulti}
                        margin="normal"
                        helperText="Use # to seperate directions"
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Image"
                        multiline
                        rowsMax="4"
                        value={image}
                        onChange={ e => setImage(e.currentTarget.value) }
                        className={classes.textFieldMulti}
                        margin="normal"
                        helperText="Use the URL of an image from the internet"
                        fullWidth
                    />
                </Grid>
                <Grid item>
                    <Button type="submit">Submit</Button>
                </Grid>
            </Grid>
        </form>
	);
}

export default RecipeForm;

/*

Recipe
    title           String
    ingredients     String
    directions      String
    image           Blob
    username        String
    category        String
    Comments        { username, body }

*/