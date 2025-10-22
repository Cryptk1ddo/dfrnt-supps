'use client';

import React, { useState } from 'react';
import { Calendar, Check, TrendingUp, Zap, Target } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

interface TimelinePhase {
  week: string;
  title: string;
  description: string;
  benefits: string[];
  intensity: number; // 1-100 for progress bar
  icon: 'zap' | 'trending' | 'target' | 'check';
}

interface BenefitsTimelineProps {
  phases: TimelinePhase[];
  productName?: string;
}

const iconMap = {
  zap: Zap,
  trending: TrendingUp,
  target: Target,
  check: Check,
};

export default function BenefitsTimeline({ phases, productName = 'this product' }: BenefitsTimelineProps) {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn delay={0}>
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-blue-500 mb-2">
            <Calendar className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">Expected Results Timeline</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Your Journey with {productName}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Most users experience progressive benefits over time. Here&apos;s what you can expect week by week.
          </p>
        </div>
      </FadeIn>

      {/* Timeline Navigation */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap justify-center gap-3">
          {phases.map((phase, index) => (
            <button
              key={index}
              onClick={() => setActivePhase(index)}
              className={`
                px-4 py-2 rounded-lg font-medium text-sm
                transition-all duration-300
                ${activePhase === index
                  ? 'bg-blue-500 text-white shadow-lg scale-105'
                  : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {phase.week}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Active Phase Content */}
      <FadeIn delay={0.2} key={activePhase}>
        <div className="bg-gradient-to-br from-blue-500/5 to-purple-500/5 border rounded-2xl p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Phase Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Week Badge */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                  <Calendar className="w-4 h-4 text-blue-500" />
                  <span className="font-semibold text-sm">{phases[activePhase].week}</span>
                </div>
              </div>

              {/* Title & Icon */}
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl">
                  {React.createElement(iconMap[phases[activePhase].icon], { className: 'w-6 h-6' })}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    {phases[activePhase].title}
                  </h3>
                  <p className="text-muted-foreground">
                    {phases[activePhase].description}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Results Intensity</span>
                  <span className="font-semibold">{phases[activePhase].intensity}%</span>
                </div>
                <div className="h-3 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${phases[activePhase].intensity}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Right Column: Benefits List */}
            <div className="lg:col-span-7">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                What You&apos;ll Notice
              </h4>
              <div className="space-y-3">
                {phases[activePhase].benefits.map((benefit, idx) => (
                  <div
                    key={idx}
                    className="
                      flex items-start gap-3 p-4 rounded-xl
                      bg-background border border-border/50
                      hover:border-blue-500/30 hover:bg-blue-500/5
                      transition-all duration-300
                      animate-in slide-in-from-left
                    "
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-500" />
                    </div>
                    <p className="text-sm leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Visual Timeline */}
      <FadeIn delay={0.3}>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 right-0 top-8 h-1 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 rounded-full"></div>
          
          {/* Timeline Dots */}
          <div className="relative flex justify-between">
            {phases.map((phase, index) => (
              <button
                key={index}
                onClick={() => setActivePhase(index)}
                className="flex flex-col items-center gap-3 group"
              >
                <div
                  className={`
                    w-16 h-16 rounded-full border-4 
                    flex items-center justify-center
                    transition-all duration-300
                    ${activePhase === index
                      ? 'bg-blue-500 border-blue-200 scale-110 shadow-lg shadow-blue-500/50'
                      : 'bg-background border-border group-hover:border-blue-500/50 group-hover:scale-105'
                    }
                  `}
                >
                  {React.createElement(iconMap[phase.icon], {
                    className: `w-7 h-7 ${activePhase === index ? 'text-white' : 'text-muted-foreground group-hover:text-blue-500'}`,
                  })}
                </div>
                <div className="text-center">
                  <p className={`text-xs font-semibold ${activePhase === index ? 'text-blue-500' : 'text-muted-foreground'}`}>
                    {phase.week}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Disclaimer */}
      <FadeIn delay={0.4}>
        <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto">
          * Results may vary based on individual factors including diet, exercise, sleep, and baseline health. 
          Timeline represents average user experiences from clinical studies and customer feedback.
        </p>
      </FadeIn>
    </div>
  );
}
