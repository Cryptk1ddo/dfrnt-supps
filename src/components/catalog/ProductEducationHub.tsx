'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  Download, 
  Play, 
  ExternalLink, 
  ChevronDown, 
  FileText,
  Podcast,
  Award,
  Beaker,
  TrendingUp
} from 'lucide-react';
import Image from 'next/image';
import { FadeIn } from '@/components/ui/FadeIn';
import { Button } from '@/components/ui/Button';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
  url: string;
}

interface VideoContent {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  videoUrl: string;
}

interface DownloadableGuide {
  id: string;
  title: string;
  description: string;
  fileSize: string;
  pages: string;
  format: 'PDF' | 'EPUB';
  downloadUrl: string;
}

interface PodcastEpisode {
  id: string;
  title: string;
  podcast: string;
  duration: string;
  description: string;
  url: string;
}

interface HowItWorksStep {
  id: string;
  step: number;
  title: string;
  description: string;
  icon: 'beaker' | 'trending' | 'award';
  details: string[];
}

interface ProductEducationHubProps {
  blogPosts: BlogPost[];
  videos: VideoContent[];
  guides: DownloadableGuide[];
  podcasts: PodcastEpisode[];
  howItWorks: HowItWorksStep[];
  productName: string;
}

const iconMap = {
  beaker: Beaker,
  trending: TrendingUp,
  award: Award,
};

