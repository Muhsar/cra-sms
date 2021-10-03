import React from "react"
import Greeting from "./Greeting"
import StatsCards from "./StatsCards"
import DebtorsCards from "./DebtorsCards"
import BirthdayCard from "./BirthdayCard"

export default function Dashboard({stats, school, debts}) {
  return(
    <>
    <Greeting />
    <StatsCards stats={stats} school={school} />
    <DebtorsCards debts={debts} />
    <BirthdayCard />
    </>
  )
}
