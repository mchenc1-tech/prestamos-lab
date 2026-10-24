import { useCallback, useEffect, useState } from 'react';
import { obtenerPrestamosActivos } from '../services/api';
import type { Prestamo } from '../types';

export function usePrestamos() {
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  const cargar = useCallback(async () => {
    setCargando(true);
    setError('');
    try {
      const datos = await obtenerPrestamosActivos();
      setPrestamos(datos);
    } catch {
      setError(
        'No se pudieron cargar los préstamos. Verifique que la API esté encendida e intente de nuevo.'
      );
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    cargar();
  }, [cargar]);

  return { prestamos, setPrestamos, cargando, error, recargar: cargar };
}