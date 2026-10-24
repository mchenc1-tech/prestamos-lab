import { useState } from 'react';
import Encabezado from '../components/Encabezado';
import ListaEquipos from '../components/ListaEquipos';
import type { Equipo } from '../types';

interface InventarioProps {
  equipos: Equipo[];
  onPrestar: (id: number) => void;
}

function Inventario({ equipos, onPrestar }: InventarioProps) {
  const [categoria, setCategoria] = useState('');
  const [busqueda, setBusqueda] = useState('');

  // Categorías únicas, calculadas a partir del arreglo
  const categorias = [...new Set(equipos.map((e) => e.categoria))];

  // Ambos filtros se combinan
  const equiposFiltrados = equipos.filter((e) => {
    const coincideCategoria = categoria === '' || e.categoria === categoria;
    const coincideNombre = e.nombre.toLowerCase().includes(busqueda.trim().toLowerCase());
    return coincideCategoria && coincideNombre;
  });

  return (
    <div>
      <Encabezado equipos={equipos} />

      <div className="filtros">
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="">Todas las categorías</option>
          {categorias.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {equiposFiltrados.length === 0 ? (
        <p className="sin-resultados">No se encontraron equipos.</p>
      ) : (
        <ListaEquipos equipos={equiposFiltrados} onPrestar={onPrestar} />
      )}
    </div>
  );
}

export default Inventario;