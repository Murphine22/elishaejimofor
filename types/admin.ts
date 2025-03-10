export interface SectionContent {
  about: {
    vision: string;
    description: string;
    timeline: Array<{ year: number; event: string }>;
    workExperience: Array<{
      title: string;
      company: string;
      period: string;
      responsibilities: string[];
    }>;
  };
  skills: {
    categories: Array<{
      name: string;
      description: string;
      technologies: Array<{
        name: string;
        level: number;
      }>;
    }>;
    continuousLearning: string;
  };
  projects: Array<{
    title: string;
    description: string;
    technologies: string[];
    imageUrl: string;
    demoUrl?: string;
    githubUrl?: string;
  }>;
  services: Array<{
    title: string;
    description: string;
    details: string[];
    packages: Array<{
      name: string;
      description: string;
      priceNGN: number;
      features: string[];
    }>;
  }>;
  blog: {
    posts: Array<{
      id: number;
      title: string;
      content: string;
      image: string;
      category: string;
      timestamp: string;
    }>;
  };
  contact: {
    email: string;
    phone: string;
    location: string;
  };
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type EditableSection = keyof SectionContent;

export type EditableField<T extends EditableSection> = keyof SectionContent[T]; 