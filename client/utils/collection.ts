export function joint<T>(array: T[], callback: (index: number, realIndex: number) => T): T[] {
    const ret = array.map(e => e);
    for (let i = 0; i < array.length - 1; i += 1) {
        const index = i * 2 + 1;
        ret.splice(index, 0, callback(i, index));
    }
    return ret;
}