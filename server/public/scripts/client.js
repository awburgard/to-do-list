$(document).ready(onReady);

function onReady() {
    getTask();
    console.log('Im ready!');
    $('.js-btn-task').on('click', createTask);
    $('.viewTasks').on('click', '.js-btn-delete', deleteTask);
    $('.viewTasks').on('click', '.js-btn-update', completeTask);
};

function createTask() {
    let task = $('.taskIn').val();
    let completed = $('.completedIn').val();

    let taskToSend = {
        task,
        completed,
    };

    postTask(taskToSend);
    $('.taskIn').val('');
    $('.completedIn').val('');
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
        swal("Good job!", "Your task has been added!", "success", {
            button: "Boo-yah!",
        });
        getTask(response);
    }).catch(function (response) {
        swal("Crap!", "There was an error adding your task!", "error", {
            button: "Boo!",
        });
    });
};

function completeTask() {
    let id = $(this).parent().parent().data('id');

    $.ajax({
        type: 'PUT',
        url: '/toDo/completed/' + id
    }).then(function (response) {
        getTask();
    })
}

function deleteTask() {
    const id = $(this).parent().parent().data('id');
    
    $.ajax({
        type: 'DELETE',
        url: '/toDo/delete/' + id
    }).then(function (response) {
        getTask();
    })
}

function render(tasks) {
    $('.viewTasks').empty();

    for (let task of tasks) {
        $('.viewTasks').append(`
        <tr data-id="${task.id}">
        <td>${task.task}</td>
        <td>${task.completed}</td>
        <td><button class="js-btn-update">Complete Task</button></td>
        <td><button class="js-btn-delete">Delete</button></td>
        </tr>`
        )
    }
};