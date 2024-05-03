import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './dashboard.css';
import Menu from '../menu/menu';

function Dashboard() {
    const [totalAlunos, setTotalAlunos] = useState(0);
    const [totalRoomsLivres, setTotalRoomsLivres] = useState(0);
    const [totalRoomsOcupados, setTotalRoomsOcupados] = useState(0);
    const [totalRoomsManutencao, setTotalRoomsManutencao] = useState(0);
    const [last5Bookings, setLast5Bookings] = useState([]);

    // Função para buscar o total de alunos da API em PHP
    const fetchTotalAlunos = async () => {
        try {
            // Solicitação GET para buscar total de alunos
            const response = await axios.get('http://localhost/studentbedsbackend/student/total_students.php');
            
            if (response.data.success) {
                setTotalAlunos(response.data.total);
            } else {
                console.error('Erro ao buscar total de alunos:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao buscar total de alunos:', error);
        }
    };

    // Função para buscar o total de quartos livres da API em PHP
    const fetchTotalRoomsLivres = async () => {
        try {
            const response = await axios.get('http://localhost/studentbedsbackend/room/total_rooms_livres.php');
            
            if (response.data.success) {
                setTotalRoomsLivres(response.data.total);
            } else {
                console.error('Erro ao buscar total de quartos livres:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao buscar total de quartos livres:', error);
        }
    };

    // Função para buscar o total de quartos ocupados da API em PHP
    const fetchTotalRoomsOcupados = async () => {
        try {
            const response = await axios.get('http://localhost/studentbedsbackend/room/total_rooms_ocupados.php');
            
            if (response.data.success) {
                setTotalRoomsOcupados(response.data.total);
            } else {
                console.error('Erro ao buscar total de quartos ocupados:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao buscar total de quartos ocupados:', error);
        }
    };

    // Função para buscar o total de quartos em manutenção da API em PHP
    const fetchTotalRoomsManutencao = async () => {
        try {
            const response = await axios.get('http://localhost/studentbedsbackend/room/total_rooms_manutencao.php');
            
            if (response.data.success) {
                setTotalRoomsManutencao(response.data.total);
            } else {
                console.error('Erro ao buscar total de quartos em manutenção:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao buscar total de quartos em manutenção:', error);
        }
    };

    // Função para buscar os últimos 5 bookings
    const fetchLast5Bookings = async () => {
        try {
            const response = await axios.get('http://localhost/studentbedsbackend/booking/get_last_bookings.php');
            
            if (response.data.success) {
                setLast5Bookings(response.data.bookings);
            } else {
                console.error('Erro ao buscar últimos 5 bookings:', response.data.message);
            }
        } catch (error) {
            console.error('Erro ao buscar últimos 5 bookings:', error);
        }
    };

    // Busca os dados iniciais ao montar o componente
    useEffect(() => {
        fetchTotalAlunos();
        fetchTotalRoomsLivres();
        fetchTotalRoomsOcupados();
        /* fetchTotalRoomsManutencao(); */
        fetchLast5Bookings();
    }, []);

    return (
        <>
            <Menu />
            <div className="container">
                <div className='dashboard'>
                    <div className="dashboard_total_students">
                        <h3>Total de Alunos</h3>
                        <p>{totalAlunos}</p>
                    </div>
                    <div className="dashboard_room_livres">
                        <h3>Total de Quartos Livres</h3>    
                        <p>{totalRoomsLivres}</p>
                    </div>
                    <div className="dashboard_room_ocupados">
                        <h3>Total de Quartos Ocupados</h3>
                        <p>{totalRoomsOcupados}</p>
                    </div>
                   {/*  <div className="dashboard_room_manutencao">
                        <h3>Total de Quartos Em Manutenção</h3>
                        <p>{totalRoomsManutencao}</p>
                    </div> */}
                </div>
                <div className='dashboard_last_books'>
                    <h3>Últimos 5 Bookings</h3>
                    {/* Renderiza a tabela dos últimos 5 bookings */}
                    <table>
                        <thead>
                            <tr>
                                <th>ID da Reserva</th>
                                <th>Nome do Estudante</th>
                                <th>Nome do Quarto</th>
                            </tr>
                        </thead>
                        <tbody>
                            {last5Bookings.map((booking) => (
                                <tr key={booking.booking_id}>
                                    <td>{booking.booking_id}</td>
                                    <td>{booking.student_name}</td>
                                    <td>{booking.room_name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
