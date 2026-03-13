export type CommandHandler = (...args: readonly unknown[]) => unknown | Promise<unknown>

export const commandMapRef: {
  current: Record<string, CommandHandler>
} = {
  current: Object.create(null),
}
