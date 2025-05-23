
"use client";
import { useScoreboard } from './ScoreboardProvider';
import { TeamPanel } from './TeamPanel';
import { TimerPanel } from './TimerPanel';

export function ScoreboardDisplay() {
  const { state } = useScoreboard();

  return (
    <div className="p-4 md:p-8 bg-background text-foreground rounded-lg shadow-2xl w-full">
      <div className="flex flex-col md:flex-row justify-around items-center gap-4 md:gap-8">
        <TeamPanel team={state.homeTeam} isHomeTeam={true} />
        <TimerPanel 
          gameTime={state.gameTime} 
          period={state.period} 
          isTimerRunning={state.isTimerRunning}
          timerColor={state.timerColor} 
        />
        <TeamPanel team={state.awayTeam} isHomeTeam={false} />
      </div>
    </div>
  );
}
