import { Dialog, Configuration, PromptCase, RouteAction, ScreenMessage, Suggestion } from '@telefonica/aura-la-bot-sdk';
import * as sdk from '@telefonica/aura-la-bot-sdk';
import { DialogId, LIBRARY_NAME, ChoiceOperation, Screen, Entity, SessionData } from '../models';
import { WaterfallStep, WaterfallStepContext, DialogTurnResult } from 'botbuilder-dialogs';

export default class HelloWorldHome extends Dialog {
    static readonly dialogPrompt = `${DialogId.HOME}-prompt`;

    constructor(config: Configuration) {
        super(LIBRARY_NAME, DialogId.HOME, config);
    }

    protected dialogStages(): WaterfallStep[] {
        return [
            this._dialogStage.bind(this),
            this._promptResponse.bind(this)
        ];
    }

    protected prompts(): string[] {
        return [ HelloWorldHome.dialogPrompt ];
    }

    protected async clearDialogState(stepContext: WaterfallStepContext): Promise<void> {
        return;
    }

    private async _dialogStage(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const sessionData = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
        const context = await sdk.persistence.getStoredData(stepContext);

        const screenData: any = {
            foo: 'bar',
            suggestions: Suggestion.getSuggestions(stepContext, 'home.suggestions', { name: 'Pedro' })
        };
        const name = sessionData.name || context.name;
        if (name) {
            screenData.name = name;
        }
        const message = new ScreenMessage(Screen.HOME, screenData).withText('home.welcome').withSpeak('home.welcome');
        await sdk.messaging.send(stepContext, message);

        const choices = [
            ChoiceOperation.BACK,
            ChoiceOperation.PLAYERS,
            ChoiceOperation.TEAMS,
            ChoiceOperation.NAME
        ];
        return await sdk.messaging.prompt(stepContext, HelloWorldHome.dialogPrompt, choices);
    }

    private async _promptResponse(stepContext: WaterfallStepContext): Promise<DialogTurnResult> {
        const sessionData = await sdk.lifecycle.getSessionData<SessionData>(stepContext);
        const context = await sdk.persistence.getStoredData(stepContext);

        const cases: PromptCase[] = [
            {
                operation: ChoiceOperation.BACK,
                action: [RouteAction.CLOSE]
            },
            {
                operation: ChoiceOperation.PLAYERS,
                action: [RouteAction.PUSH, DialogId.PLAYERS]
            },
            {
                operation: ChoiceOperation.TEAMS,
                action: [RouteAction.PUSH, DialogId.TEAMS]
            },
            {
                operation: ChoiceOperation.NAME,
                logic: async () => {
                    const name = sdk.lifecycle.getCallingEntity(stepContext, Entity.NAME);
                    if (name) {
                        sessionData.name = name;
                        await sdk.persistence.storeData(stepContext, { ...context, name });
                    }
                }
            }
        ];
        return super.promptHandler(stepContext, cases);
    }

}
