import type { Schema, Struct } from '@strapi/strapi';

export interface AdminApiToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    encryptedKey: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::api-token'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'read-only'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::api-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::api-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminAuditLog extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_audit_logs';
  info: {
    displayName: 'Audit Log';
    pluralName: 'audit-logs';
    singularName: 'audit-log';
  };
  options: {
    draftAndPublish: false;
    timestamps: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    date: Schema.Attribute.DateTime & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::audit-log'> &
      Schema.Attribute.Private;
    payload: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    user: Schema.Attribute.Relation<'oneToOne', 'admin::user'>;
  };
}

export interface AdminPermission extends Struct.CollectionTypeSchema {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    conditions: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<[]>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::permission'> &
      Schema.Attribute.Private;
    properties: Schema.Attribute.JSON & Schema.Attribute.DefaultTo<{}>;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<'manyToOne', 'admin::role'>;
    subject: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminRole extends Struct.CollectionTypeSchema {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::role'> &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<'oneToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<'manyToMany', 'admin::user'>;
  };
}

export interface AdminSession extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_sessions';
  info: {
    description: 'Session Manager storage';
    displayName: 'Session';
    name: 'Session';
    pluralName: 'sessions';
    singularName: 'session';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
    i18n: {
      localized: false;
    };
  };
  attributes: {
    absoluteExpiresAt: Schema.Attribute.DateTime & Schema.Attribute.Private;
    childId: Schema.Attribute.String & Schema.Attribute.Private;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    deviceId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    expiresAt: Schema.Attribute.DateTime &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::session'> &
      Schema.Attribute.Private;
    origin: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sessionId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique;
    status: Schema.Attribute.String & Schema.Attribute.Private;
    type: Schema.Attribute.String & Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userId: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferToken extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Schema.Attribute.DefaultTo<''>;
    expiresAt: Schema.Attribute.DateTime;
    lastUsedAt: Schema.Attribute.DateTime;
    lifespan: Schema.Attribute.BigInteger;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminTransferTokenPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'admin::transfer-token-permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    token: Schema.Attribute.Relation<'manyToOne', 'admin::transfer-token'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface AdminUser extends Struct.CollectionTypeSchema {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Schema.Attribute.Boolean &
      Schema.Attribute.Private &
      Schema.Attribute.DefaultTo<false>;
    lastname: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'admin::user'> &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    registrationToken: Schema.Attribute.String & Schema.Attribute.Private;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    roles: Schema.Attribute.Relation<'manyToMany', 'admin::role'> &
      Schema.Attribute.Private;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String;
  };
}

