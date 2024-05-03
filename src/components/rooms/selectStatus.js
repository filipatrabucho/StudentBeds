import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SelectStatus({ onChange }) {
    // Estado para armazenar a lista de opções de status
    const [statusList, setStatusList] = useState([]);

    // Função para buscar a lista de opções de status da API
    const fetchStatusList = async () => {
        try {
            // Ajuste a URL para o endpoint da sua API em PHP
            const response = await axios.get('http://localhost/studentbedsbackend/room/get_status.php');
            if (response.data.success) {
                setStatusList(response.data.statusList);
            } else {
                console.error('Erro ao buscar status:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao buscar status:', error);
        }
    };

    // Busca a lista de opções de status quando o componente é montado
    useEffect(() => {
        fetchStatusList();
    }, []);

    // Função para lidar com a mudança de seleção
    const handleChange = (event) => {
        const selectedStatusId = event.target.value;
        onChange(selectedStatusId); // Chama a função de callback com o ID do status selecionado
    };

    return (
        <select onChange={handleChange}>
            <option value="">Selecione um status</option>
            {statusList.map((status) => (
                <option key={status.id} value={status.id}>
                    {status.status}
                </option>
            ))}
        </select>
    );
}

export default SelectStatus;
