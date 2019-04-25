
/**
 * Constants for the ordering in which the sorting
 * algorithm should bring the elements.
 */
export const Order = {
    ascending : 1,
    descending: 2
};

/**
 * A sorting function that can be used to sort any kind of data
 * given an applicable comparator. Said comparator will take in two
 * elements of the given array `data`, and produce an integer result
 * which can be interpreted as follows:
 * ```
 * comparator(a, b) < 0 => a < b
 * comparator(a, b) = 0 => a = b
 * comparator(a, b) > 0 => a > b
 * ```
 * The parameter order should be given as one of the constants in Order.
 * Said `order` parameter is optional; it will default to ascending.
 *
 * @param {T[]} data The array that is to be sorted.
 * @param {(T, T) => int} comparator A function which can be used
 *     to compare any two elemments from the given array.
 * @param {int} order The order in which the data should be sorted,
 *     as defined in Order.
 * @return An array with the elements from data sorted in the given order.
 */
export function sort(data, comparator, order) {
    if(order === undefined) {
        order = Order.ascending;
    }
    let target = data.slice();
    return sortToTarget(data, target, 0, data.length, comparator, order);
}

function sortToTarget(data, target, start, end, comparator, order) {
    if(end - start < 2) {
        return data;
    }

    let middle = Math.floor((end + start) / 2);
    
    sortToTarget(target, data, start, middle, comparator, order);
    sortToTarget(target, data, middle, end, comparator, order);

    return merge(data, target, start, middle, end, comparator, order);
}

function merge(data, target, start, middle, end, comparator, order) {
    let i = start;
    let j = middle;

    for(let k = start; k < end; k++) {
        if(order === Order.ascending) {
            if(i < middle && (j >= end || comparator(data[i], data[j]) >= 0)) {
                target[k] = data[i++];
            } else {
                target[k] = data[j++];
            }
        } else {
            if(i < middle && (j >= end || comparator(data[i], data[j]) <= 0)) {
                target[k] = data[i++];
            } else {
                target[k] = data[j++];
            }
        }
    }

    return target;
}
