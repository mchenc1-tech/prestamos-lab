import type { Equipo } from '../types';

interface TarjetaEquipoProps {
  equipo: Equipo;
  onPrestar: (id: number) => void;
}

function TarjetaEquipo({ equipo, onPrestar }: TarjetaEquipoProps) {
  return (
    <div className="tarjeta">
      <h3>{equipo.nombre}</h3>
      <p>{equipo.categoria}</p>

      <span className={equipo.disponible ? 'etiqueta disponible' : 'etiqueta prestado'}>
        {equipo.disponible ? 'Disponible' : 'Prestado'}
      </span>

      <button onClick={() => onPrestar(equipo.id)} disabled={!equipo.disponible}>
        Prestar
      </button>
    </div>
  );
}

export default TarjetaEquipo;