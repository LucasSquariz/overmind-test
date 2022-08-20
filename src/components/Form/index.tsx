import React, { useState, useRef } from 'react';
import './style.css';
import { Container } from '@mui/system';
import { Stack, TextField } from '@mui/material';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import Cleave from 'cleave.js/react';

interface User {
    firstName: string;
    lastName: string;
    email: string;
    telephone: string;
    password: string;
    cPassword: string;
    validFirstName: boolean;
    validLastName: boolean;
    validEmail: boolean;
    validCelphone: boolean;
    validPassword: boolean;
    validCPassword: boolean;
    log: string;
}

const Form = () => {

    const [validUser, setValidUser] = useState<User>({
        firstName: '',
        lastName: '',
        email: '',
        telephone: '',
        password: '',
        cPassword: '',
        validFirstName: false,
        validLastName: false,
        validEmail: false,
        validCelphone: false,
        validPassword: false,
        validCPassword: false,
        log: ''
    });

    const form = useRef() as React.MutableRefObject<HTMLInputElement>;
    const firstName = useRef() as React.MutableRefObject<HTMLInputElement>;
    const lastName = useRef() as React.MutableRefObject<HTMLInputElement>;
    const telephone = useRef() as React.MutableRefObject<HTMLInputElement>;
    const password = useRef() as React.MutableRefObject<HTMLInputElement>;
    const cPassword = useRef() as React.MutableRefObject<HTMLInputElement>;
    const email = useRef() as React.MutableRefObject<HTMLInputElement>;    

    const regexOnlyLetters = /^[a-zA-Z]*$/;    
    const regexValidEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;


    const customValidator = (input: any) => {
        switch (input) {
            case firstName.current:
                if (!regexOnlyLetters.test(validUser.firstName)) {
                    input.setCustomValidity("Nome deve conter apenas letras.");
                    input.reportValidity();
                    setValidUser({ ...validUser, validFirstName: false });
                    return input.blur();
                } else if (validUser.firstName.length > 8 || validUser.firstName.length < 2) {
                    input.setCustomValidity("Nome deve ter entre 2-8 letras.");
                    input.reportValidity();
                    setValidUser({ ...validUser, validFirstName: false });
                    return input.blur();
                } else {
                    input.setCustomValidity('');
                    setValidUser({ ...validUser, validFirstName: true });
                }
                break;

            case lastName.current:
                if (!regexOnlyLetters.test(validUser.lastName)) {
                    input.setCustomValidity("Sobrenome deve conter apenas letras.");
                    input.reportValidity();
                    setValidUser({ ...validUser, validLastName: false });
                    return input.blur();
                } else if (validUser.lastName.length > 8 || validUser.lastName.length < 2) {
                    input.setCustomValidity("Sobrenome deve ter entre 2-8 letras.");
                    input.reportValidity();
                    setValidUser({ ...validUser, validLastName: false });
                    return input.blur();
                } else if (validUser.lastName.length <= 8 && validUser.lastName.length >= 2) {
                    input.setCustomValidity('');
                    setValidUser({ ...validUser, validLastName: true });
                }
                break;

            case email.current:
                if (!regexValidEmail.test(validUser.email)) {
                    input.setCustomValidity("Email incorreto");
                    input.reportValidity();
                    setValidUser({ ...validUser, validEmail: false });
                    return input.blur();
                } else {
                    input.setCustomValidity('');
                    setValidUser({ ...validUser, validEmail: true });
                }
                break;

            case telephone.current:
                if (validUser.telephone.length != 14) {
                    input.element.setCustomValidity("Telefone deve ter 11 digitos incluindo o ddd");
                    input.element.reportValidity();
                    setValidUser({ ...validUser, validCelphone: false });
                    return input.element.blur();
                } else {
                    input.element.setCustomValidity('');
                    setValidUser({ ...validUser, validCelphone: true });
                }
                break;

            case password.current:
                if (validUser.password.length < 6) {
                    input.setCustomValidity("A senha deve ter pelo menos 6 digitos");
                    input.reportValidity();
                    setValidUser({ ...validUser, validPassword: false });
                    return input.blur();
                } else {
                    input.setCustomValidity('');
                    setValidUser({ ...validUser, validPassword: true });
                }
                break;

            case cPassword.current:
                if (validUser.password !== validUser.cPassword) {
                    input.setCustomValidity("As senhas devem ser iguais.");
                    input.reportValidity();
                    setValidUser({ ...validUser, validCPassword: false });
                    return input.blur();
                } else {
                    input.setCustomValidity('');
                    setValidUser({ ...validUser, validCPassword: true });
                }
                break;
            default: ;
        }
    }

    const sendEmail = (e: any) => {
        e.preventDefault();
        if (
            validUser.validFirstName
            && validUser.validLastName
            && validUser.validCelphone
            && validUser.validPassword
            && validUser.validCPassword
        ) {
            // @ts-ignore
            emailjs.sendForm('service_e2jmb4q', 'template_oq9ey1r', form.current, 'v5E4H3ABua3U3yyX2')
                .then((result: any) => {
                    console.log(result.text);
                    Swal.fire({
                        icon: 'success',
                        title: 'Cadastro realizado com sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }, (error: any) => {
                    console.log(error.text);
                });
        }

    };

    return (
        <div className="container">
            <div>
                <h3>{validUser.log}</h3>
            </div>
            {/* @ts-ignore */}
            <form ref={form} className="form" onSubmit={sendEmail} autoComplete="off">                
                <input autoComplete="false" name="hidden" type="text" style={{ display: 'none' }} />               
                <div className="form-div">                    
                    <div className="label-div">
                        <label className="label-field" htmlFor="firstName" >Nome:</label>
                        <label className="label-field" htmlFor="lastName" >Sobrenome:</label>
                        <label className="label-field" htmlFor="email" >Email:</label>
                        <label className="label-field" htmlFor="telephone" >Celular:</label>
                        <label className="label-field" htmlFor="password" >Senha:</label>
                        <label className="label-field" htmlFor="cPassword" >Confirme a senha:</label>
                    </div>
                    <div className="input-div">                       
                        <input
                            ref={firstName}
                            onBlur={() => customValidator(firstName.current)}
                            type="text"
                            name="firstName"
                            className="input-field"
                            id="firstName"
                            required
                            value={validUser.firstName}
                            onChange={(e) => setValidUser({ ...validUser, firstName: e.target.value.trim() })} />
                        <input
                            ref={lastName}
                            onBlur={() => customValidator(lastName.current)}
                            type="text"
                            name="lastName"
                            className="input-field"
                            id="lastName"
                            required
                            value={validUser.lastName}
                            onChange={(e) => setValidUser({ ...validUser, lastName: e.target.value.trim() })} />
                        <input
                            ref={email}
                            onBlur={() => customValidator(email.current)}
                            type="email"
                            name="email"
                            className="input-field"
                            id="email"
                            required
                            value={validUser.email}
                            onChange={(e) => setValidUser({ ...validUser, email: e.target.value })} />
                        <Cleave
                            // @ts-ignore
                            ref={telephone}
                            onBlur={() => customValidator(telephone.current)}
                            type="text"
                            name="telephone"
                            className="input-field"
                            id="telephone"
                            required
                            value={validUser.telephone}
                            options={{
                                delimiters: ['(', ')', '-'],
                                blocks: [0, 2, 5, 4],
                                numericOnly: true
                            }}
                            onChange={(e) => setValidUser({ ...validUser, telephone: e.target.value })} />
                        <input
                            ref={password}
                            onBlur={() => customValidator(password.current)}
                            type="password"
                            name="password"
                            className="input-field"
                            id="password"
                            required
                            value={validUser.password}
                            onChange={(e) => setValidUser({ ...validUser, password: e.target.value })} />
                        <input
                            ref={cPassword}
                            onBlur={() => customValidator(cPassword.current)}
                            type="password"
                            name="password-confirmation"
                            className="input-field"
                            id="cPassword"
                            required
                            value={validUser.cPassword}
                            onChange={(e) => setValidUser({ ...validUser, cPassword: e.target.value })} />
                    </div>
                    <input type="submit" value="Enviar" />
                </div >
            </form>
        </div >
    )
}

export default Form;