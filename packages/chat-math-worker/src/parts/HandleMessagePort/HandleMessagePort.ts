import { MessagePortRpcClient } from '@lvce-editor/rpc'
import { commandMapRef } from '../CommandMap/CommandMapRef.ts'

export const handleMessagePort = async (port: MessagePort): Promise<void> => {
  await MessagePortRpcClient.create({
    commandMap: commandMapRef.current,
    messagePort: port,
  })
}
