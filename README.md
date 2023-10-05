# mergedeep

A library for deep and recursive merging of Javascript collections

It's an immutable deep merge.

### Example

Note: When two compatible collections are encountered with the same key, it take the key of the second collection passed as parameter.

```js
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

const result = {
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

mergedeep(objOne, objTwo) // => result

```