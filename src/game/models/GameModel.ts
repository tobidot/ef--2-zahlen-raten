import { Model } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Model";
import { ModelCollection } from "./ModelCollection";

export class GameModel extends Model<ModelCollection> {
    public update(delta_seconds: number) {
    }
}