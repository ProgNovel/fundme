import { metaTagNotFound, getCurrentPointerAddressMustClientSide } from '../../../src/fund/errors'
import { getCurrentPointerAddress, forceFundmeOnBrowser } from '../../../src/fund/main'

describe('no currentpointer atm', () => {
  document.head.innerHTML = ''
  test('throw not found', () => {
    forceFundmeOnBrowser()
    expect(() => getCurrentPointerAddress()).toThrowError(metaTagNotFound)
  })
})

describe('testing getCurrentPointer()', () => {
  test('get pointer address', () => {
    const pointerAddress = '$coil.com/testing'
    document.head.innerHTML = `<meta name="monetization" content=${pointerAddress} />`
    forceFundmeOnBrowser()
    expect(getCurrentPointerAddress()).toBe(pointerAddress)
    document.head.innerHTML = ''
  })
  test('throw getCurrentPointerAddress() if done in server-side', () => {
    expect(() => getCurrentPointerAddress()).toThrowError(getCurrentPointerAddressMustClientSide)
  })
})