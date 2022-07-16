import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import { observer } from "mobx-react-lite";
import React from 'react';
// import { LoadingButton } from "./reusables/loading_button";
import './contact_page.css';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '5ch',
        },
    },
}));

export const Contact = observer(() => {
        /* eslint-disable-next-line*/
    const classes = useStyles();
    return (
        <div className="setting-root">
            <div className="setting-container">
                <p>Contact email: </p>
                <p><br /> admin@puppyhangout.com
                {/* <TextField onKeyPress={e => e.key === 'Enter' ? setting_store.setting() : ''} id="outlined-basic" label="Unit: km" variant="outlined" onChange={e => setting_store.set_distance(e.target.value)} /> */}
                </p>
                {/* <LoadingButton
                    color="primary"
                    variant="outlined"
                    onClick={() => setting_store.setting()}
                    loading={setting_store.get_loading(setting_store.setting)}
                >
                    Apply
                </LoadingButton> */}
                </div>
        </div>

    );

    // return ( 

    //     <div className="setting-root">
    //         <div className="setting-container">

    //             <p>Welcome, {setting_store.username}</p>
    //             <p><br /> Maximum distance:    
    //             <TextField onKeyPress={e => e.key === 'Enter' ? setting_store.setting() : ''} id="outlined-basic" label="Unit: km" variant="outlined" onChange={e => setting_store.set_distance(e.target.value)} />
    //             </p>
    //             <LoadingButton
    //                 color="primary"
    //                 variant="outlined"
    //                 onClick={() => setting_store.setting()}
    //                 loading={setting_store.get_loading(setting_store.setting)}
    //             >
    //                 Apply
    //             </LoadingButton>
    //             </div>
    //     </div>

    // );
})