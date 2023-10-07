type ISerializablePrimitiveValue = string | number | boolean | null | undefined;

interface ISerializableObject extends Record<string, ISerializablePrimitiveValue | ISerializableObject | ISerializableArray> {
    [key:string]: ISerializablePrimitiveValue | ISerializableObject | ISerializableArray;
}

type ISerializableArray = Array<ISerializablePrimitiveValue | ISerializableArray | ISerializableObject>;

type ICollection<T = ISerializableObject | ISerializableArray> = Record<string, unknown> | Array<unknown> | undefined | T;

const isObject = (obj: unknown): boolean => Boolean(obj) && typeof obj === 'object';

/**
 * Recursively merge two collections and returns new merged collection
 * @param colOne collection (object, array)
 * @param colTow collection (object, array)
 * @returns The merged collection 
 */
export const mergedeep = <T = ISerializableObject | ISerializableArray>(colOne: ICollection<T>, colTow: ICollection<T>): ICollection<T> => {
    if (!isObject(colOne) && !isObject(colTow)) {
        return undefined;
    }
    if (!isObject(colOne)) {
        return colTow;
    }
    if (!isObject(colTow)) {
        return colOne;
    }
    if (Array.isArray(colOne) && Array.isArray(colTow)) {
        return colTow.concat(colOne);
    }

    const mergedObject = Object.assign({}, colOne);
    Object.keys(colTow).forEach(key => {
        const sourceValue = colOne[ key ];
        const targetValue = colTow[ key ];

        if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
            mergedObject[ key ] = targetValue.concat(sourceValue);
        } else if (isObject(sourceValue) && isObject(targetValue)) {
            mergedObject[ key ] = mergedeep(sourceValue, targetValue);
        } else {
            mergedObject[ key ] = targetValue;
        }
    });

    return mergedObject;
};
