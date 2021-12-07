import React from "react"
import DebtorsList from "./DebtorsList"
import DebtorsChart from "./DebtorsChart"
import {DashboardData} from "./DashJson"
import Carousel from 'react-material-ui-carousel'

export default function DebtorsCards({debts}) {
  const {debtors} = DashboardData
  const carouselItem = [
      {
          list: debtors.dataA.people,
          chart: debtors.dataA.data
      },
      {
          list: debtors.dataB.people,
          chart: debtors.dataB.data
      },
      {
          list: debtors.dataC.people,
          chart: debtors.dataC.data
      },
  ]
  return (
    <>
    <Carousel

    animation="slide"
    interval={8000}
    swipe={true}
              indicatorContainerProps={{
            className: "sr-only",
    style: {
        display: 'none', // 5
    }

}}
    >
        {
            debts?.map( (item, i) => <div className="my-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" key={i}>
            <DebtorsList people={item.debtors} title={item.name} fee={item.fee} />
            <DebtorsChart debt={item.totalDebt} paid={item.totalPaid} />
            </div> )
        }
    </Carousel>
    </>
  )
}
