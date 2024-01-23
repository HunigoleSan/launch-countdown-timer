let statesFunctions = {
    currentState : null,
    emptyDate: function(finish_HTML,callback){
        statesFunctions.currentState = "emptyDate";
        finish_HTML.classList.add("finishAnimation")
        setTimeout(function(){
            finish_HTML.textContent = "";
            finish_HTML.classList.remove("finishAnimation")
            callback(false)
        },3000)
        
    }
}



export {statesFunctions};