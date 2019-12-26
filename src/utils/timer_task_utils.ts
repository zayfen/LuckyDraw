import * as timers from 'timers'

type AnyFunction = (...args: any[]) => void

class TimerTask {
  private intervalMs: number = 0
  private taskHandler: AnyFunction = null
  private timerObject: NodeJS.Timeout = null
  private running: boolean = false


  private taskWrapper () {
    if (!this.running) { // stoped
      return
    }

    this.taskHandler()
    this.run()
  }

  public setInterval (intervalMs: number): TimerTask {
    this.intervalMs = intervalMs
    if (this.running) {
      this.stop().run()
    }
    return this
  }

  public setHandler (fn: AnyFunction): TimerTask {
    this.taskHandler = fn
    if (this.running) {
      this.stop().run()
    }
    return this
  }

  public run (): TimerTask {
    if (this.taskHandler === null) {
      throw new Error('no taskHandler')
    }

    this.timerObject = timers.setTimeout(this.taskWrapper.bind(this), this.intervalMs)
    this.running = true
    return this
  }

  public stop (): TimerTask {
    if (this.timerObject === null) {
      return this
    }
    timers.clearTimeout(this.timerObject)
    this.running = false
    return this
  }
}

export default TimerTask
