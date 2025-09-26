export function numberAsLetters(i: number): string {
  const numberAsString = i.toString();
  if (numberAsString.length > 3) return (i / 1000).toString().slice(0, 3) + "K";
  else return numberAsString;
}

export function formatNumber(num: number) {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "m";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "k";
  }
  return num.toString();
}

export function parseVersion(version: string): number[] {
  if (!version || version === "unknown") return [-1];
  const clean = version.split(/[-+]/)[0];
  return clean.split(".").map((x) => parseInt(x, 10) || 0);
}
