"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { socket } from '../lib/socket';

type Question = { id: string; text: string; session: string; author: string; };

export default function StageScreen() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    socket.on('question_approved', (approvedQuestion: Question) => {
      setQuestions((prev) => [approvedQuestion, ...prev]);
    });
    return () => { socket.off('question_approved'); };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-12 md:p-24 font-sans flex flex-col relative overflow-hidden">
      
      {/* Darkened Aura for better text contrast */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-fuchsia-900/10 blur-[180px] rounded-full pointer-events-none"></div>

      <header className="flex justify-between items-start relative z-10 mb-auto">
        <h1 className="text-xl font-bold tracking-[0.3em] uppercase text-neutral-500">Live Q&A</h1>
        <div className="flex flex-col items-end gap-3 opacity-80">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-fuchsia-300">Scan to Participate</span>
          <div className="w-24 h-24 bg-white border border-fuchsia-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_15px_rgba(217,70,239,0.1)] p-1">
             <Image
              src="/qr-code-speakersession-netlify-app-short-link-agl.png"
              alt="QR Code"
              width={88}
              height={88}
              className="rounded-xl"
            />
          </div>
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-neutral-500 mt-1">qrurl.io/agl</span>
        </div>
      </header>

      <main className="w-full max-w-6xl mx-auto flex flex-col justify-center relative z-10 mb-auto">
        {questions.length === 0 ? (
          <div className="text-center mt-32">
            <p className="text-2xl font-bold tracking-[0.3em] uppercase text-neutral-600 animate-pulse">Awaiting Signal</p>
          </div>
        ) : (
          <div className="space-y-24">
            {questions.slice(0, 2).map((q, index) => (
              <div 
                key={q.id + index} 
                className={`transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] animate-stage-enter
                  ${index === 0 ? 'opacity-100 scale-100' : 'opacity-30 scale-95 blur-[2px] hidden md:block'}
                `}
              >
                {index === 0 && (
                  <div className="flex items-center gap-5 mb-8">
                    <span className="w-14 h-14 bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white rounded-full flex items-center justify-center font-bold text-2xl shadow-[0_0_30px_rgba(217,70,239,0.6)]">
                      {q.author ? q.author.charAt(0).toUpperCase() : 'A'}
                    </span>
                    <div>
                      <p className="text-2xl font-bold tracking-wide text-white">{q.author || 'Anonymous'}</p>
                      <p className="text-sm font-bold text-fuchsia-400 uppercase tracking-[0.2em] mt-1">
                        {q.session === 'workshop' ? 'Term Sheet Workshop' : 'Speaker Session'}
                      </p>
                    </div>
                  </div>
                )}
                
                <h2 className={`font-medium leading-tight tracking-tight
                  ${index === 0 ? 'text-5xl md:text-7xl text-white' : 'text-3xl md:text-4xl text-neutral-400'}
                `}>
                  {q.text}
                </h2>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}