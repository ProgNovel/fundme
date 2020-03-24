import { getWinningPointer, setWebMonetizationPointer, getPoolWeightSum } from './utils'

export const DEFAULT_WEIGHT: number = 5;

// TODO check pointer.address with RegEx
export function setPointerMultiple(pointers: Array<string | WMPointer>, maxPool?: number): void {
  const pool = createPool(pointers)
  const pickedPointer = pickPointer(pool)
  setWebMonetizationPointer(getPointerAddress(pickedPointer));
}

export function getPointerAddress(pointer: WMPointer): string {
  const address = pointer.address

  if (!address) {
    throw new Error(errors.addressNotFound)
  } else if (typeof address !== 'string') {
    throw new Error(errors.addressIsNotAString)
  }
  return address
}

export function createPool(pointers: Array<string | WMPointer>): WMPointer[] {
  return pointers.map(pointer => {
    let wmPointer: WMPointer;
    if (typeof pointer === "string") pointer = convertToPointer(pointer)
    if (!('address' in pointer)) throw new Error(errors.addressNotFound)
    wmPointer = checkWeight(pointer);

    return wmPointer;
  })
}

export function checkWeight(pointer: WMPointer): WMPointer {
  if (pointer.weight === undefined || pointer.weight === NaN) {
    console.warn(errors.weightIsNotANumber(pointer.address));
    pointer.weight = DEFAULT_WEIGHT;
  }

  return pointer;
}

// TODO getting pointer from pool
export function pickPointer(pointers: WMPointer[]): WMPointer {
  const sum = getPoolWeightSum(pointers)
  let choice: number = getChoice(sum)

  return getWinningPointer(pointers, choice)
}

export function getChoice(sum: number): number {
  const choice: number = Math.random() * sum

  return choice
}

export function convertToPointer(str: string): WMPointer {
  const pointer = {
    address: str,
    weight: DEFAULT_WEIGHT
  }
  return pointer
}

const errors: any = {
  addressNotFound: "Fundme.js: address not found.",
  addressIsNotAString: "Fundme.js: address must be a string.",
  weightNotFound: "Fundme.js: entries .weight not found.",
  weightIsNotANumber(str) {
    return `Fundme.js: ${str} has weight that is not a number. It has been set to ${DEFAULT_WEIGHT} (default).`
  }
}