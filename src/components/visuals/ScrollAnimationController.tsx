'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ASSETS, BRAND } from '@/utils/constants';
import { PhoneFrame } from '@/components/ui/PhoneFrame';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ScrollAnimationController = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const flavorRef = useRef<HTMLDivElement>(null);
  const phonesContainerRef = useRef<HTMLDivElement>(null);
  const phone1Ref = useRef<HTMLDivElement>(null);
  const phone2Ref = useRef<HTMLDivElement>(null);
  const phone3Ref = useRef<HTMLDivElement>(null); // Center phone
  const phone4Ref = useRef<HTMLDivElement>(null);
  const phone5Ref = useRef<HTMLDivElement>(null);
  
  const [currentFlavor, setCurrentFlavor] = useState(0);
  const [currentBg, setCurrentBg] = useState<keyof typeof ASSETS.backgrounds>('hero');
  const [showPhones, setShowPhones] = useState(false);
  const [phonesConverged, setPhonesConverged] = useState(false);
  const [showFinalPhone, setShowFinalPhone] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Kill any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(st => st.kill());

      // Section 1 -> Section 2: Flavor 1 to Flavor 2, move left
      ScrollTrigger.create({
        trigger: '#section-benefits',
        start: 'top 80%',
        end: 'top 20%',
        onEnter: () => {
          setCurrentFlavor(1);
          setCurrentBg('benefits');
          gsap.to(flavorRef.current, {
            x: '-30vw',
            scale: 0.8,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          setCurrentFlavor(0);
          setCurrentBg('hero');
          gsap.to(flavorRef.current, {
            x: 0,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
      });

      // Section 2 -> Section 3: Flavor 2 to Flavor 3, move to center-bottom
      ScrollTrigger.create({
        trigger: '#section-events',
        start: 'top 80%',
        end: 'top 30%',
        onEnter: () => {
          setCurrentFlavor(2);
          setCurrentBg('events');
          gsap.to(flavorRef.current, {
            x: '24vw',
            y: '-7vh',
            scale: 0.7,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          setCurrentFlavor(1);
          setCurrentBg('benefits');
          gsap.to(flavorRef.current, {
            x: '-30vw',
            y: 0,
            scale: 0.8,
            duration: 0.8,
            ease: 'power2.out',
          });
        },
      });

      // Section 3: Show 5 phones rising from bottom
      ScrollTrigger.create({
        trigger: '#section-events',
        start: 'top -20%',
        onEnter: () => {
          setShowPhones(true);
          // Hide the flavor
          gsap.to(flavorRef.current, {
            opacity: 0,
            scale: 0.5,
            duration: 0.5,
            ease: 'power2.inOut',
          });
          // Animate phones up from bottom with stagger
          gsap.fromTo(
            [phone1Ref.current, phone2Ref.current, phone3Ref.current, phone4Ref.current, phone5Ref.current],
            { y: '100vh', opacity: 0 },
            { 
              y: 0, 
              opacity: 1, 
              duration: 0.8, 
              stagger: 0.1,
              ease: 'power3.out',
            }
          );
        },
        onLeaveBack: () => {
          setShowPhones(false);
          gsap.to(flavorRef.current, {
            opacity: 1,
            scale: 0.7,
            x: '24vw',
            y: '-7vh',
            duration: 0.5,
            ease: 'power2.out',
          });
          // Hide phones
          gsap.to(
            [phone1Ref.current, phone2Ref.current, phone3Ref.current, phone4Ref.current, phone5Ref.current],
            { y: '100vh', opacity: 0, duration: 0.4 }
          );
        },
      });

      // Section 3: Phones converge to center (behind middle phone)
      ScrollTrigger.create({
        trigger: '#section-events',
        start: 'top -80%',
        onEnter: () => {
          setPhonesConverged(true);
          // Side phones slide behind center phone
          gsap.to(phone1Ref.current, { x: '200%', opacity: 0, duration: 0.6, ease: 'power2.inOut' });
          gsap.to(phone2Ref.current, { x: '100%', opacity: 0, duration: 0.6, ease: 'power2.inOut', delay: 0.05 });
          gsap.to(phone4Ref.current, { x: '-100%', opacity: 0, duration: 0.6, ease: 'power2.inOut', delay: 0.05 });
          gsap.to(phone5Ref.current, { x: '-200%', opacity: 0, duration: 0.6, ease: 'power2.inOut' });
          // Center phone stays and grows slightly
          gsap.to(phone3Ref.current, { scale: 1.1, duration: 0.6, ease: 'power2.out' });
        },
        onLeaveBack: () => {
          setPhonesConverged(false);
          // Reset all phones to original position
          gsap.to(phone1Ref.current, { x: 0, opacity: 1, duration: 0.5 });
          gsap.to(phone2Ref.current, { x: 0, opacity: 1, duration: 0.5 });
          gsap.to(phone3Ref.current, { scale: 1, duration: 0.5 });
          gsap.to(phone4Ref.current, { x: 0, opacity: 1, duration: 0.5 });
          gsap.to(phone5Ref.current, { x: 0, opacity: 1, duration: 0.5 });
        },
      });

      // Testimonials section: Phone tilts into snow with ice background
      ScrollTrigger.create({
        trigger: '#section-testimonials',
        start: 'top 70%',
        onEnter: () => {
          setCurrentBg('testimonials');
          // Move center phone down and tilt as if resting in snow
          gsap.to(phone3Ref.current, { 
            y: '35vh', 
            rotation: -8,
            scale: 1.15, 
            duration: 1, 
            ease: 'power2.out' 
          });
        },
        onLeaveBack: () => {
          setCurrentBg('events');
          // Reset center phone position
          gsap.to(phone3Ref.current, { 
            y: 0, 
            rotation: 0,
            scale: 1.1, 
            duration: 0.6, 
            ease: 'power2.out' 
          });
        },
      });

      // Contact section: Zoom into phone then transition to contact background
      ScrollTrigger.create({
        trigger: '#section-contact',
        start: 'top 70%',
        onEnter: () => {
          // Zoom into the phone dramatically
          gsap.to(phone3Ref.current, { 
            scale: 8,
            y: '50vh',
            rotation: 0,
            opacity: 0,
            duration: 1.2, 
            ease: 'power2.inOut',
            onComplete: () => {
              setCurrentBg('contact');
            }
          });
        },
        onLeaveBack: () => {
          setCurrentBg('testimonials');
          // Reset phone to tilted snow position
          gsap.to(phone3Ref.current, { 
            scale: 1.15,
            y: '35vh',
            rotation: -8,
            opacity: 1,
            duration: 0.8, 
            ease: 'power2.out' 
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Background Layer */}
      <div ref={backgroundRef} className="absolute inset-0 transition-all duration-1000 ease-out">
        {Object.entries(ASSETS.backgrounds).map(([key, src]) => (
          <div
            key={key}
            className={`absolute inset-0 bg-section transition-opacity duration-1000 ${
              currentBg === key ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </div>

      {/* Floating Flavor Bowl */}
      <div
        ref={flavorRef}
        className={`absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[750px] lg:h-[750px] transition-opacity duration-500 ${
          showPhones ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {ASSETS.flavors.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-700 ease-out ${
              currentFlavor === index 
                ? 'opacity-100 scale-100 blur-0' 
                : 'opacity-0 scale-95 blur-sm'
            }`}
          >
            <div className="relative w-full h-full animate-float">
              <Image
                src={src}
                alt={`Kakigori Flavor ${index + 1}`}
                fill
                className="object-contain drop-shadow-2xl"
                priority={index === 0}
              />
              {/* Ground shadow */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/20 blur-2xl rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* 5 Phone Row */}
      <div
        ref={phonesContainerRef}
        className={`absolute bottom-24 left-0 right-0 flex items-end justify-center transition-opacity duration-500 ${
          showPhones ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-end justify-center gap-2 md:gap-4 px-4">
          {/* Phone 1 (far left) */}
          <div ref={phone1Ref} className="flex-shrink-0">
            <PhoneFrame className="w-28 md:w-36 lg:w-40">
              <Image
                src="/assets/Phone-frames/red-wedding.jpg"
                alt="Weddings"
                fill
                className="object-cover"
              />
            </PhoneFrame>
          </div>

          {/* Phone 2 */}
          <div ref={phone2Ref} className="flex-shrink-0">
            <PhoneFrame className="w-28 md:w-36 lg:w-40">
              <Image
                src="/assets/Phone-frames/brown-communitevents.jpg"
                alt="Community events"
                fill
                className="object-cover"
              />
            </PhoneFrame>
          </div>

          {/* Phone 3 (CENTER - stays visible) */}
          <div ref={phone3Ref} className="flex-shrink-0 z-10">
            <PhoneFrame className="w-32 md:w-40 lg:w-48 phone-glow">
              <Image
                src="/assets/Phone-frames/Contact info.jpg"
                alt="Contact info"
                fill
                className="object-cover"
              />
            </PhoneFrame>
          </div>

          {/* Phone 4 */}
          <div ref={phone4Ref} className="flex-shrink-0">
            <PhoneFrame className="w-28 md:w-36 lg:w-40">
              <Image
                src="/assets/Phone-frames/yellow-corporateevents.jpg"
                alt="Corporate events"
                fill
                className="object-cover"
              />
            </PhoneFrame>
          </div>

          {/* Phone 5 (far right) */}
          <div ref={phone5Ref} className="flex-shrink-0">
            <PhoneFrame className="w-28 md:w-36 lg:w-40">
              <Image
                src="/assets/Phone-frames/green-batmitzvah.jpg"
                alt="Bar / Bat Mitzvah"
                fill
                className="object-cover"
              />
            </PhoneFrame>
          </div>
        </div>
      </div>

    </div>
  );
};
