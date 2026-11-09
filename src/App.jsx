import React, { useState, useCallback } from 'react';
import NeuralCanvas from './components/NeuralCanvas';
import Navbar from './components/Navbar';
import CommandPalette from './components/CommandPalette';
import Hero from './components/Hero';
import TelemetryHUD from './components/metrics/TelemetryHUD';
import ProjectsSection from './components/projects/ProjectsSection';
import ProjectDetailModal from './components/projects/ProjectDetailModal';
import SimulatorModal from './components/projects/SimulatorModal';
import Reveal from './components/common/Reveal';
import SkillsSection from './components/skills/SkillsSection';
import ExperienceTimeline from './components/experience/ExperienceTimeline';
import CreativeNarrative from './components/creative/CreativeNarrative';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/Footer';

export default function App() {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSimulator, setActiveSimulator] = useState('whatif');
  // Which simulator is open in the zoomed overlay (null = closed)
  const [zoomedSimulator, setZoomedSimulator] = useState(null);

  // Open a simulator zoomed-in over the current view (no scrolling/redirect)
  const handleTriggerSimulator = (simId = 'whatif') => {
    setActiveSimulator(simId);
    setZoomedSimulator(simId);
  };

  const closeSimulator = useCallback(() => setZoomedSimulator(null), []);

  return (
    <div className="min-h-screen bg-ink-950 text-slate-200 relative font-sans bg-grid-pattern grain">
      
      {/* Calm ambient background (drifting time-series lines + warm light) */}
      <NeuralCanvas />

      {/* Floating Global Glass Navigation Dock */}
      <Navbar 
        onOpenCommandPalette={() => setCommandPaletteOpen(true)} 
      />

      {/* Command Palette (Cmd+K / Ctrl+K) Spotlight Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onSelectProject={(project) => setSelectedProject(project)}
        onTriggerSimulator={handleTriggerSimulator}
      />

      {/* Deep-Dive Project Architecture Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Zoomed-in Live Simulator Overlay (Esc to close) */}
      <SimulatorModal
        simulatorId={zoomedSimulator}
        onClose={closeSimulator}
        onSwitch={handleTriggerSimulator}
      />

      {/* Main Page Layout Container */}
      <main className="relative z-10">
        
        {/* Hero Section */}
        <Hero 
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onLaunchSimulator={() => handleTriggerSimulator('whatif')}
        />

        {/* Key metrics strip */}
        <section className="border-y border-ink-800 bg-ink-950/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <TelemetryHUD />
          </div>
        </section>

        {/* Flagship Production Systems & Live Interactive Simulators */}
        <Reveal>
          <ProjectsSection
            onSelectProject={(project) => setSelectedProject(project)}
            activeSimulator={activeSimulator}
            setActiveSimulator={setActiveSimulator}
            onOpenSimulator={handleTriggerSimulator}
          />
        </Reveal>

        {/* Comprehensive Technical Skills & Specialized Domains */}
        <Reveal><SkillsSection /></Reveal>

        {/* Professional Trajectory & Research Internship Timeline */}
        <Reveal><ExperienceTimeline /></Reveal>

        {/* Creative dimension: content writing for Movies4u (contributor role) */}
        <Reveal><CreativeNarrative /></Reveal>

        {/* Contact */}
        <Reveal><ContactSection /></Reveal>

      </main>

      <Footer />

    </div>
  );
}
