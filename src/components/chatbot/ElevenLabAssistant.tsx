import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MessageSquare,
  X,
  Send,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Bot,
  Minimize2,
  Maximize2,
  ChevronRight,
  ArrowRight,
  CheckCircle2,
  Globe,
  Mail,
  Phone,
  ShieldCheck,
  Zap
} from 'lucide-react';
import {
  ChatMessage,
  SessionContext,
  processUserQuery,
  LEAD_FLOW_STEPS
} from './AssistantKnowledge';
import {
  GOOGLE_FORM_URL,
  WHATSAPP_LINK,
  OFFICIAL_EMAIL,
  OFFICIAL_PHONE_DISPLAY,
  OFFICIAL_PORTFOLIO_URL,
  PROJECTS
} from '../../data/projects';
import { ProjectItem } from '../../types';

const INITIAL_GREETING: ChatMessage = {
  id: 'msg-welcome-0',
  sender: 'assistant',
  text: "Hey! 👋 I'm the ElevenLab Studio assistant. I can help you explore our services, projects and pricing.",
  timestamp: new Date(),
  quickActions: [
    { label: 'WHAT SERVICES DO YOU OFFER?', action: 'services_overview' },
    { label: 'SHOW YOUR WORK', action: 'show_portfolio' },
    { label: 'WEBSITE FROM ₹5,000?', action: 'pricing_info' },
    { label: 'SOCIAL MEDIA HANDLING', action: 'social_media' },
    { label: 'VIDEO EDITING', action: 'video_editing' },
    { label: 'PLAN A PROJECT', action: 'plan_project' },
    { label: 'START A PROJECT', action: 'start_project' },
    { label: 'CHAT ON WHATSAPP', action: 'whatsapp_chat' }
  ]
};

