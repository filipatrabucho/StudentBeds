import React, { useState } from 'react';
import axios from 'axios';
import UniversitySelect from '../uni/selectUni';
import "./student.css";
import Menu from '../menu/menu';

function Addstudent() {
    // Estados para armazenar os valores dos campos do formulário
    const [name, setName] = useState('');
    const [university, setUniversity] = useState(''); // Estado para `university_id`
    const [tel, setTel] = useState('');
    const [nif, setNif] = useState('');

    // Função para lidar com a mudança da universidade
    const handleUniversityChange = (event) => {
        const selectedUniversityId = event.target.value;
        // Atualize o estado `university` com o ID selecionado
        setUniversity(selectedUniversityId);
        // Verifique o ID selecionado
        console.log('ID selecionado da universidade:', selectedUniversityId);
    };

    // Função para lidar com o envio do formulário
    const handleSubmit = (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Dados a serem enviados
        const data = {
            name,
            university_id: university,
            tel,
            nif
        };

        // Verifique os dados a serem enviados
        console.log('Dados enviados:', data);

        // Envia os dados para a API
        axios.post('http://localhost/studentbedsbackend/student/create_student.php', data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                // Exibe a mensagem do servidor
                alert(response.data.message);
                // Limpa o formulário
                clearForm();
            })
            .catch(error => {
                console.error('Erro ao criar conta de estudante:', error);
                alert('Erro ao criar conta de estudante.');
            });
    };

    // Função para limpar o formulário
    const clearForm = () => {
        setName('');
        setUniversity('');
        setTel('');
        setNif('');
    };

    return (
        <>
            <Menu />
            
            <div className='container'>
                <h2>Create Student</h2>
                <br />
                <form method="POST" onSubmit={handleSubmit}>
                    <input
                        placeholder="Nome"
                        type='text'
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <UniversitySelect
                        value={university}
                        onChange={handleUniversityChange}
                    />
                    <input
                        placeholder="Telefone"
                        type='number'
                        name='tel'
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                    />
                    
                    <input
                        placeholder="NIF"
                        type='number'
                        name='nif'
                        value={nif}
                        onChange={(e) => setNif(e.target.value)}
                    />
                    <button type="submit">Criar Conta</button>
                </form>
            </div>

        </>
    );
}

export default Addstudent;
