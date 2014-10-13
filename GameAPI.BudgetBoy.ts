/// <reference path="GameAPI.BudgetBoy.d.ts"/>

interface State extends Function { }

function wait(delay: number, after: State): State {
    var initTime = game.time;

    var wait: (self: BaseStage) => State = (self) => {
        if ((game.time - initTime) >= delay) return after;
        return wait;
    };

    return wait;
}

function waitForInput(after: (input: GameAPI.Control) => State): State {
    var inner: (self: BaseStage) => State = (self) => {
        if (controls.a.justPressed) return after(controls.a);
        if (controls.b.justPressed) return after(controls.b);
        if (controls.start.justPressed) return after(controls.start);
        if (controls.select.justPressed) return after(controls.select);
        if (!controls.analog.isZero) return after(controls.analog);

        return inner;
    };

    return inner;
}

class CoroutineCollection {
    private _coroutines: State[];

    constructor() {
        this._coroutines = [];
    }

    start(initialState: State) {
        this._coroutines.push(initialState);
    }

    update(owner: any) {
        for (var i = this._coroutines.length - 1; i >= 0; --i) {
            if (!(this._coroutines[i] = this._coroutines[i].call(owner))) {
                this._coroutines.splice(i, 1);
            }
        }
    }
}

class CustomStage extends GameAPI.BudgetBoy.Stage
{
    private _coroutines: CoroutineCollection;

    constructor() {
        super();

        this._coroutines = new CoroutineCollection();
    }

    startCoroutine(coroutine: State) {
        this._coroutines.start(coroutine);
    }

    onUpdate() {
        this._coroutines.update(this);
    }
}
