import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from './lib/utils';
import { AppProvider, useAppContext } from './context/AppContext';
import { Sidebar } from './components/layout/Sidebar';
import { MobileHeader } from './components/layout/MobileHeader';
import { ChatHeader } from './components/layout/ChatHeader';
import { MessageList } from './components/chat/MessageList';
import { ChatInput } from './components/chat/ChatInput';

function AppContent() {
  const { isSidebarOpen, setIsSidebarOpen } = useAppContext();

  return (
    <div className="flex h-screen bg-white text-[#0F172A] font-sans overflow-hidden">
      <MobileHeader />
      <Sidebar />

      <main className="flex-1 flex flex-col relative min-w-0">
        {/* Sidebar Toggle (Desktop) */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className={cn(
            'hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 w-6 h-12 bg-white border border-slate-200 rounded-r-xl items-center justify-center hover:bg-slate-50 transition-all z-20 shadow-sm',
            !isSidebarOpen && 'left-0'
          )}
        >
          {isSidebarOpen ? (
            <ChevronLeft className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        <ChatHeader />
        <MessageList />
        <ChatInput />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
