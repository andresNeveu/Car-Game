/**
 *
 * @param {*} array
 * @returns
 */
export const chooseRandom = array =>
	array[Math.floor(Math.random() * array.length)];
