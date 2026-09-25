// LandingPage.tsx
// Seamless wrapper rendering the cinematic scroll-driven Particle Intro Story.

import React from 'react';
import { IntroShell } from '../intro/IntroShell';

interface LandingPageProps {
  onEnterApp: (route?: string, entityId?: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onEnterApp }) => {
  return <IntroShell onEnterApp={onEnterApp} />;
};
