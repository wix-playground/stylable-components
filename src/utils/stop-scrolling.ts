import styles from './stop-scrolling.st.css';
export const noScrollClass = 'stop-scrolling';

export function stopScrolling() {
    document.body.classList.add(styles[noScrollClass]);
}

export function enableScrolling() {
    document.body.classList.remove(styles[noScrollClass]);
}
