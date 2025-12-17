import { useState, FormEvent } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useLanguage } from '../context/LanguageContext';
import { config, sendWebhook, getWhatsAppUrl } from '../config';
import { 
  WhatsAppIcon, 
  InstagramIcon, 
  LinkedInIcon, 
  EmailIcon 
} from '../components/ui/SocialIcons';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const t = useTranslation();
  const { language } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // Create payload for webhook
    const payload = {
      source: 'contact_form',
      data: formData,
      page_url: window.location.pathname,
      language,
    };

    // Send to webhook (or log to console if not configured)
    const result = await sendWebhook(config.webhooks.contactForm, payload);

    setIsSubmitting(false);
    
    if (result.success) {
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } else {
      setSubmitStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <main className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-primary mb-4">{t.contact.title}</h1>
          <p className="text-text-light text-lg">{t.contact.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-text-dark mb-2">
                  {t.contact.form.name} *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.name ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                />
                {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-dark mb-2">
                  {t.contact.form.email} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.email ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-primary/50`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text-dark mb-2">
                  {t.contact.form.phone}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Company */}
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-text-dark mb-2">
                  {t.contact.form.company}
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-text-dark mb-2">
                  {t.contact.form.message} *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message ? 'border-red-500' : 'border-gray-200'
                  } focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none`}
                />
                {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t.common.loading : t.contact.form.submit}
              </button>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <p className="text-green-600 text-center">{t.contact.form.success}</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-600 text-center">{t.contact.form.error}</p>
              )}
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-primary/5 p-8 rounded-xl">
              <h3 className="text-xl mb-6">{t.contact.get_in_touch}</h3>
              <div className="space-y-3">
                {/* Email */}
                <a 
                  href={`mailto:${config.social.email}`}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-primary/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110">
                    <EmailIcon size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-text-light">Email</p>
                    <span className="text-text-dark font-medium">{config.social.email}</span>
                  </div>
                </a>

                {/* WhatsApp */}
                {getWhatsAppUrl(language) && (
                  <a 
                    href={getWhatsAppUrl(language)} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#25D366]/10 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110">
                      <WhatsAppIcon size={22} />
                    </div>
                    <div>
                      <p className="text-sm text-text-light">WhatsApp</p>
                      <span className="text-text-dark font-medium">{language === 'he' ? 'שלח הודעה' : 'Send a message'}</span>
                    </div>
                  </a>
                )}

                {/* LinkedIn */}
                <a 
                  href={config.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#0A66C2]/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110">
                    <LinkedInIcon size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-text-light">LinkedIn</p>
                    <span className="text-text-dark font-medium">{language === 'he' ? 'התחבר איתי' : 'Connect with me'}</span>
                  </div>
                </a>

                {/* Instagram */}
                <a 
                  href={config.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-[#E4405F]/10 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center text-white transition-all duration-300 group-hover:scale-110">
                    <InstagramIcon size={22} />
                  </div>
                  <div>
                    <p className="text-sm text-text-light">Instagram</p>
                    <span className="text-text-dark font-medium">@royrai.automation</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Cal.com placeholder */}
            <div className="bg-gray-100 p-8 rounded-xl text-center">
              <p className="text-text-light mb-4">{t.contact.schedule}</p>
              <div className="h-64 bg-white rounded-lg flex items-center justify-center border border-gray-200">
                <p className="text-text-light">{t.contact.cal_placeholder}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
