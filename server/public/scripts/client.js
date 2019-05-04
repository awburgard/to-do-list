$(document).ready(onReady);

function onReady() {
    getTask();
    console.log('Im ready!');
    $('.js-btn-task').on('click', createTask);
    $('.viewTasks').on('click', '.js-btn-delete', deleteTask);
};

function createTask() {
    let task = $('.taskIn').val();
    let completed = $('.completedIn').val();

    let taskToSend = {
        task,
        completed,
    };

    postTask(taskToSend);
};

function getTask() {
    $.ajax({
        type: 'GET',
        url: '/toDo'
    }).then(function (tasks) {
        render(tasks);
    })
};

function postTask(taskToSend) {
    $.ajax({
        type: 'POST',
        url: '/toDo',
        data: taskToSend
    }).then(function (response) {
        getTask();
    });
};

function deleteTask(){

    const id = $(this).parent().parent().data('id');
    console.log(id);

    $.ajax({
        type: 'DELETE',
        url: '/toDo/delete/' + id
    }).then(function(response){
        getTask();
    })
}

function render(tasks) {
    $('.viewTasks').empty();

    for (let task of tasks) {
        $('.viewTasks').append(`
        <tr data-id="${task.id}"></tr>
        <td>${task.task}</td>
        <td>${task.completed}</td>
        <td><button class="js-btn-delete">Delete</button></td>`
        )
    }
};