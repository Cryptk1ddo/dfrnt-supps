'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, Maximize2, Play, RotateCw } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface GalleryImage {
  src: string
  alt: string
  type: 'image' | 'video'
}

interface EnhancedImageGalleryProps {
  images: GalleryImage[]
  productName: string
}

export default function EnhancedImageGallery({ images, productName }: EnhancedImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })
  const [rotation, setRotation] = useState(0)
  const [is360View, setIs360View] = useState(false)
  const [rotation360, setRotation360] = useState(0)
  const imageRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startX = useRef(0)

  const selectedImage = images[selectedIndex]

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index)
    setIsZoomed(false)
    setRotation(0)
  }

  // Handle previous/next navigation
  const handlePrevious = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))
    setIsZoomed(false)
  }

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))
    setIsZoomed(false)
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'ArrowLeft') handlePrevious()
        if (e.key === 'ArrowRight') handleNext()
        if (e.key === 'Escape') closeLightbox()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, selectedIndex])

  // Handle zoom on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageRef.current) return

    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    setZoomPosition({ x, y })
  }

  const handleMouseEnter = () => {
    if (selectedImage.type === 'image') {
      setIsZoomed(true)
    }
  }

  const handleMouseLeave = () => {
    setIsZoomed(false)
  }

  // Open lightbox
  const openLightbox = () => {
    setIsLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setIsZoomed(false)
    setRotation(0)
    document.body.style.overflow = 'auto'
  }

  // Handle 360° view drag
  const handle360DragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!is360View) return
    isDragging.current = true
    startX.current = 'touches' in e ? e.touches[0].clientX : e.clientX
  }

  const handle360Drag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || !is360View) return
    
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const delta = currentX - startX.current
    
    setRotation360((prev) => (prev + delta * 0.5) % 360)
    startX.current = currentX
  }

  const handle360DragEnd = () => {
    isDragging.current = false
  }

  return (
    <>
      {/* Main Gallery */}
      <div className="space-y-4">
        {/* Main Image Display */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 border-2 border-gray-200 group">
          {/* 360° View Mode */}
          {is360View ? (
            <div
              ref={imageRef}
              className="relative h-full cursor-grab active:cursor-grabbing select-none"
              onMouseDown={handle360DragStart}
              onMouseMove={handle360Drag}
              onMouseUp={handle360DragEnd}
              onMouseLeave={handle360DragEnd}
              onTouchStart={handle360DragStart}
              onTouchMove={handle360Drag}
              onTouchEnd={handle360DragEnd}
            >
              <div
                className="relative h-full transition-transform duration-100"
                style={{ transform: `rotateY(${rotation360}deg)` }}
              >
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="absolute top-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-lg text-white text-sm font-medium flex items-center gap-2">
                <RotateCw className="w-4 h-4 animate-spin" />
                360° View - Drag to rotate
              </div>
            </div>
          ) : selectedImage.type === 'video' ? (
            /* Video Display */
            <div className="relative h-full">
              <video
                src={selectedImage.src}
                className="w-full h-full object-cover"
                controls
                autoPlay
                loop
                muted
              />
            </div>
          ) : (
            /* Standard Image with Zoom */
            <div
              ref={imageRef}
              className="relative h-full cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={openLightbox}
            >
              <Image
                src={selectedImage.src}
                alt={selectedImage.alt}
                fill
                className={`object-cover transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                      }
                    : {}
                }
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Zoom Hint */}
              {!isZoomed && (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-sm font-medium flex items-center gap-2">
                    <ZoomIn className="w-4 h-4" />
                    Hover to zoom • Click for fullscreen
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Navigation Arrows */}
          {images.length > 1 && !is360View && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/90 hover:bg-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute top-4 left-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-lg text-white text-sm font-medium">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* 360° Toggle Button */}
          <button
            onClick={() => setIs360View(!is360View)}
            className={`absolute top-4 right-4 px-3 py-1.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
              is360View
                ? 'bg-blue-600 text-white'
                : 'bg-white/90 hover:bg-white text-gray-900'
            }`}
          >
            <RotateCw className="w-4 h-4" />
            {is360View ? 'Exit 360°' : '360° View'}
          </button>
        </div>

        {/* Thumbnail Carousel */}
        <div className="relative">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleThumbnailClick(index)}
                className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedIndex === index
                    ? 'border-blue-600 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {image.type === 'video' ? (
                  <div className="relative w-full h-full bg-gray-200">
                    <Play className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white drop-shadow-lg" />
                    <Image
                      src={image.src.replace('.mp4', '-thumb.jpg')}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover opacity-80"
                      sizes="80px"
                    />
                  </div>
                ) : (
                  <Image
                    src={image.src}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-black/50 backdrop-blur-sm">
            <div className="text-white">
              <h3 className="font-semibold">{productName}</h3>
              <p className="text-sm text-gray-300">
                {selectedIndex + 1} of {images.length}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setRotation((prev) => (prev - 90) % 360)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Rotate left"
              >
                <RotateCw className="w-5 h-5 rotate-180" />
              </button>
              <button
                onClick={() => setRotation((prev) => (prev + 90) % 360)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Rotate right"
              >
                <RotateCw className="w-5 h-5" />
              </button>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="relative w-full h-full max-w-6xl max-h-[80vh]">
              {selectedImage.type === 'video' ? (
                <video
                  src={selectedImage.src}
                  className="w-full h-full object-contain"
                  controls
                  autoPlay
                />
              ) : (
                <div
                  className="relative w-full h-full"
                  style={{ transform: `rotate(${rotation}deg)` }}
                >
                  <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 p-4 bg-black/50 backdrop-blur-sm">
            <button
              onClick={handlePrevious}
              className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    selectedIndex === index
                      ? 'bg-white w-8'
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              className="p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
