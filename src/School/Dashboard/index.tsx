import React from "react"
import Greeting from "./Greeting"
import StatsCards from "./StatsCards"
import DebtorsCards from "./DebtorsCards"
import BirthdayCard from "./BirthdayCard"

export default function Dashboard({stats, school, debts, count}) {
  return(
    <>
    <Greeting />
    <StatsCards stats={stats} school={school} count={count} />
    <DebtorsCards debts={debts} />
    <BirthdayCard />
    </>
  )
}
