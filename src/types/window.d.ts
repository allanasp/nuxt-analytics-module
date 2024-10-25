export {} // Required to treat this as a module

declare global {
  interface Window {
    // eslint-disable-next-line
    _paq?: any[] // Declare _paq as an optional array on window
  }
}
