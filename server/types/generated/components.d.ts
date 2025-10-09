import type { Schema, Struct } from '@strapi/strapi';

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
      'shared.location': SharedLocation;
      'shared.social-link': SharedSocialLink;
    }
  }
}
