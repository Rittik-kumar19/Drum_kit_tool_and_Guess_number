const keys=document.querySelectorAll(".key");

// selector on window
window.addEventListener("keydown",function(e){
    // console.log(e);
    // to get the audio using the key code
    const audio=document.querySelector(`audio[data-key="${e.keyCode}"]`);
    console.log(audio);
    // to get the key using the key code
    const key=document.querySelector(`.key[data-key="${e.keyCode}"]`)

    // if we have presses anyother key rathet than specified then we will return
    if(!audio){
        return;
    }

    // everytime a key is pressed we will statrt the audio from start 
    audio.currentTime=0;
    // start playing audio
    audio.play();
    // we will add the class of playing only when the key is clicked
    key.classList.add("playing")
})



// when the transition is completed we will remove the playing class
const removeTransition=function(e){
    console.log(e);
    if(e.propertyName!='transform'){
        return;
    }
    this.classList.remove("playing");
}

// eveent listener will be added when the transition is completed 
keys.forEach(function(key){
    key.addEventListener("transitionend",removeTransition);
})

