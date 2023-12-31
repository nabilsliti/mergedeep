import { mergedeep } from './mergedeep';

describe('mergedeep function', () => {
    it('should merge recursively two objects', () => {
        const fn1 = jest.fn();
        const fn2 = jest.fn();
        const fn3 = jest.fn();
        const fn4 = jest.fn();
        const objOne = {
            prop: 'prop1',
            arr: [ 'val1', 'val2', 'val3' ],
            objA: {
                arr: [
                    {
                        item: 'item_1',
                        value: 'value_1',
                    },
                    {
                        item: 'item_2',
                        value: 'value_2',
                    },
                    {
                        item: 'item_3',
                        value: 'value_3',
                    },
                ],
            },
            objB: {
                itemOne: {
                    names: [
                        'name_1',
                        'name_2',
                        'name_3',
                    ],
                    items: [
                        {
                            item: 'item_1',
                            value: 'value_1',
                        },
                        {
                            item: 'item_2',
                            value: 'value_2',
                        },
                    ],
                },
            },
            objC: {
                boolean_1: true,
                boolean_2: true,
            },
            fns: {
                fn_1: fn1,
                fn_2: fn2,
            },
        };
        const objTwo = {
            prop: 'prop2',
            arr: [ 'val4', 'val5', 'val6' ],
            objA: {
                arr: [
                    {
                        item: 'item_4',
                        value: 'value_4',
                    },
                    {
                        item: 'item_5',
                        value: 'value_5',
                    },
                    {
                        item: 'item_6',
                        value: 'value_6',
                    },
                    {
                        item: 'item_7',
                        value: 'value_7',
                    },
                ],
            },
            objB: {
                itemTwo: {
                    value: 'value_8',
                },
            },
            objC: {
                boolean_1: false,
            },
            fns: {
                fn_1: fn3,
                fn_2: fn4,
            },
        };
        const expectedResult = {
            prop: 'prop2',
            arr: [ 'val4', 'val5', 'val6', 'val1', 'val2', 'val3' ],
            objA: {
                arr: [
                    {
                        item: 'item_4',
                        value: 'value_4',
                    },
                    {
                        item: 'item_5',
                        value: 'value_5',
                    },
                    {
                        item: 'item_6',
                        value: 'value_6',
                    },
                    {
                        item: 'item_7',
                        value: 'value_7',
                    },
                    {
                        item: 'item_1',
                        value: 'value_1',
                    },
                    {
                        item: 'item_2',
                        value: 'value_2',
                    },
                    {
                        item: 'item_3',
                        value: 'value_3',
                    },
                ],
            },
            fns: {
                fn_1: fn3,
                fn_2: fn4,
            },
            objB: {
                itemTwo: {
                    value: 'value_8',
                },
                itemOne: {
                    names: [
                        'name_1',
                        'name_2',
                        'name_3',
                    ],
                    items: [
                        {
                            item: 'item_1',
                            value: 'value_1',
                        },
                        {
                            item: 'item_2',
                            value: 'value_2',
                        },
                    ],
                }
            },
            objC: {
                boolean_1: false,
                boolean_2: true,
            },
        };

        expect(mergedeep(objOne, objTwo)).toEqual(expectedResult);
    });

    it('should merge two arrays', () => {
        expect(mergedeep([ 1, 2 ], [ 3, 4 ])).toEqual([ 3, 4, 1, 2 ]);
    });

    it(`should return undefined when params are not objects`, () => {
        expect(mergedeep(undefined, null)).toBeUndefined();
        expect(mergedeep(null, '')).toBeUndefined();
        expect(mergedeep(NaN, undefined)).toBeUndefined();
    });

    it(`should return the second param when the first one isn't an objet`, () => {
        expect(mergedeep(undefined, [ 3, 4 ])).toEqual([ 3, 4 ]);
        expect(mergedeep(null, [ 3, 4 ])).toEqual([ 3, 4 ]);
        expect(mergedeep('', [ 3, 4 ])).toEqual([ 3, 4 ]);
        expect(mergedeep(NaN, [ 3, 4 ])).toEqual([ 3, 4 ]);
    });

    it(`should return the first param when the second one isn't an objet`, () => {
        expect(mergedeep([ 3, 4 ], undefined)).toEqual([ 3, 4 ]);
        expect(mergedeep([ 3, 4 ], null)).toEqual([ 3, 4 ]);
        expect(mergedeep([ 3, 4 ], '')).toEqual([ 3, 4 ]);
        expect(mergedeep([ 3, 4 ], NaN)).toEqual([ 3, 4 ]);
    });
});
