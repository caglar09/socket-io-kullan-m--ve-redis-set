var socket=io.connect('http://localhost:4000');

let message=document.getElementById('message');
let handle=document.getElementById('handle');
let btn=document.getElementById('send');
let output=document.getElementById('output');
let feedback=document.getElementById('feedback');



let regex = "/<(.|\n)*?>/";

btn.addEventListener('click',function(){
    //message.value=message.value.replace(regex,message.value);
    socket.emit('chat',{
        message:message.value,
        handle:handle.value,
        date:Date.now()
    });
    message.value="";
})

message.addEventListener('keypress',function(){
    socket.emit('typing',handle.value)
})

socket.on('chat',function(data){
    feedback.innerHTML="";
    output.innerHTML+='<p><strong>'+data.handle+':</strong>  '+data.message+'</p>';
})
socket.on('typing',function(data){
    feedback.innerHTML='<p><em>'+data+' : is typing a message...</em></p>';
})