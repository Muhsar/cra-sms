export const SortByDateAdded = (value) => {
  value.sort((a, b) => {
    Number(new Date(b.date_added)) - Number(new Date(a.date_added))
  })
}
export const SortAlphabetically = (value, dataToSort) => {
  value.sort(
    (a: { dataToSort: any }, b: { dataToSort: any }) =>{
      -b.dataToSort.localeCompare(a.dataToSort)
  })
}