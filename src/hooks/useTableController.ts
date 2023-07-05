import React from 'react'


const initialFilters = { name: '', category: "", kind: "" }

export type RowData = {
    category: string,
    name: string,
    text: string,
    id: string
}

type Filters = {
    name: string | null,
    category: string | null,
    kind: string | null
}

const useTableController = ({ initialValue }: { initialValue: RowData[] }) => {
    const [data, setData] = React.useState<RowData[]>(initialValue)
    const [filter, setFilter] = React.useState<Filters>(initialFilters)

    const addRow = (data: RowData) => {
        setData((prev) => [...prev, data])
    }

    const addFilter = (filterKey: keyof Filters, value: string | null) => {
        setFilter((prev) => ({ ...prev, [filterKey]: value }))
    }

    const editRow = (data: RowData) => {
        setData((prev) => prev.map((row) => {
            if (data.id === row.id) {
                return { ...row, ...data }
            }

            return row
        }))
    }

    const findById = (id: string) => {
        return data.find((row) => row.id === id)
    }

    const resetFilters = () => setFilter(initialFilters)

    const deleteRow = (id: string) => {
        setData(data.filter((row) => row.id !== id))
    }

    const uniqCategories = React.useMemo(() => {
        return [...new Set(data.map((row) => row.category))]
    }, [data])

    const filteredData = data.filter((row) => {
        let isValid = true

        if (!!filter.category) {
            isValid = row.category.toLowerCase().includes(filter.category.toLowerCase())
        }

        if (!!filter.name) {
            isValid = isValid && row.name.toLowerCase().includes(filter.name.toLowerCase())
        }

        return isValid
    })

    return {
        data: filteredData,
        addRow,
        resetFilters,
        addFilter,
        deleteRow,
        editRow,
        findById,
        uniqCategories,
        filter
    }
}

export default useTableController