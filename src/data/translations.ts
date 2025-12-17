export type Language = 'en' | 'he';

export interface Translations {
  nav: {
    home: string;
    services: string;
    about: string;
    portfolio: string;
    blog: string;
    contact: string;
  };
  hero: {
    headline_line1: string;
    headline_line2: string;
    cta_primary: string;
    cta_secondary: string;
  };
  services: {
    title: string;
    subtitle: string;
    automation: {
      title: string;
      description: string;
    };
    ai: {
      title: string;
      description: string;
    };
    consulting: {
      title: string;
      description: string;
    };
    webdev: {
      title: string;
      description: string;
    };
    cta: string;
  };
  about: {
    title: string;
    subtitle: string;
    intro: string;
    cta: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
    view_project: string;
  };
  blog: {
    title: string;
    subtitle: string;
    read_more: string;
  };
  contact: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      company: string;
      message: string;
      submit: string;
      success: string;
      error: string;
    };
  };
  footer: {
    tagline: string;
    quick_links: string;
    connect: string;
    rights: string;
  };
  common: {
    learn_more: string;
    get_started: string;
    back_home: string;
    loading: string;
  };
  notfound: {
    title: string;
    message: string;
    cta: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About',
      portfolio: 'Portfolio',
      blog: 'Blog',
      contact: 'Contact',
    },
    hero: {
      headline_line1: 'I Build the Systems.',
      headline_line2: 'You Enjoy the Freedom.',
      cta_primary: 'Book a Free Consultation',
      cta_secondary: 'Learn More',
    },
    services: {
      title: 'Services',
      subtitle: 'How I Can Help Your Business',
      automation: {
        title: 'Business Automation',
        description: 'Custom automation workflows using Make.com, n8n, and other platforms to streamline your operations and save hours every week.',
      },
      ai: {
        title: 'AI Integration & Agents',
        description: 'Integrate AI tools like ChatGPT and Claude into your workflows. Build custom AI agents that work for you 24/7.',
      },
      consulting: {
        title: 'Consulting & Mentoring',
        description: 'One-on-one guidance to help you understand automation opportunities and implement them effectively in your business.',
      },
      webdev: {
        title: 'Web Application Development',
        description: 'Custom web applications built with modern technologies. From simple tools to complex business systems.',
      },
      cta: 'View All Services',
    },
    about: {
      title: 'About Me',
      subtitle: 'Hi, I\'m Roy',
      intro: 'With 18 years of software development experience and 2+ years working with AI tools, I help business owners automate their operations and work smarter, not harder.',
      cta: 'Learn More About Me',
    },
    portfolio: {
      title: 'Portfolio',
      subtitle: 'Recent Projects',
      view_project: 'View Project',
    },
    blog: {
      title: 'Blog',
      subtitle: 'Latest Insights',
      read_more: 'Read More',
    },
    contact: {
      title: 'Contact',
      subtitle: 'Let\'s Talk About Your Business',
      form: {
        name: 'Your Name',
        email: 'Email Address',
        phone: 'Phone (Optional)',
        company: 'Company (Optional)',
        message: 'How can I help you?',
        submit: 'Send Message',
        success: 'Thank you! I\'ll get back to you soon.',
        error: 'Something went wrong. Please try again.',
      },
    },
    footer: {
      tagline: 'Work Smart, Not Hard',
      quick_links: 'Quick Links',
      connect: 'Connect',
      rights: 'All rights reserved.',
    },
    common: {
      learn_more: 'Learn More',
      get_started: 'Get Started',
      back_home: 'Back to Home',
      loading: 'Loading...',
    },
    notfound: {
      title: 'Page Not Found',
      message: 'The page you\'re looking for doesn\'t exist or has been moved.',
      cta: 'Go Back Home',
    },
  },
  he: {
    nav: {
      home: 'בית',
      services: 'שירותים',
      about: 'אודות',
      portfolio: 'תיק עבודות',
      blog: 'בלוג',
      contact: 'צור קשר',
    },
    hero: {
      headline_line1: 'אני בונה את המערכות.',
      headline_line2: 'אתה נהנה מהחופש.',
      cta_primary: 'קבע פגישת ייעוץ חינם',
      cta_secondary: 'למד עוד',
    },
    services: {
      title: 'שירותים',
      subtitle: 'איך אני יכול לעזור לעסק שלך',
      automation: {
        title: 'אוטומציה עסקית',
        description: 'תהליכי אוטומציה מותאמים אישית באמצעות Make.com, n8n ופלטפורמות נוספות לייעול הפעילות שלך וחיסכון בשעות עבודה.',
      },
      ai: {
        title: 'שילוב AI וסוכנים',
        description: 'שילוב כלי AI כמו ChatGPT ו-Claude בתהליכי העבודה שלך. בניית סוכני AI מותאמים שעובדים בשבילך 24/7.',
      },
      consulting: {
        title: 'ייעוץ והדרכה',
        description: 'הדרכה אישית שתעזור לך להבין הזדמנויות אוטומציה וליישם אותן בצורה אפקטיבית בעסק שלך.',
      },
      webdev: {
        title: 'פיתוח אפליקציות ווב',
        description: 'אפליקציות ווב מותאמות אישית בטכנולוגיות מודרניות. מכלים פשוטים ועד מערכות עסקיות מורכבות.',
      },
      cta: 'צפה בכל השירותים',
    },
    about: {
      title: 'אודות',
      subtitle: 'היי, אני רועי',
      intro: 'עם 18 שנות ניסיון בפיתוח תוכנה ויותר משנתיים של עבודה עם כלי AI, אני עוזר לבעלי עסקים לבצע אוטומציה של הפעילות שלהם ולעבוד חכם, לא קשה.',
      cta: 'למד עוד עליי',
    },
    portfolio: {
      title: 'תיק עבודות',
      subtitle: 'פרויקטים אחרונים',
      view_project: 'צפה בפרויקט',
    },
    blog: {
      title: 'בלוג',
      subtitle: 'תובנות אחרונות',
      read_more: 'קרא עוד',
    },
    contact: {
      title: 'צור קשר',
      subtitle: 'בוא נדבר על העסק שלך',
      form: {
        name: 'השם שלך',
        email: 'כתובת אימייל',
        phone: 'טלפון (אופציונלי)',
        company: 'חברה (אופציונלי)',
        message: 'איך אני יכול לעזור לך?',
        submit: 'שלח הודעה',
        success: 'תודה! אחזור אליך בקרוב.',
        error: 'משהו השתבש. אנא נסה שוב.',
      },
    },
    footer: {
      tagline: 'עבוד חכם, לא קשה',
      quick_links: 'קישורים מהירים',
      connect: 'התחבר',
      rights: 'כל הזכויות שמורות.',
    },
    common: {
      learn_more: 'למד עוד',
      get_started: 'התחל עכשיו',
      back_home: 'חזרה לבית',
      loading: 'טוען...',
    },
    notfound: {
      title: 'הדף לא נמצא',
      message: 'הדף שאתה מחפש לא קיים או הועבר.',
      cta: 'חזור לדף הבית',
    },
  },
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  he: 'עברית',
};

export const languageDirection: Record<Language, 'ltr' | 'rtl'> = {
  en: 'ltr',
  he: 'rtl',
};
