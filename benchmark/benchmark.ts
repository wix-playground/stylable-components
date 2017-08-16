export interface BenchmarkConfig {
    cycles: number;
    warmupCycles: number;
    setup: () => void;
    run: () => void;
}

export async function benchmark({cycles, warmupCycles, setup, run}: BenchmarkConfig) {
    const log = console.log;
    const durations = [];
    const totalCycles = cycles + warmupCycles;
    log(`Starting benchmark. ${warmupCycles} warmup cycles. ${cycles} test cycles.`);
    for (let i = 1; i <= totalCycles; i++) {
        await setup();
        const start = performance.now();
        await run();
        const end = performance.now();
        const duration = end - start;

        if (i <= warmupCycles) {
            log(`Warmup ${i}/${warmupCycles}. ${duration.toFixed(1)} ms`);
        } else {
            log(`Cycle ${i - warmupCycles}/${cycles}. ${duration.toFixed(1)} ms`);
            durations.push(duration);
        }
    }

    const min = Math.min(...durations);
    const max = Math.max(...durations);
    const avg = durations.reduce(((t, x) => t + x), 0) / durations.length;

    log([
        `Cycles: ${cycles}`,
        `Min: ${min.toFixed(1)}`,
        `Max: ${max.toFixed(1)}`,
        `Avg: ${avg.toFixed(1)}`
    ].join('\n'));
}
