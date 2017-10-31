export class TypeAhead {
    private timeout: number = 1000;
    private lastTypeTime: number = 0;
    private repeatingChar: string = '';
    private prefix: string = '';

    constructor(
        private getItemCount: () => number,
        private getCurrentIndex: () => number,
        private getItemAtIndex: (index: number) => string
    ) {}

    public handleEvent(event: React.KeyboardEvent<Element>): number {
        const char = event.key;

        // Even though alt can be used to type symbols and letters, native select controls ignore alt-combinations.
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
        // 1) Cycling through items that start with a certain letter by repeatedly pressing said letter.
        //    I.e. pressing "a" twice should not jump to "aardvark", it should cycle through all animals
        //    starting with "a".
        // 2) Matching based on prefix: typing "aar" should jump to "aardvark".

        if (char === this.repeatingChar) {
            return this.findByPrefix(char, this.getCurrentIndex() + 1);
        } else if (this.prefix.length > 1) {
            this.repeatingChar = '';
            return this.findByPrefix(this.prefix, Math.max(this.getCurrentIndex(), 0));
        } else {
            this.repeatingChar = char;
            return this.findByPrefix(char, this.getCurrentIndex() + 1);
        }
    }

    private findByPrefix(prefix: string, startIndex: number): number {
        prefix = prefix.toLowerCase();
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
