// Here so that we can: import style from '[path-to].st.css'
declare module '*.css' {
    const content: any;
    export default content;
}
