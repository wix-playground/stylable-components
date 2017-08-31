const events: {[P: string]: Set<EventListener>} = {};

function addEventListener(eventName: 'string', listener: EventListener) {
    if (!events[eventName]) {
        events[eventName] = new Set();
    }
    events[eventName].add(listener);
}

function removeEventListener(eventName: 'string', listener: EventListener) {
    if (!events[eventName]) {
        return;
    }
    events[eventName].delete(listener);
}

function dispatchEvent(event: Event) {
    const eventName = event.type;

    if (!eventName || !events[eventName]) {
        return;
    }

    events[eventName].forEach(listener => listener(event));
}

export const environment = {
    addEventListener,
    removeEventListener,
    dispatchEvent
};
