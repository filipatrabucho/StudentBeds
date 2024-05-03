import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SelectRoom({ selectedRoom, onChange }) {
    // Estado para armazenar a lista de quartos
    const [rooms, setRooms] = useState([]);

    // Função para buscar a lista de quartos
    const fetchRooms = async () => {
        try {
            // Solicitação GET para buscar a lista de quartos do servidor
            const response = await axios.get('http://localhost/studentbedsbackend/room/get_rooms.php');
            
            // Verifique se a resposta tem sucesso e uma lista de quartos
            if (response.data.success && Array.isArray(response.data.rooms)) {
                setRooms(response.data.rooms); // Atualiza a lista de quartos
            } else {
                console.error('Erro ao carregar quartos:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao carregar quartos:', error);
        }
    };

    // Carrega a lista de quartos quando o componente é montado
    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <select value={selectedRoom} onChange={onChange}>
            {/* Exibe uma opção vazia por padrão */}
            <option value="">Selecione um quarto</option>
            {/* Renderiza a lista de quartos */}
            {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                    {room.name}
                </option>
            ))}
        </select>
    );
}

export default SelectRoom;
