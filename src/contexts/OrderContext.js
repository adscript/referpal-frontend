import React, { useState, useEffect } from 'react'
import { BASE_URL, Authorization } from '../constants'

export const OrderContext = React.createContext()

export const OrderContextProvider = (props) => {
    const [orderList, setOrderList] = useState({})
    const [orderRows, setOrderRows] = useState([])
    const [category, setCategory] = useState({})
    const [categoryList, setCategoryList] = useState([])
    const [loading, setLoading] = useState(true)
    const [query, setQuery] = useState({offset: 0, limit: 6, categoryId: null, keyword: '', resetSearch: false})

    const fetchCategoryList = async () => {
        try {
            let url = BASE_URL + `category`
            const data = await fetch(url, {
                method: 'GET',
                headers: new Headers({
                    Authorization,
                })
            })
            const categoryData = await data.json()
            categoryData.data.rows.map(value => value.isClicked = false)
            setCategoryList(categoryData)
            setLoading(false)
        } catch (e) {
            if (e) {
                console.log(e.message, 'Unexpected Error')
            }
        }
    }

    const fetchOrderList = async () => {
        try {
            setLoading(true)
            let url = BASE_URL + `order-listing?offset=${query.offset}&limit=${query.limit}`
            if(query.categoryId) url+=`&category=${query.categoryId}`
            if(query.keyword) url+=`&keyword=${query.keyword}`

            const data = await fetch(url, {
                method: 'GET',
                headers: new Headers({
                    Authorization,
                })
            })

            const orderData = await data.json()
            setOrderList(orderData)
            console.log(orderData)
            query.resetSearch ? setOrderRows(orderData.data.rows) : setOrderRows([...orderRows, ...orderData.data.rows])
            setLoading(false)
        } catch (e) {
            if (e) {
                console.log(e.message, 'unexpected error')
            }
        }
    }

    const modifyQuery = (newQuery) => {
        setQuery({...query, ...newQuery})
    } 

    useEffect(() => {
        fetchCategoryList();
    },[])

    useEffect(() => {
        fetchOrderList();
    }, [query])

    return (
        <OrderContext.Provider value={{
            loading,
            orderList,
            orderRows,
            categoryList,
            category,
            setCategory,
            fetchCategoryList,
            fetchOrderList,
            modifyQuery,
        }}>
            {props.children}
        </OrderContext.Provider>
    )
}