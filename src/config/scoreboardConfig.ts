export const DEFAULT_TEAM_NAME_HOME = "HOME";
export const DEFAULT_TEAM_NAME_AWAY = "AWAY";
export const DEFAULT_PERIOD_TIME_SECONDS = 20 * 60; // 20 minutes
export const MAX_PENALTIES_PER_TEAM = 2;
export const DEFAULT_PENALTY_DURATION_SECONDS = 2 * 60; // 2 minutes

export interface TeamColors {
  home: string;
  away: string;
}

export const DEFAULT_TEAM_COLORS: TeamColors = {
  home: 'text-red-500', // Example color
  away: 'text-blue-500', // Example color
};
