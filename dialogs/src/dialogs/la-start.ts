import { Configuration, StartDialog } from '@telefonica/aura-la-bot-sdk';

import { LIBRARY_NAME } from '../models';

export default class HelloWorldStartDialog extends StartDialog {

    constructor(config: Configuration) {
        super(LIBRARY_NAME, config);
    }
}
