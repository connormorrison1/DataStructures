import React, {useState} from 'react';
import '../css/header.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Dialog} from "@material-ui/core";
import DialogTitle from '@material-ui/core/DialogTitle';
import {Divider} from "@material-ui/core";
import DirectionsIcon from "@material-ui/icons/Directions";
import {InputBase} from "@material-ui/core";
import {Paper} from "@material-ui/core";
import {FormControl} from "@material-ui/core";
import {InputLabel} from "@material-ui/core";
import {Select} from "@material-ui/core";
import {MenuItem} from "@material-ui/core";

const Header = (props) => {
    const [isOpen, setOpen] = useState(false);
    const [arrayToStruct, updateArray] = useState([]);
    const [dataStruct, setStruct] = useState("BST");
    const handleChange = event => {
      setStruct(event.target.value);
    };
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const setArray = () => {
      setOpen(false);
      props.updateArray(arrayToStruct, dataStruct);
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={""} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" id={"title"}>
                    Data Structures
                </Typography>
                <Button color="inherit" onClick={handleOpen}>Create Data Structure</Button>
            </Toolbar>
            <Dialog open={isOpen} onClose={handleClose}>
                <div className={"arrayModal"}>
                    <DialogTitle id="dialogTitle">Array to order</DialogTitle>
                    <p>Data Structure:</p>
                    <FormControl variant="outlined" id={"selectBox"}>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={dataStruct}
                            onChange={handleChange}
                        >
                            <MenuItem value={"BST"}>Binary Search Tree</MenuItem>
                            <MenuItem value={"Trie"}>Trie</MenuItem>
                        </Select>
                    </FormControl>
                    <p>Array:</p>
                    <Paper component={"form"}>
                        <InputBase id={"arrayInput"} placeholder={"Input Array"} onChange={event => updateArray(event.target.value)} inputProps={{'aria-label':'input array'}}/>
                        <Divider id={"divider"} orientation ="vertical"/>
                        <IconButton id = "buildArray" color = "primary" aria-label={"directions"} onClick={setArray}>
                            <DirectionsIcon/>
                        </IconButton>
                    </Paper>
                </div>
            </Dialog>
        </AppBar>
    );
};

export default Header;