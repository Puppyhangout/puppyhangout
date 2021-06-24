import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { observer } from "mobx-react-lite";
import React from 'react';
import logo from '../../logo.png';
import { LoadingButton } from "../reusables/loading_button";
import './setting_page.css';
import { setting_store } from './setting_store';

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
        <div className="setting-root">

            <div className='setting-container'>
                <img style={{ marginBottom: '15px' }} width={150} src={logo} alt="Hatzoloh Logo"></img>
                <TextField autoComplete="new-password" onKeyPress={e => e.key === 'Enter' ? setting_store.setting() : ''} id="outlined-basic" label="Username" variant="outlined" onChange={e => setting_store.set_username(e.target.value)} />

                <TextField autoComplete="new-password" onKeyPress={e => e.key === 'Enter' ? setting_store.setting() : ''} id="outlined-basic" label="Password" variant="outlined" type="Password" onChange={e => setting_store.set_password(e.target.value)} />
                <LoadingButton
                    color="primary"
                    variant="outlined"
                    onClick={() => setting_store.setting()}
                    loading={setting_store.get_loading(setting_store.setting)}
                >
                    Login
                </LoadingButton>
                <p><br />Maximum distance</p>
                <form action="http://www.cs.mcgill.ca/~zshi11/cgi-bin/answer.cgi" method="get">
                    <input type="text" name="name" />
                    <input type="submit" value="Submit" />
                </form>
                
            </div>
        </div>
    );
})