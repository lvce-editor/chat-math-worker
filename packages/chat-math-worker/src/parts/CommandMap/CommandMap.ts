import * as CoordinatorCommands from '../CoordinatorCommands/CoordinatorCommands.ts'
import { handleMessagePort } from '../HandleMessagePort/HandleMessagePort.ts'
import * as NetworkCommandMap from './NetworkCommandMap.ts'

export const commandMap = {
  ...NetworkCommandMap.networkCommandMap,
  'chatMath.cancelRun': CoordinatorCommands.cancelRun,
  'chatMath.consumeEvents': CoordinatorCommands.consumeEvents,
  'chatMath.createSession': CoordinatorCommands.createSession,
  'chatMath.deleteSession': CoordinatorCommands.deleteSession,
  'chatMath.getSession': CoordinatorCommands.getSession,
  'chatMath.listSessions': CoordinatorCommands.listSessions,
  'chatMath.submit': CoordinatorCommands.submit,
  'chatMath.subscribe': CoordinatorCommands.subscribe,
  'chatMath.unsubscribe': CoordinatorCommands.unsubscribe,
  'chatMath.waitForEvents': CoordinatorCommands.waitForEvents,
  'HandleMessagePort.handleMessagePort': handleMessagePort,
}
