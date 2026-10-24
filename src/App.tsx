import { useState } from 'react';
import Inventario from './pages/Inventario';
import FormularioPrestamo from './components/FormularioPrestamo';
import type { DatosPrestamo } from './components/FormularioPrestamo';
import { equiposPrueba } from './data/equiposPrueba';
import type { Equipo, Prestamo } from './types';

function App() {
  const [equipos, setEquipos] = useState<Equipo[]>(equiposPrueba);
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<Equipo | null>(null);

  const handlePrestar = (id: number) => {
    const equipo = equipos.find((e) => e.id === id) ?? null;
    setEquipoSeleccionado(equipo);
  };

  const handleGuardar = (datos: DatosPrestamo) => {
    if (!equipoSeleccionado) return;

    const nuevoPrestamo: Prestamo = {
      id: Date.now(),
      equipoId: equipoSeleccionado.id,
      solicitante: datos.solicitante,
      carne: datos.carne,
      fechaPrestamo: new Date().toISOString(),
      fechaLimite: datos.fechaLimite,
      devuelto: false,
    };

    // Actualizaciones inmutables: nunca push ni asignación directa
    setPrestamos([...prestamos, nuevoPrestamo]);
    setEquipos(
      equipos.map((e) =>
        e.id === equipoSeleccionado.id ? { ...e, disponible: false } : e
      )
    );
    setEquipoSeleccionado(null);
  };

  return (
    <>
      <Inventario equipos={equipos} onPrestar={handlePrestar} />

      {equipoSeleccionado && (
        <FormularioPrestamo
          equipo={equipoSeleccionado}
          onGuardar={handleGuardar}
          onCancelar={() => setEquipoSeleccionado(null)}
        />
      )}
    </>
  );
}

export default App;