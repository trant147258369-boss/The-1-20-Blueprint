// Data for the member dashboard. Edit videoId to wire each setup's lesson video.
// videoId = the part after youtu.be/  (e.g. youtu.be/ABC123 -> "ABC123")
// Use null while a lesson is not recorded yet -> shows "Coming soon".

export interface DashboardSetup {
  code: string;
  name: string;
  type: string;
  color: string;
  videoId: string | null;
  blurb: string;
}

export const dashboardSetups: DashboardSetup[] = [
  {
    code: "S-01",
    name: "The Phantom Sweep",
    type: "Liquidity Sweep Reversal",
    color: "#00e5a8",
    videoId: null,
    blurb: "How to fade the liquidity grab the moment retail gets stopped out.",
  },
  {
    code: "S-02",
    name: "The Dark Pool Block",
    type: "Institutional Order Block",
    color: "#a78bfa",
    videoId: null,
    blurb: "Mapping the zones institutions defend — and entering with them.",
  },
  {
    code: "S-03",
    name: "The Structure Assassin",
    type: "Break of Structure Entry",
    color: "#f5a623",
    videoId: null,
    blurb: "Reading the first true break of structure for trend-continuation.",
  },
  {
    code: "S-04",
    name: "The Void Collapse",
    type: "Fair Value Gap Fill",
    color: "#EF4444",
    videoId: null,
    blurb: "Trading the inefficiency back into balance with surgical timing.",
  },
  {
    code: "S-05",
    name: "The Sovereign Close",
    type: "Premium / Discount Zone Reversal",
    color: "#00e5a8",
    // >>> PASTE YOUR SETUP-5 VIDEO ID BELOW (youtu.be/XXXX -> "XXXX") <<<
    videoId: "sdqffic2Itc",
    blurb: "The crown-jewel 1:20 core reversal from premium/discount extremes.",
  },
];

export const PLACEHOLDER_ID = "REPLACE_WITH_S05_ID";
export function hasVideo(v: string | null): v is string {
  return !!v && v !== PLACEHOLDER_ID;
}
