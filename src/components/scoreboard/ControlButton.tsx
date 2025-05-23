"use client";
import type { LucideIcon } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ControlButtonProps extends ButtonProps {
  icon?: LucideIcon;
  label: string;
  hotkey?: string;
}

export function ControlButton({ icon: Icon, label, hotkey, className, children, ...props }: ControlButtonProps) {
  return (
    <Button className={cn("flex-1 min-w-[120px]", className)} {...props}>
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {label}
      {hotkey && <span className="ml-2 text-xs opacity-70 p-1 bg-muted rounded-sm">{hotkey}</span>}
      {children}
    </Button>
  );
}
