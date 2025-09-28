import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function LoadingSpinner({ 
  size = 'md', 
  className,
  text 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Loader2 className={cn('animate-spin', sizeClasses[size])} />
      {text && <span className="text-sm text-muted-foreground">{text}</span>}
    </div>
  );
}

export function LoadingCard({ 
  children, 
  className 
}: { 
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(
      'flex items-center justify-center p-8 border border-dashed border-muted-foreground/25 rounded-lg bg-muted/10',
      className
    )}>
      {children || <LoadingSpinner size="lg" text="Loading..." />}
    </div>
  );
}
