export class TypeAhead {
    private timeout: number = 1000;
    private lastTypeTime: number = 0;
    private prefix: string = '';

    constructor(
        private getItemCount: () => number,
        private getCurrentIndex: () => number,
        private getItemAtIndex: (index: number) => string
    ) {}

    public handleEvent(event: React.KeyboardEvent<Element>): number {
        const char = event.key;

        // Even though alt codes can be used to type characters, native select controls ignore them.
        // For the sake of simplicity we also ignore code points outside of the Basic Multilingual Plane.
        if (event.metaKey || event.altKey || event.ctrlKey || !char || char.length !== 1) {
            return -1;
        }

        const now = event.timeStamp;
        if (now - this.lastTypeTime > this.timeout) {
            this.prefix = '';
        }
        this.lastTypeTime = now;

        this.prefix += char;

        // We want to simultaneously support two modes:
        // 1) Cycling through items that start with a certain letter by repeatedly pressing this letter.
        //    I.e. pressing "a" twice should not jump to "aardvark", it should cycle through all animals
        //    starting with "a".
        // 2) Matching based on prefix: typing "aar" should jump to "aardvark".

        return /^(.)\1*$/i.test(this.prefix) ?
            this.findByPrefix(char, this.getCurrentIndex() + 1) :
            this.findByPrefix(this.prefix, this.getCurrentIndex());
    }

    private findByPrefix(prefix: string, startIndex: number): number {
        prefix = prefix.toLowerCase();
        startIndex = Math.max(0, startIndex);
        const itemCount = this.getItemCount();
        for (let i = 0; i < itemCount; i++) {
            const itemIndex = (i + startIndex) % itemCount;
            const item = this.getItemAtIndex(itemIndex);
            if (item.toLowerCase().startsWith(prefix)) {
                return itemIndex;
            }
        }
        return -1;
    }
}
