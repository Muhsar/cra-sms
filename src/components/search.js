// import $ from 'jquery'
export const SearchField = ({value, searchBody}) => {
  document.querySelectorAll(searchBody).filter(function (index) {
    return this.toggle(this.innerText.toLowerCase().indexOf(value) > -1)
  })
    // var value = e.target.value.toLowerCase();
    // $(".searchBody").filter(function (index) {
    //   return $(this).toggle($(this).text().toLowerCase().indexOf("value") > -1)
    // })
}