import 'js-node-assist'
import BaseWalletHelper from '@pefish/js-coin-btc/lib/base/base_bitcoinjs_lib'
import ErrorHelper from 'p-js-error'

declare global {
  namespace NodeJS {
    interface Global {
      logger: any;
    }
  }
}

export default class Wallet extends BaseWalletHelper {
  decimals: number = 8;
  bitcoinLib: any

  public constructor () {
    super()
    this.bitcoinLib = require('@pefish/bitcoinjs-lib')
  }

  parseNetwork (network): object {
    if (network === `mainnet`) {
      return {
        messagePrefix: '\x18Itgc Signed Message:\n',
        bech32: 'gc',
        bip32: {
          public: 0x0488bc45,
          private: 0x0488dae4,
        },
        pubKeyHash: 0x62,
        scriptHash: 0x80,
        wif: 0x1C,
      }
    } else {
      throw new ErrorHelper(`network error`)
    }
  }
}
