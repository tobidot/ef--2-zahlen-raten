import { BaseController } from "../BaseController";
import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";

export class GameEventController extends BaseController implements EventControllerInterface {


    public update(delta_seconds: number): ControllerRouteResponse {
        this.models.game.update(delta_seconds);
        return null;
    }

    public key_pressed(event: KeyboardEvent): ControllerRouteResponse {
        const number = event.key.charCodeAt(0) - 49;
        if (number >= 0 && number <= 9) {
            return this.controllers.game_controller.player_guess(number);
        }
        return null;
    }
}