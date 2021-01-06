import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { ModelCollection } from "./ModelCollection";

export enum Comparison {
    IS_BIGGER,
    IS_SMALLER,
    IS_EQUAL,
}
export class GameModel extends Model<ModelCollection> {
    public hidden_number: number = 0;
    public tries: number = 0;

    public update(delta_seconds: number) {
    }

    /**
     * @param guess 
     *  The players guess
     * @return number
     *  (hidden === guess) => IS_EQUAL
     *  (hidden > guess) => IS_BIGGER
     *  (hidden < guess) => IS_SMALLER
     */
    public compare_with(guess: number): Comparison {
        if (this.hidden_number === guess) return Comparison.IS_EQUAL;
        if (this.hidden_number < guess) return Comparison.IS_SMALLER;
        return Comparison.IS_BIGGER;
    }

    /**
     * starts a new round
     */
    public next_round() {
        this.tries = 0;
        this.hidden_number = Math.trunc(Math.random() * 10);
    }
}