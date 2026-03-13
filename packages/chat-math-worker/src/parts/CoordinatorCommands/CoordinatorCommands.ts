import type {
  chatMathSession,
  chatMathSessionSummary,
  chatMathSubmitOptions,
  chatMathSubmitResult,
  chatMathEvent,
} from '../CoordinatorState/CoordinatorTypes.ts'
import * as CoordinatorState from '../CoordinatorState/CoordinatorState.ts'

export const createSession = async (title?: string): Promise<chatMathSession> => {
  return CoordinatorState.createSession(title)
}

export const listSessions = async (): Promise<readonly chatMathSessionSummary[]> => {
  return CoordinatorState.listSessions()
}

export const getSession = async (sessionId: string): Promise<chatMathSession | undefined> => {
  return CoordinatorState.getSession(sessionId)
}

export const deleteSession = async (sessionId: string): Promise<boolean> => {
  return CoordinatorState.deleteSession(sessionId)
}

export const submit = async (options: Readonly<chatMathSubmitOptions>): Promise<chatMathSubmitResult> => {
  return CoordinatorState.submit(options)
}

export const cancelRun = async (runId: string): Promise<boolean> => {
  return CoordinatorState.cancelRun(runId)
}

export const subscribe = async (subscriberId: string): Promise<void> => {
  CoordinatorState.subscribe(subscriberId)
}

export const unsubscribe = async (subscriberId: string): Promise<void> => {
  CoordinatorState.unsubscribe(subscriberId)
}

export const consumeEvents = async (subscriberId: string): Promise<readonly chatMathEvent[]> => {
  return CoordinatorState.consumeEvents(subscriberId)
}

export const waitForEvents = async (subscriberId: string, timeout?: number): Promise<readonly chatMathEvent[]> => {
  return CoordinatorState.waitForEvents(subscriberId, timeout)
}
