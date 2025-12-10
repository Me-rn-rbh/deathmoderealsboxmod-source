
//stores all the different achievement values and shit


//getitems to initialise code

//collection achievements
window.localStorage.getItem("lemonach")
window.localStorage.getItem("snowflakeach")

//songeditor achievements
window.localStorage.getItem("notemayhemach")

//misc       achievements
window.localStorage.getItem("lemmsupportach")


//actually setting items

//collection achievements
window.localStorage.setItem("lemonach", window.localStorage.getItem("lemonach"))
window.localStorage.setItem("snowflakeach", window.localStorage.getItem("snowflakeach"))

//songeditor achievements
window.localStorage.setItem("notemayhemach", window.localStorage.getItem("notemayhemach"))

//misc       achievements
window.localStorage.setItem("lemmsupportach", window.localStorage.getItem("lemmsupportach"))







//html file code
function reset() {
    //collection achievements
    window.localStorage.setItem("lemonach", false)
    window.localStorage.setItem("snowflakeach", false)

    //songeditor achievements
    window.localStorage.setItem("notemayhemach", false)

    //misc       achievements
    window.localStorage.setItem("lemmsupportach", false)
}