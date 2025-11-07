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

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'agency.team-member': AgencyTeamMember;
      'shared.contact-link': SharedContactLink;
      'shared.location': SharedLocation;
      'shared.navigation-link': SharedNavigationLink;
      'shared.social-link': SharedSocialLink;
    }
  }
}
