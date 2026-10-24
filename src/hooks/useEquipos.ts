import { useCallback, useEffect, useState } from 'react';
import { obtenerEquipos } from '../services/api';
import type { Equipo } from '../types';

export function useEquipos() {
  const [equipos, setEquipos] = useState<Equipo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargar = useCallback(async () => {
    setCargando(true);
    setError('');
    try {
      const datos = await obtenerEquipos();
      setEquipos(datos);
    } catch {
      setError(
        'No se pudo cargar el inventario. Verifique que la API esté encendida e intente de nuevo.'
      );
    } finally {
      setCargando(false);
    }
  }, []);

  // Se ejecuta una sola vez, al montar el componente
  useEffect(() => {
    cargar();
  }, [cargar]);

  return { equipos, setEquipos, cargando, error, recargar: cargar };
}