import take from 'lodash/take'
import drop from 'lodash/drop'

const paginateItems = <T = unknown>({
	items,
	perPage,
	selectedPage,
}: {
	items: T[]
	perPage: number
	selectedPage: number
}): T[] => {
	return take(drop<T>(items, (selectedPage * perPage)), perPage)
}

export default paginateItems
