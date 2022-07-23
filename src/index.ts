import { writable } from 'svelte/store'
import type { Writable } from 'svelte/store'

export function synced<A, B>(
	initialValue: A,
	transform: (value: A) => B, 
	get: (transformed: B) => A, 
): [Writable<A>, Writable<B>] {
	const initial = writable<A>(initialValue)
	const transformed = writable<B>(transform(initialValue))

	initial.subscribe(value => {
		const target = transform(value)
		if (get(target) !== value) {
			throw new Error(`Transformer of synced store is incorrect (${value} transformed to ${target} which goes back to ${get(target)})`);
		}
		transformed.set(target)
	})

	transformed.subscribe(value => {
		const target = get(value)
		if (transform(target) !== value) {
			throw new Error(`Transformer of synced store is incorrect (${value} transformed to ${target} which goes back to ${transform(target)})`);
		}
		initial.set(target)
		// initial.set(get(value))
	})

	return [initial, transformed]
}