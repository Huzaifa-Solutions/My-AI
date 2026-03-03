import { memo, useCallback, type KeyboardEvent } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppContext } from '../../context/AppContext';

export const ChatInput = memo(function ChatInput() {
  const { input, setInput, handleSend, loading, file, fileInputRef } = useAppContext();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend]
  );

  return (
    <div className="p-4 md:p-8 bg-white border-t border-slate-100">
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
          <button
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'p-2 rounded-lg transition-all',
              file ? 'text-emerald-500 bg-emerald-50' : 'text-slate-400 hover:bg-slate-100'
            )}
          >
            <Paperclip className="w-5 h-5" />
          </button>
        </div>
        <textarea
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={file ? `Ask about ${file.name}...` : 'Message Nexus AI...'}
          className="w-full pl-14 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm md:text-base focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 resize-none max-h-40 overflow-y-auto"
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all disabled:opacity-50 group shadow-lg shadow-slate-200"
        >
          <Send className="w-5 h-5 group-hover:text-emerald-400 transition-colors" />
        </button>
      </div>
      <p className="text-[10px] text-center text-slate-400 mt-4 font-bold uppercase tracking-widest">
        Nexus AI can make mistakes. Verify important information.
      </p>
    </div>
  );
});
