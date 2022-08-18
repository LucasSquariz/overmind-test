import { Container } from '@mui/system';
import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './style.css';

interface User {
    name: string;
    email: string;
    telephone: string;
    password: string;
}

const Form = () => {

    const form = useRef();

    const sendEmail = (e: any) => {
        e.preventDefault();
        //@ts-ignore
        emailjs.sendForm('service_e2jmb4q', 'template_oq9ey1r', form.current, 'v5E4H3ABua3U3yyX2')
            .then((result: any) => {
                console.log(result.text);
            }, (error: any) => {
                console.log(error.text);
            });
    };

    const [user, setUser] = useState<User>({
        name: '',
        email: '',
        telephone: '',
        password: '',
    });

    return (
        <Container>
            {/* @ts-ignore */}
            <form ref={form} className="form" onSubmit={sendEmail}>
                {console.log(user)}
                <fieldset className="form-div">
                    <label>Nome Completo:
                        <input type="text" name="name" />
                    </label>
                    <label>Email:
                        <input type="email" name="email"/>
                    </label>
                    <label>Telefone:
                        <input type="text" name="telephone" />
                    </label>
                    <label>Senha:
                        <input type="password" name="password" />
                    </label>
                    <label>Confirme a senha:
                        <input type="password" name="password-confirmation" />
                    </label>
                    <input type="submit" value="Enviar" />
                </fieldset>
            </form>
        </Container>
    )
}

export default Form;