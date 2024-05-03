import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UniversitySelect({ value, onChange }) {
    // Inicializa `universities` como um array vazio
    const [universities, setUniversities] = useState([]);

    // Função para carregar as universidades do servidor
    const fetchUniversities = async () => {
        try {
            // Solicitação GET para carregar as universidades do servidor
            const response = await axios.get('http://localhost/studentbedsbackend/uni/get_universities.php');
            
            console.log('Resposta do servidor:', response.data); // Log de depuração
            
            if (response.data.success) {
                // Verifica se `universities` é um array e define o estado `universities`
                console.log('Universities recebidas:', response.data.universities); // Log de depuração
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

    return (
        <select value={value} onChange={onChange}>
            {/* Opção padrão */}
            <option value="">Selecione uma universidade</option>
            {/* Verifica se `universities` é um array antes de usar o método `.map()` */}
            {Array.isArray(universities) && universities.map((university) => (
                <option key={university.id} value={university.id}>
                    {university.name}
                </option>
            ))}
        </select>
    );
}

export default UniversitySelect;
