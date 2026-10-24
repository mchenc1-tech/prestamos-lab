import Encabezado from '../components/Encabezado';
import ListaEquipos from '../components/ListaEquipos';
import type { Equipo } from '../types';

interface InventarioProps {
  equipos: Equipo[];
  onPrestar: (id: number) => void;
}

function Inventario({ equipos, onPrestar }: InventarioProps) {
  return (
    <div>
      <Encabezado equipos={equipos} />
      <ListaEquipos equipos={equipos} onPrestar={onPrestar} />
    </div>
  );
}

export default Inventario;