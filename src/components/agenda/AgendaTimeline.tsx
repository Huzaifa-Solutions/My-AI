import { memo } from 'react';
import type { AgendaItem as AgendaItemType } from '../../types';

interface AgendaTimelineProps {
  items: AgendaItemType[];
}

export const AgendaTimeline = memo(function AgendaTimeline({ items }: AgendaTimelineProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
        Timeline
      </h4>
      <div className="space-y-3">
        {items.map((item, i) => (
          <div key={item.id} className="flex gap-4 group">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mt-1.5" />
              {i !== items.length - 1 && (
                <div className="w-px flex-1 bg-slate-200 my-1" />
              )}
            </div>
            <div className="flex-1 pb-4">
              <div className="flex items-center justify-between mb-1">
                <h5 className="text-sm font-bold text-slate-900">{item.topic}</h5>
                <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100">
                  {item.duration} min
                </span>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {item.description}
              </p>
              {item.stakeholders.length > 0 && (
                <div className="flex gap-1.5 mt-2">
                  {item.stakeholders.map((s, j) => (
                    <span
                      key={j}
                      className="text-[9px] font-bold text-emerald-600 uppercase tracking-tighter"
                    >
                      @{s}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
