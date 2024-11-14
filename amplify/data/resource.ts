import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
// import { postConfirmation } from '../auth/post-confirmation/resource';

const schema = a.schema({
  MasterTenantTable: a.model({
    pk: a.string().required(),
    sk: a.string().required(),
    company_id: a.id(),
  })
  .authorization(allow=> [allow.publicApiKey()]),
  Tenant: a.customType({
    company: a.ref('Company'),
    company_id: a.id().required(),
  }),
  Company: a.customType({
    tenants: a.ref('Tenant').array(),
  }),
  getCompanyById: a.query()
    .arguments({company_id: a.id().required()})
    .returns(a.ref('Tenant').array())
    .authorization(allow=> [allow.authenticated()])
    .handler(a.handler.custom({
      dataSource: a.ref('MasterTenantTable'),
      entry: './company-resolvers/getCompanyById.js',
    })),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam'
  },
});
