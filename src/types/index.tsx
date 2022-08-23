//Tipos dos objetos usados na aplicação
export interface User {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
    cPassword: string;
    validFirstName: boolean;
    validLastName: boolean;
    validEmail: boolean;
    validTelephone: boolean;
    validPassword: boolean;
    validCPassword: boolean;
    darkMode: boolean;
    errorMessage: {
        firstNameErr: string,
        lastNameErr: string,
        emailErr: string,
        telephoneErr: string,
        passwordErr: string,
        cPasswordErr: string,
    }
}

export interface InputProps {
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