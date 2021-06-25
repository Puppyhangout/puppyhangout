import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { observer } from "mobx-react-lite";
import React from 'react';
import logo from '../../logo.png';
import { LoadingButton } from "../reusables/loading_button";
import './login_page.css';
import { login_store } from './login_store';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export const Login = observer(() => {
    /* eslint-disable-next-line*/
    const classes = useStyles();

    return (
        <div className="login-root">

            <div className='login-container'>
                <img style={{ marginBottom: '15px' }} width={150} src={logo} alt="Logo"></img>
                <TextField autoComplete="new-password" onKeyPress={e => e.key === 'Enter' ? login_store.login() : ''} id="outlined-basic" label="Username" variant="outlined" onChange={e => login_store.set_username(e.target.value)} />
                <TextField autoComplete="new-password" onKeyPress={e => e.key === 'Enter' ? login_store.login() : ''} id="outlined-basic" label="Password" variant="outlined" type="Password" onChange={e => login_store.set_password(e.target.value)} />
                <LoadingButton
                    color="primary"
                    variant="outlined"
                    onClick={() => login_store.login()}
                    loading={login_store.get_loading(login_store.login)}
                >
                    Login
                </LoadingButton>
                
            </div>
        </div>
    );
})