import { memo } from 'react';
import { Sparkles, Globe, Trash2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

export const ChatHeader = memo(function ChatHeader() {
  const { clearChat } = useAppContext();

  return (
    <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-emerald-400" />
        </div>
        <div>
          <h2 className="text-sm font-bold tracking-tight">Nexus AI Assistant</h2>
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Online
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400">
          <Globe className="w-4 h-4" />
        </button>
        <button
          onClick={clearChat}
          className="p-2 hover:bg-slate-100 rounded-lg transition-all text-slate-400"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
});
