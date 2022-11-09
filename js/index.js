document.querySelector("html").style.height = document.documentElement.clientHeight + "px";
document.querySelector('h2').classList.add('none');
document.querySelector('ul').classList.add('none');
document.querySelector('#bottom').classList.add('none');
start.addEventListener('click', ()=>{
    vibrate();
    qHead.play();
    start.style.display = 'none';
    document.querySelector('h2').classList.remove('none');
    document.querySelector('ul').classList.remove('none');
    document.querySelector('#bottom').classList.remove('none');
})
function vibrate(duration = 300){
    if(navigator.vibrate){
        navigator.vibrate(duration);
    }
}

let counter = 1;
let disable = false;

const next = document.querySelector('.next');
const left = document.querySelector('#left');
const right = document.querySelector('#right');
const main_img = document.querySelector('#main-img');
const number = document.querySelector('.number');
const option = document.querySelectorAll('.options');
const reset = document.querySelector('#resetBtn');
const opt1 = document.querySelector('#opt1');
const opt2 = document.querySelector('#opt2');
const h2 = document.querySelector('h2');



const qHead = document.querySelector("#qHeadAudio");
const wrongAudio = document.querySelector("#wrongAudio");
const rightAudio = document.querySelector("#rightAudio");
const tryAgainAudio = document.querySelector("#tryagainAudio");



fetch('data.json')
.then((response)=>{
    return response.json();
})
.then((data)=>{
    left.textContent = data[counter].left_question;
    right.textContent = data[counter].right_question;
    h2.textContent = data[0].heading_text;
    main_img.src = data[counter].question_image;
    h2.style.backgroundColor = data[0].heading_bgColor;
    h2.style.color = data[0].heading_txtColor;
    number.textContent = counter + '.';
    opt1.textContent = data[counter].options[0];
    opt2.textContent = data[counter].options[1];
    option.forEach((opt)=>{
        if(opt.textContent == data[counter].correct_option){
            opt.classList.add('correct');
        }
    })
  next.addEventListener('click', ()=>{
    vibrate();
    disable = false;

    counter++;
    if(counter < data.length){
        left.textContent = data[counter].left_question;
        right.textContent = data[counter].right_question;
        if(data[counter].question_image !== ""){
            main_img.src = data[counter].question_image;
        }else{
            main_img.src = data[1].question_image;
        }
        number.textContent = counter + '.';
        opt1.textContent = data[counter].options[0];
        opt2.textContent = data[counter].options[1];
        reset.style.visibility = 'hidden';

        option.forEach((opt)=>{
            if(opt.classList.contains('correctStyle') || opt.classList.contains('incorrectStyle')){
                opt.classList.remove('correctStyle');
                opt.classList.remove('incorrectStyle')
            }
            if(opt.classList.contains('correct')){
                opt.classList.remove('correct')
            }
            if(opt.textContent == data[counter].correct_option){
                opt.classList.add('correct');
            }
        })
    }
    else{
        document.write(`<img style="text-align:center; width: clamp(200px, 100%, 600px);" src=${data[0].finish_image}></img>`);
        document.body.style.margin = "0";
        document.body.style.padding = "0";
        document.body.style.display = "flex";
        document.body.style.alignItems = "start";
        document.body.style.justifyContent = "center";
    }
  })
  reset.addEventListener('click', ()=>{
    vibrate();
    disable = false;

    reset.style.visibility = 'hidden';


    option.forEach((opt)=>{
        if(opt.classList.contains('correctStyle') || opt.classList.contains('incorrectStyle')){
            opt.classList.remove('correctStyle');
            opt.classList.remove('incorrectStyle')
        }
    })
  })

    option.forEach((optionElem) => {
    optionElem.addEventListener("click", () => {
        if(!disable){
            disable = true;
            vibrate();
            if (optionElem.classList.contains("correct")) {
                rightAudio.play();
                optionElem.classList.add('correctStyle');
                
            } else {
                wrongAudio.play();
                wrongAudio.addEventListener("ended", ()=> {
                    tryAgainAudio.play();
                    reset.style.visibility = 'visible';
                })
                optionElem.classList.add('incorrectStyle');
            }
        }
    });
    });

})

