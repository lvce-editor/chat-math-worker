import { getMathBlockDom, getMathInlineDom } from '../GetMathDom/GetMathDom.ts'
import { handleMessagePort } from '../HandleMessagePort/HandleMessagePort.ts'

export const commandMap = {
  'ChatMath.getMathBlockDom': getMathBlockDom,
  'chatMath.getMathInlineDom': getMathInlineDom,
  'HandleMessagePort.handleMessagePort': handleMessagePort,
}
