import * as CoordinatorCommands from '../CoordinatorCommands/CoordinatorCommands.ts'
import { getMathBlockDom, getMathInlineDom } from '../GetMathDom/GetMathDom.ts'
import { handleMessagePort } from '../HandleMessagePort/HandleMessagePort.ts'
import * as NetworkCommandMap from './NetworkCommandMap.ts'

export const commandMap = {
  'ChatMath.getMathBlockDom': getMathBlockDom,
  'chatMath.getMathInlineDom': getMathInlineDom,
  'HandleMessagePort.handleMessagePort': handleMessagePort,
}
