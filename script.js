let btnicon = document.querySelector(".btn i")
let cross =  document.querySelector(".elements i")


var tl = gsap.timeline()

tl.to(".elements" ,{
    right:"0",
    duration:0.4,
})

tl.from(".navlinks li" , {
    x:150,
    duration:0.4,
    stagger:0.2,
    opacity:0
})

tl.from(".elements i" , {
    opacity:0
})

tl.pause()


btnicon.addEventListener("click" , function(){
tl.play()    
})

cross.addEventListener("click" , function () {
    tl.reverse()
})