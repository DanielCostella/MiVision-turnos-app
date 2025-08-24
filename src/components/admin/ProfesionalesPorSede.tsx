import React, { useEffect, useState } from 'react';
import { api } from '../../config/api';

interface Sede {
  id: number;
  nombre: string;
}

interface Profesional {
  id: number;
  nombre: string;
  apellido: string;
  especialidad: string;
  matricula: string;
  sede_id: number;
  horarios_disponibles: string; 
  telefono?: string;
  email?: string;
  activo?: boolean;
  imagen_url?: string;
}

const ProfesionalesPorSede: React.FC = () => {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [sedeSeleccionada, setSedeSeleccionada] = useState<number | null>(null);
  const [profesionales, setProfesionales] = useState<Profesional[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal y formulario
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    especialidad: '',
    matricula: '',
    horarios_disponibles: '',
    telefono: '',
    email: ''
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  // Cargar sedes al montar
  useEffect(() => {
    api.get('/sedes')
      .then(res => {
        // Si la respuesta es { data: [...] }, usa res.data.data
        // Si es un array directo, usa res.data
        const sedesArray = Array.isArray(res.data) ? res.data : res.data.data;
        setSedes(sedesArray || []);
      })
      .catch(() => setError('Error al cargar sedes'));
  }, []);

  // Cargar profesionales al seleccionar sede
  useEffect(() => {
    if (sedeSeleccionada) {
      setLoading(true);
      api.get(`/profesionales/sede/${sedeSeleccionada}`)
        .then(res => {
          // Si la respuesta es { data: [...] }, usa res.data.data
          // Si es un array directo, usa res.data
          const profesionalesArray = Array.isArray(res.data) ? res.data : res.data.data;
          setProfesionales(profesionalesArray || []);
        })
        .catch(() => setError('Error al cargar profesionales'))
        .finally(() => setLoading(false));
    } else {
      setProfesionales([]);
    }
  }, [sedeSeleccionada]);

  // Manejo del formulario
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Al hacer clic en "Editar"
  const handleEditClick = (prof: Profesional) => {
    setEditId(prof.id);
    setForm({
      nombre: prof.nombre,
      apellido: prof.apellido,
      especialidad: prof.especialidad,
      matricula: prof.matricula,
      horarios_disponibles: prof.horarios_disponibles,
      telefono: prof.telefono || '',
      email: prof.email || ''
    });
    setShowModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormLoading(true);
    try {
      if (editId) {
        await api.put(`/profesionales/${editId}`, {
          ...form,
          sede_id: sedeSeleccionada,
        });
      } else {
        await api.post('/profesionales', {
          ...form,
          sede_id: sedeSeleccionada,
        });
      }
      setShowModal(false);
      setEditId(null);
      setForm({
        nombre: '',
        apellido: '',
        especialidad: '',
        matricula: '',
        horarios_disponibles: '',
        telefono: '',
        email: ''
      });
      // Refrescar lista
      if (sedeSeleccionada) {
        const res = await api.get(`/profesionales/sede/${sedeSeleccionada}`);
        const profesionalesArray = Array.isArray(res.data) ? res.data : res.data.data;
        setProfesionales(profesionalesArray || []);
      }
    } catch (err) {
      setFormError('Error al guardar profesional');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProfesional = async (id: number) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este profesional?')) return;
    try {
      await api.delete(`/profesionales/${id}`);
      setProfesionales(prev => prev.filter(prof => prof.id !== id));
    } catch (err) {
      alert('Error al eliminar profesional');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profesionales por Sede</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Seleccionar sede:</label>
        <select
          value={sedeSeleccionada ?? ''}
          onChange={e => setSedeSeleccionada(Number(e.target.value))}
          className="border rounded px-3 py-2"
        >
          <option value="">-- Elegir sede --</option>
          {sedes.map(sede => (
            <option key={sede.id} value={sede.id}>{sede.nombre}</option>
          ))}
        </select>
      </div>
      {/* Botón para agregar profesional */}
      {sedeSeleccionada && (
        <div className="mb-4">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => setShowModal(true)}
          >
            + Agregar profesional
          </button>
        </div>
      )}
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">
              {editId ? 'Editar profesional' : 'Agregar profesional'}
            </h3>
            <form onSubmit={handleFormSubmit} className="space-y-3">
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleFormChange}
                placeholder="Nombre"
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                name="apellido"
                value={form.apellido}
                onChange={handleFormChange}
                placeholder="Apellido"
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                name="especialidad"
                value={form.especialidad}
                onChange={handleFormChange}
                placeholder="Especialidad"
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                name="matricula"
                value={form.matricula}
                onChange={handleFormChange}
                placeholder="Matrícula"
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                name="horarios_disponibles" 
                value={form.horarios_disponibles}
                onChange={handleFormChange}
                placeholder="Horarios (ej: 09:00,10:00,11:00)"
                className="w-full border rounded px-3 py-2"
                required
              />
              <input
                name="telefono"
                value={form.telefono}
                onChange={handleFormChange}
                placeholder="Teléfono"
                className="w-full border rounded px-3 py-2"
              />
              <input
                name="email"
                value={form.email}
                onChange={handleFormChange}
                placeholder="Email"
                className="w-full border rounded px-3 py-2"
                type="email"
              />
              {formError && <div className="text-red-500">{formError}</div>}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                  onClick={() => setShowModal(false)}
                  disabled={formLoading}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                  disabled={formLoading}
                >
                  {editId ? 'Guardar cambios' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {loading && <div>Cargando profesionales...</div>}
      {sedeSeleccionada && !loading && (
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">Nombre</th>
              <th className="p-2 border">Apellido</th>
              <th className="p-2 border">Especialidad</th>
              <th className="p-2 border">Matrícula</th>
              <th className="p-2 border">Horarios</th>
              <th className="p-2 border">Teléfono</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {profesionales.map(prof => (
              <tr key={prof.id}>
                <td className="p-2 border">{prof.nombre}</td>
                <td className="p-2 border">{prof.apellido}</td>
                <td className="p-2 border">{prof.especialidad}</td>
                <td className="p-2 border">{prof.matricula}</td>
                <td className="p-2 border">{prof.horarios_disponibles}</td>
                <td className="p-2 border">{prof.telefono || '-'}</td>
                <td className="p-2 border">{prof.email || '-'}</td>
                <td className="p-2 border">
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => handleEditClick(prof)}
                  >
                    Editar
                  </button>
                  <button
                    className="text-red-600 hover:underline"
                    onClick={() => handleDeleteProfesional(prof.id)}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProfesionalesPorSede;