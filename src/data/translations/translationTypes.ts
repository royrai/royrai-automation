// TypeScript interface for translation files
// Both en.ts and he.ts must implement this interface

export interface IProcessStep {
  step: number;
  title: string;
  desc: string;
}

export interface IServiceItem {
  title: string;
  description: string;
  features: string[];
}

export interface IValueItem {
  title: string;
  desc: string;
}

export interface IPortfolioItem {
  id: string;
  title: string;
  description: string;
  result: string;
  technologies: string[];
  emoji: string;
}

export interface IGuidePost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  emoji: string;
}

export interface ITranslations {
  nav: {
    home: string;
    services: string;
    about: string;
    portfolio: string;
    guides: string;
    contact: string;
    tools: string;
  };

  hero: {
    headline_line1: string;
    headline_line2: string;
    subheadline: string;
    cta_primary: string;
    cta_secondary: string;
  };

  services: {
    title: string;
    subtitle: string;
    automation: IServiceItem;
    ai: IServiceItem;
    consulting: IServiceItem;
    webdev: IServiceItem;
    cta: string;
    process: {
      title: string;
      subtitle: string;
      steps: IProcessStep[];
    };
    ready: string;
    ready_subtitle: string;
  };

  about: {
    title: string;
    subtitle: string;
    intro: string;
    cta: string;
    story: {
      title: string;
      p1: string;
      p2: string;
    };
    technologies: string;
    skills: string[];
    values: {
      title: string;
      items: IValueItem[];
    };
    lets_talk: string;
    stats: {
      years_experience: string;
      years_ai: string;
      projects: string;
      leadership_title: string;
      leadership_subtitle: string;
      ai_title: string;
      ai_subtitle: string;
    };
  };

  portfolio: {
    title: string;
    subtitle: string;
    view_project: string;
    want_similar: string;
    want_similar_subtitle: string;
    items: IPortfolioItem[];
  };

  guides: {
    title: string;
    subtitle: string;
    read_more: string;
    stay_updated: string;
    stay_updated_subtitle: string;
    subscribe: string;
    no_spam: string;
    email_placeholder: string;
    posts: IGuidePost[];
  };

  contact: {
    title: string;
    subtitle: string;
    get_in_touch: string;
    schedule: string;
    cal_placeholder: string;
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
    connectWith: string;
    formTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    nameRequired: string;
    emailLabel: string;
    emailPlaceholder: string;
    emailRequired: string;
    emailInvalid: string;
    phoneLabel: string;
    phonePlaceholder: string;
    phoneRequired: string;
    phoneInvalid: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    messageRequired: string;
    submitButton: string;
    submitting: string;
    comingSoon: string;
    whatsappMessage: string;
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

  socialMedia: {
    whatsappTooltip: string;
    facebookTooltip: string;
    instagramTooltip: string;
    linkedinTooltip: string;
    emailTooltip: string;
  };

  notfound: {
    title: string;
    message: string;
    cta: string;
  };

  chatbot: {
    greeting: string;
    ask_email: (name: string) => string;
    ask_question: string;
    complete: string;
    placeholder: {
      name: string;
      email: string;
      question: string;
    };
    assistant_name: string;
    usually_replies: string;
    new_conversation: string;
  };

  tools: {
    title: string;
    subtitle: string;
    allTools: string;
    generatedLink: string;
    copyButton: string;
    copiedButton: string;
    testLink: string;
    generateButton: string;
    emailLink: {
      title: string;
      subtitle: string;
      menuLabel: string;
      providerLabel: string;
      providers: {
        gmail: string;
        outlook: string;
        mailto: string;
      };
      providerNote: string;
      toLabel: string;
      toPlaceholder: string;
      toRequired: string;
      toInvalid: string;
      subjectLabel: string;
      subjectPlaceholder: string;
      subjectRequired: string;
      bodyLabel: string;
      bodyPlaceholder: string;
      bodyRequired: string;
    };
    whatsappLink: {
      title: string;
      subtitle: string;
      menuLabel: string;
      phoneLabel: string;
      phonePlaceholder: string;
      phoneError: string;
      messageLabel: string;
      messagePlaceholder: string;
    };
  };

  seo: {
    title: string;
    description: string;
  };
}
