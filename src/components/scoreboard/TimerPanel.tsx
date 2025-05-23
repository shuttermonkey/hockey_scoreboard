"use client";
import { formatTimeMMSS } from '@/lib/timeUtils';
import { Card, CardContent } from '@/components/ui/card';

interface TimerPanelProps {
  gameTime: number;
  period: number;
  isTimerRunning: boolean;
}

export function TimerPanel({ gameTime, period, isTimerRunning }: TimerPanelProps) {
  return (
    <Card className="w-full md:w-1/2 lg:w-1/3 bg-card/50 border-primary/50 border-2 backdrop-blur-sm">
      <CardContent className="p-6 text-center">
        <div>
          <p className="text-sm uppercase text-muted-foreground">Time</p>
          <p className={`text-7xl md:text-8xl lg:text-9xl font-mono font-bold text-primary ${isTimerRunning && gameTime % 2 === 0 ? 'opacity-90' : ''} transition-opacity duration-200`}>
            {formatTimeMMSS(gameTime)}
          </p>
        </div>
        <div>
          <p className="text-sm uppercase text-muted-foreground">Period</p>
          <p className="text-5xl md:text-6xl font-mono font-bold text-primary">
            {period}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
