export const MAX_DIAS = 2;

export const validarSolicitante = (valor: string): string => {
  const texto = valor.trim();
  if (texto.length === 0) return 'El solicitante es obligatorio.';
  if (texto.length < 5) return 'Debe tener al menos 5 caracteres.';
  return '';
};

export const validarCarne = (valor: string): string => {
  const formato = /^\d{4}-\d{2}-\d{5}$/;
  if (!formato.test(valor)) return 'Formato inválido. Use 0000-00-00000.';
  return '';
};

// Convierte "2026-10-26" en una fecha local (evita problemas de zona horaria)
const parsearFecha = (valor: string): Date => {
  const [anio, mes, dia] = valor.split('-').map(Number);
  return new Date(anio, mes - 1, dia);
};

export const validarFechaLimite = (valor: string): string => {
  if (!valor) return 'La fecha límite es obligatoria.';

  const fecha = parsearFecha(valor);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  if (fecha < hoy) return 'La fecha no puede ser anterior a hoy.';

  const maxima = new Date(hoy);
  maxima.setDate(hoy.getDate() + MAX_DIAS);
  if (fecha > maxima) return `No puede superar ${MAX_DIAS} días desde hoy.`;

  const diaSemana = fecha.getDay(); // 0 = domingo, 6 = sábado
  if (diaSemana === 0 || diaSemana === 6) {
    return 'No se presta los fines de semana (sábado o domingo no válidos).';
  }

  return '';
};