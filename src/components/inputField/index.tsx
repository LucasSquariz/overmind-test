import React from 'react';
import { TextField } from '@mui/material';
import Cleave from 'cleave.js/react';
import "./style.css";

interface Props {
    name: string;
    id: string;
    ref: any;
    value: string;
    type: string;
    error: boolean;
    errorMessage: string;
    onChange: (value: any) => void;
    onBlur: (value: any) => void;
    darkMode: boolean;
    inputProps?: {
        inputComponent: any;
    };
}

const InputField = ({ name, id, ref, value, type, error, errorMessage, onChange, onBlur, inputProps, darkMode }: Props) => {
    
    return (
        <>
            <TextField
                label={name}
                name={id}
                ref={ref}
                value={value}
                type={type}
                error={error}
                helperText={errorMessage}
                onChange={onChange}
                onBlur={onBlur}
                required
                fullWidth                
                style={darkMode ? {
                    background: 'white'
                } : {
                    background: 'white'
                }}
            />
            <p className={error ? "helperText-disabled" : " helperText-enabled"}></p>
        </>
    )
};    

export default InputField;