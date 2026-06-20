export function monthsBetween(birthDateStr, targetDateStr) {
  const birth = new Date(birthDateStr);
  const target = new Date(targetDateStr);
  if (isNaN(birth) || isNaN(target)) return 0;
  const months =
    (target.getFullYear() - birth.getFullYear()) * 12 +
    (target.getMonth() - birth.getMonth()) +
    (target.getDate() - birth.getDate()) / 30.4375;
  return Math.max(0, Math.round(months * 10) / 10);
}

export function daysSince(birthDateStr) {
  const birth = new Date(birthDateStr);
  if (isNaN(birth)) return 0;
  const diff = Date.now() - birth.getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}
