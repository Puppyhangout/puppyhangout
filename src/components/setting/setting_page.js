import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { observer } from "mobx-react-lite";
import React from 'react';
import { LoadingButton } from "../reusables/loading_button";
import './setting_page.css';
import { setting_store } from './setting_store';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '5ch',
        },
    },
}));

export const Setting = observer(() => {
    const classes = useStyles();

    return ( 
        <div className="setting-root">
            <div className="setting-container">
                <p>Welcome, {setting_store.username}</p>
                <p><br /> Maximum distance:    
                <TextField onKeyPress={e => e.key === 'Enter' ? setting_store.setting() : ''} id="outlined-basic" label="Unit: km" variant="outlined" onChange={e => setting_store.set_distance(e.target.value)} />
                </p>
                <LoadingButton
                    color="primary"
                    variant="outlined"
                    onClick={() => setting_store.setting()}
                    loading={setting_store.get_loading(setting_store.setting)}
                >Apply</LoadingButton>
                </div>
        </div>
    );
})