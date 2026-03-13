// Minimal stub for HTMLElement, required by katex's type declarations.
// The webworker lib doesn't include DOM types, but katex's render()
// function signature references HTMLElement. We only use renderToString(),
// so this empty interface satisfies the type checker without pulling in
// the full DOM lib.
interface HTMLElement {}
