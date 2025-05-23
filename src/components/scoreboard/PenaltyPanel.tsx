"use client";
import type { Penalty } from './ScoreboardProvider';
import { formatTimeMMSS } from '@/lib/timeUtils';
import { Card, CardContent } from '@/components/ui/card';

interface PenaltyPanelProps {
  penalty: Penalty;
  teamColor: string;
}

export function PenaltyPanel({ penalty, teamColor }: PenaltyPanelProps) {
  return (
    <Card className={`bg-card/30 border-transparent`}>
      <CardContent className="p-2 flex justify-between items-center">
        <span className={`text-lg font-mono font-semibold ${teamColor}`}>
          P{penalty.playerNumber}
        </span>
        <span className={`text-xl font-mono font-semibold ${teamColor}`}>
          {formatTimeMMSS(penalty.remainingTime)}
        </span>
      </CardContent>
    </Card>
  );
}
