import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Menu from '../menu/menu';
import SelectStudent from '../student/selectStudent';
import SelectRoom from '../rooms/selectRoom';

function Bookingtable() {
    // Estado para armazenar a lista de reservas
    const [bookings, setBookings] = useState([]);
    // Estado para armazenar a reserva atual a ser editada
    const [currentBooking, setCurrentBooking] = useState(null);
    // Estado para controlar se o modal de edição está aberto
    const [isEditing, setIsEditing] = useState(false);
    // Estados para armazenar os valores selecionados
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [selectedRoomId, setSelectedRoomId] = useState('');

    // Função para buscar as reservas do servidor
    const fetchBookings = async () => {
        try {
            // Solicitação GET para buscar as reservas
            const response = await axios.get('http://localhost/studentbedsbackend/booking/get_bookings.php');
            
            // Verifica se a resposta tem sucesso e uma lista de reservas
            if (response.data.success && Array.isArray(response.data.bookings)) {
                setBookings(response.data.bookings); // Atualiza a lista de reservas
            } else {
                console.error('Erro ao carregar reservas:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao carregar reservas:', error);
        }
    };

    // Carrega as reservas quando o componente é montado
    useEffect(() => {
        fetchBookings();
    }, []);

    // Função para lidar com a edição de uma reserva
    const handleEdit = (bookingId) => {
        // Encontre a reserva a ser editada com base no bookingId
        const bookingToEdit = bookings.find((booking) => booking.booking_id === bookingId);

        // Verifique se a reserva foi encontrada
        if (bookingToEdit) {
            // Define a reserva atual a ser editada
            setCurrentBooking(bookingToEdit);
            // Define os valores selecionados com base na reserva atual
            setSelectedStudentId(bookingToEdit.student_id);
            setSelectedRoomId(bookingToEdit.room_id);
            // Abre o modal de edição
            setIsEditing(true);
        } else {
            alert('Reserva não encontrada.');
        }
    };

    // Função para fechar o modal de edição
    const handleCloseEditModal = () => {
        setIsEditing(false);
        setCurrentBooking(null);
        setSelectedStudentId('');
        setSelectedRoomId('');
    };

    // Função para lidar com a submissão do formulário de edição
    const handleEditSubmit = async (e) => {
        e.preventDefault();
        // Crie um objeto para enviar os dados atualizados
        const updatedBooking = {
            booking_id: currentBooking.booking_id,
            student_id: selectedStudentId,
            room_id: selectedRoomId
        };

        try {
            // Solicitação PUT para atualizar a reserva
            const response = await axios.put('http://localhost/studentbedsbackend/booking/edit_booking.php', updatedBooking, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data.success) {
                alert('Reserva editada com sucesso!');
                // Atualiza a lista de reservas para refletir as alterações
                fetchBookings();
                // Fecha o modal de edição
                handleCloseEditModal();
            } else {
                alert(`Erro ao editar reserva: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Erro ao editar reserva:', error);
            alert('Erro ao editar reserva. Por favor, tente novamente mais tarde.');
        }
    };

    // Função para lidar com a eliminação de uma reserva
    const handleDelete = async (bookingId) => {
        // Peça confirmação ao usuário antes de excluir
        const confirmDelete = window.confirm(`Tem certeza de que deseja excluir a reserva com ID ${bookingId}?`);

        if (confirmDelete) {
            try {
                // Solicitação DELETE para eliminar a reserva
                const response = await axios.delete(`http://localhost/studentbedsbackend/booking/delete_booking.php?id=${bookingId}`);

                // Verifique a resposta do servidor
                if (response.data.success) {
                    alert('Reserva eliminada com sucesso!');
                    // Atualiza a lista de reservas para refletir a eliminação
                    fetchBookings();
                } else {
                    alert(`Erro ao eliminar reserva: ${response.data.message}`);
                }
            } catch (error) {
                console.error('Erro ao eliminar reserva:', error);
                alert('Erro ao eliminar reserva. Por favor, tente novamente mais tarde.');
            }
        }
    };

    return (
        <>
            <Menu />
            <div className='container Bookingtable'>
                <h2>Reservas</h2>
                <table>
                    <thead>
                        <tr>
                            <th>ID da Reserva</th>
                            <th>Nome do Estudante</th>
                            <th>Nome do Quarto</th>
                            <th>Ações</th> {/* Coluna para botões de ação */}
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.booking_id}>
                                <td>{booking.booking_id}</td>
                                <td>{booking.student_name}</td>
                                <td>{booking.room_name}</td>
                                <td>
                                    {/* Botões de ação */}
                                    <button className="btn-action" onClick={() => handleEdit(booking.booking_id)}>
                                        <span class="material-symbols-outlined edit">
                                            edit
                                        </span>
                                    </button>
                                    <button className="btn-action" onClick={() => handleDelete(booking.booking_id)}>
                                        <span class="material-symbols-outlined delete">
                                            delete
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Modal de edição */}
                {isEditing && (
                    <div className="edit-modal">
                        <h3>Editar Reserva</h3>
                        <form onSubmit={handleEditSubmit}>
                            <div>
                                <label>ID:</label>
                                <input
                                    type='text'
                                    value={currentBooking.booking_id}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label>Nome do Estudante:</label>
                                <SelectStudent
                                    selectedStudent={selectedStudentId}
                                    onChange={(e) => setSelectedStudentId(e.target.value)}
                                />
                            </div>
                            <div>
                                <label>Nome do Quarto:</label>
                                <SelectRoom
                                    selectedRoom={selectedRoomId}
                                    onChange={(e) => setSelectedRoomId(e.target.value)}
                                />
                            </div>
                            <button type='submit'>Salvar</button>
                            <button type='button' onClick={handleCloseEditModal}>Cancelar</button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}

export default Bookingtable;
