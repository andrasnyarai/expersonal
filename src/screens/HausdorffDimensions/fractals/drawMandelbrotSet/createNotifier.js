function createEvent(name) {
  const callbacks = []
  return {
    name,
    callbacks,
    registerCallback(callback) {
      callbacks.push(callback)
    },
  }
}

export function createNotifier() {
  const events = {}
  return {
    registerEvent(eventName) {
      events[eventName] = createEvent(eventName)
    },
    dispatchEvent(eventName, eventArguments) {
      events[eventName].callbacks.forEach(callback => callback(eventArguments))
    },
    addEventListener(eventName, callback) {
      events[eventName].registerCallback(callback)
    },
  }
}
