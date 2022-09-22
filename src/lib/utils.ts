export const dtToPretty = (dt: string) => {
	const d = new Date(dt)
	const now = new Date()
	const diff = now.getTime() - d.getTime()
	const diffMinutes = Math.floor(diff / 1000 / 60)
	const diffHours = Math.floor(diff / 1000 / 60 / 60)
	if (diffMinutes < 1) {
		return 'just now'
	}
	if (diffMinutes < 2) {
		return '1m ago'
	}
	if (diffMinutes < 60) {
		return `${diffMinutes}m ago`
	}
	if (diffHours < 2) {
		return '1h ago'
	}
	if (diffHours < 24) {
		return `${diffHours}h ago`
	}
	return `${d.getDate()} ${d.toLocaleString('default', { month: 'short' })} ${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
}