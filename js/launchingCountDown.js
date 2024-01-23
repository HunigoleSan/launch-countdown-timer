import { statesFunctions } from "./states.js";
import { changeModal } from "./change-launching-modal.js";
import { createElement } from "./create-element.js";
import { randomNumberArray } from "./random-number.js";
window.addEventListener("DOMContentLoaded", function () {
    
    let launching_HTML = document.getElementById("launching")
    let countDownNumbers = document.querySelectorAll(".countdown__number")
    let send_HTML = document.getElementById("send")
    let date_HTML = document.getElementById("date")
    /* const fechaActual = new Date().toISOString().split('T')[0];
    date_HTML.min = fechaActual */

    let dateGlobal = 0
    let memoryDateGlobal = null
    let finish_HTML = document.getElementById("finish")
    let clickState = false
    let validationCompleted = false

    function renderDate() {
        let currentDay = new Date();
        let differenceTime = dateGlobal - currentDay.getTime()
        let days = String(Math.floor(differenceTime / 86400000)).padStart(2, '0');
        let hours = String(Math.floor((differenceTime % 86400000) / 3600000)).padStart(2, '0');
        let minutes = String(Math.floor(((differenceTime % 86400000) % 3600000) / 60000)).padStart(2, '0');
        let seconds = String(Math.floor((((differenceTime % 86400000) % 3600000) % 60000) / 1000)).padStart(2, '0');
        let finishCompleted = false

        if (differenceTime >= 0) {
            countDownNumbers.forEach((currentValue) => {
                let numberClass = currentValue.classList[1]
                if (numberClass == "days") {
                    if(currentValue.textContent != days ){
                        let countDownDay = document.getElementById("countDownDay")
                        let countNumberDay = createElement("p")
                        currentValue.insertAdjacentElement("beforebegin",countNumberDay)
                        countNumberDay.className = "countdown__number animationTimer"
                        let animationSelect = randomNumberArray()
                        countNumberDay.classList.add(animationSelect)
                        countNumberDay.textContent =String(parseInt(days)+1).padStart(2,'0') 
                        if(currentValue.textContent == "00"){
                            countNumberDay.textContent = "00"
                        }
                        currentValue.textContent = days
                        setTimeout(function(){
                            countDownDay.removeChild(countNumberDay)
                        },3000)
                    }
                } else if (numberClass == "hours") {
                    if(currentValue.textContent != hours ){
                        let countDownHour = document.getElementById("countDownHour")
                        let countNumberHour = createElement("p")
                        currentValue.insertAdjacentElement("beforebegin",countNumberHour)
                        countNumberHour.className= "countdown__number animationTimer"
                        let animationSelect = randomNumberArray()
                        countNumberHour.classList.add(animationSelect)
                        countNumberHour.textContent =String(parseInt(hours)+1).padStart(2,'0') 
                        
                        if(currentValue.textContent == "00"){
                            countNumberHour.textContent = "00"
                        }
                        currentValue.textContent = hours
                        setTimeout(function(){
                            countDownHour.removeChild(countNumberHour)
                        },3000)
                    }
                } else if (numberClass == "minutes") {
                    if(currentValue.textContent != minutes ){
                        let countDownMinute = document.getElementById("countDownMinutes")
                        let countNumberMinute = createElement("p")
                        currentValue.insertAdjacentElement("beforebegin",countNumberMinute)
                        countNumberMinute.className= "countdown__number animationTimer"
                        let animationSelect = randomNumberArray()
                        countNumberMinute.classList.add(animationSelect)
                        countNumberMinute.textContent =String(parseInt(minutes)+1).padStart(2,'0') 
                        
                        if(currentValue.textContent == "00"){
                            countNumberMinute.textContent = "00"
                        }
                        currentValue.textContent = minutes
                        setTimeout(function(){
                            countDownMinute.removeChild(countNumberMinute)
                        },3000)
                    }
                } else if (numberClass == "seconds") {
                    if(currentValue.textContent != seconds ){
                        let countDownSecond= document.getElementById("countDownSecond")
                        let countNumberSecond = createElement("p")
                        currentValue.insertAdjacentElement("beforebegin",countNumberSecond)
                        countNumberSecond.className = "countdown__number animationTimer"
                        let animationSelect = randomNumberArray()
                        countNumberSecond.classList.add(animationSelect)

                        countNumberSecond.textContent =String(parseInt(seconds)+1).padStart(2,'0') 
                        if(currentValue.textContent == "00"){
                            countNumberSecond.textContent = "00"
                        }

                        currentValue.textContent = seconds
                        setTimeout(function(){
                            countDownSecond.removeChild(countNumberSecond)
                        },3000)
                    }
                } else {
                    console.error("Error en el sistema")
                }
            });
            if(days == "00" && hours == "00" && minutes == "00" && seconds == "00"){
                validationCompleted = true
            }
        } else {
            if(validationCompleted){
                finishCompleted = true
                finish_HTML.textContent = "LAUNCH COMPLETED!"
                finish_HTML.classList.add("finishAnimation")
                setTimeout(function () {
                    finish_HTML.textContent = ""
                    finish_HTML.classList.remove("finishAnimation")
                }, 3000)
                validationCompleted = false
            }else{
                if(dateGlobal === null){
                    finish_HTML.textContent = "You must enter a time later than your current time"
                    finish_HTML.classList.add("finishAnimation")
                    setTimeout(function () {
                        finish_HTML.textContent = ""
                        finish_HTML.classList.remove("finishAnimation")
                    }, 3000)
                    return console.log("empezo siendo nulo, la ejecucion se detiene")
                }else{
                    finish_HTML.textContent = "You must enter a time later than your current time"
                    finish_HTML.classList.add("finishAnimation")
                    setTimeout(function () {
                        finish_HTML.textContent = ""
                        finish_HTML.classList.remove("finishAnimation")
                    }, 3000)
                }
                dateGlobal = memoryDateGlobal
                console.log(dateGlobal)
            }
        }
        memoryDateGlobal = dateGlobal
        if (finishCompleted == false) {
            taskDelayed()
        } else {
            console.log("Bucle Timer finalizado")
            finishCompleted = false
            dateGlobal = 0
            memoryDateGlobal = null
        }
    }

    function taskDelayed() {
        function execute() {
            setTimeout(renderDate, 1000);
        }
        execute();
    }

    function getDate() {
        if (clickState == false) {
            let date_HTML = document.getElementById("date").value
            let hours_HTML = document.getElementById("hours").value.padStart(2, '0')
            let minutes_HTML = document.getElementById("minutes").value.padStart(2, '0')
            let launchingDate = new Date(`${date_HTML}T${hours_HTML}:${minutes_HTML}:00`);
            dateGlobal = launchingDate.getTime()
            clickState = true
            if (isNaN(dateGlobal)) {
                console.log("Por favor registre una fecha")
                finish_HTML.textContent = "You must enter a date"
                statesFunctions.emptyDate(finish_HTML, function (state) {
                    clickState = state
                });
            } else if (memoryDateGlobal == null) {

                renderDate()
                clickState = false
            } else if (dateGlobal != memoryDateGlobal) {
                dateGlobal = memoryDateGlobal
                console.log("realizar pregunta modal")
                launching_HTML.insertAdjacentHTML("afterbegin", changeModal)

                let changeModalCard = document.getElementById("changeModal")
                let changeModalYes = document.getElementById("changeModalYes")
                let changeModalNo = document.getElementById("changeModalNo")

                changeModalYes.addEventListener("click", function () {
                    launching_HTML.removeChild(changeModalCard)
                    console.log("fecha cambiado")
                    dateGlobal = launchingDate.getTime()
                })
                changeModalNo.addEventListener("click", function () {
                    launching_HTML.removeChild(changeModalCard)
                })
                clickState = false
            } else {
                clickState = false

            }
        } else {
            console.log("Por favor espere a que finalice el tiempo de espera")
        }
    }
    send_HTML.addEventListener("click", getDate)

})
