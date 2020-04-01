import React, { useContext, useState } from 'react'
import { OrderContext } from '../contexts/OrderContext'
import OrderItem from './OrderItem'
import InfiniteScroll from "react-infinite-scroll-component"

export default function OrderList() {
    const { orderList, orderRows, modifyQuery } = useContext(OrderContext)
    const [hasMore, setHasMore] = useState(true)

    const fetchMoreData = () => {
        if (orderRows.length >= orderList.data.count) {
          setHasMore(false)
          return;
        }
        
        modifyQuery({offset: orderRows.length, resetSearch: false})
        return
      };

    return (
        <div>
            {orderList.success &&
                <InfiniteScroll
                    dataLength={orderRows.length}
                    next={fetchMoreData}
                    hasMore={orderRows.length ? hasMore : false}
                    loader={<h4 style={{ textAlign: "center" }}>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Reached the last item</b>
                        </p>
                    }
                >   
                    {orderRows.map(value => {
                        return (
                            <OrderItem key={value.orderId} clientName={value.clientName} position={value.jobPosition} address={value.officeAddress} />
                        )
                    })}

                </InfiniteScroll>}
        </div>
    )
}
