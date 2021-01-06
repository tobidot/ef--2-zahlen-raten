import {
    ControllerRouteResponse,
    ControllerRouteResponseType
} from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/ControllerRouteResponse";
import { BaseController } from "./BaseController";
import { RgbColor } from "@game.object/ts-game-toolbox/dist/src/data/RgbColor";
import { PromiseController } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/controllers/PromiseController";
import { Comparison } from "../models/GameModel";

export class GameController extends BaseController {

    /**
     * Start a new game
     */
    public new_game(): PromiseController {
        return new PromiseController(() => {
            return {
                controller: this.controllers.for_event.text_page_controller,
                view: this.views.text.reset().text.set([
                    "In diesem Spiel musst du die Zahl,",
                    "die der Computer sich ausdenkt erraten.",
                    "Nach jedem Versuch gibt der Computer dir einen Tip,",
                    "mit dem du die Möglichkeiten eingrenzen kannst.",
                ]),
            }
        }).then(
            this.next_round()
        );
    }

    /**
     * Start a new round
     */
    public next_round(): PromiseController {
        return new PromiseController(() => {
            this.models.game.next_round();
            return {
                controller: this.controllers.for_event.text_page_controller,
                view: this.views.text.reset()
                    .text.set("Ich habe mir eine neue Zahl ausgedacht, legen wir los."),
            }
        }).finaly(() => {
            return {
                controller: this.controllers.for_event.game_controller,
                view: this.views.text.reset()
                    .text.set("Gib mir eine ziffer zwischen 0 und 9:")
                    .continue_hint.set("Tippe eine Ziffer =>"),
            }
        });
    }

    public player_won() {
        return new PromiseController(() => {
            return {
                controller: this.controllers.for_event.text_page_controller,
                view: this.views.text.reset().text.set("Du hast es erraten, gleich noch einmal."),
            }
        }).then(
            this.next_round()
        );
    }

    public player_guess(number: number): ControllerRouteResponse {
        switch (this.models.game.compare_with(number)) {
            case Comparison.IS_EQUAL:
                return this.player_won();
            case Comparison.IS_BIGGER:
                return this.views.text.text.set("My number is bigger");
            case Comparison.IS_SMALLER:
                return this.views.text.text.set("My number is smaller");
        }
    }

}