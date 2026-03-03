import { memo, type MouseEvent } from 'react';
import { Calendar, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';
import { useAppContext } from '../../context/AppContext';

export const SavedAgendaList = memo(function SavedAgendaList() {
  const { savedAgendas, agenda, setAgenda, handleDeleteAgenda } = useAppContext();

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 px-2">
        Saved Agendas
      </label>
      <div className="space-y-1 max-h-48 overflow-y-auto px-1">
        {savedAgendas.length === 0 ? (
          <p className="text-[10px] text-slate-400 px-2 italic">
            No saved agendas yet
          </p>
        ) : (
          savedAgendas.map((a) => (
            <SavedAgendaItem
              key={a.id}
              item={a}
              isActive={agenda?.title === a.title}
              onSelect={() => setAgenda(a.data)}
              onDelete={(e) => handleDeleteAgenda(a.id, e)}
            />
          ))
        )}
      </div>
    </div>
  );
});

interface SavedAgendaItemProps {
  item: any;
  isActive: boolean;
  onSelect: () => void;
  onDelete: (e: MouseEvent) => void;
}

const SavedAgendaItem = memo(function SavedAgendaItem({
  item,
  isActive,
  onSelect,
  onDelete,
}: SavedAgendaItemProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'group flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all',
        isActive
          ? 'bg-emerald-50 text-emerald-700'
          : 'text-slate-600 hover:bg-slate-100'
      )}
    >
      <div className="flex items-center gap-2 truncate">
        <Calendar className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">{item.title}</span>
      </div>
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-500 transition-all"
      >
        <Trash2 className="w-3 h-3" />
      </button>
    </div>
  );
});
