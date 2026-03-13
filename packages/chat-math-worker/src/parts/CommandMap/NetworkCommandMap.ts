import { makeApiRequest } from '../MakeApiRequest/MakeApiRequest.ts'
import { makeStreamingApiRequest } from '../MakeStreamingApiRequest/MakeStreamingApiRequest.ts'

export const networkCommandMap = {
  'chatMath.makeApiRequest': makeApiRequest,
  'chatMath.makeStreamingApiRequest': makeStreamingApiRequest,
}
