import { useState } from 'react';
import Inventario from './pages/Inventario';
import PrestamosActivos from './pages/PrestamosActivos';
import FormularioPrestamo from './components/FormularioPrestamo';
import type { DatosPrestamo } from './components/FormularioPrestamo';
import { useEquipos } from './hooks/useEquipos';
import { usePrestamos } from './hooks/usePrestamos';
import {
  crearPrestamo,
  actualizarDisponibilidad,
  marcarDevuelto,
} from './services/api';
import type { Equipo } from './types';

type Vista = 'inventario' | 'prestamos';

function App() {
  const {
    equipos,
    setEquipos,
    cargando: cargandoEquipos,
    error: errorEquipos,
    recargar: recargarEquipos,
  } = useEquipos();
  const {
    prestamos,
    setPrestamos,
    cargando: cargandoPrestamos,
    error: errorPrestamos,
    recargar: recargarPrestamos,
  } = usePrestamos();

  const [equipoSeleccionado, setEquipoSeleccionado] = useState<Equipo | null>(null);
  const [vista, setVista] = useState<Vista>('inventario');
  const [enviando, setEnviando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState('');
  const [errorDevolucion, setErrorDevolucion] = useState('');

  const cargando = cargandoEquipos || cargandoPrestamos;
  const error = errorEquipos || errorPrestamos;

  const reintentar = () => {
    recargarEquipos();
    recargarPrestamos();
  };

  const handlePrestar = (id: number) => {
    const equipo = equipos.find((e) => e.id === id) ?? null;
    setErrorEnvio('');
    setEquipoSeleccionado(equipo);
  };

  const handleGuardar = async (datos: DatosPrestamo) => {
    if (!equipoSeleccionado) return;

    setEnviando(true);
    setErrorEnvio('');

    try {
      const creado = await crearPrestamo({
        equipoId: equipoSeleccionado.id,
        solicitante: datos.solicitante,
        carne: datos.carne,
        fechaPrestamo: new Date().toISOString(),
        fechaLimite: datos.fechaLimite,
        devuelto: false,
      });

      await actualizarDisponibilidad(equipoSeleccionado.id, false);

      // Actualizaciones inmutables: nunca push ni asignación directa
      setPrestamos([...prestamos, creado]);
      setEquipos(
        equipos.map((e) =>
          e.id === equipoSeleccionado.id ? { ...e, disponible: false } : e
        )
      );
      setEquipoSeleccionado(null);
    } catch (err) {
      console.error('Error al registrar el préstamo:', err);
      setErrorEnvio('No se pudo registrar el préstamo. Intente de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  const handleDevolver = async (prestamoId: number) => {
    const prestamo = prestamos.find((p) => p.id === prestamoId);
    if (!prestamo) return;

    setErrorDevolucion('');

    try {
      await marcarDevuelto(prestamoId);
      await actualizarDisponibilidad(prestamo.equipoId, true);

      setPrestamos(
        prestamos.map((p) => (p.id === prestamoId ? { ...p, devuelto: true } : p))
      );
      setEquipos(
        equipos.map((e) =>
          e.id === prestamo.equipoId ? { ...e, disponible: true } : e
        )
      );
    } catch (err) {
      console.error('Error al devolver el préstamo:', err);
      setErrorDevolucion('No se pudo registrar la devolución. Intente de nuevo.');
    }
  };

  if (cargando) {
    return <p className="estado">Cargando datos...</p>;
  }

  if (error) {
    return (
      <div className="estado estado-error">
        <p>{error}</p>
        <button onClick={reintentar}>Reintentar</button>
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

      {errorDevolucion && <p className="estado estado-error">{errorDevolucion}</p>}

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
          enviando={enviando}
          errorEnvio={errorEnvio}
        />
      )}
    </>
  );
}

export default App;