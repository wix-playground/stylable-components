export interface ScreenReaderNotifier {
    notify: (text: string) => void;
    remove: () => void;
}

let notifyAlert: any;
let listeners = 0;

export function createScreenReaderNotifier(): ScreenReaderNotifier {
    if (!notifyAlert) {
        notifyAlert = document.createElement('p');
        notifyAlert.style.position = 'absolute';
        notifyAlert.style.bottom = '100%';
        notifyAlert.setAttribute('role', 'alert');
        document.body.appendChild(notifyAlert);
    }
    listeners ++;

    function notify(text: string) {
        notifyAlert.innerHTML = text;
    }
    function remove() {
        listeners --;
        if (listeners === 0) {
            document.body.removeChild(notifyAlert);
            notifyAlert = null;
        }
    }

    return {notify, remove};
}
