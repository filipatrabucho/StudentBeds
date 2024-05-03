import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SelectStudent({ selectedStudent, onChange }) {
    // Estado para armazenar a lista de estudantes
    const [students, setStudents] = useState([]);

    // Função para buscar a lista de estudantes
    const fetchStudents = async () => {
        try {
            // Solicitação GET para buscar a lista de estudantes do servidor
            const response = await axios.get('http://localhost/studentbedsbackend/student/get_students.php');
            
            // Verifique se a resposta tem sucesso e uma lista de estudantes
            if (response.data.success && Array.isArray(response.data.students)) {
                setStudents(response.data.students); // Atualiza a lista de estudantes
            } else {
                console.error('Erro ao carregar estudantes:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao carregar estudantes:', error);
        }
    };

    // Carrega a lista de estudantes quando o componente é montado
    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <select value={selectedStudent} onChange={onChange}>
            {/* Exibe uma opção vazia por padrão */}
            <option value="">Selecione um estudante</option>
            {/* Renderiza a lista de estudantes */}
            {students.map((student) => (
                <option key={student.id} value={student.id}>
                    {`${student.id}, ${student.name}`}
                </option>
            ))}
        </select>
    );
}

export default SelectStudent;
