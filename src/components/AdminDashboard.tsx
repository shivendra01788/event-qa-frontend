"use client";
import { useEffect, useState } from 'react';
import { socket } from '../lib/socket';

type Question = { id: string; text: string; session: string; author: string; status: string; };

export default function AdminDashboard() {
  const [pending, setPending] = useState<Question[]>([]);
  const [approved, setApproved] = useState<Question[]>([]);

  useEffect(() => {
    socket.on('new_pending_question', (question: Question) => {
      setPending((prev) => [...prev, question]);
    });
    return () => { socket.off('new_pending_question'); };
  }, []);

  const handleApprove = (question: Question) => {
    setPending((prev) => prev.filter((q) => q.id !== question.id));
    setApproved((prev) => [{ ...question, status: 'approved' }, ...prev]);
    socket.emit('approve_question', question);
  };

  const handleReject = (id: string) => {
    setPending((prev) => prev.filter((q) => q.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 font-sans pb-16">
      
      <header className="bg-neutral-950 border-b border-neutral-800 px-8 py-6 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.3)]">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Moderation Desk</h1>
            <p className="text-fuchsia-400 text-xs font-bold uppercase tracking-widest mt-1">Live Event Stream</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-black border border-neutral-800 px-5 py-2.5 rounded-xl">
          <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
          <span className="text-xs font-bold text-neutral-300 tracking-widest uppercase">System Online</span>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 xl:grid-cols-12 gap-8 p-8">
        
        <div className="xl:col-span-7 flex flex-col gap-6">
          <div className="flex justify-between items-center bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
            <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-widest">Incoming Feed</h2>
            <span className="bg-neutral-800 text-neutral-200 px-3 py-1 rounded text-xs font-bold">{pending.length} Pending</span>
          </div>
          
          <div className="space-y-6">
            {pending.length === 0 && (
              <div className="bg-neutral-950 border border-neutral-800 rounded-3xl p-20 text-center text-neutral-500 flex flex-col items-center">
                <svg className="w-16 h-16 mb-4 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                <p className="text-lg">Inbox is empty. Waiting for questions...</p>
              </div>
            )}
            
            {pending.map((q) => (
              <div key={q.id} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-700 group">
                <div className="flex justify-between items-start mb-4">
                  <span className={`px-3 py-1.5 rounded bg-black border border-neutral-800 text-xs font-bold uppercase tracking-widest
                    ${q.session === 'workshop' ? 'text-violet-400' : 'text-rose-400'}`}>
                    {q.session === 'workshop' ? 'Term Sheet Workshop' : 'Speaker Session'}
                  </span>
                  <span className="text-sm text-neutral-400 font-medium">
                    From: <span className="text-white">{q.author || 'Anonymous'}</span>
                  </span>
                </div>
                <p className="text-white text-xl font-medium leading-relaxed mb-8">{q.text}</p>
                
                <div className="flex justify-end gap-3 pt-2">
                  <button onClick={() => handleReject(q.id)} className="px-6 py-3 bg-black hover:bg-red-950/40 text-neutral-400 hover:text-red-400 border border-neutral-800 hover:border-red-900/50 text-sm font-bold rounded-xl transition-colors">
                    Discard
                  </button>
                  <button onClick={() => handleApprove(q)} className="px-6 py-3 bg-fuchsia-900/20 hover:bg-fuchsia-600 text-fuchsia-300 hover:text-white border border-fuchsia-700/50 hover:border-fuchsia-500 text-sm font-bold rounded-xl transition-all flex items-center gap-2">
                    Push to Stage
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="xl:col-span-5 flex flex-col gap-6">
          <div className="flex justify-between items-center bg-neutral-900/60 p-4 rounded-xl border border-neutral-800">
            <h2 className="text-sm font-bold text-neutral-300 uppercase tracking-widest">Live Output</h2>
            <span className="bg-fuchsia-900/40 text-fuchsia-300 px-3 py-1 rounded text-xs font-bold border border-fuchsia-800/50">{approved.length} Live</span>
          </div>
          
          <div className="space-y-4">
            {approved.map((q, i) => (
              <div key={q.id} className={`bg-neutral-900 border border-neutral-800 rounded-2xl p-5 transition-all ${i === 0 ? 'border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.15)]' : 'opacity-50'}`}>
                {i === 0 && <span className="inline-block px-2 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-[10px] font-bold uppercase tracking-widest rounded mb-3">On Display</span>}
                <div className="flex gap-2 items-center mb-2">
                  <span className="w-2 h-2 rounded-full bg-fuchsia-500"></span>
                  <p className="text-neutral-400 text-xs font-bold uppercase tracking-wider">{q.author || 'Anonymous'} asked:</p>
                </div>
                <p className="text-white text-base">{q.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}