export interface ApiAboutUsAboutUs extends Struct.SingleTypeSchema {
  collectionName: 'about_us';
  info: {
    description: 'Contenu de la section \u00C0 propos';
    displayName: 'About Us';
    pluralName: 'about-sections';
    singularName: 'about-us';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    content: Schema.Attribute.RichText & Schema.Attribute.DefaultTo<''>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::about-us.about-us'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiAgencyAgency extends Struct.CollectionTypeSchema {
  collectionName: 'agencies';
  info: {
    description: 'Drive network agencies';
    displayName: 'Agency';
    pluralName: 'agencies';
    singularName: 'agency';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    address: Schema.Attribute.String;
    country: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    externalId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    isDriveAgency: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::agency.agency'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    postalCode: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    siren: Schema.Attribute.String;
    team: Schema.Attribute.Component<'agency.team-member', true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiContactContact extends Struct.SingleTypeSchema {
  collectionName: 'contacts';
  info: {
    description: 'Contenu de la page de contact avec les liens de contact';
    displayName: 'Contact';
    pluralName: 'contacts';
    singularName: 'contact';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contactLinks: Schema.Attribute.Component<'shared.contact-link', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::contact.contact'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFaqFaq extends Struct.SingleTypeSchema {
  collectionName: 'faq_single';
  info: {
    description: 'Questions fr\u00E9quemment pos\u00E9es';
    displayName: 'FAQ';
    pluralName: 'faq-sections';
    singularName: 'faq';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    faqs: Schema.Attribute.Component<'shared.faq-item', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::faq.faq'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFeatureFeature extends Struct.CollectionTypeSchema {
  collectionName: 'features';
  info: {
    description: 'Homepage features cards';
    displayName: 'Feature';
    pluralName: 'features';
    singularName: 'feature';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    alt: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::feature.feature'
    > &
      Schema.Attribute.Private;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFooterFooter extends Struct.SingleTypeSchema {
  collectionName: 'footers';
  info: {
    description: 'Footer configuration';
    displayName: 'Footer';
    pluralName: 'footers';
    singularName: 'footer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contactLinks: Schema.Attribute.Component<'shared.contact-link', true>;
    contactTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Contact'>;
    copyrightText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u00A9 2025 DRIVE - Tous droits r\u00E9serv\u00E9s Propuls\u00E9 par Tekiyo'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    legalTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'L\u00E9gal'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::footer.footer'
    > &
      Schema.Attribute.Private;
    navigationLinks: Schema.Attribute.Component<'shared.navigation-link', true>;
    navigationTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Navigation'>;
    publishedAt: Schema.Attribute.DateTime;
    socialLinks: Schema.Attribute.Component<'shared.social-link', true>;
    socialTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'R\u00E9seaux'>;
    tekiyoCopyright: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u00A9 2025 Maison Tekiyo\u2122 - Tous droits r\u00E9serv\u00E9s.'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiFranchiseFranchise extends Struct.CollectionTypeSchema {
  collectionName: 'franchises';
  info: {
    description: 'Franchise locations';
    displayName: 'Franchise';
    pluralName: 'franchises';
    singularName: 'franchise';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::franchise.franchise'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.Component<'shared.location', false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    phone: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    services: Schema.Attribute.JSON;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiGlobalContentGlobalContent extends Struct.SingleTypeSchema {
  collectionName: 'global_contents';
  info: {
    description: 'Textes et \u00E9l\u00E9ments globaux du site';
    displayName: 'Contenu Global';
    pluralName: 'global-contents';
    singularName: 'global-content';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    contactEmail: Schema.Attribute.Email &
      Schema.Attribute.DefaultTo<'contact@drive.com'>;
    contactPhone: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'+33 1 23 45 67 89'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::global-content.global-content'
    > &
      Schema.Attribute.Private;
    logo: Schema.Attribute.Media<'images'>;
    logoSmall: Schema.Attribute.Media<'images'>;
    publishedAt: Schema.Attribute.DateTime;
    siteDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Plateforme de vente et achat de voitures premium'>;
    siteName: Schema.Attribute.String & Schema.Attribute.DefaultTo<'DRIVE'>;
    socialMedia: Schema.Attribute.Component<'shared.social-link', true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHeaderHeader extends Struct.SingleTypeSchema {
  collectionName: 'headers';
  info: {
    description: 'Header navigation configuration';
    displayName: 'Header';
    pluralName: 'headers';
    singularName: 'header';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    appointmentButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Prendre rendez-vous'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::header.header'
    > &
      Schema.Attribute.Private;
    navigationLinks: Schema.Attribute.Component<'shared.navigation-link', true>;
    openAgencyButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/open-agency'>;
    openAgencyButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Ouvrir une agence'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiHeroHero extends Struct.SingleTypeSchema {
  collectionName: 'heros';
  info: {
    description: 'Contenu de la section hero principale';
    displayName: 'Hero Section';
    pluralName: 'heros';
    singularName: 'hero';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    buyButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Acheter'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'D\u00E9couvrir le r\u00E9seau DRIVE'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<'oneToMany', 'api::hero.hero'> &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    sellButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Vendre'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Simplifiez la vente ou l'achat de votre voiture premium gr\u00E2ce \u00E0 notre r\u00E9seau de courtiers certifi\u00E9s.">;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'La confiance au volant.'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiKeyFiguresKeyFigures extends Struct.SingleTypeSchema {
  collectionName: 'key_figures_single';
  info: {
    description: 'Section chiffres cl\u00E9s (titre, chiffres, b\u00E9n\u00E9fices)';
    displayName: 'Key Figures';
    pluralName: 'key-figures-section';
    singularName: 'key-figures';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    benefits: Schema.Attribute.JSON &
      Schema.Attribute.DefaultTo<
        [
          {
            description: 'S\u00E9curisation des transactions';
            title: 'Fiabilit\u00E9';
          },
          {
            description: "Un accompagnement de bout en bout de l'estimation \u00E0 la vente finale";
            title: 'Simplicit\u00E9';
          },
          {
            description: 'Nos n\u00E9gociations et un mod\u00E8le \u00E9conomique avantageux';
            title: 'Rentabilit\u00E9';
          },
        ]
      >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    keyFigures: Schema.Attribute.JSON &
      Schema.Attribute.DefaultTo<
        [
          {
            description: "62 % des ventes de v\u00E9hicules d'occasion se font entre particuliers.";
            number: '62%';
          },
          {
            description: '70 % des acheteurs privil\u00E9gient un interm\u00E9diaire fiable pour s\u00E9curiser leur achat et \u00EAtre accompagn\u00E9s pour \u00E9viter les arnaques et simplifier les d\u00E9marches administratives';
            number: '70%';
          },
          {
            description: "Plus de 5,5 millions de v\u00E9hicules d'occasion sont vendus chaque ann\u00E9e en France avec une demande constante demande.";
            number: '5,5M';
          },
          {
            description: "57 % des vendeurs rencontrent des difficult\u00E9s \u00E0 n\u00E9gocier et vendre d'un v\u00E9hicule (manque de temps, perte de la gestion des n\u00E9gociations, des d\u00E9marches administratives et du manque de confiance des acheteurs";
            number: '57%';
          },
        ]
      >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::key-figures.key-figures'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'QUELQUES CHIFFRES'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiMaximizeYourProfitabilityMaximizeYourProfitability
  extends Struct.SingleTypeSchema {
  collectionName: 'maximize_your_profitability_single';
  info: {
    description: 'Section maximiser votre rentabilit\u00E9';
    displayName: 'Maximize Your Profitability';
    pluralName: 'maximize-profitability-sections';
    singularName: 'maximize-your-profitability';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Drive propose une approche innovante en combinant la force du digital et un r\u00E9seau physique d'agences locales, permettant ainsi d'optimiser la g\u00E9n\u00E9ration de leads et d'acc\u00E9l\u00E9rer le closing des ventes.">;
    image: Schema.Attribute.Media<'images'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::maximize-your-profitability.maximize-your-profitability'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'MOD\u00C8LE UNIQUE POUR MAXIMISER VOTRE RENTABILIT\u00C9'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiNeedAssistanceNeedAssistance
  extends Struct.SingleTypeSchema {
  collectionName: 'need_assistances';
  info: {
    description: "Contenu de la section 'Besoin d'assistance ?'";
    displayName: 'Need Assistance';
    pluralName: 'need-assistances';
    singularName: 'need-assistance';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    driveMessage: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Bonjour, en quoi pouvons-\nnous vous aider ?'>;
    driveMessageLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'DRIVE'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::need-assistance.need-assistance'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Besoin d'assistance ?">;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    userMessage: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"Bonjour, j'ai besoin d'aide\nconcernant un v\u00E9hicule.">;
    userMessageLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Vous'>;
    whatsappButtonLink: Schema.Attribute.String;
    whatsappButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Whatsapp Business'>;
  };
}

export interface ApiOpenAgencyApplicationFormOpenAgencyApplicationForm
  extends Struct.SingleTypeSchema {
  collectionName: 'open_agency_application_forms';
  info: {
    description: 'Formulaire de candidature de la page Ouvrir une agence';
    displayName: 'Open Agency Application Form';
    pluralName: 'open-agency-application-forms';
    singularName: 'open-agency-application-form';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    apportOptions: Schema.Attribute.Component<'shared.select-option', true>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Envoyez votre candidature en \u00E9valuant support, zone et dispo, puis on vous rappelle sous 24 h si \u00E7a marche.'>;
    experienceOptions: Schema.Attribute.Component<'shared.select-option', true>;
    fieldLabels: Schema.Attribute.JSON &
      Schema.Attribute.DefaultTo<{
        apport: 'Apport';
        commentaires: 'Commentaires';
        email: 'Email';
        experience: 'Exp\u00E9rience pro';
        nomComplet: 'Nom complet';
        telephone: 'Num\u00E9ro de t\u00E9l\u00E9phone';
        ville: 'Ville';
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::open-agency-application-form.open-agency-application-form'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    submitButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'ENVOYER'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Candidature'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiOpenAgencyFeaturesOpenAgencyFeatures
  extends Struct.SingleTypeSchema {
  collectionName: 'open_agency_features';
  info: {
    description: 'Section features de la page Ouvrir une agence';
    displayName: 'Open Agency Features';
    pluralName: 'open-agency-features-sections';
    singularName: 'open-agency-features';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    bannerImage: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    features: Schema.Attribute.Component<'shared.feature-item', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::open-agency-features.open-agency-features'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Vehicle Features'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiOpenAgencyHeroOpenAgencyHero
  extends Struct.SingleTypeSchema {
  collectionName: 'open_agency_heros';
  info: {
    description: 'Section hero de la page Ouvrir une agence';
    displayName: 'Open Agency Hero';
    pluralName: 'open-agency-heros';
    singularName: 'open-agency-hero';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::open-agency-hero.open-agency-hero'
    > &
      Schema.Attribute.Private;
    primaryButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#application-form'>;
    primaryButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Je candidate'>;
    publishedAt: Schema.Attribute.DateTime;
    secondaryButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#'>;
    secondaryButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'T\u00E9l\u00E9charger le dossier PDF'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'M\u00E9thode cl\u00E9 en main, r\u00E9seau premium, retour sur investissement rapide.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Ouvrez votre agence <br /> DRIVE en 90 jours'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiOpenAgencyMediaSliderOpenAgencyMediaSlider
  extends Struct.SingleTypeSchema {
  collectionName: 'open_agency_media_sliders';
  info: {
    description: 'Carrousel m\u00E9dia de la page Ouvrir une agence';
    displayName: 'Open Agency Media Slider';
    pluralName: 'open-agency-media-sliders';
    singularName: 'open-agency-media-slider';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::open-agency-media-slider.open-agency-media-slider'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    slides: Schema.Attribute.Component<'shared.media-slide', true>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'iOS 26. Nouveau look. <br /> Nouvelle magie.'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiOpenAgencyShowcaseOpenAgencyShowcase
  extends Struct.SingleTypeSchema {
  collectionName: 'open_agency_showcases';
  info: {
    description: 'Section showcase de la page Ouvrir une agence';
    displayName: 'Open Agency Showcase';
    pluralName: 'open-agency-showcases';
    singularName: 'open-agency-showcase';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    buttonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'#application-form'>;
    buttonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Commen\u00E7ons ensemble.'>;
    carImage: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"En rejoignant le r\u00E9seau DRIVE, vous profitez d'un business model d\u00E9j\u00E0 \u00E9prouv\u00E9 : plateforme catalogue connect\u00E9e, paiement Stripe s\u00E9curis\u00E9 et flux de leads qualifi\u00E9s g\u00E9n\u00E9r\u00E9s en continu. Nous vous accompagnons d\u00E8s la signature, 10 jours d'onboarding intensif, kit marketing complet, hotline d\u00E9di\u00E9e 6 j/7, puis nous suivons vos indicateurs en temps r\u00E9el pour optimiser vos performances. Investissement ma\u00EEtris\u00E9, marge moyenne 18 %, retour sur investissement estim\u00E9 \u00E0 moins de douze mois.">;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::open-agency-showcase.open-agency-showcase'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    stats: Schema.Attribute.Component<'shared.stat-item', true>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiOpenDriveAgencyOpenDriveAgency
  extends Struct.SingleTypeSchema {
  collectionName: 'open_drive_agencies';
  info: {
    description: 'Contenu de la section Ouvrir une agence DRIVE';
    displayName: 'Open Drive Agency Section';
    pluralName: 'open-drive-agencies';
    singularName: 'open-drive-agency';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ctaText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Ouvrir mon agence'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::open-drive-agency.open-drive-agency'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    statsText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'+12 agences actives \u00B7 97 % franchis\u00E9s satisfaits'>;
    subtitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Devenez partenaire DRIVE en 90jours.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'Ouvrir une agence DRIVE.'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiReadyToTakeActionReadyToTakeAction
  extends Struct.SingleTypeSchema {
  collectionName: 'ready_to_take_actions';
  info: {
    description: "Contenu de la section 'Pr\u00EAt \u00E0 passer \u00E0 l'action ?'";
    displayName: 'Ready To Take Action';
    pluralName: 'ready-to-take-actions';
    singularName: 'ready-to-take-action';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    leftButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/catalogue'>;
    leftButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Voir le catalogue'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::ready-to-take-action.ready-to-take-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    rightButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'/vendre'>;
    rightButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Estimer mon v\u00E9hicule'>;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Aucuns frais cach\u00E9s. R\u00E9ponse sous 24 h.'>;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<"Pr\u00EAt \u00E0 passer \u00E0 l'action ?">;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSecureIntermediationSecureIntermediation
  extends Struct.SingleTypeSchema {
  collectionName: 'secure_intermediations';
  info: {
    description: "Contenu de la section 'Interm\u00E9diation s\u00E9curis\u00E9e'";
    displayName: 'Secure Intermediation';
    pluralName: 'secure-intermediations';
    singularName: 'secure-intermediation';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    carImage: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    features: Schema.Attribute.JSON &
      Schema.Attribute.DefaultTo<
        [
          'Estimation bas\u00E9e sur ventes r\u00E9elles locales.',
          'Check visuel guid\u00E9 en 5 photos.',
          'Mise en avant r\u00E9seau + acheteurs qualifi\u00E9s.',
          "Acompte Stripe pour bloquer l'acheteur.",
          'Essai encadr\u00E9 en agence.',
          'Fonds vir\u00E9s avant remise des cl\u00E9s.',
        ]
      >;
    infoTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<"Besoin de plus d'infos ?">;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::secure-intermediation.secure-intermediation'
    > &
      Schema.Attribute.Private;
    mainTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Interm\u00E9diation s\u00E9curis\u00E9e, pas Leboncoin.'>;
    publishedAt: Schema.Attribute.DateTime;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'On ne poste pas une annonce, on orchestre la vente. Tu gardes le contr\u00F4le, nous on acc\u00E9l\u00E8re.'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    whatsappButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<''>;
    whatsappButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Whatsapp Business'>;
  };
}

export interface ApiSellMyCarSellMyCar extends Struct.SingleTypeSchema {
  collectionName: 'sell_my_cars';
  info: {
    description: "Contenu de la section 'Vendre ma voiture'";
    displayName: 'Sell My Car';
    pluralName: 'sell-my-cars';
    singularName: 'sell-my-car';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    badgeText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Vendre ma voiture \u2192'>;
    bottomText: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"Nous g\u00E9rons chaque \u00E9tape :\n\u00E9valuation, visibilit\u00E9, r\u00E9servation et transfert d'argent sans frais cach\u00E9s, sans stress.">;
    carImage: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    features: Schema.Attribute.Component<'shared.feature-item', true>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::sell-my-car.sell-my-car'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"Nous estimons la valeur de votre voiture,\npuis nous s\u00E9curisons l'acheteur pour vous.">;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiSellingFeeSellingFee extends Struct.SingleTypeSchema {
  collectionName: 'selling_fees';
  info: {
    description: "Contenu de la section 'La vente sereine, z\u00E9ro frais'";
    displayName: 'Selling Fee';
    pluralName: 'selling-fees';
    singularName: 'selling-fee';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    appointmentButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<''>;
    appointmentButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Prendre rendez-vous'>;
    callbackButtonLink: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<''>;
    callbackButtonText: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'\u00CAtre rappel\u00E9 dans 30 min'>;
    carImage: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::selling-fee.selling-fee'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    subtitle: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'97 % de ventes conclues \u00B7 0 \u20AC frais cach\u00E9s \u00B7 12 agences actives'>;
    title: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'La vente sereine, z\u00E9ro frais.'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiTestimonialTestimonial extends Struct.CollectionTypeSchema {
  collectionName: 'testimonials';
  info: {
    description: 'T\u00E9moignages clients';
    displayName: 'T\u00E9moignages';
    pluralName: 'testimonials';
    singularName: 'testimonial';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    avatar: Schema.Attribute.Media<'images'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::testimonial.testimonial'
    > &
      Schema.Attribute.Private;
    location: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    publishedAt: Schema.Attribute.DateTime;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiVehicleConditionVehicleCondition
  extends Struct.SingleTypeSchema {
  collectionName: 'vehicle_conditions';
  info: {
    description: "Contenu de la section 'Condition du v\u00E9hicule'";
    displayName: 'Vehicle Condition';
    pluralName: 'vehicle-conditions';
    singularName: 'vehicle-condition';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    estimationDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Entrez votre immatriculation et votre kilom\u00E9trage : nous comparons des milliers de ventes r\u00E9centes pour g\u00E9n\u00E9rer une fourchette fiable. Ajoutez 10 photos guid\u00E9es pour affiner. R\u00E9sultat imm\u00E9diat, sans engagement.'>;
    estimationImage: Schema.Attribute.Media<'images'>;
    estimationTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Estimation'>;
    inspectionDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"30 minutes \u00E0 l'agence ou chez vous. Contr\u00F4le de 100 points, v\u00E9rification du VIN et des documents, mini-essai si n\u00E9cessaire. Rapport photo horodat\u00E9 envoy\u00E9 avant d\u00E9cision.">;
    inspectionImage: Schema.Attribute.Media<'images'>;
    inspectionTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Inspection'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::vehicle-condition.vehicle-condition'
    > &
      Schema.Attribute.Private;
    offerDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<'Prix garanti apr\u00E8s inspection, valable 48 h.'>;
    offerImage: Schema.Attribute.Media<'images'>;
    offerTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Offre ferme'>;
    paymentDescription: Schema.Attribute.Text &
      Schema.Attribute.DefaultTo<"Virement instantan\u00E9 confirm\u00E9 avant remise des cl\u00E9s. Nous g\u00E9rons carte grise, certificat de cession et logistique d'enl\u00E8vement. Z\u00E9ro avance, z\u00E9ro paperasse, tout simplement.">;
    paymentImage: Schema.Attribute.Media<'images'>;
    paymentTitle: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Paiement & cession'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface ApiVehicleVehicle extends Struct.CollectionTypeSchema {
  collectionName: 'vehicles';
  info: {
    description: 'Vehicle listings for the catalog';
    displayName: 'Vehicle';
    pluralName: 'vehicles';
    singularName: 'vehicle';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.Text;
    featured: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    features: Schema.Attribute.JSON;
    fuel: Schema.Attribute.String & Schema.Attribute.Required;
    images: Schema.Attribute.Media<'images', true>;
    km: Schema.Attribute.String & Schema.Attribute.Required;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::vehicle.vehicle'
    > &
      Schema.Attribute.Private;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    price: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    specifications: Schema.Attribute.JSON;
    status: Schema.Attribute.Enumeration<['available', 'sold', 'reserved']> &
      Schema.Attribute.DefaultTo<'available'>;
    subtitle: Schema.Attribute.String & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    trans: Schema.Attribute.String & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    year: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ApiWhyDriveWhyDrive extends Struct.SingleTypeSchema {
  collectionName: 'why_drive_single';
  info: {
    description: 'Section Pourquoi Drive';
    displayName: 'Why Drive';
    pluralName: 'why-drive-sections';
    singularName: 'why-drive';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    items: Schema.Attribute.JSON &
      Schema.Attribute.DefaultTo<
        [
          'March\u00E9 porteur',
          'Gagnant/Gagnant',
          'ACCOMPAGNEMENT SUR MESURE',
          'RENTABILIT\u00E9',
          'R\u00E9seau collaboratif',
          'Multi-franchise',
          'Aventure humaine',
          'Valeurs',
          'FORMATIONS/ANIMATIONS',
          'Transmission de savoir faire',
        ]
      >;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'api::why-drive.why-drive'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    title: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'POURQUOI DRIVE ?'>;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesRelease
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    publishedAt: Schema.Attribute.DateTime;
    releasedAt: Schema.Attribute.DateTime;
    scheduledAt: Schema.Attribute.DateTime;
    status: Schema.Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Schema.Attribute.Required;
    timezone: Schema.Attribute.String;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    entryDocumentId: Schema.Attribute.String;
    isEntryValid: Schema.Attribute.Boolean;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::content-releases.release-action'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    release: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Schema.Attribute.Enumeration<['publish', 'unpublish']> &
      Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginI18NLocale extends Struct.CollectionTypeSchema {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Unique;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::i18n.locale'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflow
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows';
  info: {
    description: '';
    displayName: 'Workflow';
    name: 'Workflow';
    pluralName: 'workflows';
    singularName: 'workflow';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentTypes: Schema.Attribute.JSON &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'[]'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    stageRequiredToPublish: Schema.Attribute.Relation<
      'oneToOne',
      'plugin::review-workflows.workflow-stage'
    >;
    stages: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginReviewWorkflowsWorkflowStage
  extends Struct.CollectionTypeSchema {
  collectionName: 'strapi_workflows_stages';
  info: {
    description: '';
    displayName: 'Stages';
    name: 'Workflow Stage';
    pluralName: 'workflow-stages';
    singularName: 'workflow-stage';
  };
  options: {
    draftAndPublish: false;
    version: '1.1.0';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    color: Schema.Attribute.String & Schema.Attribute.DefaultTo<'#4945FF'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::review-workflows.workflow-stage'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String;
    permissions: Schema.Attribute.Relation<'manyToMany', 'admin::permission'>;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    workflow: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::review-workflows.workflow'
    >;
  };
}

export interface PluginUploadFile extends Struct.CollectionTypeSchema {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Schema.Attribute.String;
    caption: Schema.Attribute.String;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    ext: Schema.Attribute.String;
    folder: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'> &
      Schema.Attribute.Private;
    folderPath: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    formats: Schema.Attribute.JSON;
    hash: Schema.Attribute.String & Schema.Attribute.Required;
    height: Schema.Attribute.Integer;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.file'
    > &
      Schema.Attribute.Private;
    mime: Schema.Attribute.String & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    previewUrl: Schema.Attribute.String;
    provider: Schema.Attribute.String & Schema.Attribute.Required;
    provider_metadata: Schema.Attribute.JSON;
    publishedAt: Schema.Attribute.DateTime;
    related: Schema.Attribute.Relation<'morphToMany'>;
    size: Schema.Attribute.Decimal & Schema.Attribute.Required;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    width: Schema.Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Struct.CollectionTypeSchema {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.folder'>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    files: Schema.Attribute.Relation<'oneToMany', 'plugin::upload.file'>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::upload.folder'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    parent: Schema.Attribute.Relation<'manyToOne', 'plugin::upload.folder'>;
    path: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    pathId: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.Unique;
    publishedAt: Schema.Attribute.DateTime;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Schema.Attribute.String & Schema.Attribute.Required;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    > &
      Schema.Attribute.Private;
    publishedAt: Schema.Attribute.DateTime;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    description: Schema.Attribute.String;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.role'
    > &
      Schema.Attribute.Private;
    name: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    publishedAt: Schema.Attribute.DateTime;
    type: Schema.Attribute.String & Schema.Attribute.Unique;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    users: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser
  extends Struct.CollectionTypeSchema {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    blocked: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    confirmationToken: Schema.Attribute.String & Schema.Attribute.Private;
    confirmed: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    createdAt: Schema.Attribute.DateTime;
    createdBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    email: Schema.Attribute.Email &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    locale: Schema.Attribute.String & Schema.Attribute.Private;
    localizations: Schema.Attribute.Relation<
      'oneToMany',
      'plugin::users-permissions.user'
    > &
      Schema.Attribute.Private;
    password: Schema.Attribute.Password &
      Schema.Attribute.Private &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Schema.Attribute.String;
    publishedAt: Schema.Attribute.DateTime;
    resetPasswordToken: Schema.Attribute.String & Schema.Attribute.Private;
    role: Schema.Attribute.Relation<
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Schema.Attribute.DateTime;
    updatedBy: Schema.Attribute.Relation<'oneToOne', 'admin::user'> &
      Schema.Attribute.Private;
    username: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.Unique &
      Schema.Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ContentTypeSchemas {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::audit-log': AdminAuditLog;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::session': AdminSession;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::about-us.about-us': ApiAboutUsAboutUs;
      'api::agency.agency': ApiAgencyAgency;
      'api::contact.contact': ApiContactContact;
      'api::faq.faq': ApiFaqFaq;
      'api::feature.feature': ApiFeatureFeature;
      'api::footer.footer': ApiFooterFooter;
      'api::franchise.franchise': ApiFranchiseFranchise;
      'api::global-content.global-content': ApiGlobalContentGlobalContent;
      'api::header.header': ApiHeaderHeader;
      'api::hero.hero': ApiHeroHero;
      'api::key-figures.key-figures': ApiKeyFiguresKeyFigures;
      'api::maximize-your-profitability.maximize-your-profitability': ApiMaximizeYourProfitabilityMaximizeYourProfitability;
      'api::need-assistance.need-assistance': ApiNeedAssistanceNeedAssistance;
      'api::open-agency-application-form.open-agency-application-form': ApiOpenAgencyApplicationFormOpenAgencyApplicationForm;
      'api::open-agency-features.open-agency-features': ApiOpenAgencyFeaturesOpenAgencyFeatures;
      'api::open-agency-hero.open-agency-hero': ApiOpenAgencyHeroOpenAgencyHero;
      'api::open-agency-media-slider.open-agency-media-slider': ApiOpenAgencyMediaSliderOpenAgencyMediaSlider;
      'api::open-agency-showcase.open-agency-showcase': ApiOpenAgencyShowcaseOpenAgencyShowcase;
      'api::open-drive-agency.open-drive-agency': ApiOpenDriveAgencyOpenDriveAgency;
      'api::ready-to-take-action.ready-to-take-action': ApiReadyToTakeActionReadyToTakeAction;
      'api::secure-intermediation.secure-intermediation': ApiSecureIntermediationSecureIntermediation;
      'api::sell-my-car.sell-my-car': ApiSellMyCarSellMyCar;
      'api::selling-fee.selling-fee': ApiSellingFeeSellingFee;
      'api::testimonial.testimonial': ApiTestimonialTestimonial;
      'api::vehicle-condition.vehicle-condition': ApiVehicleConditionVehicleCondition;
      'api::vehicle.vehicle': ApiVehicleVehicle;
      'api::why-drive.why-drive': ApiWhyDriveWhyDrive;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::review-workflows.workflow': PluginReviewWorkflowsWorkflow;
      'plugin::review-workflows.workflow-stage': PluginReviewWorkflowsWorkflowStage;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