export default function ProductEducationHub({
  blogPosts,
  videos,
  guides,
  podcasts,
  howItWorks,
  productName,
}: ProductEducationHubProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>('how-it-works');
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <FadeIn delay={0}>
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center gap-2 text-blue-500 mb-2">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-semibold uppercase tracking-wide">Education Center</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Deep Dive: Understanding {productName}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Science-backed resources to help you make an informed decision. Knowledge is power.
          </p>
        </div>
      </FadeIn>

      {/* How It Works - Collapsible Section */}
      <FadeIn delay={0.1}>
        <div className="border border-border rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('how-it-works')}
            className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-blue-500/5 to-purple-500/5 hover:from-blue-500/10 hover:to-purple-500/10 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500 rounded-lg">
                <Beaker className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">How It Works</h3>
                <p className="text-sm text-muted-foreground">The science behind the formula</p>
              </div>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                expandedSection === 'how-it-works' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSection === 'how-it-works' && (
            <div className="p-6 space-y-6 animate-in slide-in-from-top-4 duration-500">
              {howItWorks.map((step, index) => {
                const Icon = iconMap[step.icon];
                return (
                  <div 
                    key={step.id}
                    className="flex gap-6 p-6 rounded-xl bg-muted/50 hover:bg-muted transition-all"
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
                          {step.step}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                      <p className="text-muted-foreground mb-4">{step.description}</p>
                      <ul className="space-y-2">
                        {step.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </FadeIn>

      {/* Blog Posts Section */}
      <FadeIn delay={0.2}>
        <div className="border border-border rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('blog-posts')}
            className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-green-500/5 to-blue-500/5 hover:from-green-500/10 hover:to-blue-500/10 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500 rounded-lg">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Related Articles</h3>
                <p className="text-sm text-muted-foreground">{blogPosts.length} in-depth guides</p>
              </div>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                expandedSection === 'blog-posts' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSection === 'blog-posts' && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-4 duration-500">
              {blogPosts.map((post) => (
                <a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 p-4 rounded-xl border border-border hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
                >
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-blue-500 uppercase">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.readTime}</span>
                    </div>
                    <h4 className="font-semibold line-clamp-2 mb-1 group-hover:text-blue-500 transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <span>By {post.author}</span>
                      <ExternalLink className="w-3 h-3 ml-1 group-hover:text-blue-500" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </FadeIn>

      {/* Video Content Section */}
      <FadeIn delay={0.3}>
        <div className="border border-border rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('videos')}
            className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-red-500/5 to-pink-500/5 hover:from-red-500/10 hover:to-pink-500/10 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500 rounded-lg">
                <Play className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Video Guides</h3>
                <p className="text-sm text-muted-foreground">{videos.length} expert demonstrations</p>
              </div>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                expandedSection === 'videos' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSection === 'videos' && (
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-4 duration-500">
              {videos.map((video) => (
                <div key={video.id} className="space-y-3">
                  <div 
                    className="relative aspect-video rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => setPlayingVideo(playingVideo === video.id ? null : video.id)}
                  >
                    {playingVideo === video.id ? (
                      <iframe
                        src={video.videoUrl}
                        className="absolute inset-0 w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <>
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-red-500 group-hover:bg-red-600 flex items-center justify-center shadow-xl transition-all">
                            <Play className="w-7 h-7 text-white ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-3 right-3 px-2 py-1 rounded bg-black/80 text-xs text-white">
                          {video.duration}
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{video.title}</h4>
                    <p className="text-sm text-muted-foreground">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </FadeIn>

      {/* Downloadable Guides Section */}
      <FadeIn delay={0.4}>
        <div className="border border-border rounded-2xl overflow-hidden">
          <button
            onClick={() => toggleSection('guides')}
            className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-purple-500/5 to-blue-500/5 hover:from-purple-500/10 hover:to-blue-500/10 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500 rounded-lg">
                <Download className="w-5 h-5 text-white" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg">Downloadable Resources</h3>
                <p className="text-sm text-muted-foreground">{guides.length} free guides</p>
              </div>
            </div>
            <ChevronDown 
              className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                expandedSection === 'guides' ? 'rotate-180' : ''
              }`}
            />
          </button>

          {expandedSection === 'guides' && (
            <div className="p-6 space-y-3 animate-in slide-in-from-top-4 duration-500">
              {guides.map((guide) => (
                <div
                  key={guide.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-purple-500/50 hover:bg-purple-500/5 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <FileText className="w-6 h-6 text-purple-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">{guide.title}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{guide.description}</p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{guide.format}</span>
                        <span>•</span>
                        <span>{guide.pages} pages</span>
                        <span>•</span>
                        <span>{guide.fileSize}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="group-hover:border-purple-500 group-hover:text-purple-500"
                    onClick={() => window.open(guide.downloadUrl, '_blank')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </FadeIn>

      {/* Podcast Mentions Section */}
      {podcasts.length > 0 && (
        <FadeIn delay={0.5}>
          <div className="border border-border rounded-2xl overflow-hidden">
            <button
              onClick={() => toggleSection('podcasts')}
              className="w-full p-6 flex items-center justify-between bg-gradient-to-r from-orange-500/5 to-red-500/5 hover:from-orange-500/10 hover:to-red-500/10 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-500 rounded-lg">
                  <Podcast className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-lg">Podcast Features</h3>
                  <p className="text-sm text-muted-foreground">{podcasts.length} expert discussions</p>
                </div>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                  expandedSection === 'podcasts' ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSection === 'podcasts' && (
              <div className="p-6 space-y-3 animate-in slide-in-from-top-4 duration-500">
                {podcasts.map((episode) => (
                  <a
                    key={episode.id}
                    href={episode.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-orange-500/50 hover:bg-orange-500/5 transition-all group"
                  >
                    <div className="p-3 bg-orange-500/10 rounded-lg">
                      <Podcast className="w-6 h-6 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-orange-500">
                          {episode.podcast}
                        </span>
                        <span className="text-xs text-muted-foreground">{episode.duration}</span>
                      </div>
                      <h4 className="font-semibold mb-1 group-hover:text-orange-500 transition-colors">
                        {episode.title}
                      </h4>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {episode.description}
                      </p>
                    </div>
                    <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-orange-500 flex-shrink-0" />
                  </a>
                ))}
              </div>
            )}
          </div>
        </FadeIn>
      )}
    </div>
  );
}
