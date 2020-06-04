import { Dialog, Configuration, PromptCase, RouteAction, ScreenMessage } from '@telefonica/aura-la-bot-sdk';
import * as sdk from '@telefonica/aura-la-bot-sdk';
import { DialogId, LIBRARY_NAME, ChoiceOperation, Screen } from '../models';
import { WaterfallStep, WaterfallStepContext, DialogTurnResult } from 'botbuilder-dialogs';

export default class HelloWorldGames extends Dialog {
    static readonly dialogPrompt = `${DialogId.GAMES}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.GAMES, config);
    }

    protected dialogStages(): WaterfallStep[] {
        return [
            this._dialogStage.bind(this),
            this._promptResponse.bind(this)
        ];
    }

    protected prompts(): string[] {
        return [ HelloWorldGames.dialogPrompt ];
    }

    protected async clearDialogState(stepContext: WaterfallStepContext): Promise<void> {
        return;
    }

    private async _dialogStage(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const screenData: any = {};
        const message = new ScreenMessage(Screen.HOME, screenData);
        await sdk.messaging.send(stepContext, message);

        const choices = [
            ChoiceOperation.BACK
        ];
        return await sdk.messaging.prompt(stepContext, HelloWorldGames.dialogPrompt, choices);
    }

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const cases: PromptCase[] = [
            {
                operation: ChoiceOperation.BACK,
                action: [RouteAction.REPLACE, DialogId.HOME]
            }
        ];
        return super.promptHandler(stepContext, cases);
    }

}
