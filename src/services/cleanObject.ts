import { DeepPartial } from '../types'
type Rules = {
    [key: string]: Rules | boolean | string
}

function isObject(valueToCheck: any): boolean {
    return Object.prototype.toString.call(valueToCheck) === '[object Object]'
}

export default function cleanObject<T>(hashObject: T, rules: Rules): DeepPartial<T> {
    return (function t(hashObject: T, rules: Rules | boolean) {
        return isObject(rules) && isObject(hashObject) ? Object.keys(rules).reduce(function (acc, current) {
            return (hashObject[current] !== undefined && rules[current] && (acc[current] = isObject(rules[current]) ? t(hashObject[current], rules[current]) : hashObject[current]), acc)
        }, {}) : hashObject
    })(hashObject, rules)
}