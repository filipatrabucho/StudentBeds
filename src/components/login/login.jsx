import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate("/dashboard"); 

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            username,
            password
        };

        try {
            const response = await axios.post('http://localhost/studentbedsbackend/staff/login.php', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                alert('Login realizado com sucesso!');

                // Armazena um token de autenticação ou um indicador de sessão
                localStorage.setItem('authToken', response.data.token);

                // Redireciona para a página de dashboard
                navigate('/dashboard');
            } else {
                console.error('Erro ao realizar login:', response.data.message);
                alert('Erro ao realizar login.');
            }
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            alert('Erro ao realizar login.');
        }
    };

    return (
        <div className='login'>
            <form onSubmit={handleSubmit}>
                <h1>Student<span>Beds</span></h1>
                <input
                    type='text'
                    placeholder='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type='submit'>Entrar</button>
            </form>
        </div>
    );
}

export default Login;
