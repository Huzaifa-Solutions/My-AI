import {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
  useEffect,
  type ReactNode,
  type ChangeEvent,
  type MouseEvent,
  type RefObject,
} from 'react';
import type { ChatMessage, MeetingAgenda } from '../types';
import { chatWithGemini, generateAgendaFromText } from '../services/gemini';
import * as api from '../services/api';
import { INITIAL_MESSAGE } from '../constants';

interface AppContextType {
  // Chat
  messages: ChatMessage[];
  input: string;
  setInput: (val: string) => void;
  loading: boolean;
  handleSend: () => Promise<void>;
  clearChat: () => void;

  // File
  file: File | null;
  context: string;
  handleFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement | null>;

  // Agenda
  agenda: MeetingAgenda | null;
  setAgenda: (a: MeetingAgenda | null) => void;
  savedAgendas: any[];
  isSaving: boolean;
  handleSaveAgenda: () => Promise<void>;
  handleDeleteAgenda: (id: number, e: MouseEvent) => Promise<void>;
  handleGenerateAgenda: () => Promise<void>;

  // UI
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  // Chat state
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // File state
  const [file, setFile] = useState<File | null>(null);
  const [context, setContext] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Agenda state
  const [agenda, setAgenda] = useState<MeetingAgenda | null>(null);
  const [savedAgendas, setSavedAgendas] = useState<any[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  // UI state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- Agenda API ---
  const fetchSavedAgendas = useCallback(async () => {
    try {
      const data = await api.fetchAgendas();
      setSavedAgendas(data);
    } catch (err) {
      console.error('Failed to fetch agendas', err);
    }
  }, []);

  useEffect(() => {
    fetchSavedAgendas();
  }, [fetchSavedAgendas]);

  // --- Chat handlers ---
  const handleSend = useCallback(async () => {
    const userMessage = input.trim();
    if (!userMessage || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const history = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const response = await chatWithGemini(history, userMessage, context);
      setMessages((prev) => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      console.error('Chat failed', error);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: 'Sorry, I encountered an error. Please try again.' },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, context]);

  const clearChat = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    setInput('');
    setFile(null);
    setContext('');
    setAgenda(null);
  }, []);

  // --- File handler ---
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      selectedFile.text().then((text) => {
        setContext(text);
        setMessages((prev) => [
          ...prev,
          {
            role: 'model',
            text: `I've received your document: **${selectedFile.name}**. I'll use it as context for our conversation. What would you like me to do with it?`,
          },
        ]);
      });
    }
  }, []);

  // --- Agenda handlers ---
  const handleSaveAgenda = useCallback(async () => {
    if (!agenda || isSaving) return;
    setIsSaving(true);
    try {
      await api.saveAgenda(agenda);
      await fetchSavedAgendas();
    } catch (err) {
      console.error('Failed to save agenda', err);
    } finally {
      setIsSaving(false);
    }
  }, [agenda, isSaving, fetchSavedAgendas]);

  const handleDeleteAgenda = useCallback(
    async (id: number, e: MouseEvent) => {
      e.stopPropagation();
      try {
        await api.deleteAgenda(id);
        await fetchSavedAgendas();
        if (agenda && (agenda as any).id === id) {
          setAgenda(null);
        }
      } catch (err) {
        console.error('Failed to delete agenda', err);
      }
    },
    [agenda, fetchSavedAgendas]
  );

  const handleGenerateAgenda = useCallback(async () => {
    if (!context || loading) return;
    setLoading(true);
    try {
      const newAgenda = await generateAgendaFromText(context);
      setAgenda(newAgenda);
      setMessages((prev) => [
        ...prev,
        {
          role: 'model',
          text: `I've generated a meeting agenda for: **${newAgenda.title}**. You can view it in the agenda panel.`,
        },
      ]);
    } catch (err) {
      console.error('Failed to generate agenda', err);
      setMessages((prev) => [
        ...prev,
        { role: 'model', text: "Sorry, I couldn't generate an agenda from this document." },
      ]);
    } finally {
      setLoading(false);
    }
  }, [context, loading]);

  const value: AppContextType = {
    messages,
    input,
    setInput,
    loading,
    handleSend,
    clearChat,
    file,
    context,
    handleFileChange,
    fileInputRef,
    agenda,
    setAgenda,
    savedAgendas,
    isSaving,
    handleSaveAgenda,
    handleDeleteAgenda,
    handleGenerateAgenda,
    isSidebarOpen,
    setIsSidebarOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}
