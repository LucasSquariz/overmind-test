import React from 'react';
import { TextField} from '@mui/material';
import "./style.css";
import { InputProps } from '../../types/index';

const InputField = ({ name, id, ref, value, type, error, errorMessage, onChange, onBlur, darkMode }: InputProps) => {    
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
                variant={'filled'}
                FormHelperTextProps={ darkMode ? {style: { backgroundColor: 'black' }} : {}}
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