import React, { useState } from 'react';
import axios from 'axios';
import Menu from '../menu/menu';
import SelectStudent from '../student/selectStudent';
import SelectRoom from '../rooms/selectRoom';

function Addbooking() {
    // Estado para armazenar os valores selecionados
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedRoom, setSelectedRoom] = useState('');

    // Função para lidar com a submissão do formulário
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Verifique se ambos os valores selecionados estão disponíveis
        if (selectedStudent && selectedRoom) {
            try {
                // Dados a serem enviados ao servidor
                const bookingData = {
                    student_id: selectedStudent,
                    room_id: selectedRoom,
                };

                // Solicitação POST para adicionar a reserva
                const response = await axios.post('http://localhost/studentbedsbackend/booking/add_booking.php', bookingData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                // Verifique a resposta do servidor
                if (response.data.success) {
                    alert('Reserva adicionada com sucesso!');
                    // Limpar os valores selecionados após o sucesso
                    setSelectedStudent('');
                    setSelectedRoom('');
                } else {
                    alert(`Erro ao adicionar reserva: ${response.data.message}`);
                }
            } catch (error) {
                console.error('Erro ao adicionar reserva:', error);
                alert('Erro ao adicionar reserva. Por favor, tente novamente mais tarde.');
            }
        } else {
            alert('Por favor, selecione um estudante e um quarto.');
        }
    };

    return (
        <>
            <Menu />
            <div className='container Addbooking'>
                <h2>Add Booking</h2>
                <form onSubmit={handleSubmit}>
                    <SelectStudent selectedStudent={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)} />
                    <SelectRoom selectedRoom={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} />
                    <button type='submit'>Adicionar Reserva</button>
                </form>
            </div>
        </>
    );
}

export default Addbooking;
