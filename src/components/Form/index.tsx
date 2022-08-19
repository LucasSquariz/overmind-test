import { Container } from '@mui/system';
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './style.css';
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
    validCelphone: boolean;
    validPassword: boolean;
    validCPassword: boolean;
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
        validCelphone: false,
        validPassword: false,
        validCPassword: false
    });

    const form = useRef() as React.MutableRefObject<HTMLInputElement>;
    const firstName = useRef() as React.MutableRefObject<HTMLInputElement>;
    const lastName = useRef() as React.MutableRefObject<HTMLInputElement>;
    const telephone = useRef() as React.MutableRefObject<HTMLInputElement>;
    const password = useRef() as React.MutableRefObject<HTMLInputElement>;
    const cPassword = useRef() as React.MutableRefObject<HTMLInputElement>;
    const email = useRef() as React.MutableRefObject<HTMLInputElement>;

    const regexOnlyLetters = /^[a-zA-Z]*$/;
    const regexOnlyTelephone = /^\([0-9]{2}\)(([0-9]{4}-[0-9]{4})|([0-9]{5}-[0-9]{4}))$/;


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
                } else if (validUser.firstName.length <= 8 && validUser.firstName.length >= 2) {
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

            case telephone.current:
                if (!regexOnlyLetters.test(validUser.telephone)) {
                    input.setCustomValidity("Telefone deve estar no formato (XX)XXXX-XXXX ou (XX)XXXXX-XXXX.");
                    input.reportValidity();
                    setValidUser({ ...validUser, validCelphone: false });
                    return input.blur();
                } else {
                    input.setCustomValidity('');
                    setValidUser({ ...validUser, validCelphone: true });
                }
                break;

            case password.current:
                if (validUser.password.length < 8) {
                    input.setCustomValidity("A senha deve ter pelo menos 8 digitos");
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
        <Container>
            {/* @ts-ignore */}
            <form ref={form} className="form" onSubmit={sendEmail} autoComplete="off">
                <input autoComplete="false" name="hidden" type="text" style={{ display: 'none' }} />
                {console.log(validUser.telephone.length)}
                {/* @ts-ignore */}
                <fieldset className="form-div">
                    <label>Nome:
                        <input
                            ref={firstName}
                            onBlur={() => customValidator(firstName.current)}
                            type="text"
                            name="firstName"
                            required
                            value={validUser.firstName}
                            onChange={(e) => setValidUser({ ...validUser, firstName: e.target.value })} />
                    </label>
                    <label>Sobrenome:
                        <input
                            ref={lastName}
                            onBlur={() => customValidator(lastName.current)}
                            type="text" name="lastName"
                            required
                            value={validUser.lastName}
                            onChange={(e) => setValidUser({ ...validUser, lastName: e.target.value })} />
                    </label>
                    <label>Email:
                        <input
                            ref={email}
                            type="email"
                            name="email"
                            required
                            value={validUser.email}
                            onChange={(e) => setValidUser({ ...validUser, email: e.target.value })} />
                    </label>
                    <label>Celular:
                        <Cleave                            
                            // @ts-ignore
                            ref={telephone}
                            onBlur={() => customValidator(telephone.current)}
                            type="text" name="telephone"
                            required
                            value={validUser.telephone}
                            options={{
                                delimiters: ['(', ')', '-'],
                                blocks: [0, 2, 5, 4],
                                numericOnly: true                               
                            }}
                            onChange={(e) => setValidUser({ ...validUser, telephone: e.target.value })} 
                            />
                    </label>
                    <label>Senha:
                        <input
                            ref={password}
                            onBlur={() => customValidator(password.current)}
                            type="password"
                            name="password"
                            required
                            value={validUser.password}
                            onChange={(e) => setValidUser({ ...validUser, password: e.target.value })} />
                    </label>
                    <label>Confirme a senha:
                        <input
                            ref={cPassword}
                            onBlur={() => customValidator(cPassword.current)}
                            type="password"
                            name="password-confirmation"
                            required
                            value={validUser.cPassword}
                            onChange={(e) => setValidUser({ ...validUser, cPassword: e.target.value })} />
                    </label>
                    <input type="submit" value="Enviar" />
                </fieldset>
            </form>
        </Container>
    )
}

export default Form;