import { BinanceWSS, type ConstructorOptions } from './BinanceWSS'
import type { BinanceMessage } from './types'

export class BinanceSymbolWSS extends BinanceWSS {
  constructor(
    public symbol: string,
    baseArgs: Omit<ConstructorOptions, 'messageToHandlerKey'>
  ) {
    const args = {
        ...baseArgs,
        messageToHandlerKey: (message: BinanceMessage) => {
          return message.e
        },
        
      }
      console.log(args)
    super(args)
  }

  override aggTrade(): void {
    super.aggTrade(this.symbol)
  }
}
