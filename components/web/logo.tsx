import Image from 'next/image';
import React from 'react';
import logo from '../../public/logo.png';
import { cn } from "@/lib/utils"; // Import cn to merge classes safely

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Image
      // Using cn allows you to keep 'dark:invert' and add new classes from Nav
      className={cn("dark:invert", className)}
      src={logo}
      alt="Mikumi Logo"
      width={100}
      height={20}
      priority
    />
  );
};

export default Logo;