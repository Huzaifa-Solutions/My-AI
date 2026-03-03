import { memo } from 'react';
import { Bot, Loader2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { useAutoScroll } from '../../hooks/useAutoScroll';
import { ChatMessage } from './ChatMessage';
import { AgendaPanel } from '../agenda/AgendaPanel';

export const MessageList = memo(function MessageList() {
  const { messages, loading } = useAppContext();
  const scrollRef = useAutoScroll<HTMLDivElement>([messages, loading]);

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 md:px-8 py-8 space-y-8 scroll-smooth"
    >
      <div className="max-w-3xl mx-auto space-y-10">
        <AgendaPanel />
        {messages.map((m, i) => (
          <ChatMessage key={i} message={m} />
        ))}
        {loading && <LoadingIndicator />}
      </div>
    </div>
  );
});

const LoadingIndicator = memo(function LoadingIndicator() {
  return (
    <div className="flex gap-4 md:gap-6">
      <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-900 shadow-sm">
        <Bot className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
      </div>
      <div className="flex-1 space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
          Nexus AI
        </p>
        <div className="inline-block bg-slate-50 border border-slate-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
          <div className="flex items-center gap-3">
            <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Processing...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});
