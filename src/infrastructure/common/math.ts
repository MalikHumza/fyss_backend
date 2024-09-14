export function getSum(list: number[]) {
  return list.reduce((p, c) => p + c, 0);
}

function toRoundMath(num: number, precision: number) {
  let base = 10 ** precision;
  return (Math.floor(num * base) / base).toFixed(precision);
}

export function formatAmount(amount: number | null) {
  if (amount === null) {
    return "";
  }

  const fixedAmount = toRoundMath(amount, 2);

  return Number(fixedAmount).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
