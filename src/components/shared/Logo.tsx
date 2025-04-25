
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Banknote } from 'lucide-react';

interface LogoProps {
  small?: boolean;
  className?: string;
}

const Logo = ({ small = false, className }: LogoProps) => {
  if (small) {
    return (
      <div className={cn("flex items-center", className)}>
        <Banknote className="h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <Link to="/dashboard" className={cn("flex items-center gap-2", className)}>
      <Banknote className="h-8 w-8 text-primary" />
      <span className="font-semibold text-xl">Verde</span>
    </Link>
  );
};

export default Logo;
