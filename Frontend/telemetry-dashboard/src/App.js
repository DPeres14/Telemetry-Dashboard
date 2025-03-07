import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css';

function App() {
  const [telemetry, setTelemetry] = useState({});
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/telemetry');
        setTelemetry(response.data);

        // Adiciona os dados ao histórico
        setHistory(prevHistory => [
          ...prevHistory.slice(-9),  // Mantém apenas os últimos 10 registros
          response.data,
        ]);
      } catch (error) {
        console.error("Erro ao buscar dados de telemetria:", error);
      }
    };

    fetchData(); // Busca os dados imediatamente
    const interval = setInterval(fetchData, 1000); // Atualiza a cada segundo
    return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente
  }, []);

  return (
    <div className="App">
      <h1>Telemetry Dashboard</h1>
      <div className="telemetry-data">
        <p><strong>Speed:</strong> {telemetry.speed} km/h</p>
        <p><strong>RPM:</strong> {telemetry.rpm}</p>
        <p><strong>Temperature:</strong> {telemetry.temperature} °C</p>
        <p><strong>Fuel Level:</strong> {telemetry.fuel_level}%</p>
        <p><strong>Timestamp:</strong> {telemetry.timestamp}</p>
      </div>

      <h2>DATA Over Time</h2>
      <LineChart
        width={600}
        height={300}
        data={history}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}

export default App;