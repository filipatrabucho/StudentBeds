import React, { useState } from 'react';
import axios from 'axios';
import Menu from '../menu/menu';
import DistrictSelect from '../district/selectDistrict';

function Adduni() {
  const [name, setName] = useState('');
  const [districtId, setDistrictId] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Dados da nova universidade
    const newUniversity = {
      name,
      district_id: districtId,
    };

    console.log('Enviando dados para o servidor:', newUniversity); // Log de depuração

    try {
        // Envia os dados para o script PHP
        const response = await axios.post('http://localhost/studentbedsbackend/uni/add_university.php', newUniversity, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    
        // Verifique a resposta do servidor
        console.log('Resposta do servidor:', response.data); // Log de depuração
    
        if (response.data.success) {
            alert('Universidade adicionada com sucesso!');
            // Limpa os campos após o sucesso
            setName('');
            setDistrictId('');
        } else {
            console.error('Erro ao adicionar universidade:', response.data.message);
        }
    } catch (error) {
        console.error('Erro ao adicionar universidade:', error);
    
        // Tratamento adicional para erros de rede ou outros erros
        if (error.response) {
            // O servidor respondeu com um status de erro
            console.error('Resposta de erro do servidor:', error.response.data);
        } else if (error.request) {
            // A solicitação foi feita, mas não houve resposta
            console.error('Sem resposta do servidor:', error.request);
        } else {
            // Outro erro ocorreu durante a configuração da solicitação
            console.error('Erro durante a configuração:', error.message);
        }
    }
  };

  return (
    <>
      <Menu />
      <div className='container'>
        <h2>Add University</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Nome da Universidade'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {/* Componente DistrictSelect para seleção de distrito */}
          <DistrictSelect
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
          />
          <button type='submit'>Add Uni</button>
        </form>
      </div>
    </>
  );
}

export default Adduni;
