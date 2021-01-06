import { ModelCollection } from "../models/ModelCollection";
import { ViewCollection } from "../views/ViewCollection";
import { GameController } from "./GameController";
import { GameEventController } from "./event_controllers/GameEventController";
import { ControllerCollectionBase } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Collections";
import { TextPageEventController } from "./event_controllers/TextPageEventController";

export interface ControllerCollection extends ControllerCollectionBase {
    game_controller: GameController,
    for_event: {
        game_controller: GameEventController,
        text_page_controller: TextPageEventController,
    }
}

export function create_controllers(models: ModelCollection, views: ViewCollection): ControllerCollection {
    const controllers: ControllerCollection = {} as ControllerCollection;
    const buffer: ControllerCollection = {
        game_controller: new GameController(models, views, controllers),
        for_event: {
            game_controller: new GameEventController(models, views, controllers),
            text_page_controller: new TextPageEventController(models, views, controllers),
        }
    };
    return Object.assign(controllers, buffer);
}