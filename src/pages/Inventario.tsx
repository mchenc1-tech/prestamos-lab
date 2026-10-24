import Encabezado from '../components/Encabezado';
import ListaEquipos from '../components/ListaEquipos';
import { equiposPrueba } from '../data/equiposPrueba';

function Inventario() {
  const handlePrestar = (id: number) => {
    console.log('Prestar equipo con id:', id);
  };

  return (
    <div>
      <Encabezado equipos={equiposPrueba} />
      <ListaEquipos equipos={equiposPrueba} onPrestar={handlePrestar} />
    </div>
  );
}

export default Inventario;