import type { Equipo, Prestamo } from '../types';

interface PrestamosActivosProps {
  prestamos: Prestamo[];
  equipos: Equipo[];
  onDevolver: (prestamoId: number) => void;
}

// Convierte "2026-10-26" en una fecha local (evita problemas de zona horaria)
const parsearFecha = (valor: string): Date => {
  const [anio, mes, dia] = valor.split('-').map(Number);
  return new Date(anio, mes - 1, dia);
};

const estaVencido = (fechaLimite: string): boolean => {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return parsearFecha(fechaLimite) < hoy;
};

function PrestamosActivos({ prestamos, equipos, onDevolver }: PrestamosActivosProps) {
  const activos = prestamos.filter((p) => !p.devuelto);

  const nombreEquipo = (equipoId: number): string =>
    equipos.find((e) => e.id === equipoId)?.nombre ?? 'Equipo desconocido';

  return (
    <section className="seccion">
      <h2>Préstamos activos</h2>

      {activos.length === 0 ? (
        <p>No hay préstamos activos.</p>
      ) : (
        <table className="tabla">
          <thead>
            <tr>
              <th>Equipo</th>
              <th>Solicitante</th>
              <th>Fecha límite</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {activos.map((p) => (
              <tr key={p.id} className={estaVencido(p.fechaLimite) ? 'vencido' : ''}>
                <td>{nombreEquipo(p.equipoId)}</td>
                <td>{p.solicitante}</td>
                <td>{p.fechaLimite}</td>
                <td>
                  <button onClick={() => onDevolver(p.id)}>Devolver</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}

export default PrestamosActivos;