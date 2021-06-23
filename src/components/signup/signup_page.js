import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { observer } from "mobx-react-lite";
import React from 'react';
import logo from '../../logo.png';
import { LoadingButton } from "../reusables/loading_button";
import './signup_page.css';
import { signup_store } from './signup_store';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export const Signup = observer(() => {
    /* eslint-disable-next-line*/
    const classes = useStyles();

    return (
        <div className="signup-root">

            <div className='signup-container'>
                <img style={{ marginBottom: '15px' }} width={150} src={logo} alt="Hatzoloh Logo"></img>
                <TextField autoComplete="new-password" onKeyPress={e => e.key === 'Enter' ? signup_store.signup() : ''} id="outlined-basic" label="Dispatcher Number" variant="outlined" onChange={e => signup_store.set_username(e.target.value)} />

                <TextField autoComplete="new-password" onKeyPress={e => e.key === 'Enter' ? signup_store.signup() : ''} id="outlined-basic" label="Password" variant="outlined" type="Password" onChange={e => signup_store.set_password(e.target.value)} />
                <LoadingButton
                    color="primary"
                    variant="outlined"
                    onClick={() => signup_store.signup()}
                    loading={signup_store.get_loading(signup_store.signup)}
                >
                    Signup
                </LoadingButton>
                
            </div>
        </div>
    );
})