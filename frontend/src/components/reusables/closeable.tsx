// @ts-nocheck
import { IconButton } from '@material-ui/core'
import React from 'react'

export const Closable = ({ children, onClose }) => (
    <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'auto 35px',
            gridTemplateRows: '35px auto'
        }}
    >
        <div
            style={{
                gridColumn: '1 / 3',
                gridRow: '1 / 3'
            }}
        >
            {children}
        </div>

        <IconButton
            onClick={onClose}
            style={{
                gridColumn: '2 / 3',
                gridRow: '1 / 2'
            }}
            className='close-icon'
            aria-label='delete'
        >
            x
        </IconButton>
    </div>
)
