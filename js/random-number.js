let animationCountNumbers = [
    "animationTimerOne",
    "animationTimerTwo",
    "animationTimerThree"
]
function randomNumberArray(){
    let randomNumber = Math.floor(Math.random()* animationCountNumbers.length)
    let animationSelect = String(animationCountNumbers[randomNumber])
    return animationSelect
}
export {randomNumberArray}

