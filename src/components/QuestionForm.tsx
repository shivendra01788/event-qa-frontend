"use client";
import { useState } from 'react';
import { socket } from '../lib/socket';

export default function QuestionForm() {
  const [text, setText] = useState('');
  const [session, setSession] = useState('speaker');
  const [author, setAuthor] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    socket.emit('submit_question', { text, session, author });
    setText('');
    setAuthor('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 4000);
  };

  if (isSubmitted) {
    return (
      <div className="glass-card bg-neutral-900/80 p-12 rounded-3xl text-center space-y-6 transform transition-all duration-500 animate-stage-enter border-fuchsia-500/20">
        <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(217,70,239,0.5)]">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white tracking-wide">Question Received</h3>
          <p className="text-fuchsia-200/80 mt-2">Thanks for joining the conversation.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card bg-neutral-900/80 p-8 sm:p-10 rounded-3xl space-y-8 relative overflow-hidden group">
      
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-fuchsia-600/10 blur-[80px] rounded-full pointer-events-none transition-opacity duration-500 opacity-20 group-hover:opacity-40"></div>

      <div className="space-y-2 relative z-10">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-widest">Select Event</label>
        <div className="relative">
          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="w-full p-4 rounded-xl bg-black/60 text-white border border-neutral-700 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="speaker">Founders Speaker Session</option>
            <option value="workshop">Term Sheet Workshop</option>
          </select>
          <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      <div className="space-y-2 relative z-10">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-widest">Your Identity <span className="lowercase font-normal tracking-normal text-neutral-500">(Optional)</span></label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Anonymous"
          className="w-full p-4 rounded-xl bg-black/60 text-white border border-neutral-700 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all placeholder:text-neutral-600"
        />
      </div>

      <div className="space-y-2 relative z-10">
        <label className="text-xs font-bold text-neutral-300 uppercase tracking-widest">The Question</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full p-4 rounded-xl bg-black/60 text-white border border-neutral-700 focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 outline-none transition-all min-h-[140px] resize-y placeholder:text-neutral-600"
          required
        />
      </div>

      <button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-extrabold text-lg py-5 rounded-xl transition-all shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:-translate-y-1 relative z-10">
        Submit Question
      </button>
    </form>
  );
}