import React, {useState} from 'react';
import '../css/header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Dialog} from "@material-ui/core";
import DialogTitle from '@material-ui/core/DialogTitle';
import {TextField} from "@material-ui/core";
import {Divider} from "@material-ui/core";
import DirectionsIcon from "@material-ui/icons/Directions";
import {InputBase} from "@material-ui/core";
import {Paper} from "@material-ui/core";

const Header = (props) => {
    const [isOpen, setOpen] = useState(false);
    const [arr, setValue] = useState([]);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const setArray = () => {
      console.log(arr);
      setOpen(false);
      props.updateArray(arr);
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
                <Button color="inherit" onClick={handleOpen}>Set Array</Button>
            </Toolbar>
            <Dialog open={isOpen} onClose={handleClose}>
                <div className={"arrayModal"}>
                    <DialogTitle id="dialogTitle">Array to order</DialogTitle>
                    <Paper component={"form"}>
                        <InputBase id={"arrayInput"} placeholder={"Input Array"} onChange={event => setValue(event.target.value)} inputProps={{'aria-label':'input array'}}/>
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