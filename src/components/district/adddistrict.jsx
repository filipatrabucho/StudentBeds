import React, { useState } from 'react';
import Menu from '../menu/menu';

function Adddistrict() {
  const [districtName, setDistrictName] = useState('');
  const [message, setMessage] = useState(''); // Adicionada para exibir mensagens

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Envie os dados para o servidor usando fetch
    try {
      const response = await fetch('http://localhost/studentbedsbackend/district/add_district.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Definir o cabeçalho Content-Type
        },
        body: JSON.stringify({ name: districtName }), // Enviar o dado em formato JSON
      });

      // Verifique a resposta do servidor
      const data = await response.json(); // Parse da resposta para JSON

      if (response.ok) {
        setMessage(data.message); // Exibe mensagem de sucesso
        setDistrictName(''); // Limpar o campo do formulário
      } else {
        setMessage('Failed to add district: ' + data.message); // Mensagem de erro
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to add district: ' + error.message); // Mensagem de erro
    }
  };

  return (
    <>
      <Menu />
      <div className='container'>
        <h2>Add District</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            placeholder='Name of District'
            value={districtName}
            onChange={(event) => setDistrictName(event.target.value)}
          />
          <button type='submit'>Add District</button>
        </form>
        {message && <p>{message}</p>} {/* Exibe a mensagem de sucesso ou erro */}
      </div>
    </>
  );
}

export default Adddistrict;
