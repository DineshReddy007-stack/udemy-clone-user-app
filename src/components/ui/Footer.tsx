
  'use client';

import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Youtube, Twitter, Globe } from 'lucide-react';
import { 
  footerData, 
  getVisibleSections, 
  getBrandInfo, 
  getCopyrightText,
  getBottomSocialLinks,
  FooterLink 
} from '@/data/footer';

export default function Footer() {
  const brand = getBrandInfo();
  const visibleSections = getVisibleSections();
  const copyrightText = getCopyrightText();
  const bottomSocialLinks = getBottomSocialLinks();

  const getIconComponent = (socialTitle: string) => {
    switch (socialTitle.toLowerCase()) {
      case 'facebook':
        return Facebook;
      case 'instagram':
        return Instagram;
      case 'linkedin':
        return Linkedin;
      case 'youtube':
        return Youtube;
      case 'twitter':
        return Twitter;
      default:
        return Globe;
    }
  };

  const renderFooterSection = (section: typeof visibleSections[0]) => {
    // Special handling for social links section
    if (section.id === 'section-social-001') {
      return (
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-black uppercase tracking-wider">
            {section.label}
          </h3>
          <div className="flex flex-wrap gap-4">
            {section.links.map((link) => {
              const IconComponent = getIconComponent(link.title);
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.target || (link.isExternal ? '_blank' : '_self')}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                  className="text-gray-600 hover:text-black inline-flex items-center text-sm transition-colors duration-200"
                  aria-label={link.ariaLabel || link.title}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      );
    }

    // Regular section rendering
    return (
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-black uppercase tracking-wider">
          {section.label}
        </h3>
        <ul className="space-y-2">
          {section.links.map(renderFooterLink)}
        </ul>
      </div>
    );
  };
    
  const renderFooterLink = (link: FooterLink) => {
    const IconComponent = getIconComponent(link.title);

    return (
      <li key={link.id}>
        <a
          href={link.href}
          target={link.target || (link.isExternal ? '_blank' : '_self')}
          rel={link.isExternal ? 'noopener noreferrer' : undefined}
          className="text-gray-600 hover:text-black inline-flex items-center text-sm transition-colors duration-200"
          aria-label={link.ariaLabel || link.title}
        >
          {link.title}
        </a>
      </li>
    );
  };
  return (
    <footer className="relative w-full bg-white text-black" role="contentinfo">
      {/* Top section with gradient border */}
      <div className="relative">
        <div className="absolute top-0 left-1/2 h-px w-1/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Brand section */}
            <AnimatedContainer className="lg:col-span-2">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-black">
                    {brand.logoText.main}
                  </span>
                  <span className="text-3xl font-bold text-black px-2 py-1">
                    {brand.logoText.accent}
                  </span>
                </div>
                <p className="text-gray-600 text-sm max-w-md">
                  {brand.description}
                </p>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Globe className="w-4 h-4" />
                  <span>{brand.language.current}</span>
                </div>
              </div>
            </AnimatedContainer>

            {/* Footer sections */}
            {visibleSections.map((section, index) => (
              <AnimatedContainer 
                key={section.id} 
                delay={footerData.settings.animationDelay + index * footerData.settings.animationDelay}
              >
                {renderFooterSection(section)}
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-500">
              {copyrightText}
            </div>
            <div className="flex items-center space-x-6">
              {/* Language selector */}
              {footerData.bottom.languageSelector.enabled && (
                <button 
                  className="text-gray-500 hover:text-black transition-colors"
                  aria-label="Language selector"
                >
                  <Globe className="w-5 h-5" />
                </button>
              )}
              
              {/* Bottom social links */}
              <div className="flex space-x-4">
                {bottomSocialLinks.map((social) => {
                  const IconComponent = getIconComponent(social.title);
                  return (
                    <a
                      key={social.id}
                      href={social.href}
                      target={social.target}
                      rel={social.isExternal ? 'noopener noreferrer' : undefined}
                      className="text-gray-500 hover:text-black transition-colors"
                      aria-label={social.ariaLabel || social.title}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: ComponentProps<typeof motion.div>['className'];
  children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();
  
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
      whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ 
        delay, 
        duration: footerData.settings.animationDuration 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}