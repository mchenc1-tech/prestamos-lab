import type { Equipo } from '../types';

interface EncabezadoProps {
  equipos: Equipo[];
}

function Encabezado({ equipos }: EncabezadoProps) {
  const disponibles = equipos.filter((equipo) => equipo.disponible).length;

  return (
    <header className="encabezado">
      <h1>Préstamos Lab — 0902-23-5365</h1>
      <p>
        {disponibles} de {equipos.length} equipos disponibles
      </p>
    </header>
  );
}

export default Encabezado;