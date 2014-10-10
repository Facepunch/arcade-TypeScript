declare module GameAPI {
    export class AudioBase {
    }
    export class Control {
    }
    export class Button extends GameAPI.Control {

        /**
         * True if this button is currently pressed, otherwise false.
         */
        isDown: boolean;

        /**
         * True if this was pressed since the previous update.
         */
        justPressed: boolean;

        /**
         * True if this was released since the previous update.
         */
        justReleased: boolean;
    }
    export class Axis extends GameAPI.Control {

        /**
         * A value in the range [-1, 1] representing the current state of this axis.
         */
        value: number;

        /**
         * A value in the range [0, 1] found by clamping this axis's value.
         */
        positive: number;

        /**
         * A value in the range [0, 1] found by clamping this axis's negated value.
         */
        negative: number;

        /**
         * True if the axis has a positive value excluding zero, otherwise false.
         */
        isPositive: boolean;

        /**
         * True if the axis has a negative value excluding zero, otherwise false.
         */
        isNegative: boolean;

        /**
         * True if the axis is in the default position.
         */
        isZero: boolean;

        /**
         * True if the axis became positive since the previous update.
         */
        justBecamePositive: boolean;

        /**
         * True if the axis became negative since the previous update.
         */
        justBecameNegative: boolean;

        /**
         * True if the axis moved to the default position since the previous update.
         */
        justBecameZero: boolean;
    }
    export class Axis2 extends GameAPI.Control {

        /**
         * Retrieves the horizontal component Axis.
         */
        x: GameAPI.Axis;

        /**
         * Retrieves the vertical component Axis.
         */
        y: GameAPI.Axis;

        /**
         * Gets a Vector2f containing the combined values of both component axes.
         */
        value: GameAPI.Vector2f;

        /**
         * True if both component axes are in the default position.
         */
        isZero: boolean;

        /**
         * True if both component axes are now in the default position when at least one was not in the previous update.
         */
        justBecameZero: boolean;
    }
    export class ControlsBase {
    }
    export class Demo {

        /**
         * If true, frame indices beyond the end of this demo will wrap back from the beginning.
         */
        isLooping: boolean;

        /**
         * Total number of frames recorded in this demo.
         */
        length: number;

        /**
         * Draws the specified frame from this demo with no audio.
         */
        render(graphics: GameAPI.GraphicsBase, frameIndex: number) : void;

        /**
         * Draws the specified frame from this demo.
         */
        render(graphics: GameAPI.GraphicsBase, audio: GameAPI.AudioBase, frameIndex: number) : void;

        /**
         * Draws the specified frame from this demo with audio scaled by the given volume.
         */
        render(graphics: GameAPI.GraphicsBase, audio: GameAPI.AudioBase, frameIndex: number, volume: number) : void;
    }
    export class GameBase {

        /**
         * Gets a structure containing general information about the game.
         */
        gameInfo: GameAPI.GameInfo;

        /**
         * Gets a structure containing information about the graphical specifications of the game.
         */
        graphicsInfo: GameAPI.GraphicsInfo;

        /**
         * Gets the number of times this game updates per second.
         */
        updateRate: number;

        /**
         * Gets the period between game updates in seconds.
         */
        timestep: number;

        /**
         * If true, the game is in a paused state and is not updating.
         */
        isPaused: boolean;

        /**
         * Gets the number of updates since the game first began.
         */
        tick: number;

        /**
         * Gets the estimated number of seconds since the game first began.
         */
        time: number;

        /**
         * If true, this game has implemented game state transmission between clients.
         */
        canTransferState: boolean;

        /**
         * If true, this game hasn't implemented game state transmission and so must reset when changing player.
         */
        resetWhenChangePlayer: boolean;

        /**
         * Gets the current number of stored highscores.
         */
        highscoreCount: number;

        /**
         * Adds a placeholder highscore. To only be used within onSetupInitialScores().
         */
        addInitialScore(score: GameAPI.Highscore) : void;

        /**
         * Manually unpauses and resets the game.
         */
        reset() : void;

        /**
         * Returns true if the given score qualifies as a highscore.
         */
        isScoreHighscore(score: number) : boolean;

        /**
         * Submits the given highscore to be stored.
         */
        submitHighscore(highscore: GameAPI.Highscore) : void;

        /**
         * Gets the highscore at the specified index.
         */
        getHighscore(index: number) : GameAPI.Highscore;

        /**
         * Override to add a set of placeholder highscores using addInitialScore() calls.
         */
        onSetupInitialScores() : void;

        /**
         * Called when the game is about to start.
         */
        onInitialize() : void;

        /**
         * Called when game resources are available to be loaded.
         */
        onLoadResources(resources: GameAPI.ResourceCollection) : void;

        /**
         * Called when the game is paused.
         */
        onPause() : void;

        /**
         * Called when the game resets and first begins.
         */
        onReset() : void;

        /**
         * Called when the game is resumed from a paused state.
         */
        onResume() : void;

        /**
         * Called at regular intervals, specified by updateRate, just before a frame is drawn.
         */
        onUpdate() : void;

        /**
         * Called at regular intervals, specified by updateRate, when a frame is being drawn.
         */
        onRender() : void;

        /**
         * Called in the place of onRender() when the game is paused, with timeUntilReset in seconds.
         */
        onRenderPauseScreen(timeUntilReset: number) : void;
    }
    export class GraphicsBase {

        /**
         * Horizontal resolution of the screen in pixels.
         */
        width: number;

        /**
         * Vertical resolution of the screen in pixels.
         */
        height: number;

        /**
         * Number of bytes of graphical data drawn last frame.
         */
        lastFrameSize: number;

        /**
         * Resolution of the screen in pixels.
         */
        size: GameAPI.Vector2i;

        /**
         * Aspect ratio of the screen.
         */
        aspect: number;
    }
    export class Highscore {

        /**
         * Constructs a new highscore using the specified 3 character initials and score.
         */
        constructor(initials: String, score: number);

        /**
         * Three characters entered by the player to identify themselves.
         */
        initials: String;

        /**
         * Number of points recorded in this highscore.
         */
        score: number;

        /**
         * Compares this highscore to another. Returns 1 if the other score is larger, 0 if they are equal, and -1 otherwise.
         */
        compareTo(other: GameAPI.Highscore) : number;

        /**
         * Returns true if the given highscore has the same submission date, initials and score.
         */
        equals(other: GameAPI.Highscore) : boolean;
    }
    export class ResourceCollection {

        /**
         * Retrieves and loads a resource of the specified type from the given location.
         */
        get(type: String, ...location: String[]) : any;
    }
    export class Color24 {

        /**
         * Constructs a color from a 24 bit integer representation.
         */
        constructor(rgb: number);

        /**
         * Constructs a color from individual 8 bit RGB components.
         */
        constructor(r: number, g: number, b: number);

        /**
         * #000000
         */
        static BLACK: GameAPI.Color24;

        /**
         * #ffffff
         */
        static WHITE: GameAPI.Color24;

        /**
         * Red component of the color.
         */
        r: number;

        /**
         * Green component of the color.
         */
        g: number;

        /**
         * Blue component of the color.
         */
        b: number;

        /**
         * Gets the square of the euclidean distance between this color and another.
         */
        difference(other: GameAPI.Color24) : number;

        /**
         * Gets a string representing this color in #rrggbb format.
         */
        toString() : String;
    }
    export class RectF {

        /**
         * Constructs a rectangle with the given lower-left corner and size.
         */
        constructor(origin: GameAPI.Vector2f, size: GameAPI.Vector2f);

        /**
         * Constructs a rectangle with the given left, bottom, right and top positions along their corresponding axes.
         */
        constructor(left: number, bottom: number, right: number, top: number);

        /**
         * A rectangle with zero width and height positioned at the origin.
         */
        static ZERO: GameAPI.RectF;

        /**
         * A rectangle with unit width and height centered at (0.5, 0.5).
         */
        static UNIT_SQUARE: GameAPI.RectF;

        /**
         * A rectangle with unit width and height centered at the origin.
         */
        static UNIT_SQUARE_CENTERED: GameAPI.RectF;

        /**
         * Horizontal position of the left-most edge.
         */
        left: number;

        /**
         * Vertical position of the lower-most edge.
         */
        bottom: number;

        /**
         * Horizontal position of the right-most edge.
         */
        right: number;

        /**
         * Vertical position of the upper-most edge.
         */
        top: number;

        /**
         * Difference between the right and left edges.
         */
        width: number;

        /**
         * Difference between the top and bottom edges.
         */
        height: number;

        /**
         * Vector representing the top left corner.
         */
        topLeft: GameAPI.Vector2f;

        /**
         * Vector representing the top right corner.
         */
        topRight: GameAPI.Vector2f;

        /**
         * Vector representing the lower left corner.
         */
        bottomLeft: GameAPI.Vector2f;

        /**
         * Vector representing the lower right corner.
         */
        bottomRight: GameAPI.Vector2f;

        /**
         * Vector representing the combined width and height.
         */
        size: GameAPI.Vector2f;

        /**
         * Vector representing the exact center of the rectangle.
         */
        center: GameAPI.Vector2f;

        /**
         * Product of the width and height.
         */
        area: number;

        /**
         * Offsets the rectangle by the given amount.
         */
        add(offset: GameAPI.Vector2f) : GameAPI.RectF;

        /**
         * Offsets the rectangle by the negation of the given amount.
         */
        sub(offset: GameAPI.Vector2f) : GameAPI.RectF;

        /**
         * Scales the rectangle by the given scalar.
         */
        mul(scale: number) : GameAPI.RectF;

        /**
         * Scales the rectangle by the given vector.
         */
        mulVec(scale: GameAPI.Vector2f) : GameAPI.RectF;

        /**
         * Scales the rectangle by the inverse of the given scalar.
         */
        div(scale: number) : GameAPI.RectF;

        /**
         * Scales the rectangle by the inverse of the given vector.
         */
        divVec(scale: GameAPI.Vector2f) : GameAPI.RectF;

        /**
         * Creates an integer rectangle by truncating each component of this one.
         */
        toRectI() : GameAPI.RectI;

        /**
         * Returns true if this rectangle shares a non-zero intersection area with the given rectangle.
         */
        intersects(other: GameAPI.RectF) : boolean;

        /**
         * Returns true if the given vector lies within the bounds of this rectangle, excluding the edges.
         */
        intersectsVec(vec: GameAPI.Vector2f) : boolean;

        /**
         * Returns true if either the given rectangle shares an edge with this one, or if they intersect.
         */
        touches(other: GameAPI.RectF) : boolean;

        /**
         * Returns true if the given vector lies within the bounds of this rectangle, including the edges.
         */
        touchesVec(vec: GameAPI.Vector2f) : boolean;

        /**
         * Finds a rectangle representing the overlap between this and the given rectangle.
         */
        intersection(other: GameAPI.RectF) : GameAPI.RectF;

        /**
         * Finds the smallest rectangle that surrounds both this and the given rectangle.
         */
        union(other: GameAPI.RectF) : GameAPI.RectF;

        /**
         * Maps a vector with each component in the range [0, 1] to a corresponding position within this rectangle.
         */
        map(vec: GameAPI.Vector2f) : GameAPI.Vector2f;

        /**
         * Tests for equality with another rectangle.
         */
        equals(obj: GameAPI.RectF) : boolean;

        /**
         * Gets a string representing this rect in (Center, Size) format.
         */
        toString() : String;
    }
    export class RectI {

        /**
         * Constructs a rectangle with the given lower-left corner and size.
         */
        constructor(origin: GameAPI.Vector2i, size: GameAPI.Vector2i);

        /**
         * Constructs a rectangle with the given left, bottom, right and top positions along their corresponding axes.
         */
        constructor(left: number, bottom: number, right: number, top: number);

        /**
         * A rectangle with zero width and height positioned at the origin.
         */
        static ZERO: GameAPI.RectI;

        /**
         * A rectangle with unit width and height centered at (0.5, 0.5).
         */
        static UNIT_SQUARE: GameAPI.RectI;

        /**
         * Horizontal position of the left-most edge.
         */
        left: number;

        /**
         * Vertical position of the lower-most edge.
         */
        bottom: number;

        /**
         * Horizontal position of the right-most edge.
         */
        right: number;

        /**
         * Vertical position of the upper-most edge.
         */
        top: number;

        /**
         * Difference between the right and left edges.
         */
        width: number;

        /**
         * Difference between the top and bottom edges.
         */
        height: number;

        /**
         * Vector representing the top left corner.
         */
        topLeft: GameAPI.Vector2i;

        /**
         * Vector representing the top right corner.
         */
        topRight: GameAPI.Vector2i;

        /**
         * Vector representing the lower left corner.
         */
        bottomLeft: GameAPI.Vector2i;

        /**
         * Vector representing the lower right corner.
         */
        bottomRight: GameAPI.Vector2i;

        /**
         * Vector representing the combined width and height.
         */
        size: GameAPI.Vector2i;

        /**
         * Vector representing the approximate center of the rectangle.
         */
        center: GameAPI.Vector2i;

        /**
         * Product of the width and height.
         */
        area: number;

        /**
         * Offsets the rectangle by the given amount.
         */
        add(offset: GameAPI.Vector2i) : GameAPI.RectI;

        /**
         * Offsets the rectangle by the negation of the given amount.
         */
        sub(offset: GameAPI.Vector2i) : GameAPI.RectI;

        /**
         * Scales the rectangle by the given scalar.
         */
        mul(scale: number) : GameAPI.RectI;

        /**
         * Scales the rectangle by the given vector.
         */
        mulVec(scale: GameAPI.Vector2i) : GameAPI.RectI;

        /**
         * Scales the rectangle by the inverse of the given scalar.
         */
        div(scale: number) : GameAPI.RectI;

        /**
         * Scales the rectangle by the inverse of the given vector.
         */
        divVec(scale: GameAPI.Vector2i) : GameAPI.RectI;

        /**
         * Creates a floating-point rectangle with the same components as this one.
         */
        toRectF() : GameAPI.RectF;

        /**
         * Returns true if this rectangle shares a non-zero intersection area with the given rectangle.
         */
        intersects(other: GameAPI.RectI) : boolean;

        /**
         * Returns true if the given vector lies within the bounds of this rectangle, excluding the edges.
         */
        intersectsVec(vec: GameAPI.Vector2i) : boolean;

        /**
         * Returns true if either the given rectangle shares an edge with this one, or if they intersect.
         */
        touches(other: GameAPI.RectI) : boolean;

        /**
         * Returns true if the given vector lies within the bounds of this rectangle, including the edges.
         */
        touchesVec(vec: GameAPI.Vector2i) : boolean;

        /**
         * Finds a rectangle representing the overlap between this and the given rectangle.
         */
        intersection(other: GameAPI.RectI) : GameAPI.RectI;

        /**
         * Finds the smallest rectangle that surrounds both this and the given rectangle.
         */
        union(other: GameAPI.RectI) : GameAPI.RectI;

        /**
         * Maps a vector with each component in the range [0, 1] to a corresponding position within this rectangle.
         */
        map(vec: GameAPI.Vector2f) : GameAPI.Vector2f;

        /**
         * Tests for equality with another rectangle.
         */
        equals(obj: GameAPI.RectI) : boolean;

        /**
         * Gets a string representing this rect in (Center, Size) format.
         */
        toString() : String;
    }
    export class Vector2f {

        /**
         * Constructs a vector from the given X and Y components.
         */
        constructor(x: number, y: number);

        /**
         * A vector with zero for all components.
         */
        static ZERO: GameAPI.Vector2f;

        /**
         * A normalized vector along the positive X axis.
         */
        static UNIT_X: GameAPI.Vector2f;

        /**
         * A normalized vector along the positive Y axis.
         */
        static UNIT_Y: GameAPI.Vector2f;

        /**
         * Finds a normalized vector representation of the given angle in radians.
         */
        static fromAngle(radians: number) : GameAPI.Vector2f;

        /**
         * Horizontal component.
         */
        x: number;

        /**
         * Vertical component.
         */
        y: number;

        /**
         * Magnitude of the vector.
         */
        length: number;

        /**
         * Sum of each component squared.
         */
        lengthSquared: number;

        /**
         * Gets a normalized vector in the same direction as this one.
         */
        normalized: GameAPI.Vector2f;

        /**
         * Gets the angle of this vector from the positive X axis.
         */
        angle: number;

        /**
         * Component-wise addition of this vector and another.
         */
        add(b: GameAPI.Vector2f) : GameAPI.Vector2f;

        /**
         * Component-wise subtraction of another vector from this one.
         */
        sub(b: GameAPI.Vector2f) : GameAPI.Vector2f;

        /**
         * Component-wise multiplication of this vector and another.
         */
        mulVec(b: GameAPI.Vector2f) : GameAPI.Vector2f;

        /**
         * Multiplies this vector by a scalar.
         */
        mul(val: number) : GameAPI.Vector2f;

        /**
         * Component-wise division of this vector by another.
         */
        divVec(b: GameAPI.Vector2f) : GameAPI.Vector2f;

        /**
         * Division of this vector by a scalar.
         */
        div(val: number) : GameAPI.Vector2f;

        /**
         * Creates an integer vector by truncating each component of this one.
         */
        toVector2i() : GameAPI.Vector2i;

        /**
         * Finds the scalar product of this vector and another.
         */
        dot(vec: GameAPI.Vector2f) : number;

        /**
         * Tests for equality with another vector.
         */
        equals(vec: GameAPI.Vector2f) : boolean;

        /**
         * Gets a string representing this vector in (X, Y) format.
         */
        toString() : String;
    }
    export class Vector2i {

        /**
         * Constructs a vector from the given X and Y components.
         */
        constructor(x: number, y: number);

        /**
         * A vector with zero for all components.
         */
        static ZERO: GameAPI.Vector2i;

        /**
         * A normalized vector along the positive X axis.
         */
        static UNIT_X: GameAPI.Vector2i;

        /**
         * A normalized vector along the positive Y axis.
         */
        static UNIT_Y: GameAPI.Vector2i;

        /**
         * Horizontal component.
         */
        x: number;

        /**
         * Vertical component.
         */
        y: number;

        /**
         * Sum of each component squared.
         */
        lengthSquared: number;

        /**
         * Component-wise addition of this vector and another.
         */
        add(b: GameAPI.Vector2i) : GameAPI.Vector2i;

        /**
         * Component-wise subtraction of another vector from this one.
         */
        sub(b: GameAPI.Vector2i) : GameAPI.Vector2i;

        /**
         * Component-wise multiplication of this vector and another.
         */
        mulVec(b: GameAPI.Vector2i) : GameAPI.Vector2i;

        /**
         * Multiplies this vector by a scalar.
         */
        mul(val: number) : GameAPI.Vector2i;

        /**
         * Component-wise division of this vector by another.
         */
        divVec(b: GameAPI.Vector2i) : GameAPI.Vector2i;

        /**
         * Division of this vector by a scalar.
         */
        div(val: number) : GameAPI.Vector2i;

        /**
         * Creates a floating-point vector with the same components as this one.
         */
        toVector2f() : GameAPI.Vector2f;

        /**
         * Finds the scalar product of this vector and another.
         */
        dot(vec: GameAPI.Vector2i) : number;

        /**
         * Tests for equality with another vector.
         */
        equals(vec: GameAPI.Vector2i) : boolean;

        /**
         * Gets a string representing this vector in (X, Y) format.
         */
        toString() : String;
    }
    export var Debug: Debug_Static;
    export class Debug_Static {

        /**
         * Emits a debug message using the given .NET-style formatting string and arguments.
         */
        log(format: String, ...args: any[]) : void;

        /**
         * Only emits the specified formatted message if the given assertion is false.
         */
        assert(value: boolean, format: String, ...args: any[]) : void;
    }
    export class GameInfo {

        /**
         * Virtual platform API name to be used by this game.
         */
        api: String;

        /**
         * Full title of the game.
         */
        title: String;

        /**
         * Version number of this iteration of the game. Usually in major.minor[.build[.revision]] format.
         */
        version: String;

        /**
         * Real name or alias of the author of this game.
         */
        authorName: String;

        /**
         * Optional email address / twitter handle / Steam account link etc for contacting the author.
         */
        authorContact: String;

        /**
         * Optional brief description of the game.
         */
        description: String;

        /**
         * Desired number of game updates / screen redraws per second.
         */
        updateRate: number;
    }
    export class GraphicsInfo {

        /**
         * Desired horizontal resolution of the game in pixels.
         */
        width: number;

        /**
         * Desired vertical resolution of the game in pixels.
         */
        height: number;
    }
}
