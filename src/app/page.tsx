"use client";
import { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import AdminDashboard from '../components/AdminDashboard';
import StageScreen from '../components/StageScreen';

export default function MasterConsole() {
  const [activeView, setActiveView] = useState<'attendee' | 'admin' | 'stage'>('attendee');
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinCode, setPinCode] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinCode === 'admin123') {
      setActiveView('admin');
    } else if (pinCode === 'stage123') {
      setActiveView('stage');
    } else {
      alert('Access Denied: Invalid Security Code');
    }
    setShowPinModal(false);
    setPinCode('');
  };

  if (activeView === 'admin') return <AdminDashboard />;
  if (activeView === 'stage') return <StageScreen />;

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-neutral-950">
      
      {/* Darkened Ambient Mesh */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-900/15 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-900/15 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-xl w-full z-10">
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 bg-black/80 border border-neutral-800 rounded-full backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.9)]"></span>
            <span className="text-rose-400 text-xs font-bold uppercase tracking-widest">Live Broadcast</span>
          </div>
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-4">
            Ask the Speakers
          </h1>
          <p className="text-neutral-300 text-lg font-medium">
            Share your thoughts and join the conversation live on the main screen.
          </p>
        </div>

        <QuestionForm />

        <div className="mt-12 text-center">
          <button 
            onClick={() => setShowPinModal(true)} 
            className="text-xs text-neutral-500 hover:text-fuchsia-400 font-bold tracking-widest uppercase transition-colors"
          >
            System Access
          </button>
        </div>
      </div>

      {showPinModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-stage-enter">
          <div className="glass-card bg-neutral-900/80 p-8 rounded-3xl w-full max-w-sm border border-neutral-800 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-white tracking-wide">Console Login</h2>
              <button onClick={() => setShowPinModal(false)} className="text-neutral-400 hover:text-white transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-5">
              <input
                type="password"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                placeholder="Access Code"
                className="w-full p-4 rounded-xl bg-black/80 text-white border border-neutral-700 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all text-center tracking-[0.2em] font-mono text-lg"
                autoFocus
              />
              <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-extrabold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(217,70,239,0.4)]">
                Authenticate
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}