import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Adduni from './components/uni/adduni';
import Adddistrict from './components/district/adddistrict';
import DistrictTable from './components/district/districttable';
import UniTable from './components/uni/unitable';
import Addroom from './components/rooms/addroom';
import Roomtable from './components/rooms/roomtable';
import Addstudent from './components/student/addstudent';
import StudentTable from './components/student/studenttable';
import AddStaff from './components/staff/addstaff';
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Addbooking from './components/booking/addbooking';
import Bookingtable from './components/booking/bookingtable';
import Stafftable from './components/staff/stafftable';

// Função para verificar se o usuário está autenticado
const isAuthenticated = () => {
  // Verifique o estado de autenticação do usuário, por exemplo, através de um token de autenticação no localStorage
  const token = localStorage.getItem('authToken');
  return Boolean(token);
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />

        {/* Rotas protegidas */}
        <Route
          path="/dashboard"
          element={isAuthenticated() ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/student/add"
          element={isAuthenticated() ? <Addstudent /> : <Navigate to="/" />}
        />
        <Route
          path="/student/edit"
          element={isAuthenticated() ? <StudentTable /> : <Navigate to="/" />}
        />
        <Route
          path="/student/delete"
          element={isAuthenticated() ? <StudentTable /> : <Navigate to="/" />}
        />
        
        <Route
          path="/district/add"
          element={isAuthenticated() ? <Adddistrict /> : <Navigate to="/" />}
        />
        <Route
          path="/district/edit"
          element={isAuthenticated() ? <DistrictTable /> : <Navigate to="/" />}
        />
        <Route
          path="/district/delete"
          element={isAuthenticated() ? <DistrictTable /> : <Navigate to="/" />}
        />

        <Route
          path="/university/add"
          element={isAuthenticated() ? <Adduni /> : <Navigate to="/" />}
        />
        <Route
          path="/university/delete"
          element={isAuthenticated() ? <UniTable /> : <Navigate to="/" />}
        />
        <Route
          path="/university/edit"
          element={isAuthenticated() ? <UniTable /> : <Navigate to="/" />}
        />

        <Route
          path="/rooms/add"
          element={isAuthenticated() ? <Addroom /> : <Navigate to="/" />}
        />
        <Route
          path="/rooms/delete"
          element={isAuthenticated() ? <Roomtable /> : <Navigate to="/" />}
        />
        <Route
          path="/rooms/edit"
          element={isAuthenticated() ? <Roomtable /> : <Navigate to="/" />}
        />

        <Route
          path="/booking/add"
          element={isAuthenticated() ? <Addbooking /> : <Navigate to="/" />}
        />
        <Route
          path="/booking/delete"
          element={isAuthenticated() ? <Bookingtable /> : <Navigate to="/" />}
        />
        <Route
          path="/booking/edit"
          element={isAuthenticated() ? <Bookingtable /> : <Navigate to="/" />}
        />


        <Route
          path="/staff/add"
          element={isAuthenticated() ? <AddStaff /> : <Navigate to="/" />}
        />
        <Route
          path="/staff/delete"
          element={isAuthenticated() ? <Stafftable /> : <Navigate to="/" />}
        />
        <Route
          path="/staff/edit"
          element={isAuthenticated() ? <Stafftable /> : <Navigate to="/" />}
        />

        {/* Redireciona para / se a rota não existir */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
