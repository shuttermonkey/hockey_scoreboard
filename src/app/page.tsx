"use client";
import React, { useEffect, useCallback } from 'react';
import { ScoreboardProvider, useScoreboard } from '@/components/scoreboard/ScoreboardProvider';
import { ScoreboardDisplay } from '@/components/scoreboard/ScoreboardDisplay';
import { ScoreboardControls } from '@/components/scoreboard/ScoreboardControls';
import { Button } from '@/components/ui/button';
import { PanelTopClose, PanelBottomClose } from 'lucide-react'; // Icons for toggle

function ScoreboardApp() {
  const { dispatch } = useScoreboard(); // Get dispatch from context
  const [showControls, setShowControls] = React.useState(true);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return; // Don't trigger hotkeys if typing in an input
    }

    if (event.code === 'Space') {
      event.preventDefault();
      dispatch({ type: 'TOGGLE_TIMER_RUNNING' });
    }
    // Add more hotkeys here if needed
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-2 md:p-4 bg-background">
      <ScoreboardDisplay />
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setShowControls(!showControls)} 
        className="my-4"
        aria-label={showControls ? "Hide Controls" : "Show Controls"}
        aria-expanded={showControls}
      >
        {showControls ? <PanelBottomClose className="mr-2 h-4 w-4" /> : <PanelTopClose className="mr-2 h-4 w-4" />}
        {showControls ? 'Hide Controls' : 'Show Controls'}
      </Button>
      {showControls && (
        <div className="w-full max-w-5xl mt-4">
          <ScoreboardControls />
        </div>
      )}
    </main>
  );
}

export default function Home() {
  return (
    <ScoreboardProvider>
      <ScoreboardApp />
    </ScoreboardProvider>
  );
}
