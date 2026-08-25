/**
 * redirects.mjs
 *
 * Audit src/lib/redirects.ts for path normalization, chains, and cycles.
 *
 * Chains:  A→B exists AND B→…→C exists — source should point directly to C.
 * Cycles:  A→B exists AND following redirects eventually returns to A.
 * Route existence is validated from generated output by dist-contracts.mjs.
 *
 * Run: node --experimental-strip-types scripts/checks/redirects.mjs
 * Exit 0 = clean. Exit 1 = normalization, chain, or cycle findings.
 */

import process from 'node:process'
import { pathToFileURL } from 'node:url'

import { redirects } from '../../src/lib/redirects.ts'

const LOCAL_ORIGIN = 'https://lavanti.fi'

let hasError = false

function err(msg) {
    process.stderr.write(`\x1b[31mERROR\x1b[0m [redirects] ${msg}\n`)
    hasError = true
}

export const normalizeRedirectPath = (value) => {
    try {
        const url = new URL(value, LOCAL_ORIGIN)
        if (!value.startsWith('/') || url.origin !== LOCAL_ORIGIN || url.search || url.hash) return null

        const pathname = url.pathname.replaceAll(/\/{2,}/g, '/')
        return pathname.endsWith('/') ? pathname : `${pathname}/`
    } catch {
        return null
    }
}

// ── Chain detection ───────────────────────────────────────────────────────────

/**
 * @typedef {{ from: string, via: string[], terminal: string, isCycle: boolean }} ChainFinding
 */

/**
 * Follow hops from `start` through the redirect map.
 * Only traverses intermediate hops that are themselves redirect SOURCES.
 * Returns the first destination that is NOT a redirect source (the terminal),
 * the list of intermediate hops, and whether a cycle was detected.
 */
function followChain(map, start) {
    const visited = new Set([start])
    const via = []
    let current = map[start]

    // Only follow if the current destination is itself a redirect source
    while (current !== undefined && Object.hasOwn(map, current)) {
        if (visited.has(current)) {
            return { via, terminal: current, isCycle: true }
        }
        visited.add(current)
        via.push(current)
        current = map[current]
    }

    const terminal = current ?? map[start]
    return { via, terminal, isCycle: false }
}

export const auditRedirectMap = (map) => {
    const normalization = []
    /** @type {ChainFinding[]} */
    const chains = []
    /** @type {ChainFinding[]} */
    const cycles = []

    for (const [source, destination] of Object.entries(map)) {
        for (const [kind, value] of [
            ['source', source],
            ['destination', destination],
        ]) {
            const expected = normalizeRedirectPath(value)
            if (expected === null || value !== expected) {
                normalization.push({ from: source, kind, value, expected })
            }
        }

        const { via, terminal, isCycle } = followChain(map, source)
        if (isCycle) {
            cycles.push({ from: source, via, terminal, isCycle: true })
        } else if (via.length > 0) {
            chains.push({ from: source, via, terminal, isCycle: false })
        }
    }

    return { chains, cycles, normalization, total: Object.keys(map).length }
}

// ── Output ────────────────────────────────────────────────────────────────────

const printAudit = ({ chains, cycles, normalization, total }) => {
    if (normalization.length > 0) {
        err(`\nNormalization (${normalization.length}):`)
        for (const { from, kind, value, expected } of normalization) {
            const requirement =
                expected === null ? 'must be a local path without a query or fragment' : `use ${expected}`
            err(`${kind} for ${from}: ${value}  [${requirement}]`)
        }
    }

    if (chains.length > 0) {
        err(`\nChains (${chains.length}):`)
        for (const { from, via, terminal } of chains) {
            err(`Chain: ${[from, ...via, terminal].join('  →  ')}  [collapse → terminal]`)
        }
    }

    if (cycles.length > 0) {
        err(`\nCycles (${cycles.length}):`)
        for (const { from, via, terminal } of cycles) {
            err(`Cycle: ${[from, ...via, terminal].join('  →  ')}`)
        }
    }

    const issueSet = new Set([
        ...normalization.map((finding) => finding.from),
        ...chains.map((finding) => finding.from),
        ...cycles.map((finding) => finding.from),
    ])
    const clean = total - issueSet.size
    console.log(
        `\nRedirect audit — ${total} entries\nSummary: ${total} total, ${normalization.length} normalization findings, ${chains.length} chains, ${cycles.length} cycles, ${clean} clean.`
    )
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    printAudit(auditRedirectMap(redirects))
    process.exitCode = hasError ? 1 : 0
}
