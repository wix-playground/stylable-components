import styles from './stop-scrolling.st.css';
export const noScollClass = 'stop-scrolling';

export function stopScrolling() {
    document.body.classList.add(styles[noScollClass]);
}

export function enableScrolling() {
    document.body.classList.remove(styles[noScollClass]);
}
