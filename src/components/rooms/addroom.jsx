import React, { useState } from 'react';
import axios from 'axios';
import Menu from '../menu/menu';
import UniversitySelect from '../uni/selectUni';
import SelectStatus from './selectStatus';

function AddRoom() {
    // Estados para os campos do formulário
    const [roomName, setRoomName] = useState('');
    const [universityId, setUniversityId] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [statusId, setStatusId] = useState(''); // Estado para armazenar o ID do status selecionado

    // Função para lidar com o envio do formulário
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Dados da nova room
        const newRoom = {
            name: roomName,
            university_id: universityId,
            price: parseFloat(price),
            description,
            status_id: statusId, // Inclua o ID do status nos dados
        };

        try {
            // Envia os dados para o script PHP
            const response = await axios.post('http://localhost/studentbedsbackend/room/add_room.php', newRoom, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                alert('room adicionada com sucesso!');
                // Limpa os campos após o sucesso
                setRoomName('');
                setUniversityId('');
                setPrice('');
                setDescription('');
                setStatusId('');
            } else {
                alert(`Erro ao adicionar room: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Erro ao adicionar room:', error);
            alert('Ocorreu um erro ao adicionar a room. Tente novamente mais tarde.');
        }
    };

    return (
        <>
            <Menu />
            <div className='container'>
                <h2>Adicionar room</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Nome da room'
                        value={roomName}
                        onChange={(e) => setRoomName(e.target.value)}
                        required
                    />
                    <UniversitySelect
                        value={universityId}
                        onChange={(e) => setUniversityId(e.target.value)}
                        required
                    />
                    <input
                        type='number'
                        placeholder='Preço'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    <input
                        type='text'
                        placeholder='Descrição'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {/* Passe a função de mudança para `SelectStatus` */}
                    <SelectStatus onChange={setStatusId} value={statusId} />
                    <button type='submit'>Adicionar room</button>
                </form>
            </div>
        </>
    );
}

export default AddRoom;
