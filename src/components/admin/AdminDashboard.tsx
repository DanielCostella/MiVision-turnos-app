import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer 
} from 'recharts';
import { turnosService } from '../../services/turnosService';

interface DashboardStats {
  turnosPorEstado: {
    pendientes: number;
    confirmados: number;
    cancelados: number;
    completados: number;
  };
  turnosHoy: number;
  profesionalesActivos: number;
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await turnosService.getTurnosStats();
        setStats(data);
      } catch (error) {
        console.error('Error cargando estadísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  const chartData = stats ? [
    { name: 'Pendientes', turnos: stats.turnosPorEstado.pendientes },
    { name: 'Confirmados', turnos: stats.turnosPorEstado.confirmados },
    { name: 'Cancelados', turnos: stats.turnosPorEstado.cancelados },
    { name: 'Completados', turnos: stats.turnosPorEstado.completados }
  ] : [];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      
      {/* Tarjetas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Turnos Hoy</h3>
          <p className="text-3xl font-bold text-blue-600">{stats?.turnosHoy || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Profesionales Activos</h3>
          <p className="text-3xl font-bold text-green-600">{stats?.profesionalesActivos || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700">Turnos Pendientes</h3>
          <p className="text-3xl font-bold text-yellow-600">{stats?.turnosPorEstado.pendientes || 0}</p>
        </div>
      </div>

      {/* Gráfico de turnos */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Distribución de Turnos</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="turnos" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};