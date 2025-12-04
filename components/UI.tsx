import React, { useState } from 'react';
import { Sparkles, Play, Volume2, VolumeX } from 'lucide-react';
import { generateLuxuryGreeting } from '../services/geminiService';
import { AppState, GreetingResponse } from '../types';

interface UIProps {
  appState: AppState;
  setAppState: (state: AppState) => void;
}

export const UI: React.FC<UIProps> = ({ appState, setAppState }) => {
  const targetName = "Kiola";
  const [greetingData, setGreetingData] = useState<GreetingResponse | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const handleGenerate = async () => {
    setAppState(AppState.GENERATING);
    const data = await generateLuxuryGreeting(targetName);
    setGreetingData(data);
    setAppState(AppState.SHOWING);
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setGreetingData(null);
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-between p-6 md:p-12 text-[#FFD700]">
      {/* Header */}
      <header className="flex justify-between items-start pointer-events-auto">
        <div className="flex flex-col">
            <h1 className="font-serif text-3xl md:text-5xl tracking-widest uppercase" style={{ fontFamily: '"Playfair Display", serif' }}>
                Arix
            </h1>
            <span className="text-xs md:text-sm tracking-[0.3em] text-emerald-400 uppercase mt-1">
                Signature Collection
            </span>
        </div>
        <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 border border-[#FFD700]/30 rounded-full hover:bg-[#FFD700]/10 transition-colors"
        >
            {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center pointer-events-auto">
        {appState === AppState.IDLE && (
           <div className="backdrop-blur-sm bg-black/40 p-8 rounded-2xl border border-[#FFD700]/20 shadow-[0_0_50px_-12px_rgba(0,0,0,0.8)] text-center max-w-md w-full transition-all duration-700 ease-out transform translate-y-0 opacity-100">
             <h2 className="font-serif text-2xl mb-2 italic text-emerald-100">Welcome, {targetName}</h2>
             <p className="text-[#FFD700]/60 text-sm mb-8 tracking-widest uppercase">The Collection Awaits</p>
             
             <button 
                onClick={handleGenerate}
                className="px-8 py-3 bg-[#FFD700] text-black font-semibold tracking-widest uppercase text-xs hover:bg-[#FFF] transition-all duration-300 w-full flex items-center justify-center gap-2"
             >
                <Sparkles size={14} />
                Reveal Your Signature
             </button>
           </div>
        )}

        {appState === AppState.GENERATING && (
            <div className="text-center animate-pulse">
                <div className="w-16 h-16 border-2 border-[#FFD700] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="font-serif italic text-lg text-[#FFD700]/80">Curating elegance for {targetName}...</p>
            </div>
        )}

        {appState === AppState.SHOWING && greetingData && (
             <div className="backdrop-blur-md bg-[#001a0f]/80 p-10 rounded-sm border-y border-[#FFD700] shadow-[0_0_100px_-20px_rgba(255,215,0,0.15)] text-center max-w-lg w-full transform transition-all duration-1000 ease-out">
                <div className="mb-6">
                    <p className="text-xs tracking-[0.4em] uppercase text-emerald-400 mb-2">Exclusive Greeting For</p>
                    <h3 className="font-serif text-3xl text-white">{greetingData.signature}</h3>
                </div>
                
                <p className="font-serif text-xl md:text-2xl leading-relaxed text-[#FFD700] italic mb-8">
                    "{greetingData.greeting}"
                </p>

                <div className="flex flex-col items-center gap-4">
                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>
                    <button 
                        onClick={handleReset}
                        className="text-xs uppercase tracking-widest text-emerald-400 hover:text-white transition-colors"
                    >
                        Replay Experience
                    </button>
                </div>
            </div>
        )}
      </main>

      {/* Footer */}
      <footer className="flex justify-between items-end text-[10px] md:text-xs text-[#FFD700]/40 tracking-widest uppercase">
        <div className="flex gap-4">
            <span>Est. 2024</span>
            <span>Paris • New York • Tokyo</span>
        </div>
        <div className="text-right">
            <p>Interactive Experience</p>
        </div>
      </footer>
    </div>
  );
};