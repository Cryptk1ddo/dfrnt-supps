'use client';

import React, { useState } from 'react';
import { 
  Play, 
  ExternalLink, 
  Award, 
  CheckCircle, 
  Star,
  Quote,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';

interface VideoTestimonial {
  id: string;
  name: string;
  title: string;
  location: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  quote: string;
  rating: number;
}

interface Certification {
  id: string;
  name: string;
  description: string;
  logo: string;
  verificationUrl: string;
  badge: string;
}

interface ExpertEndorsement {
  id: string;
  name: string;
  credentials: string;
  photo: string;
  quote: string;
  specialty: string;
}

interface MediaFeature {
  id: string;
  outlet: string;
  logo: string;
  headline: string;
  excerpt: string;
  url: string;
  date: string;
}

interface TrustSignalsProps {
  videoTestimonials: VideoTestimonial[];
  certifications: Certification[];
  expertEndorsements: ExpertEndorsement[];
  mediaFeatures: MediaFeature[];
}

export default function TrustSignals({
  videoTestimonials,
  certifications,
  expertEndorsements,
  mediaFeatures,
}: TrustSignalsProps) {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaFeatures.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + mediaFeatures.length) % mediaFeatures.length);
  };

  return (
    <div className="space-y-20">
      {/* Video Testimonials Section */}
      <FadeIn delay={0}>
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-blue-500 mb-2">
              <Play className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Real Stories</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Customer Video Testimonials
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear directly from our customers about their transformative experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTestimonials.map((testimonial, index) => (
              <FadeIn key={testimonial.id} delay={0.1 * (index + 1)}>
                <div className="group space-y-4">
                  {/* Video Player */}
                  <div 
                    className="relative aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer bg-muted"
                    onClick={() => setPlayingVideo(playingVideo === testimonial.id ? null : testimonial.id)}
                  >
                    {playingVideo === testimonial.id ? (
                      <iframe
                        src={testimonial.videoUrl}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <Image
                          src={testimonial.thumbnail}
                          alt={`${testimonial.name} testimonial`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-70 transition-opacity"></div>
                        
                        {/* Play Button */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center shadow-xl transition-all group-hover:scale-110">
                            <Play className="w-7 h-7 text-black ml-1" fill="black" />
                          </div>
                        </div>

                        {/* Duration Badge */}
                        <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/80 text-xs text-white font-semibold">
                          {testimonial.duration}
                        </div>

                        {/* User Info Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            ))}
                          </div>
                          <h3 className="font-bold text-white text-lg">{testimonial.name}</h3>
                          <p className="text-sm text-white/80">{testimonial.title}</p>
                          <p className="text-xs text-white/60 mt-1">{testimonial.location}</p>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Quote */}
                  <div className="p-4 bg-muted/50 rounded-xl border border-border">
                    <Quote className="w-6 h-6 text-muted-foreground mb-2" />
                    <p className="text-sm italic line-clamp-3">&quot;{testimonial.quote}&quot;</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Certifications Section */}
      <FadeIn delay={0.2}>
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-green-500 mb-2">
              <Award className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Verified Quality</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Third-Party Certifications
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Independently tested and certified by industry-leading organizations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <FadeIn key={cert.id} delay={0.1 * (index + 1)}>
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative p-6 rounded-2xl border border-border hover:border-green-500/50 bg-gradient-to-br from-green-500/5 to-transparent hover:from-green-500/10 transition-all"
                >
                  {/* Badge */}
                  <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>

                  {/* Logo */}
                  <div className="relative w-full h-24 mb-4 flex items-center justify-center">
                    <Image
                      src={cert.logo}
                      alt={cert.name}
                      fill
                      className="object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="font-bold mb-2 group-hover:text-green-500 transition-colors">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {cert.description}
                    </p>
                    <div className="inline-flex items-center gap-1 text-xs text-green-500 font-semibold">
                      <span>Verify Certificate</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </div>

                  {/* Badge Label */}
                  <div className="mt-4 pt-4 border-t border-border">
                    <div className="px-3 py-1 bg-green-500/10 rounded-full text-center">
                      <span className="text-xs font-semibold text-green-500">{cert.badge}</span>
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Expert Endorsements Section */}
      <FadeIn delay={0.3}>
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-purple-500 mb-2">
              <Award className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">Expert Approved</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Doctor & Expert Endorsements
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Recommended by leading health professionals and industry experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {expertEndorsements.map((expert, index) => (
              <FadeIn key={expert.id} delay={0.1 * (index + 1)}>
                <div className="p-6 rounded-2xl border border-border hover:border-purple-500/50 bg-gradient-to-br from-purple-500/5 to-transparent hover:from-purple-500/10 transition-all">
                  {/* Expert Photo */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-purple-500/20">
                      <Image
                        src={expert.photo}
                        alt={expert.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold">{expert.name}</h3>
                      <p className="text-sm text-muted-foreground">{expert.credentials}</p>
                      <div className="mt-1 px-2 py-0.5 bg-purple-500/10 rounded text-xs text-purple-500 font-semibold inline-block">
                        {expert.specialty}
                      </div>
                    </div>
                  </div>

                  {/* Quote */}
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-8 h-8 text-purple-500/20" />
                    <p className="text-sm italic pl-6 leading-relaxed">
                      &quot;{expert.quote}&quot;
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* Media Coverage Carousel */}
      <FadeIn delay={0.4}>
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2 text-orange-500 mb-2">
              <Star className="w-5 h-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">As Featured In</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Media Coverage
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Featured in leading health and wellness publications.
            </p>
          </div>

          <div className="relative">
            {/* Carousel */}
            <div className="overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-orange-500/5 to-transparent">
              <div className="p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  {/* Logo */}
                  <div className="relative h-24 flex items-center justify-center">
                    <Image
                      src={mediaFeatures[currentMediaIndex].logo}
                      alt={mediaFeatures[currentMediaIndex].outlet}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {mediaFeatures[currentMediaIndex].date}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">
                      {mediaFeatures[currentMediaIndex].headline}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {mediaFeatures[currentMediaIndex].excerpt}
                    </p>
                    <a
                      href={mediaFeatures[currentMediaIndex].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-orange-500 font-semibold hover:underline"
                    >
                      Read Full Article
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prevMedia}
                className="w-10 h-10 rounded-full border border-border hover:border-orange-500 hover:bg-orange-500/10 flex items-center justify-center transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex gap-2">
                {mediaFeatures.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMediaIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentMediaIndex
                        ? 'bg-orange-500 w-8'
                        : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={nextMedia}
                className="w-10 h-10 rounded-full border border-border hover:border-orange-500 hover:bg-orange-500/10 flex items-center justify-center transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
