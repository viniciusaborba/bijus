export function normalizeCPF(cpf: string) {
  const cpfDigits = cpf.replace(/\D/g, "");

  const normalizedCPF = cpfDigits.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    "$1.$2.$3-$4"
  );

  return normalizedCPF;
}
