// Mock Server call functions
export function mockGetData<T>(): Promise<{data:T[]}> {
	return new Promise<{data:T[]}>((resolve) => {
		resolve({data: []})
	})
}

export function mockServerAdapter<T>(data: T) {
	return new Promise<{data: T}>((resolve) => setTimeout(() => resolve({data}),500))
}
