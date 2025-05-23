
"use client";
import type { TeamState, Penalty } from './ScoreboardProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenaltyPanel } from './PenaltyPanel';
import { useState, useEffect } from 'react';

interface TeamPanelProps {
  team: TeamState;
  isHomeTeam: boolean;
}

export function TeamPanel({ team, isHomeTeam }: TeamPanelProps) {
  const [scoreDisplay, setScoreDisplay] = useState(team.score.toString());
  const [scoreUpdated, setScoreUpdated] = useState(false);

  useEffect(() => {
    if (team.score.toString() !== scoreDisplay) {
      setScoreDisplay(team.score.toString());
      setScoreUpdated(true);
      const timer = setTimeout(() => setScoreUpdated(false), 300); // Match animation duration
      return () => clearTimeout(timer);
    }
  }, [team.score, scoreDisplay]);


  return (
    <Card className={`flex-1 bg-card/50 border-2 ${team.color.replace('text-', 'border-')} backdrop-blur-sm`}>
      <CardHeader className="p-4">
        <CardTitle className={`text-3xl md:text-4xl lg:text-5xl font-bold truncate text-center ${team.color}`}>
          {team.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        <div className="text-center">
          <p className="text-sm uppercase text-muted-foreground mb-1">Score</p> {/* Added mb-1 */}
          <p className={`text-7xl md:text-8xl font-mono font-bold ${team.color} ${scoreUpdated ? 'score-updated' : ''}`}>
            {scoreDisplay}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm uppercase text-muted-foreground mb-1">Shots</p> {/* Added mb-1 */}
          <p className={`text-4xl md:text-5xl font-mono font-bold ${team.color}`}>
            {team.shots}
          </p>
        </div>
        <div className="space-y-2">
           <p className="text-sm uppercase text-muted-foreground text-center mb-1">Penalties</p> {/* Added mb-1 */}
          {team.penalties.slice(0, 2).map((penalty, index) => (
            <PenaltyPanel key={penalty.id} penalty={penalty} teamColor={team.color} />
          ))}
          {team.penalties.length < 1 && <div className="h-[44px]"/> /* Placeholder for one penalty */}
          {team.penalties.length < 2 && <div className="h-[44px]"/> /* Placeholder for second penalty */}
        </div>
      </CardContent>
    </Card>
  );
}
