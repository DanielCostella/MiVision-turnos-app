import axios from 'axios';
import { Profesional } from '../types/profesional';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

export const profesionalesService = {
    getProfesionales: async (): Promise<Profesional[]> => {
        try {
            const response = await axios.get(`${API_URL}/profesionales`);
            return response.data.data;
        } catch (error) {
            console.error('Error al obtener profesionales:', error);
            return [];
        }
    }
};