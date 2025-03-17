import { determineMessageCategory } from './determineMessageCategory'
import type { BinanceMessage } from './types'

// TODO: fix type safety for keys of handlers
export interface ConstructorOptions {
  baseUrl: string
  url?: string
  messageToHandlerKey: (message: BinanceMessage) => string
  messageHandlers?: Record<string, ((data: object) => void)[]>
}

export class BinanceWSS {
  public ws?: WebSocket
  baseUrl: string
  url: string
  messageToHandlerKey: (message: BinanceMessage) => string | null
  messageHandlers: Record<string, ((data: object) => void)[]>

  constructor(args: ConstructorOptions) {
    this.baseUrl = args.baseUrl
    this.url = args.url ?? '/ws'
    this.messageToHandlerKey = args.messageToHandlerKey
    this.messageHandlers = args.messageHandlers ?? {}
  }

  connect() {
    return new Promise<void>((resolve, reject) => {
      console.log('connecting')
      this.ws = new WebSocket(`${this.baseUrl}${this.url}`)

      this.ws.onopen = () => resolve()

      this.ws.onerror = (event) =>
        reject(
          new Error('Error of wss connection', {
            cause: event,
          })
        )

      this.ws.onclose = (event) => {
        reject(
          new Error('Error of wss connection', {
            cause: event,
          })
        )
      }

      this.ws.onmessage = (event: MessageEvent) => {
        //parse message and define its type
        const data = determineMessageCategory(event.data)

        //if type is not defined, then ignore message
        if (!data) {
          return
        }

        //determine which handlers to run for this message
        const keyOfHandlers = this.messageToHandlerKey(data)

        if (!keyOfHandlers) {
          return
        }

        //run them
        this.messageHandlers[keyOfHandlers]?.forEach((handler) => handler(data))
      }
    })
  }
  disconnect() {
    this.ws?.close()
  }

  subscribeTo(params: string[]) {
    if (!this.ws) {
      throw new Error(
        'An attempt to subscribe to a stream without establishing a connection to the server.'
      )
    }

    const message = {
      method: 'SUBSCRIBE',
      params: params,
      id: 1,
    }

    this.ws.send(JSON.stringify(message))
  }

  // Subscriptions

  
}
