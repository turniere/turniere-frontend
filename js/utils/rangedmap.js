
export function rangedmap(arr, func, start, end) {
    return arr.slice(start, end).map(func);
}
