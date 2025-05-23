const map = new Map<number, number>();

let waitingIntervalId = 0;

function getLastUntilOneLeft(arr: number[]): number {
    // if (arr.length === 0) {
    //   throw new Error("Array is empty, cannot retrieve a number");
    // }
  if (arr.length > 1) {

    const item = arr.pop();

    if (typeof item !== "number") {
      throw new Error("Invalid item type");
    }

    return item;
  }

  return arr[0];
  // If timeouts is empty, getLastUntilOneLeft will return undefined
}

/**
 * This function mimics the behavior of setInterval with one key difference:
 * if the callback function takes too long to execute or if the browser throttles,
 * subsequent calls to the callback function will not occur.
 *
 * Additionally, we pass an array of timeouts to define an increasing delay period.
 * For example, given the array [16, 8, 4, 2], the delays will be 2, 4, 8, 16, 16, 16...
 */


export function setWaitingInterval(handler: Function, timeouts: number[], ...args: any[]): number {
    waitingIntervalId += 1;
    // waitingInterval is global, if somebody calls setWaitingInterval again, waitingIntervalId will be increased, InternalHandler will use the new value
    // we should use a local variable, new calls will will have a separate closure
    // const myWaitingIntervalId = waitingIntervalId;

    function internalHandler(...argsInternal: any[]): void {
        // should use spread syntax here, otherwise the function will be called with an array
        handler(argsInternal); // handler(...argsInternal);
        map.set(
            waitingIntervalId, // myWaitingIntervalId,
            window.setTimeout(internalHandler, getLastUntilOneLeft(timeouts), ...args)
        );
    }

    map.set(
        waitingIntervalId,
        window.setTimeout(internalHandler, getLastUntilOneLeft(timeouts), ...args)
    );

    return waitingIntervalId;
}

export function clearWaitingInterval(intervalId: number): void {
    const realTimeoutId = map.get(intervalId);

    if (typeof realTimeoutId === 'number') {
        clearTimeout(realTimeoutId);
        // remove the entry from the map
        // map.delete(intervalId);
    }
}
