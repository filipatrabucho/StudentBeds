import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../menu/menu';

function Stafftable() {
    // Estado para armazenar os dados dos funcionários
    const [staff, setStaff] = useState([]);
    // Estado para controlar a exibição do formulário de edição
    const [isEditing, setIsEditing] = useState(false);
    // Estado para armazenar o funcionário selecionado para edição
    const [selectedStaff, setSelectedStaff] = useState({ id: '', name: '', username: '', password: '' });

    // Função para buscar os dados dos funcionários do servidor
    const fetchStaff = async () => {
        try {
            const response = await axios.get('http://localhost/studentbedsbackend/staff/get_staff.php');
            if (response.data.success) {
                setStaff(response.data.staff);
            } else {
                console.error('Erro ao carregar funcionários:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao carregar funcionários:', error);
        }
    };

    // Carrega os dados dos funcionários ao montar o componente
    useEffect(() => {
        fetchStaff();
    }, []);

    // Função para lidar com a seleção de um funcionário para edição
    const handleSelect = (funcionario) => {
        setSelectedStaff({
            id: funcionario.id,
            name: funcionario.name,
            username: funcionario.username,
            password: funcionario.password
        });
        setIsEditing(true);
    };

    // Função para lidar com o envio do formulário de edição
    const handleEditSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.put(`http://localhost/studentbedsbackend/staff/edit_staff.php`, selectedStaff, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.data.success) {
                alert('Funcionário editado com sucesso.');
                // Atualiza a lista de funcionários para refletir as alterações
                fetchStaff();
                // Fecha o formulário de edição
                setIsEditing(false);
                // Limpa o estado `selectedStaff`
                setSelectedStaff({ id: '', name: '', username: '', password: '' });
            } else {
                console.error('Erro ao editar funcionário:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao editar funcionário:', error);
        }
    };

    // Função para lidar com a exclusão de um funcionário
    const handleDelete = async (staffId) => {
        // Peça confirmação ao user antes de excluir
        const confirmDelete = window.confirm(`Tem certeza de que deseja excluir o funcionário com ID ${staffId}?`);

        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost/studentbedsbackend/staff/delete_staff.php?id=${staffId}`);

                if (response.data.success) {
                    alert('Funcionário excluído com sucesso.');
                    // Atualiza a lista de funcionários para refletir a exclusão
                    fetchStaff();
                } else {
                    console.error('Erro ao excluir funcionário:', response.data.message);
                }
            } catch (error) {
                console.error('Erro ao excluir funcionário:', error);
            }
        }
    };

    return (
        <>
            <Menu />
            <div className='container'>
                <h2>Funcionários</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Username</th>
                            <th>Password</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staff.map((funcionario) => (
                            <tr key={funcionario.id}>
                                <td>{funcionario.id}</td>
                                <td>{funcionario.name}</td>
                                <td>{funcionario.username}</td>
                                {/* Mascarando a senha com asteriscos */}
                                <td>{'*'.repeat(funcionario.password.length)}</td>
                                <td>
                                <button className="btn-action" onClick={() => handleSelect(funcionario)}>
                                        <span class="material-symbols-outlined edit">
                                            edit
                                        </span>
                                    </button>
                                    <button className="btn-action" onClick={() => handleDelete(funcionario.id)}>
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
                        <h3>Editar Funcionário</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div>
                                <label>ID:</label>
                                <input
                                    type='text'
                                    value={selectedStaff.id}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label>Nome:</label>
                                <input
                                    type='text'
                                    value={selectedStaff.name}
                                    onChange={(e) => setSelectedStaff({ ...selectedStaff, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>User:</label>
                                <input
                                    type='text'
                                    value={selectedStaff.username}
                                    onChange={(e) => setSelectedStaff({ ...selectedStaff, username: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Pass:</label>
                                <input
                                    type='password'
                                    value={selectedStaff.password}
                                    onChange={(e) => setSelectedStaff({ ...selectedStaff, password: e.target.value })}
                                />
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

export default Stafftable;
