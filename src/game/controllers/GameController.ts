import {
    ControllerRouteResponse,
    ControllerRouteResponseType
} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { BaseController } from "./BaseController";
import { RgbColor } from "@game.object/ts-game-toolbox/dist/src/data/RgbColor";
import { PromiseController } from "../tools/PromiseController";

export class GameController extends BaseController {

    /**
     * Start a new game
     */
    public new_game(): ControllerRouteResponse {
        return new PromiseController(() => {
            return {
                controller: this.controllers.for_event.text_page_controller,
                view: this.views.text.text.set("Press Enter to continue"),
            }
        }).then(() => {
            return {
                controller: this.controllers.for_event.text_page_controller,
                view: this.views.text.text.set("Text 2"),
            }
        }).then(() => {
            return {
                controller: this.controllers.for_event.text_page_controller,
                view: this.views.text.text.set("Text 2 Step 4"),
            }
        }).finaly(() => {
            return {

                controller: this.controllers.for_event.game_controller,
                view: this.views.main,
            }
        });
    }

}