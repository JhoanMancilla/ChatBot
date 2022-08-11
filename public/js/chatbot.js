$(document).ready(function(){
    $('.ChatBot').click(function(event){
        $('.ChatBox').toggleClass('active');
        $('.text').toggleClass('chat');
        $('.chat-popup').toggleClass('show');

        //Inicio del Bot
        bienvenida();
    })

var token=0;
let control = 0;

const submitBtn = document.querySelector('.submit');
const chatArea = document.querySelector('.chat-area');
const inputElm = document.querySelector('input');
let nombre = '';
let consulta='';
let mensajes = []


$('input').bind("enterKey",function(e){
    recibir();
    $('.chat-area').scrollTop = $('.chat-area').scrollHeight;
});

$('input').keyup(function(e){
     if(e.keyCode == 13)
     {
        $(this).trigger("enterKey");
     }
})



function bienvenida(){
    var ajax=$.ajax({
        type:'POST',
        url: 'https://ingsistemasufps.es/api/bot/',
        data:{'text':'hola'}
        })
    if(control==0){
        typing();
        ajax.done(function(response){
         let resp = response;
            if(resp.status==200){
                mensaje(resp.message);
                
        }
        
      })
    }
    control++;
}

submitBtn.addEventListener('click', ()=>{
    recibir();
})

function transporte(data){
    if(token!=0){
        var ajax=$.ajax({
            headers:{"x-access-token": token},
            type:'POST',
            url: 'https://ingsistemasufps.es/api/bot/',
            data:{'text':data}
            });    
    }else{
        var ajax=$.ajax({
            type:'POST',
            url: 'https://ingsistemasufps.es/api/bot/',
            data:{'text':data}
            });
    }
        typing();
        ajax.done(function(response){
            let resp = response;
            if(resp.status==200){
                if(resp?.token){
                    token = resp.token;
                }
               mensaje(resp.message); 
            }
            
        })
}

function recibir(){
    var now = new Date(Date.now());
    var hora = now.getHours() + ":" + now.getMinutes();
    let userInput = $('#campo').val();
    mensajes.push(userInput);
    transporte(userInput);
    console.log(userInput);
    let temp = `<div class="out-msg">
    <span class="my-msg">${userInput}</span><span class="hora2">${hora}</span>
    </div>`;
    chatArea.insertAdjacentHTML("beforeend", temp);
    $('#campo').val('');
    inputElm.value = '';
}


function typing(){
    let temp='';
    temp = '<div class="typing_loader"></div>';
    chatArea.insertAdjacentHTML("beforeend", temp);
    inputElm.value = '';
}

function mensaje(mensaje2) {
    var now = new Date(Date.now());
    var hora = now.getHours() + ":" + now.getMinutes();
    $( ".typing_loader" ).remove();
    let temp='';
    temp =`<div class="income-msg">
    <img src="/img/logoChat.png" class="avatar" alt="">
    <div class="set">
    <span class="msg">${mensaje2}</span>
    <span class="hora">${hora}</span></div>
    </div>`;
    chatArea.insertAdjacentHTML("beforeend", temp);
    inputElm.value = '';  
}


})

