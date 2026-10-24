import { useState } from 'react';
import Inventario from './pages/Inventario';
import PrestamosActivos from './pages/PrestamosActivos';
import FormularioPrestamo from './components/FormularioPrestamo';
import type { DatosPrestamo } from './components/FormularioPrestamo';
import { useEquipos } from './hooks/useEquipos';
import type { Equipo, Prestamo } from './types';

type Vista = 'inventario' | 'prestamos';

function App() {
  const { equipos, setEquipos, cargando, error, recargar } = useEquipos();
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<Equipo | null>(null);
  const [vista, setVista] = useState<Vista>('inventario');

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

    setPrestamos([...prestamos, nuevoPrestamo]);
    setEquipos(
      equipos.map((e) =>
        e.id === equipoSeleccionado.id ? { ...e, disponible: false } : e
      )
    );
    setEquipoSeleccionado(null);
  };

  const handleDevolver = (prestamoId: number) => {
    const prestamo = prestamos.find((p) => p.id === prestamoId);
    if (!prestamo) return;

    setPrestamos(
      prestamos.map((p) => (p.id === prestamoId ? { ...p, devuelto: true } : p))
    );
    setEquipos(
      equipos.map((e) =>
        e.id === prestamo.equipoId ? { ...e, disponible: true } : e
      )
    );
  };

  if (cargando) {
    return <p className="estado">Cargando inventario...</p>;
  }

  if (error) {
    return (
      <div className="estado estado-error">
        <p>{error}</p>
        <button onClick={recargar}>Reintentar</button>
      </div>
    );
  }

  return (
    <>
      <nav className="menu">
        <button
          className={vista === 'inventario' ? 'activo' : ''}
          onClick={() => setVista('inventario')}
        >
          Inventario
        </button>
        <button
          className={vista === 'prestamos' ? 'activo' : ''}
          onClick={() => setVista('prestamos')}
        >
          Préstamos activos
        </button>
      </nav>

      {vista === 'inventario' ? (
        <Inventario equipos={equipos} onPrestar={handlePrestar} />
      ) : (
        <PrestamosActivos
          prestamos={prestamos}
          equipos={equipos}
          onDevolver={handleDevolver}
        />
      )}

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