import { publicClient } from './client'
import { MACIWrapper } from '../contracts/MACIWrapper'
 
export default function getPollCreationEvent() { 
publicClient.watchContractEvent({
  address: '0xac1ee4e757467F4c844D346630e7439DD931ceCc',
  abi: MACIWrapper,
  eventName: 'PollCreated',
  onLogs: logs => console.log(logs)
})
}