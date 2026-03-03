import { memo } from 'react';
import {
  Plus,
  Paperclip,
  Sparkles,
  Loader2,
  MessageSquare,
  Settings,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { useAppContext } from '../../context/AppContext';
import { SavedAgendaList } from '../agenda/SavedAgendaList';

export const Sidebar = memo(function Sidebar() {
  const {
    isSidebarOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    clearChat,
    file,
    fileInputRef,
    handleFileChange,
    handleGenerateAgenda,
    loading,
  } = useAppContext();

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Panel */}
      <aside
        className={cn(
          'fixed lg:relative inset-y-0 left-0 w-72 bg-[#f9fafb] border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out flex flex-col shrink-0',
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          !isSidebarOpen && 'lg:-translate-x-full lg:absolute lg:w-0 lg:border-none'
        )}
      >
        <div className="p-4 flex flex-col h-full">
          {/* New Chat Button */}
          <button
            onClick={clearChat}
            className="flex items-center gap-3 px-3 py-3 w-full bg-white border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-all shadow-sm mb-6"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>

          <div className="flex-1 overflow-y-auto space-y-6">
            {/* Context & Files */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2">
                Context & Files
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mx-2 p-3 rounded-xl border border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center border border-slate-200 group-hover:border-emerald-200">
                    <Paperclip className="w-4 h-4 text-slate-400 group-hover:text-emerald-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold truncate">
                      {file ? file.name : 'Attach context'}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">
                      PDF, TXT, DOCX
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              {file && (
                <button
                  onClick={handleGenerateAgenda}
                  disabled={loading}
                  className="mx-2 mt-2 flex items-center justify-center gap-2 px-3 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-800 transition-all disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                  )}
                  Generate Agenda
                </button>
              )}
            </div>

            {/* Saved Agendas */}
            <SavedAgendaList />

            {/* Recent Chats */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2">
                Recent Chats
              </label>
              <div className="space-y-1">
                <div className="px-3 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold flex items-center gap-3 cursor-pointer">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Current Conversation
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-4 border-t border-slate-200 space-y-2">
            <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-all">
              <Settings className="w-4 h-4" />
              Settings
            </button>
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white font-bold">
                H
              </div>
              <span className="text-xs font-bold text-slate-700 truncate">
                User Account
              </span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
});
