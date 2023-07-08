import { proxy } from 'valtio'

/**
 * Types
 */
interface State {
  testNets: boolean
  account: number
  eip4337Address: string
  eip155Address: string
  relayerRegionURL: string
  activeChainId: string
}

/**
 * State
 */
const state = proxy<State>({
  testNets: typeof localStorage !== 'undefined' ? Boolean(localStorage.getItem('TEST_NETS')) : true,
  account: 0,
  activeChainId: '1',
  eip4337Address: '',
  eip155Address: '',
  relayerRegionURL: ''
})

/**
 * Store / Actions
 */
const SettingsStore = {
  state,

  setAccount(value: number) {
    state.account = value
  },

  setEIP4337Address(eip4337Address: string) {
    state.eip4337Address = eip4337Address
  },

  setEIP155Address(eip155Address: string) {
    state.eip155Address = eip155Address
  },
  
  setRelayerRegionURL(relayerRegionURL: string) {
    state.relayerRegionURL = relayerRegionURL
  },

  setActiveChainId(value: string) {
    state.activeChainId = value
  },

  toggleTestNets() {
    state.testNets = !state.testNets
    if (state.testNets) {
      localStorage.setItem('TEST_NETS', 'YES')
    } else {
      localStorage.removeItem('TEST_NETS')
    }
  }
}

export default SettingsStore
