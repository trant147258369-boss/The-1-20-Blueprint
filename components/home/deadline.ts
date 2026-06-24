// Enrollment is real and resets monthly. All math below runs in Vietnam time
// (ICT, UTC+7, no DST) and rolls to the next month-end the instant the
// current one passes — never a hardcoded date, never a refresh-triggered reset.
const ICT_OFFSET_MS = 7 * 60 * 60 * 1000;

const MONTH_NAMES_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function monthEndUTC(ictYear: number, ictMonth: number): number {
  // Last instant of `ictMonth` (0-indexed) at 23:59:59 ICT == day 0 of the following month
  return Date.UTC(ictYear, ictMonth + 1, 0, 23, 59, 59) - ICT_OFFSET_MS;
}

export function getNextDeadline(now: Date = new Date()): Date {
  const ictNow = new Date(now.getTime() + ICT_OFFSET_MS);
  const ictYear = ictNow.getUTCFullYear();
  const ictMonth = ictNow.getUTCMonth();

  let deadlineMs = monthEndUTC(ictYear, ictMonth);
  if (now.getTime() > deadlineMs) {
    deadlineMs = monthEndUTC(ictYear, ictMonth + 1);
  }
  return new Date(deadlineMs);
}

export function formatDeadlineLabel(deadline: Date, style: "full" | "short" = "full"): string {
  const ict = new Date(deadline.getTime() + ICT_OFFSET_MS);
  const names = style === "short" ? MONTH_NAMES_SHORT : MONTH_NAMES_FULL;
  return `${names[ict.getUTCMonth()]} ${ict.getUTCDate()}`;
}
