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
                <img style={{ marginBottom: '15px' }} width={150} src={logo} alt="Hatzoloh Logo"></img>
                <TextField autoComplete="new-password" onKeyPress={e => e.key === 'Enter' ? message_store.message() : ''} id="outlined-basic" label="Username" variant="outlined" onChange={e => message_store.set_username(e.target.value)} />

                <TextField autoComplete="new-password" onKeyPress={e => e.key === 'Enter' ? message_store.message() : ''} id="outlined-basic" label="Password" variant="outlined" type="Password" onChange={e => message_store.set_password(e.target.value)} />
                <LoadingButton
                    color="primary"
                    variant="outlined"
                    onClick={() => message_store.message()}
                    loading={message_store.get_loading(message_store.message)}
                >
                    Message
                </LoadingButton>
                
            </div>
        </div>
    );
})