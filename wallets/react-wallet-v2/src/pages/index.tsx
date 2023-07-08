import AccountCard from '@/components/AccountCard'
import AccountPicker from '@/components/AccountPicker'
import PageHeader from '@/components/PageHeader'
import { EIP4337_TEST_CHAINS } from '@/data/EIP4337Data'
import SettingsStore from '@/store/SettingsStore'
import { Text } from '@nextui-org/react'
import { Fragment } from 'react'
import { useSnapshot } from 'valtio'

export default function HomePage() {
  const {
    testNets,
    eip4337Address
  } = useSnapshot(SettingsStore.state)

  return (
    <Fragment>
      <PageHeader title="Game Settings Showing Openfort Accounts">
        <AccountPicker />
      </PageHeader>
      <Text h4 css={{ marginBottom: '$5' }}>
        Mainnets
      </Text>

      {testNets ? (
        <Fragment>
          <Text h4 css={{ marginBottom: '$5' }}>
            Testnets
          </Text>
          {Object.entries(EIP4337_TEST_CHAINS).map(([caip10, {name, logo, rgb}]) => (
            <AccountCard key={name} name={name} logo={logo} rgb={rgb} address={eip4337Address} chainId={caip10.toString()}/>
          ))}
        </Fragment>
      ) : null}
    </Fragment>
  )
}
