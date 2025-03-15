export class BinanceWebSocketStream {
  public ws?: WebSocket

  constructor(
    public baseUrl: string,
    public url: string = '/ws'
  ) {}

  connect() {
    return new Promise<void>((resolve, reject) => {
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
    })
  }

  
}
