import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../menu/menu';
import DistrictSelect from '../district/selectDistrict';

function UniTable() {
    // Estado inicial do componente
    const [universities, setUniversities] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ id: '', name: '', district_name: '' }); // Mudança para district_name

    // Função para carregar as universidades do servidor
    const fetchUniversities = async () => {
        try {
            // Solicitação GET para carregar as universidades do servidor
            const response = await axios.get('http://localhost/studentbedsbackend/uni/get_universities_info.php');
            
            // Logs para depuração
            console.log('Resposta do servidor:', response.data);
            
            if (response.data.success) {
                // Atualiza a lista de universidades com os dados do servidor
                setUniversities(response.data.universities);
            } else {
                console.error('Erro ao carregar universidades:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao carregar universidades:', error);
        }
    };

    // Carregar universidades ao montar o componente
    useEffect(() => {
        fetchUniversities();
    }, []);

    // Função para lidar com a seleção de uma universidade
    const handleSelect = (university) => {
        setSelectedUniversity(university);
        setEditForm({
            id: university.id,
            name: university.name,
            district_name: university.district_name, // Mudança para district_name
        });
        // Ativa o modo de edição
        setIsEditing(true);
    };

    const handleEditSubmit = async (event) => {
        event.preventDefault();
        
        console.log('Enviando dados para o servidor:', editForm);
    
        try {
            const response = await axios.put('http://localhost/studentbedsbackend/uni/edit_university.php', editForm, {
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 5000 // Exemplo de ajuste de timeout
            });
    
            console.log('Resposta do servidor:', response.data);
    
            if (response.data.success) {
                alert('Universidade editada com sucesso.');
                fetchUniversities();
                setSelectedUniversity(null);
                setIsEditing(false);
            } else {
                console.error('Erro ao editar universidade:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao editar universidade:', error.response || error);
        }
    };
    
    // Função para lidar com a exclusão de uma universidade
    const handleDelete = async (university_id) => {
        // Peça confirmação ao usuário
        const confirmDelete = window.confirm(`Tem certeza que deseja excluir a universidade com ID ${university_id}?`);
        
        // Se o usuário confirmar, proceda com a exclusão
        if (confirmDelete) {
            try {
                // Solicitação DELETE para excluir a universidade
                const response = await axios.delete(`http://localhost/studentbedsbackend/uni/delete_university.php?id=${university_id}`);
                
                // Verifique se a exclusão foi bem-sucedida
                if (response.data.success) {
                    alert('Universidade excluída com sucesso.');
                    // Atualiza a lista de universidades para refletir a exclusão
                    fetchUniversities();
                } else {
                    console.error('Erro ao excluir universidade:', response.data.message);
                }
            } catch (error) {
                console.error('Erro ao excluir universidade:', error);
            }
        }
    };

    // Renderização do componente
    return (
        <>
            <Menu />
            <div className='container'>
                <h2>Universidades</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Distrito</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {universities.map((university) => (
                            <tr key={university.id}>
                                <td>{university.id}</td>
                                <td>{university.name}</td>
                                <td>{university.district_name}</td> {/* Exibe o nome do distrito */}
                                <td>
                                    <button className="btn-action" onClick={() => handleSelect(university)}>
                                        <span className="material-symbols-outlined edit">edit</span>
                                    </button>
                                    <button className="btn-action" onClick={() => handleDelete(university.id)}>
                                        <span className="material-symbols-outlined delete">delete</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Formulário de edição */}
                {isEditing && (
                    <div className='edit-form'>
                        <h3>Editar Universidade</h3>
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
                                <label>Distrito:</label>
                                <DistrictSelect
                                    value={editForm.district_name}
                                    onChange={(e) => setEditForm({ ...editForm, district_name: e.target.value })}
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

export default UniTable;
