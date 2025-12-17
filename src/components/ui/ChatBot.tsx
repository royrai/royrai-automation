import { useState, FormEvent } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface ChatMessage {
  type: 'bot' | 'user';
  text: string;
}

type ChatStep = 'greeting' | 'name' | 'email' | 'question' | 'complete';

export function ChatBot() {
  const { isRTL } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>('greeting');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
  });

  const botMessages = {
    en: {
      greeting: "Hi! 👋 I'm here to help you learn more about automation for your business. What's your name?",
      askEmail: (name: string) => `Nice to meet you, ${name}! What's your email so I can get back to you?`,
      askQuestion: "Great! What would you like to know about business automation?",
      complete: "Thank you! I've received your message and will get back to you soon. 🙌",
      placeholder: {
        name: "Enter your name...",
        email: "Enter your email...",
        question: "Type your question...",
      },
    },
    he: {
      greeting: "היי! 👋 אני כאן לעזור לך ללמוד עוד על אוטומציה לעסק שלך. מה השם שלך?",
      askEmail: (name: string) => `נעים להכיר, ${name}! מה המייל שלך כדי שאוכל לחזור אליך?`,
      askQuestion: "מעולה! מה תרצה לדעת על אוטומציה עסקית?",
      complete: "תודה! קיבלתי את ההודעה שלך ואחזור אליך בקרוב. 🙌",
      placeholder: {
        name: "הכנס את שמך...",
        email: "הכנס את האימייל שלך...",
        question: "כתוב את השאלה שלך...",
      },
    },
  };

  const lang = isRTL ? 'he' : 'en';
  const texts = botMessages[lang];

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setMessages([{ type: 'bot', text: texts.greeting }]);
      setStep('name');
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setMessages((prev) => [...prev, { type: 'user', text: userMessage }]);
    setInputValue('');

    switch (step) {
      case 'name':
        setFormData((prev) => ({ ...prev, name: userMessage }));
        setTimeout(() => {
          setMessages((prev) => [...prev, { type: 'bot', text: texts.askEmail(userMessage) }]);
          setStep('email');
        }, 500);
        break;

      case 'email':
        setFormData((prev) => ({ ...prev, email: userMessage }));
        setTimeout(() => {
          setMessages((prev) => [...prev, { type: 'bot', text: texts.askQuestion }]);
          setStep('question');
        }, 500);
        break;

      case 'question':
        const finalData = { ...formData, question: userMessage };
        setFormData(finalData);
        
        // Log to console (will be replaced with webhook)
        const payload = {
          source: 'chatbot',
          timestamp: new Date().toISOString(),
          data: finalData,
          language: lang,
          page_url: window.location.pathname,
        };
        console.log('ChatBot submission:', payload);

        setTimeout(() => {
          setMessages((prev) => [...prev, { type: 'bot', text: texts.complete }]);
          setStep('complete');
        }, 500);
        break;
    }
  };

  const getPlaceholder = () => {
    switch (step) {
      case 'name':
        return texts.placeholder.name;
      case 'email':
        return texts.placeholder.email;
      case 'question':
        return texts.placeholder.question;
      default:
        return '';
    }
  };

  const handleReset = () => {
    setMessages([{ type: 'bot', text: texts.greeting }]);
    setStep('name');
    setFormData({ name: '', email: '', question: '' });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={handleOpen}
        className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50 w-14 h-14 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 flex items-center justify-center ${
          isOpen ? 'scale-0' : 'scale-100'
        }`}
        aria-label="Open chat"
      >
        <MessageCircle size={28} />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 ${isRTL ? 'left-6' : 'right-6'} z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden ${
          isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="bg-primary text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h3 className="font-heading text-lg">Roy's Assistant</h3>
              <p className="text-xs text-white/70">
                {isRTL ? 'בדרך כלל משיב מיד' : 'Usually replies instantly'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-2xl ${
                  msg.type === 'user'
                    ? 'bg-primary text-white rounded-br-sm'
                    : 'bg-white text-text-dark shadow-sm rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        {step !== 'complete' ? (
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
            <div className="flex gap-2">
              <input
                type={step === 'email' ? 'email' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={getPlaceholder()}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <button
                type="submit"
                className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 border-t border-gray-100">
            <button
              onClick={handleReset}
              className="w-full py-2 text-primary hover:bg-primary/5 rounded-full transition-colors"
            >
              {isRTL ? 'התחל שיחה חדשה' : 'Start a new conversation'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
