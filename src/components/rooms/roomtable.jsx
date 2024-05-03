import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../menu/menu';
import UniversitySelect from '../uni/selectUni';
import SelectStatus from './selectStatus';

function Roomtable() {
    // Estado inicial do componente
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ id: '', name: '', university_id: '', price: '', description: '', status_id: '' }); // Inclui status_id

    // Função para carregar os quartos do servidor
    const fetchRooms = async () => {
        try {
            // Solicitação GET para carregar os quartos do servidor
            const response = await axios.get('http://localhost/studentbedsbackend/room/get_rooms_info.php');
            
            // Logs para depuração
            console.log('Resposta completa do servidor:', response);
            console.log('Dados da resposta do servidor:', response.data);
            
            // Verifique se a resposta tem sucesso e a estrutura esperada
            if (response && response.data) {
                if (response.data.success === true && Array.isArray(response.data.rooms)) {
                    // Atualiza a lista de quartos com os dados do servidor
                    setRooms(response.data.rooms);
                } else {
                    // Se não houver sucesso ou a estrutura esperada, trate como erro
                    const errorMsg = response.data.message || 'Resposta inválida do servidor';
                    console.error('Erro ao carregar quartos:', errorMsg);
                    alert(errorMsg); // Opcional: mostre um alerta ao usuário sobre o erro
                }
            } else {
                console.error('Erro ao carregar quartos:', 'Resposta do servidor é undefined ou inválida');
            }
        } catch (error) {
            // Trate erros de solicitação de rede
            console.error('Erro ao carregar quartos:', error);
            alert('Erro ao carregar quartos. Verifique sua conexão de rede ou tente novamente mais tarde.'); // Opcional: mostre um alerta ao usuário
        }
    };




    // Carregar quartos ao montar o componente
    useEffect(() => {
        fetchRooms();
    }, []);

    // Função para lidar com a seleção de um quarto
    const handleSelect = (room) => {
        setSelectedRoom(room);
        setEditForm({
            id: room.id,
            name: room.name,
            university_id: room.university_id,
            price: room.price,
            description: room.description,
            status_id: room.status_id, // Inclui status_id
        });
        // Ativa o modo de edição
        setIsEditing(true);
    };

    // Função para lidar com o envio do formulário de edição
    const handleEditSubmit = async (event) => {
        event.preventDefault();

        // Log para depuração
        console.log('Enviando dados para o servidor:', editForm);

        try {
            // Solicitação PUT para editar o quarto
            const response = await axios.put('http://localhost/studentbedsbackend/room/edit_room.php', editForm, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Log para depuração
            console.log('Resposta do servidor:', response.data);

            if (response.data) {
                if (response.data.success) {
                    // Se a edição foi bem-sucedida
                    alert('Quarto editado com sucesso.');
                    // Atualiza a lista de quartos para refletir as alterações
                    fetchRooms();
                    // Limpa o quarto selecionado e fecha o formulário de edição
                    setSelectedRoom(null);
                    setIsEditing(false);
                } else {
                    // Caso contrário, mostre a mensagem de erro
                    const errorMessage = response.data.message || 'Erro desconhecido ao editar o quarto';
                    console.error('Erro ao editar quarto:', errorMessage);
                    alert(errorMessage);
                }
            } else {
                console.error('Resposta do servidor é undefined');
            }
        } catch (error) {
            // Trate erros de rede ou de solicitação
            console.error('Erro ao editar quarto:', error);
            alert('Erro ao editar quarto. Verifique sua conexão de rede ou tente novamente mais tarde.');
        }
    };




    // Função para lidar com a exclusão de um quarto
    const handleDelete = async (room_id) => {
        // Peça confirmação ao usuário
        const confirmDelete = window.confirm(`Tem certeza que deseja excluir o quarto com ID ${room_id}?`);
        
        // Se o usuário confirmar, proceda com a exclusão
        if (confirmDelete) {
            try {
                // Solicitação DELETE para excluir o quarto
                const response = await axios.delete(`http://localhost/studentbedsbackend/room/delete_room.php?id=${room_id}`);
                
                // Verifique se a exclusão foi bem-sucedida
                if (response.data.success) {
                    alert('Quarto excluído com sucesso.');
                    // Atualiza a lista de quartos para refletir a exclusão
                    fetchRooms();
                } else {
                    console.error('Erro ao excluir quarto:', response.data.message);
                }
            } catch (error) {
                console.error('Erro ao excluir quarto:', error);
            }
        }
    };

    // Renderização do componente
    return (
        <>
            <Menu />
            <div className='container'>
                <h2>Quartos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Universidade</th>
                            <th>Preço</th>
                            <th>Descrição</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.map((room) => (
                            <tr key={room.id}>
                                <td>{room.id}</td>
                                <td>{room.name}</td>
                                <td>{room.university_name}</td> {/* Exibe o nome da universidade */}
                                <td>{room.price}</td>
                                <td>{room.description}</td>
                                <td>{room.status_name}</td> {/* Exibe o nome do status */}
                                <td>
                                    <button className="btn-action" onClick={() => handleSelect(room)}>
                                        <span class="material-symbols-outlined edit">
                                            edit
                                        </span>
                                    </button>
                                    <button className="btn-action" onClick={() => handleDelete(room.id)}>
                                        <span class="material-symbols-outlined delete">
                                            delete
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Formulário de edição */}
                {isEditing && (
                    <div className='edit-form'>
                        <h3>Editar Quarto</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div>
                                <label>ID:</label>
                                <input
                                    type='text'
                                    value={editForm.id}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label>Nome:</label>
                                <input
                                    type='text'
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Universidade:</label>
                                <UniversitySelect
                                    value={editForm.university_id}
                                    onChange={(e) => setEditForm({ ...editForm, university_id: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Preço:</label>
                                <input
                                    type='number'
                                    value={editForm.price}
                                    onChange={(e) => setEditForm({ ...editForm, price: parseFloat(e.target.value) })}
                                />
                            </div>
                            <div>
                                <label>Descrição:</label>
                                <input
                                    type='text'
                                    value={editForm.description}
                                    onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Status:</label>
                                <SelectStatus onChange={(value) => setEditForm({ ...editForm, status_id: value })} value={editForm.status_id} />
                            </div>
                            <button type='submit'>Salvar</button>
                            <button type='button' onClick={() => setIsEditing(false)}>Cancelar</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default Roomtable;
