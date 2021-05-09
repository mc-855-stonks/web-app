export enum InvestorProfile {
  Conservador = "conservador",
  Moderado = "moderado",
  Arrojado = "arrojado",
}

export const investorProfileMapping = (() => {
  return Object.keys(InvestorProfile).map((it) => {
    return {
      value: InvestorProfile[it as keyof typeof InvestorProfile],
      displayValue: it,
    };
  });
})();
