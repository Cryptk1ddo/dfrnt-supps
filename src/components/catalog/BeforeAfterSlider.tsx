'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
  timeframe?: string;
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  title,
  description,
  timeframe,
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    
    // Clamp between 0 and 100
    const clampedPercentage = Math.max(0, Math.min(100, percentage));
    setSliderPosition(clampedPercentage);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleStart = () => {
    setIsDragging(true);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  return (
    <div className="space-y-6">
      {/* Header */}
      {(title || description) && (
        <FadeIn delay={0}>
          <div className="text-center space-y-2">
            {title && <h3 className="text-2xl font-bold">{title}</h3>}
            {description && (
              <p className="text-muted-foreground max-w-2xl mx-auto">{description}</p>
            )}
            {timeframe && (
              <p className="text-sm font-semibold text-blue-500">
                Results after {timeframe}
              </p>
            )}
          </div>
        </FadeIn>
      )}

      {/* Before/After Slider */}
      <FadeIn delay={0.1}>
        <div
          ref={containerRef}
          className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-ew-resize select-none border-4 border-border shadow-2xl"
          onMouseDown={handleStart}
          onTouchStart={handleStart}
          onClick={(e) => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            setSliderPosition(Math.max(0, Math.min(100, percentage)));
          }}
        >
          {/* After Image (Full Width) */}
          <div className="absolute inset-0">
            <Image
              src={afterImage}
              alt={afterLabel}
              fill
              className="object-cover"
              priority
            />
            {/* After Label */}
            <div className="absolute top-4 right-4 px-4 py-2 bg-green-500 text-white font-bold text-sm rounded-full shadow-lg">
              {afterLabel}
            </div>
          </div>

          {/* Before Image (Clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <Image
              src={beforeImage}
              alt={beforeLabel}
              fill
              className="object-cover"
              priority
            />
            {/* Before Label */}
            <div className="absolute top-4 left-4 px-4 py-2 bg-gray-500 text-white font-bold text-sm rounded-full shadow-lg">
              {beforeLabel}
            </div>
          </div>

          {/* Slider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
            style={{ left: `${sliderPosition}%` }}
          >
            {/* Handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-16 h-16">
                {/* Outer Circle */}
                <div className="absolute inset-0 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-gray-200">
                  {/* Arrows */}
                  <div className="flex items-center gap-0.5">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </div>
                </div>
                
                {/* Pulse Effect */}
                {!isDragging && (
                  <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-ping"></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Instructions */}
      <FadeIn delay={0.2}>
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            <span className="hidden sm:inline">Drag the slider or click anywhere to compare results</span>
            <span className="sm:hidden">Tap or drag to compare results</span>
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
