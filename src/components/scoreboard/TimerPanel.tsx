
"use client";
import { formatTimeMMSS } from '@/lib/timeUtils';
import { Card, CardContent } from '@/components/ui/card';

interface TimerPanelProps {
  gameTime: number;
  period: number;
  isTimerRunning: boolean;
  timerColor: string; // Hex color string
}

export function TimerPanel({ gameTime, period, isTimerRunning, timerColor }: TimerPanelProps) {
  return (
    <Card 
      className="w-full md:w-1/2 lg:w-1/3 bg-card/50 border-2 backdrop-blur-sm"
      style={{ borderColor: timerColor }} // Use timerColor for border
    >
      <CardContent className="p-6 text-center">
        <div>
          <p className="text-sm uppercase text-muted-foreground">Time</p>
          <p 
            className={`text-7xl md:text-8xl lg:text-9xl font-mono font-bold ${isTimerRunning && gameTime % 2 === 0 ? 'opacity-90' : ''} transition-opacity duration-200`}
            style={{ color: timerColor }} // Use timerColor for text
          >
            {formatTimeMMSS(gameTime)}
          </p>
        </div>
        <div>
          <p className="text-sm uppercase text-muted-foreground">Period</p>
          <p 
            className="text-5xl md:text-6xl font-mono font-bold"
            style={{ color: timerColor }} // Use timerColor for text
          >
            {period}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
