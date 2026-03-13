import { WebWorkerRpcClient } from '@lvce-editor/rpc'
import * as CommandMap from '../CommandMap/CommandMap.ts'
import { commandMapRef } from '../CommandMap/CommandMapRef.ts'

export const listen = async (): Promise<void> => {
  commandMapRef.current = CommandMap.commandMap
  await WebWorkerRpcClient.create({
    commandMap: CommandMap.commandMap,
  })
}
