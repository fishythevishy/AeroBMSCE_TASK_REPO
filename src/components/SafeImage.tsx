import React, { useState } from 'react';
import { Plane, AlertCircle } from 'lucide-react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackTitle?: string;
  className?: string;
  containerClassName?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  fallbackTitle,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If error, show sleek technical aerospace fallback
  if (hasError) {
    return (
      <div
        className={`relative overflow-hidden bg-[#090910] border border-[#29263C] flex flex-col items-center justify-center p-6 text-center ${containerClassName}`}
        style={{ minHeight: '180px' }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(#8888C8_1px,transparent_1px)] [background-size:16px_16px] opacity-10 pointer-events-none" />
        <Plane className="w-8 h-8 text-[#B9B7FF]/60 mb-2 stroke-[1.5]" />
        <span className="text-xs font-mono uppercase tracking-wider text-[#B9B7FF]/80">
          {fallbackTitle || alt || 'AeroBMSCE System Visual'}
        </span>
        <span className="text-[10px] text-[#8888C8]/60 mt-1 font-mono">
          Propel Lab-3 Engineering Archive
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Background skeleton while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-[#090910] animate-pulse flex items-center justify-center">
          <Plane className="w-6 h-6 text-[#29263C]" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
        {...props}
      />
    </div>
  );
};
