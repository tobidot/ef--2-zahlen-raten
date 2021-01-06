import { ViewCollectionBase } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/Collections";
import { MainView } from "./main/MainView";
import { TextView } from "./main/TextView";

export interface ViewCollection extends ViewCollectionBase {
    main: MainView,
    text: TextView,
    partials: {
    }
}

export function create_views(canvas: HTMLCanvasElement): ViewCollection {
    const collection: ViewCollection = {} as ViewCollection;
    const main = new MainView(canvas, collection);
    const text = new TextView(canvas, collection);
    return Object.assign(collection, {
        main,
        text,
        partials: {
        }
    });
}