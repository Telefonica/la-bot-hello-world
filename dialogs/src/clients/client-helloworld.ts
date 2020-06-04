import { ApiClient, Configuration, HTTPMethod } from '@telefonica/aura-la-bot-sdk';
import * as sdk from '@telefonica/aura-la-bot-sdk';
import { WaterfallStepContext } from 'botbuilder-dialogs';


export class HelloWorldClient extends ApiClient {
    private config: Configuration;

    constructor(config: Configuration, stepContext: WaterfallStepContext) {
        super(stepContext, config.LA_HELLOWORLD_API_MOCK);
        this.config = config;
    }

    public async players(): Promise<any> {
        const msg = 'Fetching players from external API';
        const fetch: () => Promise<any> = () =>
            this.setupRequest(HTTPMethod.GET, `${this.config.LA_HELLOWORLD_API_BASE_URL}players`, msg)
                .withMock({})
                .withTimeout(10000)
                .execute<any>();

        return sdk.cacheGet<any>('hello-world.player', fetch, 3600, this.stepContext);
    }

}
