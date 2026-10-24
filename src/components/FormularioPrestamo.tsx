import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Equipo } from '../types';
import {
  validarSolicitante,
  validarCarne,
  validarFechaLimite,
  MAX_DIAS,
} from '../utils/validaciones';

export interface DatosPrestamo {
  solicitante: string;
  carne: string;
  fechaLimite: string;
}

interface FormularioPrestamoProps {
  equipo: Equipo;
  onGuardar: (datos: DatosPrestamo) => void;
  onCancelar: () => void;
  enviando?: boolean;
  errorEnvio?: string;
}

interface Errores {
  solicitante: string;
  carne: string;
  fechaLimite: string;
}

function FormularioPrestamo({
  equipo,
  onGuardar,
  onCancelar,
  enviando = false,
  errorEnvio = '',
}: FormularioPrestamoProps) {
  const [solicitante, setSolicitante] = useState('');
  const [carne, setCarne] = useState('');
  const [fechaLimite, setFechaLimite] = useState('');
  const [errores, setErrores] = useState<Errores>({
    solicitante: '',
    carne: '',
    fechaLimite: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nuevosErrores: Errores = {
      solicitante: validarSolicitante(solicitante),
      carne: validarCarne(carne),
      fechaLimite: validarFechaLimite(fechaLimite),
    };
    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some((mensaje) => mensaje !== '');
    if (hayErrores) return;

    onGuardar({ solicitante: solicitante.trim(), carne, fechaLimite });
  };

  return (
    <div className="modal-fondo">
      <form className="modal" onSubmit={handleSubmit} noValidate>
        <h2>Prestar: {equipo.nombre}</h2>

        <label>
          Solicitante
          <input
            type="text"
            value={solicitante}
            onChange={(e) => setSolicitante(e.target.value)}
          />
          {errores.solicitante && <span className="error">{errores.solicitante}</span>}
        </label>

        <label>
          Carné
          <input
            type="text"
            placeholder="0000-00-00000"
            value={carne}
            onChange={(e) => setCarne(e.target.value)}
          />
          {errores.carne && <span className="error">{errores.carne}</span>}
        </label>

        <label>
          Fecha límite (máximo {MAX_DIAS} días)
          <input
            type="date"
            value={fechaLimite}
            onChange={(e) => setFechaLimite(e.target.value)}
          />
          {errores.fechaLimite && <span className="error">{errores.fechaLimite}</span>}
        </label>

        {errorEnvio && <span className="error">{errorEnvio}</span>}

        <div className="modal-botones">
          <button
            type="button"
            className="btn-cancelar"
            onClick={onCancelar}
            disabled={enviando}
          >
            Cancelar
          </button>
          <button type="submit" className="btn-guardar" disabled={enviando}>
            {enviando ? 'Guardando...' : 'Guardar'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormularioPrestamo;