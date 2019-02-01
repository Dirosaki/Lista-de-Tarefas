let body = document.querySelector('body');
let listElement = document.querySelector('ul');
let inputElement = document.querySelector('input');
let buttonElement = document.querySelector('.button-disable');
let buttonElement1 = document.querySelector('.button1-disable');
let buttonElement2 = document.querySelector('.button2-disable');

let todos = JSON.parse(localStorage.getItem('list_todos')) || ['Diego'];

setInterval(function(){
    if(inputElement.value.trim() != ""){
        buttonElement.classList.add('button-active');
        buttonElement.classList.remove('button-disable');
        buttonElement.disabled = false;
    }else{
        buttonElement.classList.remove('button-active');
        buttonElement.classList.add('button-disable');
        buttonElement.disabled = true;
    }
}, 100);

setInterval(() => {
    if(listElement.innerHTML.length != 0){
        buttonElement2.classList.add('button2-active');
        buttonElement2.classList.remove('button2-disable');
        buttonElement2.disabled = false;
    }else{
        buttonElement2.classList.remove('button2-active');
        buttonElement2.classList.add('button2-disable');
        buttonElement2.disabled = true;
    }
}, 200)

function renderTodos(){
    listElement.innerHTML = '';
    for (todo of todos){
        let todoElement = document.createElement('li');
        let todoText = document.createTextNode(todo);

        let linkElement = document.createElement('a');
        let spanElement = document.createElement('span');

        linkElement.setAttribute('href', '#');

        let pos = todos.indexOf(todo);
        linkElement.setAttribute('onclick', 'deleteTodo(' + pos + ')');

        // let linkText = document.createTextNode('Excluir');
        let lixeira = document.createElement('i');
        let confirm = document.createElement('i');
        // let spanText = document.createTextNode('Concluir');


        // linkElement.appendChild(linkText);
        // spanElement.appendChild(spanText);

        todoElement.appendChild(todoText);
        todoElement.appendChild(linkElement);
        todoElement.appendChild(spanElement);
        linkElement.appendChild(lixeira);
        spanElement.appendChild(confirm);
        listElement.appendChild(todoElement);
    }
}



function teste(){
    if(listElement.innerHTML != ""){
        let confirms = document.querySelectorAll('span>i');
        let lixos = document.querySelectorAll('a>i');
        let tarefas = document.querySelectorAll('li');

        for(let tarefa of tarefas){
            tarefa.onclick = () => {
                tarefa.classList.toggle('confirmation');
                
                // return;
            }
            buttonElement1.onclick = () => {
            for(tarefa of tarefas){
                    tarefa.classList.toggle('confirmation');
                }
            }
            
        }

        buttonElement1.classList.add('button1-active');
        buttonElement1.classList.remove('button1-disable');

        for(let confirm of confirms){
            confirm.classList.add('fas');
            confirm.classList.add('fa-check'); 
        }

        for(let lixo of lixos){
            lixo.classList.add('fas');    
            lixo.classList.add('fa-trash-alt');    
        }
        
    }else{
        buttonElement1.classList.remove('button1-active');
        buttonElement1.classList.add('button1-disable');
    }
    return;
}


setInterval(teste, 200);

renderTodos();

function addTodo(){
    let todoText = inputElement.value;
    
    if(todoText.trim()){
        todos.push(todoText);
    inputElement.value = '';
    
    renderTodos();
    saveToStorage();
    // teste();
    }else{
        alert('Campo em Branco');
    }    
}

onkeyup = (evento) => (evento.key == "Enter") ? addTodo() : 0;

buttonElement.onclick = () => addTodo();


let deleteTodo = (pos) => {
    todos.splice(pos, 1);
    renderTodos();
    saveToStorage();
}

buttonElement2.onclick = () => {
    deleteTodo2();
}

let deleteTodo2 = (pos) => {
    todos.splice(pos);
    renderTodos();
    saveToStorage();
}

let saveToStorage = () => localStorage.setItem('list_todos', JSON.stringify(todos));