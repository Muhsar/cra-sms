import $ from 'jquery'
export const SearchField = ({value, data, setData, initData}) => {
  value.length && setData(data?.filter((user) => {
    if(user.student) return Object.values(user.student.full_name).join('').toLowerCase().includes(value.toLowerCase())
    if(!user.student) return Object.values(user.full_name).join('').toLowerCase().includes(value.toLowerCase())
}))
!value.length && setData(initData)
  // $(searchBody).filter(function (index) {
    // return $(this).toggle($(this).text().toLowerCase().indexOf("value") > -1)
    // const value = e.target.value.toLowerCase();
    // $(".searchBody").filter(function (index) {
        // return this.toggle(this.innerText.toLowerCase().indexOf(value) > -1)
        // return $(this).toggle($(this).text().toLowerCase().indexOf("value") > -1)
      // })
  // })
}