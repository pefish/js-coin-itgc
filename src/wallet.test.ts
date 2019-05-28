import 'js-node-assist'
import BitcoinWalletHelper from './wallet'
import assert from 'assert'

declare global {
  namespace NodeJS {
    interface Global {
      logger: any;
    }
  }
}

describe('bitcoinWalletHelper', () => {

  let walletHelper
  const testnet = 'testnet', mainnet = 'mainnet'

  before(async () => {
    walletHelper = new BitcoinWalletHelper()
  })

  it('getAllFromWif', async () => {
    try {
      const result = walletHelper.getAllFromWif('5BYB6w5dSXLPstq42UmiAiwGVQFkhhQT2wR39XYoRT7wo7w8y6mV', mainnet)
      // global.logger.error(result)
      assert.strictEqual(result['publicKey'], '0302a549032fea81affd47b68e348343f2794b34fa02ad7e74aadb7a50570118fb')
      assert.strictEqual(result['privateKey'], '44afe949dca457b3506cc388032420e3a59b13e45d4de45cba74b3c718208d38')
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })

  it('getAddressFromPublicKey', async () => {
    try {
      const p2pkh = walletHelper.getAddressFromPublicKey('0302a549032fea81affd47b68e348343f2794b34fa02ad7e74aadb7a50570118fb', `p2pkh`, mainnet)
      // global.logger.info(p2pkh)
      assert.strictEqual(p2pkh, `gWAxDp1qz4fhtjWxKWViES22oVw9sHEsRW`)
      const p2wpkh = walletHelper.getAddressFromPublicKey('0302a549032fea81affd47b68e348343f2794b34fa02ad7e74aadb7a50570118fb', `p2wpkh`, mainnet)
      // global.logger.info(p2wpkh)
      assert.strictEqual(p2wpkh, `gc1q934q9f5x3jdt6lyuuxx3k0w5pthgde5w453g3d`)
      const segwit = walletHelper.getAddressFromPublicKey('0302a549032fea81affd47b68e348343f2794b34fa02ad7e74aadb7a50570118fb', `p2sh(p2wpkh)`, mainnet)
      // global.logger.info(segwit)
      assert.strictEqual(segwit, `ta4a7jsaU1TNrUkHKRjeCbNPqYPwfxhYZE`)
    } catch (err) {
      global.logger.error(err)
      assert.throws(() => {}, err)
    }
  })
})

