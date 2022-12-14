import React, { useState, useRef } from 'react';
import './style.css';
import { Container } from '@mui/system';
import { Stack, TextField, Button, Box, Typography, IconButton, ThemeProvider } from '@mui/material';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import InputField from '../inputField';
import CleaveInput from '../inputField/cleaveInput';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import theme from './theme/index';
import { User } from '../../types/index';

// Estado inicial ddo formulário
const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    telephone: '',
    password: '',
    cPassword: '',
    validFirstName: false,
    validLastName: false,
    validEmail: false,
    validTelephone: false,
    validPassword: false,
    validCPassword: false,
    darkMode: false,
    errorMessage: {
        firstNameErr: '',
        lastNameErr: '',
        emailErr: '',
        telephoneErr: '',
        passwordErr: '',
        cPasswordErr: '',
    }
}

// Função responsável por retornar o elemento form do HTML
const Form = () => {    
    //Setando o estado inicial com o Hook useState
    const [validUser, setValidUser] = useState<User>(initialState);

    //Criando constantes para manipular o DOM da página com o auxilio do hook useRef
    const form = useRef() as React.MutableRefObject<HTMLInputElement>;
    const firstName = useRef() as React.MutableRefObject<HTMLInputElement>;
    const lastName = useRef() as React.MutableRefObject<HTMLInputElement>;
    const telephone = useRef() as React.MutableRefObject<HTMLInputElement>;
    const password = useRef() as React.MutableRefObject<HTMLInputElement>;
    const cPassword = useRef() as React.MutableRefObject<HTMLInputElement>;
    const email = useRef() as React.MutableRefObject<HTMLInputElement>;

    //RegEx responsáveis pela lógica de validação do email, do nome e sobrenome e email.
    const regexOnlyLetters = /^[a-zA-Z]*$/;
    const regexValidEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

    //Função responsável pela validação dos campos, alterando o tipo de erro conforme a necessidade.
    //Recebe uma string com o nome do campo e executa a validação de acordo com as regras daquele campo.
    const customValidator = (input: string) => {
        switch (input) {
            case 'firstName':
                if (!regexOnlyLetters.test(validUser.firstName)) {
                    setValidUser({
                        ...validUser,
                        errorMessage: {
                            ...validUser.errorMessage,
                            firstNameErr: 'Nome deve conter apenas letras.'
                        },
                        validFirstName: false
                    });
                } else if (validUser.firstName.length > 12 || validUser.firstName.length < 2) {
                    setValidUser({
                        ...validUser,
                        errorMessage: {
                            ...validUser.errorMessage,
                            firstNameErr: 'Nome deve ter entre 2-12 letras.'
                        },
                        validFirstName: false
                    });
                } else {
                    setValidUser({
                        ...validUser,
                        errorMessage: {
                            ...validUser.errorMessage,
                            firstNameErr: ''
                        },
                        validFirstName: true
                    });
                }
                break;

            case 'lastName':
                if (!regexOnlyLetters.test(validUser.lastName)) {
                    setValidUser({
                        ...validUser,
                        errorMessage: {
                            ...validUser.errorMessage,
                            lastNameErr: 'Sobrenome deve conter apenas letras.'
                        },
                        validLastName: false
                    });
                } else if (validUser.lastName.length > 12 || validUser.lastName.length < 2) {
                    setValidUser({
                        ...validUser,
                        errorMessage: {
                            ...validUser.errorMessage,
                            lastNameErr: 'Sobrenome deve ter entre 2-12 letras.'
                        },
                        validLastName: false
                    });
                } else if (validUser.lastName.length <= 8 && validUser.lastName.length >= 2) {
                    setValidUser({
                        ...validUser,
                        errorMessage: {
                            ...validUser.errorMessage,
                            lastNameErr: ''
                        },
                        validLastName: true
                    });
                }
                break;

            case 'email':
                if (!regexValidEmail.test(validUser.email)) {
                    setValidUser({
                        ...validUser,
                        errorMessage: {
                            ...validUser.errorMessage,
                            emailErr: 'Email inválido. Exemplo: nome@mail.com'
                        },
                        validEmail: false
                    });
                } else {
                    setValidUser({
                        ...validUser,
                        errorMessage: {
                            ...validUser.errorMessage,
                            emailErr: ''
                        },
                        validEmail: true
                    });
                }
                break;

            case 'telephone':
                if (validUser.telephone.length !== 14) {
                    setValidUser({
                        ...validUser,
                        errorMessage: {
                            ...validUser.errorMessage,
                            telephoneErr: 'Telefone deve ter  pelo menos 11 digitos.'
                        },
                        validTelephone: false
                    });
                } else {
                    setValidUser({
                        ...validUser,
                        errorMessage: {
                            ...validUser.errorMessage,
                            telephoneErr: ''
                        },
                        validTelephone: true
                    });
                }
                break;

            case 'password':
                if (validUser.password.length < 6) {
                    setValidUser({
                        ...validUser,
                        errorMessage: {
                            ...validUser.errorMessage,
                            passwordErr: 'A senha deve ter pelo menos 6 digitos.'
                        },
                        validPassword: false
                    });
                } else {
                    setValidUser({
                        ...validUser,
                        errorMessage: {
                            ...validUser.errorMessage,
                            passwordErr: ''
                        },
                        validPassword: true
                    });
                }
                break;
            case 'cPassword':
                if (validUser.password !== validUser.cPassword || validUser.cPassword === '') {
                    setValidUser({
                        ...validUser,
                        errorMessage: {
                            ...validUser.errorMessage,
                            cPasswordErr: 'As senhas devem ser iguais.'
                        },
                        validCPassword: false
                    });
                } else {
                    setValidUser({
                        ...validUser,
                        errorMessage: {
                            ...validUser.errorMessage,
                            cPasswordErr: ''
                        },
                        validCPassword: true
                    });
                }
                break;
            default: ;
        }
    }

    //Função responsável por ativar ou desativar o modo escuro(dark mode).
    const toogleDarkMode = () => {
        setValidUser({ ...validUser, darkMode: !validUser.darkMode });
    }

    //Função responsável por enviar um email com as informações do formulário.
    //Primeiro valida se todos os campos estão corretos e, então, envia o email.
    const sendEmail = (e: any) => {
        e.preventDefault();
        if (
            validUser.validFirstName
            && validUser.validLastName
            && validUser.validEmail
            && validUser.validTelephone
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
                    Swal.fire({
                        icon: 'error',
                        title: 'Falha ao criar o cadastro, revise seus dados e tente novamente!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                });
        }
    };

    //Retorno do componente Form que será renderizado.
    return (
        <div className={validUser.darkMode ? "Singin-page-dark-mode" : "Singin-page-light-mode"}>
            <ThemeProvider theme={theme}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="80vh"
                    flexDirection="column"
                    >
                    <Typography variant="h4" marginBottom={'1rem'} marginTop={'3rem'} style={validUser.darkMode ? {
                        color: 'white'
                    } : {
                        color: '#121212'
                    }}>
                        Cadastro
                    </Typography>
                    <Container maxWidth="xl">
                        {/* @ts-ignore */}
                        <form ref={form} className="form" onSubmit={sendEmail} autoComplete="off">                        
                            <Stack
                                direction="column"
                                justifyContent='center'
                                alignItems='center'
                                spacing={'1em'}>
                                <Container maxWidth="xs">
                                    <InputField
                                        name={"Nome"}
                                        id={"firstName"}
                                        ref={firstName}
                                        value={validUser.firstName}
                                        type={'text'}
                                        error={!!validUser.errorMessage.firstNameErr}
                                        errorMessage={!!validUser.errorMessage.firstNameErr ? validUser.errorMessage.firstNameErr : ''}
                                        onChange={(e: any) => setValidUser({ ...validUser, firstName: e.target.value.trim() })}
                                        onBlur={() => customValidator('firstName')}
                                        darkMode={validUser.darkMode}
                                    />
                                </Container>
                                <Container maxWidth="xs">
                                    <InputField
                                        name={"Sobrenome"}
                                        id={"lastName"}
                                        ref={lastName}
                                        value={validUser.lastName}
                                        type={'text'}
                                        error={!!validUser.errorMessage.lastNameErr}
                                        errorMessage={!!validUser.errorMessage.lastNameErr ? validUser.errorMessage.lastNameErr : ''}
                                        onChange={(e: any) => setValidUser({ ...validUser, lastName: e.target.value.trim() })}
                                        onBlur={() => customValidator('lastName')}
                                        darkMode={validUser.darkMode}
                                    />
                                </Container>
                                <Container maxWidth="xs">
                                    <InputField
                                        name={"Email"}
                                        id={"email"}
                                        ref={email}
                                        value={validUser.email}
                                        type={'text'}
                                        error={!!validUser.errorMessage.emailErr}
                                        errorMessage={!!validUser.errorMessage.emailErr ? validUser.errorMessage.emailErr : ''}
                                        onChange={(e: any) => setValidUser({ ...validUser, email: e.target.value.trim() })}
                                        onBlur={() => customValidator('email')}
                                        darkMode={validUser.darkMode}
                                    />
                                </Container>
                                <Container maxWidth="xs">
                                    <TextField
                                        label={"Celular"}
                                        name={"telephone"}
                                        ref={telephone}
                                        value={validUser.telephone}
                                        type={'text'}
                                        error={!!validUser.errorMessage.telephoneErr}
                                        helperText={!!validUser.errorMessage.telephoneErr ? validUser.errorMessage.telephoneErr : ''}
                                        FormHelperTextProps={ validUser.darkMode ? {style: { backgroundColor: 'black' }} : {}}
                                        onChange={(e: any) => setValidUser({ ...validUser, telephone: e.target.value.trim() })}
                                        onBlur={() => customValidator('telephone')}
                                        required
                                        fullWidth
                                        variant={'filled'}
                                        style={validUser.darkMode ? {
                                            background: 'white'
                                        } : {
                                            background: 'white'
                                        }}
                                        InputProps={{
                                            inputComponent: CleaveInput,
                                        }}
                                    />
                                    <p className={!!validUser.errorMessage.telephoneErr ? "helperText-disabled" : " helperText-enabled"}></p>
                                </Container>
                                <Container maxWidth="xs">
                                    <InputField
                                        name={"Senha"}
                                        id={"password"}
                                        ref={password}
                                        value={validUser.password}
                                        type={'password'}
                                        error={!!validUser.errorMessage.passwordErr}
                                        errorMessage={!!validUser.errorMessage.passwordErr ? validUser.errorMessage.passwordErr : ''}
                                        onChange={(e: any) => setValidUser({ ...validUser, password: e.target.value.trim() })}
                                        onBlur={() => customValidator('password')}
                                        darkMode={validUser.darkMode}
                                    />
                                </Container>
                                <Container maxWidth="xs">
                                    <div className="teste-div">
                                    <InputField
                                        name={"Confirme a senha"}
                                        id={"cPassword"}
                                        ref={cPassword}
                                        value={validUser.cPassword}
                                        type={'password'}
                                        error={!!validUser.errorMessage.cPasswordErr}
                                        errorMessage={!!validUser.errorMessage.cPasswordErr ? validUser.errorMessage.cPasswordErr : ''}
                                        onChange={(e: any) => setValidUser({ ...validUser, cPassword: e.target.value.trim() })}
                                        onBlur={() => customValidator('cPassword')}
                                        darkMode={validUser.darkMode}
                                    />
                                    </div>
                                </Container>
                                <Button variant="contained" type="submit" >Enviar</Button>
                            </Stack>
                        </form>
                    </Container>
                </Box>
                <div className={validUser.darkMode ?"container-button-dark-mode" : ''}>
                    <IconButton
                        aria-label="lightMode"
                        onClick={() => toogleDarkMode()}
                        style={validUser.darkMode
                            ? { color: 'white' }
                            : { color: '' }}>
                        <Brightness4Icon />
                    </IconButton>
                </div>
            </ThemeProvider>
        </div >
    )
}

export default Form;