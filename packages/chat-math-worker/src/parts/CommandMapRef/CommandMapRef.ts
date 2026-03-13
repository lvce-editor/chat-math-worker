export type CommandHandler = (...args: readonly never[]) => unknown

export const commandMapRef: {
  current: Record<string, CommandHandler>
} = {
  current: Object.create(null),
}
