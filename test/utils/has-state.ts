export default function hasState(elem: Element | null, name: string): void | never {
    if (!elem) {
        throw new Error(`Element does not exists"`)
    }
    const re = new RegExp(name + '$', 'i');
    const stateExists = Object.keys((elem as HTMLElement).dataset).some(name => re.test(name))
    if (!stateExists) {
        throw new Error(`Element does not have state "${name}"`)
    }
}

