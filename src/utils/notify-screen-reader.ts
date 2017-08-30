let notifyAlert: HTMLElement;
export function notifyScreenReader(text: string) {
    if (!notifyAlert) {
        notifyAlert = document.createElement('p');
        notifyAlert.setAttribute('role', 'alert');
        notifyAlert.innerHTML = text;
        document.body.appendChild(notifyAlert);
    } else {
        notifyAlert.innerHTML = text;
    }
}
