import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { observer } from "mobx-react-lite";
import React from 'react';
import logo from '../../logo.png';
import { LoadingButton } from "../reusables/loading_button";
import './message_page.css';
import { message_store } from './message_store';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export const Message = observer(() => {
    /* eslint-disable-next-line*/
    const classes = useStyles();

    return (
        <div className="message-root">
            <div className='message-container'>
                <div className="header">
                    <h1>Puppy Hangout</h1>
                </div>

                <div className="Column1" style={{ backgroundColor: "lavenderblush" }}>  
                    <Button color='primary' variant='contained'
                        onClick={action(() => login_store.show_page = true)}>Login</Button>


                    <Button color='primary' variant='contained'
                        onClick={action(() => signup_store.show_page = true)}>Signup</Button>

                    <Button color='primary' variant='contained'
                        onClick={action(() => setting_store.show_page = true)}>SETTING</Button>

                    <Button color='primary' variant='contained'
                        onClick={action(() => signup_store.show_page = true)}>MESSAGES</Button>

                    <p><br></br>Messages</p>
                    <p className="one">?</p>
                    <p className="one">You sent LuckyTheLab a like</p>
                    <p className="one">You sent chiyaya a like</p>
                </div>

                <LoadingButton
                        color="primary"
                        variant="outlined"
                        onClick={() => message_store.message()}
                        loading={message_store.get_loading(message_store.message)}
                    >
                </LoadingButton>
            </div>
        </div>);

})

