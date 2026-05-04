import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function GlassCard({ children, className = '', hover = true, ...props }: GlassCardProps) {
  return (
    <motion.div
      className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-lg ${className}`}
      whileHover={hover ? { scale: 1.02, borderColor: 'rgba(255,255,255,0.2)' } : undefined}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
