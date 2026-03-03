import { memo } from 'react';
import { X, Plus, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useAppContext } from '../../context/AppContext';
import { AgendaTimeline } from './AgendaTimeline';

export const AgendaPanel = memo(function AgendaPanel() {
  const { agenda, setAgenda, handleSaveAgenda, isSaving } = useAppContext();

  if (!agenda) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden mb-12"
    >
      {/* Header */}
      <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold tracking-tight">{agenda.title}</h3>
          <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mt-1">
            {agenda.date}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveAgenda}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            Save Agenda
          </button>
          <button
            onClick={() => setAgenda(null)}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Stakeholders
            </h4>
            <div className="flex flex-wrap gap-2">
              {agenda.stakeholders.map((s, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
        <AgendaTimeline items={agenda.items} />
      </div>
    </motion.div>
  );
});
