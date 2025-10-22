'use client';

import React, { useState } from 'react';
import { Info, ExternalLink, Award, Beaker, TrendingUp, Shield, Zap } from 'lucide-react';
import { FadeIn } from '@/components/ui/FadeIn';

interface Study {
  title: string;
  source: string;
  url: string;
  year: number;
}

interface Ingredient {
  id: string;
  name: string;
  dosage: string;
  category: 'core' | 'supporting' | 'absorption';
  icon: 'beaker' | 'shield' | 'trending' | 'award' | 'zap';
  shortDescription: string;
  detailedDescription: string;
  benefits: string[];
  studies: Study[];
  color: string;
}

interface InteractiveIngredientsProps {
  ingredients: Ingredient[];
}

const iconMap = {
  beaker: Beaker,
  shield: Shield,
  trending: TrendingUp,
  award: Award,
  zap: Zap,
};

const categoryColors = {
  core: 'from-blue-500/20 to-blue-600/20 border-blue-500/30',
  supporting: 'from-purple-500/20 to-purple-600/20 border-purple-500/30',
  absorption: 'from-green-500/20 to-green-600/20 border-green-500/30',
};

const categoryLabels = {
  core: 'Core Ingredient',
  supporting: 'Supporting Compound',
  absorption: 'Bioavailability Enhancer',
};

export default function InteractiveIngredients({ ingredients }: InteractiveIngredientsProps) {
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleCardClick = (ingredientId: string) => {
    if (expandedCard === ingredientId) {
      setExpandedCard(null);
      setSelectedIngredient(null);
    } else {
      setExpandedCard(ingredientId);
      setSelectedIngredient(ingredientId);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn delay={0}>
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">
            Science-Backed Ingredients
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every ingredient is carefully selected and dosed based on clinical research. 
            Click any ingredient to explore the science behind it.
          </p>
        </div>
      </FadeIn>

      {/* Category Legend */}
      <FadeIn delay={0.1}>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-muted-foreground">Core Ingredients</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-muted-foreground">Supporting Compounds</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-muted-foreground">Absorption Enhancers</span>
          </div>
        </div>
      </FadeIn>

      {/* Ingredient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ingredients.map((ingredient, index) => {
          const Icon = iconMap[ingredient.icon];
          const isExpanded = expandedCard === ingredient.id;
          const isSelected = selectedIngredient === ingredient.id;

          return (
            <FadeIn key={ingredient.id} delay={0.1 * (index + 1)}>
              <div
                className={`
                  relative group cursor-pointer
                  bg-gradient-to-br ${categoryColors[ingredient.category]}
                  border rounded-xl p-6
                  transition-all duration-300
                  hover:shadow-xl hover:scale-[1.02]
                  ${isSelected ? 'ring-2 ring-offset-2 ring-offset-background scale-[1.02] shadow-xl' : ''}
                  ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}
                `}
                onClick={() => handleCardClick(ingredient.id)}
              >
                {/* Category Badge */}
                <div className="absolute top-3 right-3">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-background/50 backdrop-blur-sm border">
                    {categoryLabels[ingredient.category]}
                  </span>
                </div>

                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${ingredient.color} text-white`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg leading-tight mb-1">
                      {ingredient.name}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground">
                      {ingredient.dosage}
                    </p>
                  </div>
                </div>

                {/* Short Description (Always Visible) */}
                <p className="text-sm text-muted-foreground mb-3">
                  {ingredient.shortDescription}
                </p>

                {/* Expandable Content */}
                {isExpanded && (
                  <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
                    {/* Detailed Description */}
                    <div className="prose prose-sm max-w-none">
                      <p className="text-foreground">{ingredient.detailedDescription}</p>
                    </div>

                    {/* Benefits Grid */}
                    <div>
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-500" />
                        Key Benefits
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {ingredient.benefits.map((benefit, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-sm bg-background/50 rounded-lg p-3"
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                            <span>{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Clinical Studies */}
                    <div>
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4 text-blue-500" />
                        Clinical Research ({ingredient.studies.length} studies)
                      </h4>
                      <div className="space-y-2">
                        {ingredient.studies.map((study, idx) => (
                          <a
                            key={idx}
                            href={study.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                              flex items-start gap-3 p-3 rounded-lg
                              bg-background/50 hover:bg-background
                              border border-transparent hover:border-border
                              transition-all duration-200 group/study
                            "
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover/study:text-blue-500 mt-0.5 flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium line-clamp-2 group-hover/study:text-blue-500">
                                {study.title}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {study.source} • {study.year}
                              </p>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Click to Expand Hint */}
                {!isExpanded && (
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground text-center flex items-center justify-center gap-1">
                      <Info className="w-3 h-3" />
                      Click to view research & benefits
                    </p>
                  </div>
                )}
              </div>
            </FadeIn>
          );
        })}
      </div>

      {/* Formula Transparency Badge */}
      <FadeIn delay={0.5}>
        <div className="bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">100% Transparent Formula</h3>
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            No proprietary blends. Every ingredient and dosage is fully disclosed and backed by clinical research.
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
