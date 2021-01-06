import { BaseController } from "../BaseController";
import { EventControllerInterface } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Controller";
import { ControllerRouteResponse, ControllerRouteResponseType } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { PromisableController } from "../../tools/PromiseController";

export class TextPageEventController extends BaseController implements EventControllerInterface, PromisableController {
    public next: null | (() => ControllerRouteResponseType) = null;

    public update(delta_seconds: number): ControllerRouteResponse {
        this.models.game.update(delta_seconds);
        return null;
    }

    public key_pressed(event: KeyboardEvent): ControllerRouteResponse {
        if (event.key === "Enter" && this.next) return this.next();
        return null;
    }

}