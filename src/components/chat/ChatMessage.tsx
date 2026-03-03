import { memo } from 'react';
import { User, Bot } from 'lucide-react';
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { cn } from '../../lib/utils';
import type { ChatMessage as ChatMessageType } from '../../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage = memo(function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex gap-4 md:gap-6',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      <div
        className={cn(
          'w-8 h-8 md:w-10 md:h-10 rounded-xl shrink-0 flex items-center justify-center border shadow-sm',
          isUser ? 'bg-white border-slate-200' : 'bg-slate-900 border-slate-900'
        )}
      >
        {isUser ? (
          <User className="w-4 h-4 md:w-5 md:h-5 text-slate-400" />
        ) : (
          <Bot className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
        )}
      </div>
      <div
        className={cn(
          'flex-1 min-w-0 space-y-1',
          isUser ? 'text-right' : 'text-left'
        )}
      >
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
          {isUser ? 'You' : 'Nexus AI'}
        </p>
        <div
          className={cn(
            'inline-block max-w-full p-4 md:p-5 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm border',
            isUser
              ? 'bg-white border-slate-200 text-slate-900 rounded-tr-none'
              : 'bg-slate-50 border-slate-100 text-slate-800 rounded-tl-none'
          )}
        >
          <div className="markdown-body prose prose-slate max-w-none">
            <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
});
