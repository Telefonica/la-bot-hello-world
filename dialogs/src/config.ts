import * as joi from '@hapi/joi';

const configurationSchema: joi.SchemaMap = {
    LA_HELLOWORLD_API_MOCK: joi.boolean().default(false),
    LA_HELLOWORLD_API_BASE_URL: joi.string().uri({ scheme: ['http', 'https']}).default('https://www.balldontlie.io/api/v1/')
};

export default configurationSchema;
