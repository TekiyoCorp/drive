import type { Schema, Struct } from '@strapi/strapi';

export interface AgencyTeamMember extends Struct.ComponentSchema {
  collectionName: 'components_agency_team_members';
  info: {
    description: 'Agency team member profile';
    displayName: 'Team Member';
    icon: 'briefcase';
  };
  attributes: {
    name: Schema.Attribute.String & Schema.Attribute.Required;
    photo: Schema.Attribute.Media<'images'>;
    work: Schema.Attribute.String;
  };
}

export interface SharedContactLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_links';
  info: {
    description: 'Contact link component';
    displayName: 'Contact Link';
  };
  attributes: {
    disabled: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    link: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    type: Schema.Attribute.Enumeration<
      ['email', 'phone', 'whatsapp', 'other']
    > &
      Schema.Attribute.DefaultTo<'other'>;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_items';
  info: {
    description: 'Une question et r\u00E9ponse de la FAQ';
    displayName: 'FAQ Item';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_items';
  info: {
    description: '\u00C9l\u00E9ment de feature avec titre, description et ic\u00F4ne';
    displayName: 'Feature Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedLocation extends Struct.ComponentSchema {
  collectionName: 'components_shared_locations';
  info: {
    description: 'Location component with coordinates';
    displayName: 'Location';
  };
  attributes: {
    latitude: Schema.Attribute.Decimal & Schema.Attribute.Required;
    longitude: Schema.Attribute.Decimal & Schema.Attribute.Required;
  };
}

export interface SharedMediaSlide extends Struct.ComponentSchema {
  collectionName: 'components_shared_media_slides';
  info: {
    description: 'Slide pour le carrousel m\u00E9dia';
    displayName: 'Media Slide';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'> & Schema.Attribute.Required;
    text: Schema.Attribute.Text;
  };
}

export interface SharedNavigationLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_navigation_links';
  info: {
    description: 'Navigation link component';
    displayName: 'Navigation Link';
  };
  attributes: {
    link: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSelectOption extends Struct.ComponentSchema {
  collectionName: 'components_shared_select_options';
  info: {
    description: 'Option pour un champ select';
    displayName: 'Select Option';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_links';
  info: {
    description: 'Social media link component';
    displayName: 'Social Link';
  };
  attributes: {
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    description: '\u00C9l\u00E9ment de statistique avec valeur et label';
    displayName: 'Stat Item';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    showStar: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'agency.team-member': AgencyTeamMember;
      'shared.contact-link': SharedContactLink;
      'shared.faq-item': SharedFaqItem;
      'shared.feature-item': SharedFeatureItem;
      'shared.location': SharedLocation;
      'shared.media-slide': SharedMediaSlide;
      'shared.navigation-link': SharedNavigationLink;
      'shared.select-option': SharedSelectOption;
      'shared.social-link': SharedSocialLink;
      'shared.stat-item': SharedStatItem;
    }
  }
}
