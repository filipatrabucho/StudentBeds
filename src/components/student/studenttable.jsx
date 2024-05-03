import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../menu/menu';
import UniversitySelect from '../uni/selectUni';

function StudentTable() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ id: '', name: '', university_id: '', tel: '', nif: '' });

    // Função para carregar os alunos do servidor
    const fetchStudents = async () => {
        try {
            const response = await axios.get('http://localhost/studentbedsbackend/student/get_students.php');
            
            if (response.data.success) {
                setStudents(response.data.students);
            } else {
                console.error('Erro ao carregar alunos:', response.data.message);
                alert('Erro ao carregar alunos.');
            }
        } catch (error) {
            console.error('Erro ao carregar alunos:', error);
            alert('Erro ao carregar alunos.');
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Função para lidar com a seleção de um aluno
    const handleSelect = (student) => {
        setSelectedStudent(student);
        setEditForm({
            id: student.id,
            name: student.name,
            university_id: student.university_id, // Adiciona `university_id` à edição
            tel: student.tel,
            nif: student.nif,
        });
        setIsEditing(true);
    };

    // Função para lidar com o envio do formulário de edição
    const handleEditSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.put('http://localhost/studentbedsbackend/student/edit_student.php', editForm, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                alert('Aluno editado com sucesso.');
                fetchStudents();
                setSelectedStudent(null);
                setIsEditing(false);
            } else {
                console.error('Erro ao editar aluno:', response.data.message);
                alert('Erro ao editar aluno.');
            }
        } catch (error) {
            console.error('Erro ao editar aluno:', error);
            alert('Erro ao editar aluno.');
        }
    };

    // Função para lidar com a exclusão de um aluno
    const handleDelete = async (student_id) => {
        const confirmDelete = window.confirm(`Tem certeza que deseja excluir o aluno com ID ${student_id}?`);
        
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://localhost/studentbedsbackend/student/delete_student.php?id=${student_id}`);
                
                if (response.data.success) {
                    alert('Aluno excluído com sucesso.');
                    fetchStudents();
                } else {
                    console.error('Erro ao excluir aluno:', response.data.message);
                    alert('Erro ao excluir aluno.');
                }
            } catch (error) {
                console.error('Erro ao excluir aluno:', error);
                alert('Erro ao excluir aluno.');
            }
        }
    };

    // Renderização do componente
    return (
        <>
            <Menu />
            <div className='container'>
                <h2>Alunos</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Universidade</th>
                            <th>Telefone</th>
                            <th>NIF</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => (
                            <tr key={student.id}>
                                <td>{student.id}</td>
                                <td>{student.name}</td>
                                <td>{student.university_name}</td>
                                <td>{student.tel}</td>
                                <td>{student.nif}</td>
                                <td>
                                    <button className="btn-action" onClick={() => handleSelect(student)}>
                                        <span class="material-symbols-outlined edit">
                                            edit
                                        </span>
                                    </button>
                                    <button className="btn-action" onClick={() => handleDelete(student.id)}>
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
                        <h3>Editar Aluno</h3>
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
                                {/* Configura `UniversitySelect` com os valores e funções corretos */}
                                <UniversitySelect
                                    value={editForm.university_id}
                                    onChange={(e) => setEditForm({ ...editForm, university_id: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>Telefone:</label>
                                <input
                                    type='text'
                                    value={editForm.tel}
                                    onChange={(e) => setEditForm({ ...editForm, tel: e.target.value })}
                                />
                            </div>
                            <div>
                                <label>NIF:</label>
                                <input
                                    type='text'
                                    value={editForm.nif}
                                    onChange={(e) => setEditForm({ ...editForm, nif: e.target.value })}
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

export default StudentTable;
