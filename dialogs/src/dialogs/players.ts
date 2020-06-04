import { Dialog, Configuration, PromptCase, RouteAction, ScreenMessage } from '@telefonica/aura-la-bot-sdk';
import * as sdk from '@telefonica/aura-la-bot-sdk';
import { DialogId, LIBRARY_NAME, ChoiceOperation, Screen } from '../models';
import { WaterfallStep, WaterfallStepContext, DialogTurnResult } from 'botbuilder-dialogs';
import { HelloWorldClient } from '../clients/client-helloworld';

export default class HelloWorldPlayers extends Dialog {
    static readonly dialogPrompt = `${DialogId.PLAYERS}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.PLAYERS, config);
    }

    protected dialogStages(): WaterfallStep[] {
        return [
            this._dialogStage.bind(this),
            this._promptResponse.bind(this)
        ];
    }

    protected prompts(): string[] {
        return [ HelloWorldPlayers.dialogPrompt ];
    }

    protected async clearDialogState(stepContext: WaterfallStepContext): Promise<void> {
        return;
    }

    private async _dialogStage(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const apiClient = new HelloWorldClient(this.config, stepContext);

        const players = await apiClient.players();

        const screenData: any = { players };
        const message = new ScreenMessage(Screen.PLAYERS, screenData);
        await sdk.messaging.send(stepContext, message);

        const choices = [
            ChoiceOperation.BACK
        ];
        return await sdk.messaging.prompt(stepContext, HelloWorldPlayers.dialogPrompt, choices);
    }

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const cases: PromptCase[] = [
            {
                operation: ChoiceOperation.BACK,
                action: [RouteAction.POP]
            }
        ];
        return super.promptHandler(stepContext, cases);
    }

}
