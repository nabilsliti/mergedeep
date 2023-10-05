type ISerializablePrimitiveValue = string | number | boolean | null | undefined;

interface ISerializableObject extends Record<string, ISerializablePrimitiveValue | ISerializableObject | ISerializableArray> {
    [key:string]: ISerializablePrimitiveValue | ISerializableObject | ISerializableArray;
}

type ISerializableArray = Array<ISerializablePrimitiveValue | ISerializableArray | ISerializableObject>;

type ICollection<T = ISerializableObject | ISerializableArray> = Record<string, unknown> | Array<unknown> | undefined | T;

const isObject = (obj: unknown): boolean => Boolean(obj) && typeof obj === 'object';

/**
 * Recursively merge collections
 */
export const mergedeep = <T = ISerializableObject | ISerializableArray>(source: ICollection<T>, target: ICollection<T>): ICollection<T> => {
    if (!isObject(source) && !isObject(target)) {
        return undefined;
    }
    if (!isObject(source)) {
        return target;
    }
    if (!isObject(target)) {
        return source;
    }
    if (Array.isArray(source) && Array.isArray(target)) {
        return target.concat(source);
    }

    const mergedObject = Object.assign({}, source);
    Object.keys(target).forEach(key => {
        const sourceValue = source[ key ];
        const targetValue = target[ key ];

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
