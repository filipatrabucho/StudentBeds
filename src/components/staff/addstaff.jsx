import React, { useState } from 'react';
import axios from 'axios';
import Menu from '../menu/menu';

function AddStaff() {
    // Estados para armazenar os valores dos campos do formulário
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Função para lidar com o envio do formulário
    const handleSubmit = async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Dados a serem enviados
        const data = {
            name,
            username,
            password
        };

        try {
            // Envia os dados para o script PHP
            const response = await axios.post('http://localhost/studentbedsbackend/staff/add_staff.php', data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Verifica a resposta do servidor
            if (response.data.success) {
                alert('Funcionário adicionado com sucesso!');
                // Limpa o formulário
                clearForm();
            } else {
                console.error('Erro ao adicionar funcionário:', response.data.message);
                alert('Erro ao adicionar funcionário.');
            }
        } catch (error) {
            console.error('Erro ao adicionar funcionário:', error);
            alert('Erro ao adicionar funcionário.');
        }
    };

    // Função para limpar o formulário
    const clearForm = () => {
        setName('');
        setUsername('');
        setPassword('');
    };

    return (
        <>
            <Menu />
            <div className='container'>
                <h2>Add Staff</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
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
                    <button type='submit'>Add Staff</button>
                </form>
            </div>
        </>
    );
}

export default AddStaff;
