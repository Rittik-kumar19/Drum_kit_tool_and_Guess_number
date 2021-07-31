let msgElement=document.querySelector(".result-div");
let noDisplayElement=document.querySelector(".no-display");
let highLowElement=document.querySelector(".higher-lower");
let btnElement=document.querySelector(".btn");

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new window.SpeechRecognition();
let number;

// to get a random number
let randomNumber=getRandomNumber();
console.log(randomNumber);

// recognition will start after clicking the button 
btnElement.addEventListener("click",function(){
    btnElement.style.display="none";
    console.log("button clicked");
    recognition.start();
    msgElement.innerHTML="Guess the number";
})

// as the speech is recognized we will fire this function
recognition.addEventListener("result",function(e){
    number=e.results[0][0].transcript;
    console.log(number);
    
    printMessage(number);
    checkNumber(number);
})

// function that generates random number
function getRandomNumber(){
    let ans=Math.trunc(Math.random()*100);
    return ans;
}

function printMessage(number){
    noDisplayElement.innerHTML=`<div>Number you said</div><span class="box">${number}<span>`;
}

function checkNumber(number){
    let numberToCheck= Number(number)
    // console.log(number);

    if(Number.isNaN(numberToCheck)){
        msgElement.innerHTML="Please say a valid Number";
        return;
    }

    if(numberToCheck>100 || numberToCheck<0){
        msgElement.innerHTML="<div>Please say a valid Number between 0 and 100 </div>";
        console.log("invalid");
    }else if(numberToCheck==randomNumber){
            document.body.innerHTML = `
        <h2 class="play-again">Congrats! You have guessed the number!</h2><br>
        <span class="result">It was ${number}</span>
        <br>
        <button class="play-again-btn" id="play-again">Play Again</button>
        `;

        console.log("bingo");
    }else if(numberToCheck>randomNumber){
        msgElement.innerHTML='';
        highLowElement.innerHTML='<div>GO LOWER</div>';
        console.log("low");
    }else if(numberToCheck<randomNumber){
        msgElement.innerHTML='';
        highLowElement.innerHTML='<div>GO HIGHER</div>';
    }
}

// as soon as recognition end we will start it again
recognition.addEventListener("end", function(){
    recognition.start()
});

// as we click on the play again the window will be reloded again
document.body.addEventListener('click', function(e){
    if (e.target.id == 'play-again') {
      window.location.reload();
    }
});