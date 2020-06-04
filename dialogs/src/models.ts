export const LIBRARY_NAME: string = 'hello-world';

export interface SessionData {
    name: string;
}

/**
 * Dialogs IDs used through out code and in dialog-config.json
 */
export enum DialogId {
    HOME = 'dialog-home',
    PLAYERS = 'dialog-players',
    TEAMS = 'dialog-teams',
    STATS = 'dialog-stats',
    GAMES = 'dialog-games'
}

/**
 * Screens to return to all channels
 */
export enum Screen {
    HOME = 'home',
    PLAYERS = 'players',
    TEAMS = 'teams',
    STATS = 'stats',
    GAMES = 'games'
}

/**
 * Expected choices in prompts
 */
export enum ChoiceOperation {
    BACK = 'intent.operation.hello-world.back',
    TEAMS = 'intent.operation.hello-world.teams',
    PLAYERS = 'intent.operation.hello-world.players',
    NAME = 'intent.operation.hello-world.name'
}

/**
 * Expected intents
 */
export enum RedirectIntent {
}

/**
 * Expected entity types
 */
export enum Entity {
    NAME = 'ent.name'
}
