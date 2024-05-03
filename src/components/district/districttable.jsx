import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../menu/menu';

function DistrictTable() {
    // Estados para armazenar a lista de distritos e o distrito selecionado
    const [districts, setDistricts] = useState([]);
    const [selectedDistrict, setSelectedDistrict] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ id: '', name: '' });

    // Função para carregar os distritos do servidor
    const fetchDistricts = async () => {
        try {
            const response = await axios.get('http://localhost/studentbedsbackend/district/get_districts.php');
            if (response.data.success) {
                setDistricts(response.data.districts);
            } else {
                console.error('Erro ao carregar distritos:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao carregar distritos:', error);
        }
    };

    // Carregar distritos ao montar o componente
    useEffect(() => {
        fetchDistricts();

        return () => {
            // Função de limpeza para evitar vazamentos de memória (se necessário)
        };
    }, []);

    // Função para lidar com a seleção de um distrito
    const handleSelect = (district) => {
        setSelectedDistrict(district);
        setEditForm({ id: district.id, name: district.name });
        setIsEditing(true);
    };

    // Função para lidar com o envio do formulário de edição
    const handleEditSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put(`http://localhost/studentbedsbackend/district/edit_district.php`, editForm, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.data.success) {
                alert('Distrito editado com sucesso.');
                // Atualiza a lista de distritos para refletir as alterações
                fetchDistricts();
                // Limpa o distrito selecionado e fecha o formulário de edição
                setSelectedDistrict(null);
                setIsEditing(false);
            } else {
                console.error('Erro ao editar distrito:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao editar distrito:', error);
        }
    };

    // Função para lidar com a exclusão de um distrito
    const handleDelete = async (districtId) => {
        // Peça confirmação ao usuário antes de excluir
        const confirmDelete = window.confirm(`Tem certeza que deseja excluir o distrito com ID ${districtId}?`);

        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost/studentbedsbackend/district/delete_district.php?id=${districtId}`);

                if (response.data.success) {
                    alert('Distrito excluído com sucesso.');
                    // Atualiza a lista de distritos para refletir a exclusão
                    fetchDistricts();
                    // Limpa o distrito selecionado
                    setSelectedDistrict(null);
                } else {
                    console.error('Erro ao excluir distrito:', response.data.message);
                }
            } catch (error) {
                console.error('Erro ao excluir distrito:', error);
            }
        }
    };

    return (
        <>
            <Menu />
            <div className='container'>
                <h2>Districts</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {districts.map((district) => (
                            <tr key={district.id} onClick={() => handleSelect(district)}>
                                <td>{district.id}</td>
                                <td>{district.name}</td>
                                <td>
                                    <button className="btn-action" onClick={() => handleSelect(district)}>
                                        <span class="material-symbols-outlined edit">
                                            edit
                                        </span>
                                    </button>
                                    <button className="btn-action" onClick={() => handleDelete(district.id)}>
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
                        <h3>Editar Distrito</h3>
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
                            <button type='submit'>Salvar</button>
                            <button type='button' onClick={() => setIsEditing(false)}>Cancelar</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default DistrictTable;
