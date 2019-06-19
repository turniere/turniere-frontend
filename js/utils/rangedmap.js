
export function rangedmap(arr, func, start, end) {
    return arr.slice(start, end).map((element, index) => func(element, start + index));
}
