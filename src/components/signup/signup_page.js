import { Button, Fab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { action } from 'mobx';
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

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const Signup = observer(() => {
    /* eslint-disable-next-line*/
    const classes = useStyles();

    return (
        <div className="signup-root">

            <div className='signup-container'>
                <img style={{ marginBottom: '15px' }} width={150} src={logo} alt="Hatzoloh Logo"></img>
                <TextField autoComplete="new-password" onKeyPress={e => e.key === 'Enter' ? signup_store.signup() : ''} id="outlined-basic" label="Dispatcher Number" variant="outlined" onChange={e => signup_store.set_username(e.target.value)} />

                <TextField autoComplete="new-password" onKeyPress={e => e.key === 'Enter' ? signup_store.signup() : ''} id="outlined-basic" label="Password" variant="outlined" type="Password" onChange={e => signup_store.set_password(e.target.value)} />

                <input
                    id='image_uploader'
                    accept="image/*" capture="camera"
                    // multiple
                    hidden
                    type='file'
                    onChange={action(async e => {
                        const new_pictures = await Promise.all(Array.from(e.target.files).map(file => toBase64(file)))
                        console.log(new_pictures)
                        signup_store.set_picture(new_pictures[0])
                        // store.ws_send(new_pictures.map((base_64) => {
                        //     return {
                        //         base_64,
                        //         gallery_name: store.gallery_name,
                        //         tombstoned: false
                        //     }
                        // }))
                    })}
                />

                <Button
                //  style={{ position: 'absolute', bottom: '5%', right: '10%' }}
                  onClick={() => document.getElementById('image_uploader').click()}>
                    <h2>+</h2>
                </Button>

                <img style={{objectFit: 'contain', width: '100px', height: '100px',}} src={signup_store.picture || ''} alt="picture" />

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