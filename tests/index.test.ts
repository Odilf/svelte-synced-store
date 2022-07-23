import { test, expect } from 'vitest'
import { synced } from "../src";
import { get } from 'svelte/store'

test('basic add 1', () => {
	const [initial, transformed] = synced<number, number>(1, v => v + 1, t => t - 1)

	initial.set(2)
	expect(get(transformed)).toBe(3)

	transformed.set(2)
	expect(get(initial)).toBe(1)
})

test('incorrect getter and setters', () => {
	expect(() => {
		synced<number, number>(69, v => v + 1, t => t + 1)
	}).toThrowError()
})

test('proper initialization', () => {
	const [initial, transformed] = synced<number, number>(3, v => v + 1, t => t - 1)

	expect(get(initial)).toBe(3)
	expect(get(transformed)).toBe(4)
})