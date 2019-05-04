$(document).ready(onReady);

function onReady(){
    console.log('Im ready!');
    $('.js-btn-task').on('click', createTask);
};

function createTask(){
    let task = $('.taskIn').val();
    let completed = $('.completedIn').val();

    let taskToSend = {
        task,
        completed,
    };

    postTask(taskToSend);
};

function postTask(taskToSend){
    $.ajax({
        type: 'POST',
        url: '/toDo',
        data: taskToSend
    }).then(function(response){
        console.log(response);
        //getTask();
    });
};