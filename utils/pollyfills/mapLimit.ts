import _debug from "debug";
const debug = _debug("polyfills:mapLimit");

const nextTick = () => {
  const { promise, resolve } = Promise.withResolvers();
  setImmediate(() => resolve(undefined));
  return promise;
};

type Value<T> = T | { value: T; timeout?: number };

/**
 * @description
 * This is a polyfill for the `mapLimit` function.
 * It is a wrapper around the `map` function that limits the number of items that can be processed in parallel.
 * It also supports a timeout for each item.
 *
 * @param {Array<Value>} array - The array to process
 * @param {(item: T, cb: (value: K) => void) => void} callback - The callback function
 * @param {Object} [options] - The options
 * @param {number} [options.limit] - Maximum number of concurrent operations
 * @param {number} [options.timeout] - Global timeout in milliseconds for each operation
 * @returns {Promise<K[]>} Array of transformed values
 *
 * @example
 * ```typescript
 * mapLimit(
 *   [{ value: 1 }, { value: 2 }, { value: 3 }],
 *   (item, cb) => {
 *     setTimeout(() => {
 *       cb(item * 2);
 *     }, 1000);
 *   },
 *   {
 *     limit: 2,
 *     timeout: 1001,
 *   }
 * )
 *   .then(console.log)  // Output: [2, 4, 6]
 *   .catch(console.error);
 * ```
 */
export const mapLimit = async <T, K>(
  array: Value<T>[],
  callback: (item: T, cb: (value: K) => void) => void,
  {
    concurrency,
    timeout: globalTimeout,
  }: {
    concurrency?: number;
    timeout?: number;
  } = {}
) => {
  // If concurrency is less than 1, throw an error
  if (concurrency && concurrency < 1) {
    throw new Error("Concurrency cannot be less than 1");
  }

  // NOTE: Promise.withResolvers is not supported in Node.js<22
  const { promise: selfPromise, resolve, reject } = Promise.withResolvers();
  const results: [number, K][] = [];
  const total = array.length;
  let inProgress: number = 0;
  let completed: number = 0;
  let arrayCursor = 0;

  // Use typescript's predicates feature to check if the value is an object. Helps with type narrowing and keeps the code clean.
  const isObjectValue = (value: unknown): value is object =>
    value !== null && typeof value === "object";

  const processItems = ({ start, end }: { start: number; end: number }) => {
    for (let i = start; i < end; i++) {
      arrayCursor = i;
      inProgress++;
      try {
        const item = array[i];
        const value = isObjectValue(item) ? item.value : item;
        const timeout =
          isObjectValue(item) && item.timeout ? item.timeout : globalTimeout;

        if (timeout) {
          const timeoutId = setTimeout(() => {
            reject(
              new Error(`Timeout after ${timeout}ms`, {
                cause: `Item at index ${i} => ${value} took too long to complete`,
              })
            );
          }, timeout);
          const next = createNext(i, timeoutId);
          callback(value, next);
        } else {
          const next = createNext(i);
          callback(value, next);
        }
      } catch (error) {
        reject(error);
      }
    }
  };

  const createNext =
    (index: number, timeoutId?: NodeJS.Timeout) => async (value: K) => {
      clearTimeout(timeoutId);
      results.push([index, value]);
      inProgress--;
      completed++;

      // Wait for the next tick to avoid blocking the event loop. Also helps in preventing race conditions when many items are completed at the same time
      await nextTick();

      if (completed === total) {
        resolve(undefined);
        return;
      }

      if (concurrency && inProgress < concurrency) {
        const diff = concurrency - inProgress;
        const start = arrayCursor + 1;
        const end = Math.min(start + diff, total);
        if (start < end) {
          processItems({ start, end });
        }
      }

      debug("%O", {
        index,
        inProgress,
        completed,
        total,
        arrayCursor,
      });
    };

  processItems({
    start: 0,
    // If concurrency is greater than the array length, use the array length
    end: Math.min(concurrency ?? total, total),
  });

  // Wait for all items to be processed
  await selfPromise;

  // Sort results by index
  return results.sort((a, b) => a[0] - b[0]).map(([_, value]) => value);
};

mapLimit(
  [1, { value: 2, timeout: 500 }, { value: 3 }],
  (item, cb) => {
    setTimeout(() => {
      cb(item * 2);
    }, 100);
  },
  {
    concurrency: 2,
    timeout: 300,
  }
)
  .then(console.log)
  .catch(console.error);
