export interface HomeSections {
  purpose: {
    visible: boolean;
    title: string;
    description: string;
    handNote: string;
  };
  discover: {
    visible: boolean;
    title: string;
    description: string;
  };
  stories: {
    visible: boolean;
    title: string;
    description: string;
  };
  newsletter: {
    visible: boolean;
    title: string;
    description: string;
  };
  participation: {
    visible: boolean;
    suggestionTitle: string;
    suggestionDescription: string;
    volunteerTitle: string;
    volunteerDescription: string;
  };
  closing: {
    visible: boolean;
    title: string;
    description: string;
  };
  eventPromo: {
    visible: boolean;
  };
}

export const DEFAULT_HOME_SECTIONS: HomeSections = {
  purpose: {
    visible: false, // Claude 5차/6차: 타오디엔 레거시 섹션 비활성화
    title: 'Sponsored with Purpose',
    description: 'Sponsorship helps sustain My Phu Quoc and creates room for community-focused local initiatives.',
    handNote: 'Local support.\nReal change. ♡'
  },
  discover: {
    visible: true,
    title: 'Start with what you want to do.',
    description: 'Choose a category, then explore local places by what you’re looking for — from massage and Pilates to Japanese dining, brunch and more.'
  },
  stories: {
    visible: true,
    title: 'News, Blog & Stories',
    description: 'Useful information for residents, neighborhood stories and foreign-resident updates.'
  },
  newsletter: {
    visible: false,
    title: 'Phu Quoc Sunset Town Magazine',
    description: 'Travel updates and new openings in Sunset Town.'
  },
  participation: {
    visible: false,
    suggestionTitle: 'Community Suggestions',
    suggestionDescription: 'Have an idea, feedback or recommendation? Help shape the platform around real local needs.',
    volunteerTitle: 'Volunteer',
    volunteerDescription: ''
  },
  closing: {
    visible: true,
    title: 'The most breathtaking sunset\nand unforgettable Phu Quoc nights.',
    description: 'SUNSET TOWN PHU QUOC · TRAVEL & DISTRICT GUIDE'
  },
  eventPromo: {
    visible: true
  }
}

export function mergeHomeSections(data: any): HomeSections {
  if (!data) return DEFAULT_HOME_SECTIONS;
  return {
    purpose: { ...DEFAULT_HOME_SECTIONS.purpose, ...(data.purpose || {}) },
    discover: { ...DEFAULT_HOME_SECTIONS.discover, ...(data.discover || {}) },
    stories: { ...DEFAULT_HOME_SECTIONS.stories, ...(data.stories || {}) },
    newsletter: { ...DEFAULT_HOME_SECTIONS.newsletter, ...(data.newsletter || {}) },
    participation: { ...DEFAULT_HOME_SECTIONS.participation, ...(data.participation || {}) },
    closing: { ...DEFAULT_HOME_SECTIONS.closing, ...(data.closing || {}) },
    eventPromo: { ...DEFAULT_HOME_SECTIONS.eventPromo, ...(data.eventPromo || {}) }
  };
}
