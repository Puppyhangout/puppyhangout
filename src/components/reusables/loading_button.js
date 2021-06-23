import { Button, CircularProgress } from '@material-ui/core'
import React from 'react';

export const LoadingButton = ({loading, children, onClick, style, color, variant}) =>
    <Button
        color={color}
        variant={variant}
        style={style} //green : blue
        onClick={onClick}
        disabled={loading === true ? true : false}
    >
        {loading === true ? <CircularProgress size={20} style={{color: 'lightgray'}} /> : children
        
    }
        
    </Button>