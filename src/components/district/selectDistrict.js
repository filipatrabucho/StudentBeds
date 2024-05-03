import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DistrictSelect({ value, onChange }) {
  const [districts, setDistricts] = useState([]);

  // Função para carregar os distritos
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
  }, []);

  return (
    <select value={value} onChange={onChange}>
      <option value="">Selecione um distrito</option>
      {districts.map((district) => (
        <option key={district.id} value={district.id}>
          {district.name}
        </option>
      ))}
    </select>
  );
}

export default DistrictSelect;
