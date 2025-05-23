
"use client";
import React, { useState, useEffect } from 'react';
import { useScoreboard } from './ScoreboardProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from '@/components/ui/separator';
import { ControlButton } from './ControlButton';
import { DEFAULT_PENALTY_DURATION_SECONDS, DEFAULT_PERIOD_TIME_SECONDS, MAX_PENALTIES_PER_TEAM, DEFAULT_TEAM_NAME_HOME, DEFAULT_TEAM_NAME_AWAY } from '@/config/scoreboardConfig';
import { parseTimeMMSS, formatTimeMMSS } from '@/lib/timeUtils';
import { Play, Pause, RotateCcw, Plus, Minus, Settings, Trash2, Palette } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { HexColorPicker } from 'react-colorful';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';


const TeamControls = ({ team, teamName }: { team: 'home' | 'away', teamName: string }) => {
  const { state, dispatch } = useScoreboard();
  const { toast } = useToast();
  const currentTeam = team === 'home' ? state.homeTeam : state.awayTeam;
  const [penaltyPlayer, setPenaltyPlayer] = useState('');
  const [penaltyTime, setPenaltyTime] = useState(formatTimeMMSS(DEFAULT_PENALTY_DURATION_SECONDS));
  const [teamColor, setTeamColor] = useState(currentTeam.color);

  useEffect(() => {
    setTeamColor(currentTeam.color); 
  }, [currentTeam.color]);


  const handleAddPenalty = () => {
    if (penaltyPlayer.trim() === '') {
      toast({ title: "Error", description: "Player number cannot be empty.", variant: "destructive" });
      return;
    }
    const duration = parseTimeMMSS(penaltyTime);
    if (duration <=0) {
       toast({ title: "Error", description: "Penalty duration must be greater than 0.", variant: "destructive" });
      return;
    }
    dispatch({ type: 'ADD_PENALTY', team, playerNumber: penaltyPlayer, duration });
    setPenaltyPlayer('');
  };

  const handleTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_TEAM_NAME', team, name: e.target.value });
  };

  const handleShotsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) {
      dispatch({ type: 'SET_SHOTS', team, count: val });
    }
  };

  const handleColorChange = (newColor: string) => {
    setTeamColor(newColor); 
    dispatch({ type: 'SET_TEAM_COLOR', team, color: newColor }); 
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span style={{ color: currentTeam.color }}>{teamName} Controls</span>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" title={`Change ${teamName} Color`}>
                <Palette className="h-5 w-5" style={{ color: currentTeam.color }} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
               <HexColorPicker color={teamColor} onChange={handleColorChange} />
            </PopoverContent>
          </Popover>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor={`${team}-name`}>Team Name</Label>
          <Input id={`${team}-name`} value={currentTeam.name} onChange={handleTeamNameChange} />
        </div>
        <div className="flex items-center space-x-2">
          <Label>Score: {currentTeam.score}</Label>
          <Button size="icon" variant="outline" onClick={() => dispatch({ type: 'UPDATE_SCORE', team, delta: 1 })}><Plus /></Button>
          <Button size="icon" variant="outline" onClick={() => dispatch({ type: 'UPDATE_SCORE', team, delta: -1 })}><Minus /></Button>
        </div>
        <div>
          <Label htmlFor={`${team}-shots`}>Shots</Label>
          <Input id={`${team}-shots`} type="number" value={currentTeam.shots} onChange={handleShotsChange} />
        </div>
        <div>
          <Label>Penalties</Label>
          <div className="space-y-2">
            {currentTeam.penalties.map(p => (
              <div key={p.id} className="flex items-center justify-between p-2 bg-muted rounded-md">
                <span style={{ color: currentTeam.color }}>P{p.playerNumber} - {formatTimeMMSS(p.remainingTime)}</span>
                <Button variant="ghost" size="icon" onClick={() => dispatch({ type: 'CLEAR_PENALTY', team, penaltyId: p.id })}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          {currentTeam.penalties.length < MAX_PENALTIES_PER_TEAM && (
            <div className="flex items-end space-x-2 mt-2">
              <div className="flex-1">
                <Label htmlFor={`${team}-penalty-player`}>Player #</Label>
                <Input id={`${team}-penalty-player`} value={penaltyPlayer} onChange={e => setPenaltyPlayer(e.target.value)} placeholder="e.g., 10" />
              </div>
              <div className="flex-1">
                <Label htmlFor={`${team}-penalty-time`}>Time (MM:SS)</Label>
                <Input id={`${team}-penalty-time`} value={penaltyTime} onChange={e => setPenaltyTime(e.target.value)} placeholder="e.g., 02:00" />
              </div>
              <Button onClick={handleAddPenalty}><Plus /> Add</Button>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={() => {
          dispatch({ type: 'SET_TEAM_NAME', team, name: team === 'home' ? DEFAULT_TEAM_NAME_HOME : DEFAULT_TEAM_NAME_AWAY });
          dispatch({ type: 'UPDATE_SCORE', team, delta: -currentTeam.score });
          dispatch({ type: 'SET_SHOTS', team, count: 0 });
          const initialHexColor = team === 'home' ? '#F87171' : '#38BDF8'; 
          dispatch({ type: 'SET_TEAM_COLOR', team, color: initialHexColor });
          currentTeam.penalties.forEach(p => dispatch({ type: 'CLEAR_PENALTY', team, penaltyId: p.id }));
        }}>Reset {teamName}</Button>
      </CardFooter>
    </Card>
  );
};

export function ScoreboardControls() {
  const { state, dispatch } = useScoreboard();
  const { toast } = useToast();
  const [manualTime, setManualTime] = useState(formatTimeMMSS(state.gameTime));
  const [maxPeriodTimeInput, setMaxPeriodTimeInput] = useState(formatTimeMMSS(state.maxPeriodTime));
  const [timerColor, setTimerColor] = useState(state.timerColor);

  useEffect(() => {
    setManualTime(formatTimeMMSS(state.gameTime));
  }, [state.gameTime]);

  useEffect(() => {
    setMaxPeriodTimeInput(formatTimeMMSS(state.maxPeriodTime));
  }, [state.maxPeriodTime]);

  useEffect(() => {
    setTimerColor(state.timerColor); 
  }, [state.timerColor]);

  const handleSetTime = () => {
    dispatch({ type: 'SET_GAME_TIME', time: parseTimeMMSS(manualTime), adjustPenalties: true });
  };

  const handleSetMaxPeriodTime = () => {
    const newMaxTime = parseTimeMMSS(maxPeriodTimeInput);
    if (newMaxTime <=0) {
       toast({ title: "Error", description: "Max period time must be greater than 0.", variant: "destructive" });
      return;
    }
    dispatch({ type: 'SET_MAX_PERIOD_TIME', time: newMaxTime });
  };

  const handleTimerColorChange = (newColor: string) => {
    setTimerColor(newColor); 
    dispatch({ type: 'SET_TIMER_COLOR', color: newColor });
  };

  const handleResetAll = () => {
    dispatch({type: 'RESET_GAME_STATE'});
    toast({ title: "Scoreboard Reset", description: "Game data has been reset to default. Timer settings preserved."});
  };

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Game Controls
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" title="Change Timer Color">
                  <Palette className="h-5 w-5" style={{ color: state.timerColor }} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <HexColorPicker color={timerColor} onChange={handleTimerColorChange} />
              </PopoverContent>
            </Popover>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <ControlButton
              label={state.isTimerRunning ? 'Pause Timer' : 'Start Timer'}
              icon={state.isTimerRunning ? Pause : Play}
              onClick={() => dispatch({ type: 'TOGGLE_TIMER_RUNNING' })}
              hotkey="Space"
              variant={state.isTimerRunning ? 'destructive' : 'default'}
            />
            <ControlButton
              label="Reset Timer"
              icon={RotateCcw}
              onClick={() => dispatch({ type: 'SET_GAME_TIME', time: state.timerMode === 'countdown' ? state.maxPeriodTime : 0, adjustPenalties: false })}
              variant="outline"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div>
              <Label htmlFor="manual-time">Set Game Time (MM:SS)</Label>
              <Input id="manual-time" value={manualTime} onChange={e => setManualTime(e.target.value)} />
              <Button onClick={handleSetTime} className="mt-2 w-full">Set Time</Button>
            </div>
            <div>
              <Label htmlFor="max-period-time">Default Period Time (MM:SS)</Label>
              <Input id="max-period-time" value={maxPeriodTimeInput} onChange={e => setMaxPeriodTimeInput(e.target.value)} />
              <Button onClick={handleSetMaxPeriodTime} className="mt-2 w-full">Set Default</Button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Label>Period: {state.period}</Label>
            <Button size="icon" variant="outline" onClick={() => dispatch({ type: 'UPDATE_PERIOD', delta: 1 })}><Plus /></Button>
            <Button size="icon" variant="outline" onClick={() => dispatch({ type: 'UPDATE_PERIOD', delta: -1 })}><Minus /></Button>
          </div>
          <div>
            <Label>Timer Mode</Label>
            <RadioGroup
              value={state.timerMode}
              onValueChange={(value: 'countdown' | 'countup') => dispatch({ type: 'SET_TIMER_MODE', mode: value })}
              className="flex space-x-2 mt-1"
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="countdown" id="countdown" />
                <Label htmlFor="countdown">Countdown</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="countup" id="countup" />
                <Label htmlFor="countup">Count Up</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
           <ControlButton label="Reset All" icon={RotateCcw} onClick={handleResetAll} variant="destructive" />
        </CardFooter>
      </Card>

      <Separator />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TeamControls team="home" teamName={state.homeTeam.name || DEFAULT_TEAM_NAME_HOME} />
        <TeamControls team="away" teamName={state.awayTeam.name || DEFAULT_TEAM_NAME_AWAY} />
      </div>
    </div>
  );
}