export const ElevenLabAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Attempt session storage restoration
    try {
      const saved = sessionStorage.getItem('elevenlab_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
        }
      }
    } catch {
      // fallback to initial
    }
    return [INITIAL_GREETING];
  });

  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [hasUnread, setHasUnread] = useState<boolean>(false);
  const [sessionContext, setSessionContext] = useState<SessionContext>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of message thread
  const scrollToBottom = useCallback((smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? 'smooth' : 'auto',
        block: 'end'
      });
    }
  }, []);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom(false);
      // Focus input when opened
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen, isMinimized, scrollToBottom]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom(true);
    }
  }, [messages, isTyping, isOpen, scrollToBottom]);

  // Persist session history
  useEffect(() => {
    try {
      sessionStorage.setItem('elevenlab_chat_history', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Send message handler
  const handleSendMessage = (textToSend?: string) => {
    const rawText = textToSend !== undefined ? textToSend : inputVal;
    const cleanText = rawText.trim();
    if (!cleanText || isTyping) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: cleanText,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Dynamic processing delay for realistic typing feel (350 - 550ms)
    setTimeout(() => {
      const result = processUserQuery(cleanText, sessionContext);
      setSessionContext(result.updatedContext);

      const botMsg: ChatMessage = {
        id: `ast-${Date.now()}`,
        sender: 'assistant',
        text: result.reply,
        timestamp: new Date(),
        quickActions: result.quickActions,
        projectCards: result.projectCards,
        actionButtons: result.actionButtons
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  // Quick Action execution handler
  const handleQuickAction = (action: string, payload?: any, label?: string) => {
    if (action === 'start_project') {
      window.open(GOOGLE_FORM_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    if (action === 'whatsapp_chat') {
      window.open(WHATSAPP_LINK, '_blank', 'noopener,noreferrer');
      return;
    }
    if (action === 'email_us') {
      window.location.href = `mailto:${OFFICIAL_EMAIL}`;
      return;
    }
    if (action === 'full_portfolio') {
      window.open(OFFICIAL_PORTFOLIO_URL, '_blank', 'noopener,noreferrer');
      return;
    }

    if (action === 'services_overview') {
      handleSendMessage('What services do you provide?');
      return;
    }
    if (action === 'show_portfolio') {
      handleSendMessage('Show me your projects and work');
      return;
    }
    if (action === 'pricing_info') {
      handleSendMessage('How much does a website cost? Tell me about the ₹5,000 offer');
      return;
    }
    if (action === 'social_media') {
      handleSendMessage('Can you handle social media and Instagram management?');
      return;
    }
    if (action === 'video_editing') {
      handleSendMessage('What video editing services do you offer?');
      return;
    }
    if (action === 'plan_project') {
      handleSendMessage('Plan a project');
      return;
    }
    if (action === 'show_clinic_projects') {
      handleSendMessage('Show me clinic and healthcare websites');
      return;
    }
    if (action === 'show_ecom_projects') {
      handleSendMessage('Show me e-commerce and Shopify store projects');
      return;
    }

    // Lead step handlers
    if (action.startsWith('lead_step_') && payload) {
      handleSendMessage(payload);
      return;
    }

    if (label) {
      handleSendMessage(label);
    }
  };

  // Clear chat history
  const handleClearChat = () => {
    setMessages([INITIAL_GREETING]);
    setSessionContext({});
    try {
      sessionStorage.removeItem('elevenlab_chat_history');
    } catch {
      // ignore
    }
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. FLOATING TRIGGER BUTTON (Docked at bottom-right alongside WhatsApp) */}
      {/* ========================================================================= */}
      <div className="fixed bottom-6 right-22 sm:right-44 z-40 flex items-center gap-2.5">
        
        {/* Unread / Welcome Nudge Tooltip (Shown when closed initially) */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#121212] border border-[#2B2B2B] hover:border-[#4D9FFF]/50 text-xs text-[#E5E5E5] shadow-xl hover:text-white transition-all cursor-pointer group"
          >
            <span className="w-2 h-2 rounded-full bg-[#4D9FFF] animate-pulse" />
            <span className="font-mono text-[11px] text-[#A1A1A1] group-hover:text-white">
              Ask ElevenLab Assistant
            </span>
          </button>
        )}

        <button
          id="elevenlab-assistant-toggle"
          onClick={() => {
            setIsOpen((prev) => !prev);
            setIsMinimized(false);
          }}
          aria-label={isOpen ? 'Close ElevenLab Assistant' : 'Open ElevenLab Assistant'}
          title="ElevenLab Studio AI Assistant"
          className={`group relative flex items-center justify-center w-13 h-13 rounded-full border transition-all duration-300 cursor-pointer shadow-xl ${
            isOpen
              ? 'bg-[#181818] border-[#383838] text-white hover:bg-[#222]'
              : 'bg-[#0E0E0E] border-[#2A2A2A] hover:border-[#4D9FFF] text-[#4D9FFF] hover:scale-105 shadow-[#4D9FFF]/10'
          }`}
        >
          {isOpen ? (
            <X className="w-5 h-5 text-white" />
          ) : (
            <>
              <Bot className="w-6 h-6 text-[#4D9FFF] group-hover:scale-110 transition-transform" />
              
              {/* Online status indicator dot */}
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#4D9FFF] border-2 border-[#0E0E0E] flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              </span>
            </>
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. CHATBOT WINDOW MODAL */}
      {/* ========================================================================= */}
      {isOpen && (
        <div
          ref={chatWindowRef}
          role="dialog"
          aria-modal="true"
          aria-label="ElevenLab Studio Assistant"
          className={`fixed z-50 transition-all duration-300 ease-out flex flex-col bg-[#0D0D0D] border border-[#242424] shadow-2xl shadow-black/80 overflow-hidden ${
            isMinimized
              ? 'bottom-22 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[380px] h-[64px] rounded-2xl'
              : 'bottom-4 sm:bottom-22 right-2 sm:right-6 w-[calc(100vw-16px)] sm:w-[440px] h-[calc(100vh-32px)] sm:h-[620px] max-h-[700px] rounded-2xl'
          }`}
        >
          {/* TOP HEADER */}
          <div className="p-3.5 sm:p-4 bg-[#141414] border-b border-[#222222] flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#1D1D1D] border border-[#303030]">
                <Bot className="w-4.5 h-4.5 text-[#4D9FFF]" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-teal-400 border-2 border-[#141414]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs sm:text-sm font-black tracking-wider text-white uppercase">
                    ELEVENLAB ASSISTANT
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#888888]">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                  <span className="text-teal-400 font-semibold uppercase">ONLINE</span>
                  <span>&bull; Digital Guide</span>
                </div>
              </div>
            </div>

            {/* Window Controls */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                title="Clear Chat History"
                aria-label="Clear chat history"
                className="p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-[#202020] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMinimized((prev) => !prev)}
                title={isMinimized ? 'Expand Assistant' : 'Minimize Assistant'}
                aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
                className="p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-[#202020] transition-colors cursor-pointer"
              >
                {isMinimized ? (
                  <Maximize2 className="w-4 h-4" />
                ) : (
                  <Minimize2 className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                title="Close Assistant (Esc)"
                aria-label="Close chat"
                className="p-1.5 rounded-lg text-[#888888] hover:text-white hover:bg-[#202020] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* CHAT MESSAGES BODY (Rendered when not minimized) */}
          {!isMinimized && (
            <>
              <div
                className="flex-1 p-3.5 sm:p-4 overflow-y-auto space-y-4 bg-[#090909] text-xs sm:text-sm text-[#F5F5F5] scroll-smooth"
                tabIndex={0}
              >
                {/* Micro Agency Trust Tag */}
                <div className="flex justify-center my-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#141414] border border-[#242424] text-[10px] font-mono text-[#888888]">
                    <ShieldCheck className="w-3 h-3 text-[#4D9FFF]" />
                    <span>Official ElevenLab Studio Assistant</span>
                  </div>
                </div>

                {/* Message Stream */}
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    } space-y-2`}
                  >
                    {/* Speech Bubble */}
                    <div
                      className={`max-w-[88%] sm:max-w-[84%] rounded-2xl p-3 sm:p-3.5 leading-relaxed break-words ${
                        msg.sender === 'user'
                          ? 'bg-[#152338] border border-[#4D9FFF]/40 text-white rounded-br-none shadow-md'
                          : 'bg-[#131313] border border-[#222222] text-[#E0E0E0] rounded-tl-none shadow-sm'
                      }`}
                    >
                      {/* Markdown-style Simple Formatter */}
                      <div className="space-y-2">
                        {renderFormattedText(msg.text)}
                      </div>
                    </div>

                    {/* Rich Demo Project Cards (If available) */}
                    {msg.projectCards && msg.projectCards.length > 0 && (
                      <div className="w-full space-y-2.5 my-1">
                        <div className="text-[10px] font-mono text-[#888888] uppercase tracking-wider pl-1">
                          RELEVANT LIVE PROJECTS:
                        </div>
                        <div className="grid grid-cols-1 gap-2">
                          {msg.projectCards.map((proj) => (
                            <div
                              key={proj.id}
                              className="p-3 rounded-xl bg-[#141414] border border-[#262626] hover:border-[#4D9FFF]/50 transition-colors flex flex-col justify-between gap-2.5"
                            >
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <div className="text-xs font-bold text-white tracking-wide">
                                    {proj.name}
                                  </div>
                                  <div className="text-[10px] text-[#4D9FFF] font-mono mt-0.5">
                                    {proj.category}
                                  </div>
                                </div>
                                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#1C1C1C] border border-[#2E2E2E] text-[#999999]">
                                  {proj.number}
                                </span>
                              </div>

                              <p className="text-[11px] text-[#A1A1A1] line-clamp-2">
                                {proj.description}
                              </p>

                              <div className="pt-2 border-t border-[#1F1F1F] flex items-center justify-between">
                                <a
                                  href={proj.liveDemoUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#4D9FFF] hover:text-white transition-colors cursor-pointer group"
                                >
                                  <span>VIEW LIVE DEMO</span>
                                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Rich Action Buttons (Form, WhatsApp, Email, Portfolio) */}
                    {msg.actionButtons && msg.actionButtons.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {msg.actionButtons.map((btn, bIdx) => (
                          <a
                            key={bIdx}
                            href={btn.url}
                            target={btn.type === 'email' ? undefined : '_blank'}
                            rel="noopener noreferrer"
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              btn.type === 'form'
                                ? 'bg-[#4D9FFF] hover:bg-[#3b8ee6] text-black shadow-md shadow-[#4D9FFF]/20'
                                : btn.type === 'whatsapp'
                                ? 'bg-[#25D366] hover:bg-[#20ba59] text-black'
                                : 'bg-[#181818] hover:bg-[#222222] border border-[#2E2E2E] text-white'
                            }`}
                          >
                            <span>{btn.label}</span>
                            {btn.type === 'form' ? (
                              <ArrowRight className="w-3.5 h-3.5" />
                            ) : btn.type === 'whatsapp' ? (
                              <Phone className="w-3.5 h-3.5" />
                            ) : (
                              <ExternalLink className="w-3.5 h-3.5" />
                            )}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Dynamic Quick Action Prompt Chips */}
                    {msg.quickActions && msg.quickActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1.5 max-w-full">
                        {msg.quickActions.map((qa, qIdx) => (
                          <button
                            key={qIdx}
                            onClick={() => handleQuickAction(qa.action, qa.payload, qa.label)}
                            className="px-2.5 py-1.5 rounded-lg bg-[#161616] hover:bg-[#202020] border border-[#282828] hover:border-[#4D9FFF]/60 text-[11px] font-mono text-[#CCCCCC] hover:text-white transition-all cursor-pointer flex items-center gap-1 text-left"
                          >
                            <span>{qa.label}</span>
                            <ChevronRight className="w-3 h-3 text-[#666666]" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Timestamp */}
                    <span className="text-[9px] font-mono text-[#555555] px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                ))}

                {/* Assistant Typing Indicator */}
                {isTyping && (
                  <div className="flex items-start gap-2">
                    <div className="bg-[#131313] border border-[#222222] rounded-2xl rounded-tl-none p-3 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#4D9FFF] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#4D9FFF] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 rounded-full bg-[#4D9FFF] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* BOTTOM INPUT FORM */}
              <div className="p-3 sm:p-3.5 bg-[#141414] border-t border-[#222222] shrink-0">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    placeholder="Ask about services, pricing, projects..."
                    className="flex-1 bg-[#0A0A0A] border border-[#262626] focus:border-[#4D9FFF] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-[#666666] outline-none transition-colors"
                  />

                  <button
                    type="submit"
                    disabled={!inputVal.trim() || isTyping}
                    title="Send Message"
                    aria-label="Send message"
                    className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#4D9FFF] hover:bg-[#3a8fe6] disabled:opacity-30 disabled:hover:bg-[#4D9FFF] text-black font-bold transition-all cursor-pointer shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Micro Footer Notice */}
                <div className="flex items-center justify-between mt-2 px-1 text-[10px] font-mono text-[#777777]">
                  <span>Projects start ₹5,000 &bull; Verified info</span>
                  <span className="hidden sm:inline">Enter to send &bull; Esc to close</span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

/**
 * Text formatter to render bold, bullet points, and links cleanly
 */
function renderFormattedText(text: string) {
  const lines = text.split('\n');

  return lines.map((line, lIdx) => {
    if (!line.trim()) {
      return <div key={lIdx} className="h-1" />;
    }

    // Bullet point line
    if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
      const content = line.trim().replace(/^[•-]\s*/, '');
      return (
        <div key={lIdx} className="flex items-start gap-1.5 pl-1 my-0.5">
          <span className="text-[#4D9FFF] font-bold mt-0.5">•</span>
          <span className="flex-1">{formatInlineMarkdown(content)}</span>
        </div>
      );
    }

    return (
      <p key={lIdx} className="my-0.5">
        {formatInlineMarkdown(line)}
      </p>
    );
  });
}

function formatInlineMarkdown(text: string): React.ReactNode[] {
  // Regex to split by bold **text** and markdown links [text](url)
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-bold text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('[') && token.includes('](')) {
      const linkLabel = token.substring(1, token.indexOf(']('));
      const linkUrl = token.substring(token.indexOf('](') + 2, token.length - 1);
      parts.push(
        <a
          key={match.index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#4D9FFF] underline hover:text-white transition-colors"
        >
          {linkLabel}
        </a>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}
