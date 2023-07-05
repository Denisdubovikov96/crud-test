import React from 'react'
import paginateItems from '../utils/paginateItems'

type usePaginationProps<T> = {
    items: T[]
}

function usePagination<T>({ items }: usePaginationProps<T>) {
    const [pageNumber, setNumber] = React.useState(0)
    const [itemsPerPage, setItemsPerPage] = React.useState(10)

    const onPageChange = (pageNumber: number) => {
        setNumber(pageNumber)
    }

    const onChangeCountPerPage = (itemsPerPage: number) => {
        setItemsPerPage(itemsPerPage)
        setNumber(0)
    }

    const currentPageItems = paginateItems({items, perPage: itemsPerPage, selectedPage: pageNumber})
    
    return {
        currentPageItems,
        pageNumber,
        itemsPerPage,
        onPageChange,
        onChangeCountPerPage
    }
}

export default usePagination