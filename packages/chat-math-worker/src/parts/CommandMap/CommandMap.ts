import { getMathBlockDom } from '../GetMathBlockDom/GetMathBlockDom.ts'
import { getMathInlineDom } from '../GetMathInlineDom/GetMathInlineDom.ts'
import { handleMessagePort } from '../HandleMessagePort/HandleMessagePort.ts'

export const commandMap = {
  'ChatMath.getMathBlockDom': getMathBlockDom,
  'chatMath.getMathInlineDom': getMathInlineDom,
  'HandleMessagePort.handleMessagePort': handleMessagePort,
}
