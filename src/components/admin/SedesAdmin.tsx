import React, { useState, useEffect } from 'react';
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton,
  Typography, Alert } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Sede } from '../../models/Sede';
import { api } from '../../config/api';
import { useAuth } from '../../contexts/AuthContext';

export default function AdminSedes() {
  const [sedes, setSedes] = useState<Sede[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSede, setSelectedSede] = useState<Sede | null>(null);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const { token } = useAuth();

  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    email: ''
  });

  useEffect(() => {
    fetchSedes();
  }, []);

  const fetchSedes = async () => {
    try {
      const response = await api.get('/sedes');
      setSedes(response.data.data);
    } catch (error) {
      setError('Error al cargar las sedes');
    }
  };

  const handleOpen = (sede?: Sede) => {
    if (sede) {
      setSelectedSede(sede);
      setFormData({
        nombre: sede.nombre,
        direccion: sede.direccion,
        telefono: sede.telefono,
        email: sede.email
      });
    } else {
      setSelectedSede(null);
      setFormData({
        nombre: '',
        direccion: '',
        telefono: '',
        email: ''
      });
    }
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedSede(null);
    setFormData({
      nombre: '',
      direccion: '',
      telefono: '',
      email: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedSede) {
        await api.put(`/sedes/${selectedSede.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Sede actualizada exitosamente');
      } else {
        await api.post('/sedes', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSuccess('Sede creada exitosamente');
      }
      fetchSedes();
      handleClose();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al guardar la sede');
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Está seguro de que desea eliminar esta sede?')) {
      return;
    }

    try {
      await api.delete(`/sedes/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSuccess('Sede eliminada exitosamente');
      fetchSedes();
    } catch (error: any) {
      setError(error.response?.data?.message || 'Error al eliminar la sede');
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Administración de Sedes</Typography>
        <Button variant="contained" color="primary" onClick={() => handleOpen()}>
          Nueva Sede
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess('')}>
          {success}
        </Alert>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Dirección</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sedes.map((sede) => (
              <TableRow key={sede.id}>
                <TableCell>{sede.nombre}</TableCell>
                <TableCell>{sede.direccion}</TableCell>
                <TableCell>{sede.telefono}</TableCell>
                <TableCell>{sede.email}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(sede)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(sede.id)} color="error">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedSede ? 'Editar Sede' : 'Nueva Sede'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Nombre"
              fullWidth
              required
              value={formData.nombre}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, nombre: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Dirección"
              fullWidth
              required
              value={formData.direccion}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, direccion: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Teléfono"
              fullWidth
              required
              value={formData.telefono}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, telefono: e.target.value })}
            />
            <TextField
              margin="dense"
              label="Email"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained" color="primary">
              {selectedSede ? 'Guardar' : 'Crear'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
}
