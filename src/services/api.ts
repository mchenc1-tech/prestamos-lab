import type { Equipo, Prestamo } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

async function peticion<T>(ruta: string, opciones?: RequestInit): Promise<T> {
  const respuesta = await fetch(`${API_URL}${ruta}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opciones,
  });

  // fetch no lanza error con códigos 4xx/5xx, así que lo revisamos a mano
  if (!respuesta.ok) {
    throw new Error(`Error ${respuesta.status}: no se pudo completar la solicitud.`);
  }

  return respuesta.json() as Promise<T>;
}

export const obtenerEquipos = (): Promise<Equipo[]> =>
  peticion<Equipo[]>('/equipos');

export const obtenerPrestamosActivos = (): Promise<Prestamo[]> =>
  peticion<Prestamo[]>('/prestamos?devuelto=false');

export const crearPrestamo = (prestamo: Omit<Prestamo, 'id'>): Promise<Prestamo> =>
  peticion<Prestamo>('/prestamos', {
    method: 'POST',
    body: JSON.stringify(prestamo),
  });

export const actualizarDisponibilidad = (
  id: number,
  disponible: boolean
): Promise<Equipo> =>
  peticion<Equipo>(`/equipos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ disponible }),
  });

export const marcarDevuelto = (id: number): Promise<Prestamo> =>
  peticion<Prestamo>(`/prestamos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ devuelto: true }),
  });