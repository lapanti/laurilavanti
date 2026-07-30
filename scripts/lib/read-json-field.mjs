#!/usr/bin/env node
// Reads one field from a JSON file (meta.json) for bash checks that can't parse
// JSON natively. Prints the value as plain text (arrays are newline-joined);
// prints nothing when the field is absent.
//
// Usage: node read-json-field.mjs FILE FIELD
import { readFileSync } from 'node:fs'

const [file, field] = process.argv.slice(2)
const data = JSON.parse(readFileSync(file, 'utf-8'))
const value = data[field]

if (value === undefined || value === null) process.exit(0)
if (Array.isArray(value)) {
    console.log(value.join('\n'))
} else {
    console.log(value)
}
