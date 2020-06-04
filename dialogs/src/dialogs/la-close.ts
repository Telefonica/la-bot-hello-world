import { CloseDialog, Configuration } from '@telefonica/aura-la-bot-sdk';

import { LIBRARY_NAME } from '../models';

export default class HelloWorldCloseDialog extends CloseDialog {

    constructor(config: Configuration) {
        super(LIBRARY_NAME, config);
    }
}
