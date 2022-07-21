import { Button, CircularProgress } from '@mui/material'
import React from 'react'

export const LoadingButton = ({
    loading,
    children,
    onClick,
    style,
    color,
    variant
}: {
    loading: boolean
    children: any
    onClick: any
    style?: Object
    color: 'inherit' | 'primary' | 'secondary' | 'default'
    variant: 'text' | 'outlined' | 'contained' | undefined
}) => (
    <Button
        color={color as any}
        variant={variant}
        style={style} //green : blue
        onClick={onClick}
        disabled={loading === true ? true : false}
    >
        {loading === true ? (
            <CircularProgress size={20} style={{ color: 'lightgray' }} />
        ) : (
            children
        )}
    </Button>
)
