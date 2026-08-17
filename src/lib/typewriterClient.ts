/*
 * Browser entry point for the slogan typewriter.
 *
 * It exists so the hero's <script> block is a single import statement: Prettier's
 * Astro plugin collapses multi-statement script blocks onto one line, which breaks
 * them. Keep the logic in ./typewriter, which stays importable and testable.
 */

import { startTypewriters } from './typewriter'

startTypewriters()
