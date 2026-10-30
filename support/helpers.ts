export function formatDate(date: string): string {
  const months = [
    'jan', 'fev', 'mar', 'abr', 'mai', 'jun',
    'jul', 'ago', 'set', 'out', 'nov', 'dez'
  ];

  const [year, month, day] = date.split('-').map(Number)

  return `${day} de ${months[month - 1]}. de ${year}`
}