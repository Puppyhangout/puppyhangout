import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { action } from 'mobx';
import { observer } from "mobx-react-lite";
import React from 'react';
import { LoadingButton } from "../reusables/loading_button";
import './signup_page.css';
import { signup_store } from './signup_store';

import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../../firebase.js'



const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '5ch',
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
    const classes = useStyles();

    return (
        <div className="signup-root">
            <div className='signup-container'>
                <TextField autoComplete="new-password" onKeyPress={e => e.key === 'Enter' ? signup_store.signup() : ''} id="outlined-basic" label="Username" variant="outlined" onChange={e => signup_store.set_username(e.target.value)} />
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
                    })}
                />

                <Button
                //  style={{ position: 'absolute', bottom: '5%', right: '10%' }}
                  onClick={() => document.getElementById('image_uploader').click()}>
                    <img style={{objectFit: 'contain', width: '100px', height: '100px',}} src={signup_store.picture || ''} alt="click to add" />
                </Button>


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