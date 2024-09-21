import { publicClient } from './client'
import { MACIWrapper } from '../contracts/MACIWrapper'
 
const getPollCreationEvent = publicClient.watchContractEvent({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: MACIWrapper,
  eventName: 'PollCreated',
  onLogs: logs => console.log(logs)
})