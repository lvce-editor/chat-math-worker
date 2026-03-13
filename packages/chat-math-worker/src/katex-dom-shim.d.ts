// cspell:ignore katex
// Minimal stub for HTMLElement, required by katex type declarations.
// The webworker lib doesn't include DOM types, but katex render()
// function signature references HTMLElement. We only use renderToString(),
// so this empty type satisfies the type checker without pulling in
// the full DOM lib.
type HTMLElement = object
