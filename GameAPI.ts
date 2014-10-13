/// <reference path="GameAPI.d.ts"/>

function defaultEqualityTest(a: any, b: any): boolean {
    return a.equals(b);
}

function arrayContains<T>(arr: Array<T>, value: T, test?: (a: T, b: T) => boolean): boolean {
    test = test || defaultEqualityTest;

    for (var i = 0; i < arr.length; ++i) {
        if (test(arr[i], value)) return true;
    }

    return false;
}
