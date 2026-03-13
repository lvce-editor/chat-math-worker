export interface chatMathMessage {
  readonly id: string
  readonly inProgress?: boolean
  readonly role: 'assistant' | 'tool' | 'user'
  readonly text: string
  readonly time: string
}

export interface chatMathSession {
  readonly id: string
  readonly messages: readonly chatMathMessage[]
  readonly title: string
}

export interface chatMathSessionSummary {
  readonly id: string
  readonly messageCount: number
  readonly title: string
}

export interface chatMathSubmitOptions {
  readonly sessionId?: string
  readonly text: string
}

export interface chatMathSubmitErrorResult {
  readonly message: string
  readonly type: 'error'
}

export interface chatMathSubmitSuccessResult {
  readonly assistantMessageId: string
  readonly runId: string
  readonly sessionId: string
  readonly type: 'success'
  readonly userMessageId: string
}

export type chatMathSubmitResult = chatMathSubmitErrorResult | chatMathSubmitSuccessResult

export interface chatMathSessionCreatedEvent {
  readonly session: chatMathSession
  readonly type: 'session-created'
}

export interface chatMathSessionDeletedEvent {
  readonly sessionId: string
  readonly type: 'session-deleted'
}

export interface chatMathSessionUpdatedEvent {
  readonly session: chatMathSession
  readonly type: 'session-updated'
}

export interface chatMathMessageAppendedEvent {
  readonly message: chatMathMessage
  readonly sessionId: string
  readonly type: 'message-appended'
}

export interface chatMathMessageUpdatedEvent {
  readonly message: chatMathMessage
  readonly runId: string
  readonly sessionId: string
  readonly type: 'message-updated'
}

export interface chatMathRunStartedEvent {
  readonly assistantMessageId: string
  readonly runId: string
  readonly sessionId: string
  readonly type: 'run-started'
}

export interface chatMathRunFinishedEvent {
  readonly runId: string
  readonly sessionId: string
  readonly type: 'run-finished'
}

export interface chatMathRunCancelledEvent {
  readonly runId: string
  readonly sessionId: string
  readonly type: 'run-cancelled'
}

export type chatMathEvent =
  | chatMathMessageAppendedEvent
  | chatMathMessageUpdatedEvent
  | chatMathRunCancelledEvent
  | chatMathRunFinishedEvent
  | chatMathRunStartedEvent
  | chatMathSessionCreatedEvent
  | chatMathSessionDeletedEvent
  | chatMathSessionUpdatedEvent
