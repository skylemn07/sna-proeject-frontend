import type { Hash, Message } from '../model/Message'

export function buildUrl(baseUrl: string, params: URLSearchParams): string {
	return baseUrl + '?' + params.toString()
}

async function handleResponse<T>(resp: Response): Promise<T> {
	if (!resp.ok) {
		throw Error(`Response status is ${resp.status} ${resp.statusText}`)
	}
	return await resp.json()
}

export async function getMessageHash(message: string): Promise<string> {
	const url = 'http://slewiex.pythonanywhere.com?message=123'
	const params = new URLSearchParams()
	params.append('message', message)

	const resp: Response = await fetch(buildUrl(url, params), {
		method: 'POST',
		redirect: 'follow',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return (await handleResponse<Hash>(resp)).hash
}

export async function getMessageByHash(hash: string): Promise<string> {
	const url = 'http://slewiex.pythonanywhere.com?message=123'
	const params = new URLSearchParams()
	params.append('hash', hash)

	const resp: Response = await fetch(buildUrl(url, params), {
		redirect: 'follow',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	return (await handleResponse<Message>(resp)).message
}
