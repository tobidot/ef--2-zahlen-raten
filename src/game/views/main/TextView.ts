import { tools } from "@game.object/ts-game-toolbox";
import { CanvasView } from "@game.object/ts-game-toolbox/dist/src/abstract/mvc/CanvasView";
import { RgbColor } from "@game.object/ts-game-toolbox/dist/src/data/RgbColor";
import { ChainProperty } from "@game.object/ts-game-toolbox/dist/src/signals/ChainProperty";
import { ViewCollection } from "../ViewCollection";
import { Vector2, Vector2I } from "@game.object/ts-game-toolbox/dist/src/geometries/Vector2";

/**
 * Display some simple text
 */
export class TextView extends CanvasView<ViewCollection> {
    public bg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.BLACK);
    public fg_color = new ChainProperty<this, RgbColor>(this, tools.commons.Colors.WHITE);
    /// The Text on the screen
    public text = new ChainProperty<this, Array<string> | string>(this, "");

    public draw(): void {
        this.reset_canvas_state();
        const text = this.text.get();
        if (text instanceof Array) {
            this.context.textAlign = "left";
            const lines = text.length;
            text.forEach((line, index) => {
                this.context.fillText(line, 50, 300 - lines * 10 + index * 20);
            });
        } else {
            this.context.textAlign = "center";
            this.context.fillText(text, 400, 300);
        }
    }

    /**
     * Reset default canvas state and paint the background
     */
    protected reset_canvas_state() {
        super.reset_canvas_state();
        this.context.fillStyle = this.bg_color.get().to_hex();
        this.context.fillRect(0, 0, 800, 600);
        this.context.imageSmoothingEnabled = false;
        this.context.fillStyle = this.fg_color.get().to_hex();
        this.context.strokeStyle = this.fg_color.get().to_hex();
        this.context.font = "16px monospace";
    }
}