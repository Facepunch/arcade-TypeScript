declare module GameAPI.BudgetBoy {
    export class Image {

        /**
         * Vector containing the combined width and height.
         */
        size: GameAPI.Vector2i;

        /**
         * Horizontal resolution in pixels.
         */
        width: number;

        /**
         * Vertical resolution in pixels.
         */
        height: number;

        /**
         * Product of the width and height.
         */
        area: number;
    }
    export class Animation extends GameAPI.BudgetBoy.Image {

        /**
         * Constructs an animation from a list of frame images.
         */
        constructor(...frames: GameAPI.BudgetBoy.Image[]);

        /**
         * A value interpolated between 0 for the start of the animation and 1 for the end.
         */
        progress: number;

        /**
         * Total number of frames.
         */
        numFrames: number;

        /**
         * Total duration of the animation in seconds.
         */
        period: number;

        /**
         * If true, the animation will restart from the beginning automatically when it ends.
         */
        isLooping: boolean;

        /**
         * Returns true if the animation is non-looping and has ended.
         */
        isComplete: boolean;

        /**
         * Gets or sets the current animation frame.
         */
        frame: number;

        /**
         * Resets the animation back to the first frame.
         */
        reset() : void;

        /**
         * Moves the animation forward by the specified amount of time in seconds.
         */
        advance(dt: number) : void;
    }
    export class Audio extends GameAPI.AudioBase {

        /**
         * Gets a sound resource from the specified location.
         */
        getSound(...location: String[]) : GameAPI.BudgetBoy.Sound;

        /**
         * Plays the given sound with the specified stereo bias, volume and pitch scale.
         */
        play(sound: GameAPI.BudgetBoy.Sound, pan: number, volume: number, pitch: number) : void;
    }
    export class Controls extends GameAPI.ControlsBase {

        /**
         * Primary button.
         */
        a: GameAPI.Button;

        /**
         * Secondary button.
         */
        b: GameAPI.Button;

        /**
         * Start button.
         */
        start: GameAPI.Button;

        /**
         * Select button.
         */
        select: GameAPI.Button;

        /**
         * Combined analog stick axes.
         */
        analog: GameAPI.Axis2;

        /**
         * Left analog stick axes.
         */
        leftAnalog: GameAPI.Axis2;

        /**
         * Right analog stick axes.
         */
        rightAnalog: GameAPI.Axis2;

        /**
         * Mouse cursor axes with each component in the range [-1, 1].
         */
        cursor: GameAPI.Axis2;

        /**
         * Mouse cursor axes with each component in the range [0, 1].
         */
        cursorRelative: GameAPI.Axis2;

        /**
         * Mouse cursor screen position.
         */
        cursorPosition: GameAPI.Vector2f;
    }
    export class Entity {

        /**
         * Constructs a new entity.
         */
        constructor();

        /**
         * The stage this entity is currently on.
         */
        stage: GameAPI.BudgetBoy.Stage;

        /**
         * Has the graphics for this entity loaded yet?
         */
        hasLoadedGraphics: boolean;

        /**
         * Has the audio for this entity loaded yet?
         */
        hasLoadedAudio: boolean;

        /**
         * Local position.
         */
        position: GameAPI.Vector2f;

        /**
         * Local position along the X axis.
         */
        x: number;

        /**
         * Local position along the Y axis.
         */
        y: number;

        /**
         * Pan value that can be used to set the panning for audio sources emitted from this entity.
         */
        panValue: number;

        /**
         * Does this entity get rendered.
         */
        isVisible: boolean;

        /**
         * Does this entity get updated.
         */
        isActive: boolean;

        /**
         * Does this entity auto calculate its bounds from those of attached sprites.
         */
        autoCalculateBounds: boolean;

        /**
         * Local rectangle bounds, setting this will disable auto bounds calculation.
         */
        localBounds: GameAPI.RectF;

        /**
         * Local rectangle bounds.
         */
        bounds: GameAPI.RectF;

        /**
         * Adds a sprite to this entity.
         */
        add(sprite: GameAPI.BudgetBoy.Sprite) : GameAPI.BudgetBoy.Sprite;

        /**
         * Adds a sprite to this entity at the given offset.
         */
        add(sprite: GameAPI.BudgetBoy.Sprite, offset: GameAPI.Vector2i) : GameAPI.BudgetBoy.Sprite;

        /**
         * Adds a sprite to this entity at the given offset and render layer.
         */
        add(sprite: GameAPI.BudgetBoy.Sprite, offset: GameAPI.Vector2i, layer: number) : GameAPI.BudgetBoy.Sprite;

        /**
         * Removes the given sprite if it exists.
         */
        remove(sprite: GameAPI.BudgetBoy.Sprite) : void;

        /**
         * Sets the sprite rendering layer on this entity.
         */
        setSpriteLayer(sprite: GameAPI.BudgetBoy.Sprite, layer: number) : void;

        /**
         * Gets the rendering layer of the given sprite.
         */
        getSpriteLayer(sprite: GameAPI.BudgetBoy.Sprite) : number;

        /**
         * Sets the offset of the given sprite.
         */
        setSpriteOffset(sprite: GameAPI.BudgetBoy.Sprite, offset: GameAPI.Vector2i) : void;

        /**
         * Gets the offset of the given sprite.
         */
        getSpriteOffset(sprite: GameAPI.BudgetBoy.Sprite) : GameAPI.Vector2i;

        /**
         * Calculates the smallest bounds that contains every sprite on this entity.
         */
        calculateBounds() : void;

        /**
         * Updates this entity, this already gets called every tick but it can be called again if needed.
         */
        update(dt: number) : void;

        /**
         * Renders this entity, this already gets called every tick but it can be called again if needed.
         */
        render(graphics: GameAPI.BudgetBoy.Graphics) : void;

        /**
         * Called when the stage this entity is on is now the current stage.
         */
        onEnterStage(stage: GameAPI.BudgetBoy.Stage) : void;

        /**
         * Called when the stage this entity is on is no longer the current stage.
         */
        onLeaveStage(stage: GameAPI.BudgetBoy.Stage) : void;

        /**
         * Called when the graphics wants to load any graphics for this entity.
         */
        onLoadGraphics() : void;

        /**
         * Called when the audio wants to load any audio for this entity.
         */
        onLoadAudio() : void;

        /**
         * Called when graphics and audio have finished loading.
         */
        onReady() : void;

        /**
         * Called every tick to update this entity.
         */
        onUpdate(dt: number) : void;

        /**
         * Called every tick to draw a frame of this entity.
         */
        onRender() : void;
    }
    export class Game extends GameAPI.GameBase {

        /**
         * Gets the stage currently in use.
         */
        currentStage: GameAPI.BudgetBoy.Stage;

        /**
         * Access the controls.
         */
        controls: GameAPI.BudgetBoy.Controls;

        /**
         * Access the graphics.
         */
        graphics: GameAPI.BudgetBoy.Graphics;

        /**
         * Access the audio.
         */
        audio: GameAPI.BudgetBoy.Audio;

        /**
         * Changes the current stage.
         */
        setStage(obj: any) : void;
    }
    export class Graphics extends GameAPI.GraphicsBase {

        /**
         * A palette of color swatches used when drawing elements.
         */
        palette: GameAPI.BudgetBoy.Palette;

        /**
         * Center of the display in pixels, can be used to pan.
         */
        center: GameAPI.Vector2i;

        /**
         * Current bounding rectangle in pixels.
         */
        bounds: GameAPI.RectI;

        /**
         * Current clipping rectangle.
         */
        scissor: GameAPI.RectI;

        /**
         * Transforms a world position to a position on screen.
         */
        worldToScreen(pos: GameAPI.Vector2f) : GameAPI.Vector2i;

        /**
         * Transforms a position on screen to a world position.
         */
        screenToWorld(pos: GameAPI.Vector2i) : GameAPI.Vector2f;

        /**
         * Sets the color the screen will be cleared to using the specified palette index.
         */
        setClearColor(index: GameAPI.BudgetBoy.SwatchIndex) : void;

        /**
         * Finds an image at the specified location.
         */
        getImage(...location: String[]) : GameAPI.BudgetBoy.Image;

        /**
         * Draws a single point at the specified position with size and color.
         */
        drawPoint(swatchIndex: GameAPI.BudgetBoy.SwatchIndex, size: number, point: GameAPI.Vector2i) : void;

        /**
         * Draws multiple points at the specified positions with size and color.
         */
        drawPoints(swatchIndex: GameAPI.BudgetBoy.SwatchIndex, size: number, ...points: GameAPI.Vector2i[]) : void;

        /**
         * Draws a single line at the specified start and end position with thickness and color.
         */
        drawLine(swatchIndex: GameAPI.BudgetBoy.SwatchIndex, thickness: number, start: GameAPI.Vector2i, end: GameAPI.Vector2i) : void;

        /**
         * Draws multiple lines at the specified start and end positions with thickness and color.
         */
        drawLines(swatchIndex: GameAPI.BudgetBoy.SwatchIndex, thickness: number, ...points: GameAPI.Vector2i[]) : void;

        /**
         * Draws a line rectangle at the specified position with size, line thickness and color.
         */
        drawRect(swatchIndex: GameAPI.BudgetBoy.SwatchIndex, thickness: number, origin: GameAPI.Vector2i, size: GameAPI.Vector2i) : void;

        /**
         * Draws a line rectangle at the specified rect with line thickness and color.
         */
        drawRect(swatchIndex: GameAPI.BudgetBoy.SwatchIndex, thickness: number, rect: GameAPI.RectI) : void;

        /**
         * Draws a filled rectangle at the specified position with size and color.
         */
        fillRect(swatchIndex: GameAPI.BudgetBoy.SwatchIndex, origin: GameAPI.Vector2i, size: GameAPI.Vector2i) : void;

        /**
         * Draws a filled rectangle at the specified rect with color.
         */
        fillRect(swatchIndex: GameAPI.BudgetBoy.SwatchIndex, rect: GameAPI.RectI) : void;

        /**
         * Sets the bounds used to perform scissor tests.
         */
        setScissor(bounds: GameAPI.RectI) : void;

        /**
         * Sets the scissor bounds to match the screen, effectively disabling scissor tests.
         */
        clearScissor() : void;
    }
    export class PaletteBuilder {
        addNesPalette() : GameAPI.BudgetBoy.SwatchIndex;
        set(index: GameAPI.BudgetBoy.SwatchIndex, value: GameAPI.BudgetBoy.Swatch) : GameAPI.BudgetBoy.SwatchIndex;
        add(swatch: GameAPI.BudgetBoy.Swatch) : GameAPI.BudgetBoy.SwatchIndex;
        add(a: number, b: number, c: number) : GameAPI.BudgetBoy.SwatchIndex;
        add(a: number, b: number, c: number, d: number) : GameAPI.BudgetBoy.SwatchIndex;
    }
    export class Palette {

        /**
         * Gets the swatch at the specified index.
         */
        get(index: GameAPI.BudgetBoy.SwatchIndex) : GameAPI.BudgetBoy.Swatch;

        /**
         * Finds the index of a swatch closest to the specified colours,with transparency for the fourth color.
         */
        findSwatch(a: number, b: number, c: number) : GameAPI.BudgetBoy.SwatchIndex;

        /**
         * Finds the index of a swatch closest to the specified colours.
         */
        findSwatch(a: number, b: number, c: number, d: number) : GameAPI.BudgetBoy.SwatchIndex;

        /**
         * Finds the index of a swatch closest to the colors within the given swatch.
         */
        findSwatch(swatch: GameAPI.BudgetBoy.Swatch) : GameAPI.BudgetBoy.SwatchIndex;
    }
    export class RawImage extends GameAPI.BudgetBoy.Image {
    }
    export class Sound {
    }
    export class Sprite {

        /**
         * Constructs a new sprite using the specified image and swatch index.
         */
        constructor(image: GameAPI.BudgetBoy.Image, swatchIndex: GameAPI.BudgetBoy.SwatchIndex);

        /**
         * The image used for this sprite.
         */
        image: GameAPI.BudgetBoy.Image;

        /**
         * Local integer position.
         */
        position: GameAPI.Vector2i;

        /**
         * Position along the X axis.
         */
        x: number;

        /**
         * Position along the Y axis.
         */
        y: number;

        /**
         * Width and Height.
         */
        size: GameAPI.Vector2i;

        /**
         * Width of the Size.
         */
        width: number;

        /**
         * Height of the Size.
         */
        height: number;

        /**
         * Flip horizontally across the X axis.
         */
        flipX: boolean;

        /**
         * Flip vertically across the Y axis.
         */
        flipY: boolean;

        /**
         * Local integer rotation.
         */
        rotation: number;

        /**
         * Visibility.
         */
        isVisible: boolean;

        /**
         * Swatch index from the palette to render with.
         */
        swatchIndex: GameAPI.BudgetBoy.SwatchIndex;

        /**
         * Render to screen.
         */
        render(graphics: GameAPI.BudgetBoy.Graphics) : void;
    }
    export class Stage {

        /**
         * Constructs a new stage.
         */
        constructor();

        /**
         * Gets the games current time step.
         */
        timestep: number;

        /**
         * Adds a renderable object to the specified layer.
         */
        add(renderable: any, layer: number) : any;

        /**
         * Updates this stage, this already gets called every tick but it can be called again if needed.
         */
        update() : void;

        /**
         * Renders this stage, this already gets called every tick but it can be called again if needed.
         */
        render(graphics: GameAPI.BudgetBoy.Graphics) : void;

        /**
         * Called when this becomes the current stage.
         */
        onEnter() : void;

        /**
         * Called when another stage replaces this one as the current stage.
         */
        onLeave() : void;

        /**
         * Called every tick to update the stage.
         */
        onUpdate() : void;

        /**
         * Called every tick to render the stage.
         */
        onRender() : void;
    }
    export class Text extends GameAPI.BudgetBoy.Sprite {

        /**
         * Constructs a renderable text display using an image of 256 characters arranged in a 16x16 grid.
         */
        constructor(charMap: GameAPI.BudgetBoy.Image, swatchIndex: GameAPI.BudgetBoy.SwatchIndex);

        /**
         * Maximum number of characters in a line before it wraps.
         */
        wrapWidth: number;

        /**
         * Number of characters between each tab level.
         */
        tabAlignment: number;

        /**
         * Size of each monospaced character.
         */
        charSize: GameAPI.Vector2i;

        /**
         * Text to display, may be null to display nothing.
         */
        value: String;
    }
    export class Tilemap {

        /**
         * Construct a tilemap with the specified tile size and dimensions.
         */
        constructor(tileSize: GameAPI.Vector2i, dimensions: GameAPI.Vector2i);

        /**
         * Width and Height of tiles.
         */
        tileSize: GameAPI.Vector2i;

        /**
         * Width of tiles.
         */
        tileWidth: number;

        /**
         * Height of tiles.
         */
        tileHeight: number;

        /**
         * Column and row count.
         */
        dimensions: GameAPI.Vector2i;

        /**
         * Column count.
         */
        columns: number;

        /**
         * Row count.
         */
        rows: number;

        /**
         * Width and Height.
         */
        size: GameAPI.Vector2i;

        /**
         * Width of the size.
         */
        width: number;

        /**
         * Height of the size.
         */
        height: number;

        /**
         * Local integer position.
         */
        position: GameAPI.Vector2i;

        /**
         * X axis position.
         */
        x: number;

        /**
         * Y axis position.
         */
        y: number;

        /**
         * Local rect bounds.
         */
        bounds: GameAPI.RectF;

        /**
         * Clear the image at the specified column and row.
         */
        clearTile(col: number, row: number) : void;

        /**
         * Set the image and swatch index at the specified column and row.
         */
        setTile(col: number, row: number, image: GameAPI.BudgetBoy.Image, swatchIndex: GameAPI.BudgetBoy.SwatchIndex) : void;

        /**
         * Set the image and swatch index at the specified column and row with flipping options.
         */
        setTile(col: number, row: number, image: GameAPI.BudgetBoy.Image, swatchIndex: GameAPI.BudgetBoy.SwatchIndex, flipX: boolean, flipY: boolean) : void;

        /**
         * Render to screen.
         */
        render(graphics: GameAPI.BudgetBoy.Graphics) : void;
    }
    export class Swatch {
        constructor(a: GameAPI.Color24, b: GameAPI.Color24, c: GameAPI.Color24);
        constructor(a: GameAPI.Color24, b: GameAPI.Color24, c: GameAPI.Color24, d: GameAPI.Color24);
        static FULLY_TRANSPARENT: GameAPI.BudgetBoy.Swatch;
        a: GameAPI.Color24;
        b: GameAPI.Color24;
        c: GameAPI.Color24;
        d: GameAPI.Color24;
        transparencyA: boolean;
        transparencyB: boolean;
        transparencyC: boolean;
        transparencyD: boolean;
        isFullyTransparent: boolean;

        /**
         * Find the square of the euclidean difference between this swatch and another.
         */
        difference(other: GameAPI.BudgetBoy.Swatch) : number;
        equals(swatch: GameAPI.BudgetBoy.Swatch) : boolean;
    }
    export class SwatchIndex {
        constructor(index: number);
        static BLACK: GameAPI.BudgetBoy.SwatchIndex;
        static WHITE: GameAPI.BudgetBoy.SwatchIndex;
        static TRANSPARENT: GameAPI.BudgetBoy.SwatchIndex;
        value: number;
        isReserved: boolean;
    }
}
declare var audio: GameAPI.BudgetBoy.Audio;
declare var controls: GameAPI.BudgetBoy.Controls;
declare var graphics: GameAPI.BudgetBoy.Graphics;
