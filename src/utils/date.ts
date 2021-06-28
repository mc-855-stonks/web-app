const MONTH_LABEL_LIST = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

export const getChartDateLabel = (date: string) => {
  const yearMonth = date.split("-");
  if (!yearMonth || yearMonth.length < 2) {
    return "";
  }
  if (yearMonth.length === 3) {
    return `${yearMonth[2]}/${MONTH_LABEL_LIST[Number(yearMonth[1]) - 1]}/${
      yearMonth[0]
    }`;
  }
  return `${MONTH_LABEL_LIST[Number(yearMonth[1]) - 1]}/${yearMonth[0]}`;
};
