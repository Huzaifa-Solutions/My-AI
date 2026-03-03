import { memo } from 'react';
import { Menu, Plus, Sparkles } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { APP_NAME } from '../../constants';

export const MobileHeader = memo(function MobileHeader() {
  const { setIsMobileMenuOpen, clearChat } = useAppContext();

  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-slate-100 z-30 flex items-center justify-between px-4">
      <button onClick={() => setIsMobileMenuOpen(true)} className="p-2">
        <Menu className="w-5 h-5" />
      </button>
      <span className="font-bold text-sm tracking-tight flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-emerald-500" />
        {APP_NAME}
      </span>
      <button onClick={clearChat} className="p-2">
        <Plus className="w-5 h-5" />
      </button>
    </header>
  );
});
