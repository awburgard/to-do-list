$(document).ready(onReady);

function onReady() {
    getTask();
    console.log('Im ready!');
    $('.js-btn-task').on('click', createTask);
    $('.viewTasks').on('click', '.js-btn-delete', deleteTask);
    $('.viewTasks').on('click', '.js-btn-update', completeTask);
    $('.finished-tasks-table').on('click', '.js-btn-delete', deleteTask);
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
    $('.finished-tasks-table').empty();

    const notCompleteArray = [];
    const completedArray = [];

    for (let task of tasks) {
        if (task.completed == true) {
            completedArray.push(task);
        } else {
            notCompleteArray.push(task);
        }
    }

    for (let task of notCompleteArray) {
        let completed = 'No';

        if (task.completed) {
            completed = 'Yes';
        }

        let markCompletedElement = `<td></td>`;

        if (task.completed == false) {
            markCompletedElement = `<td><button class="js-btn-update btn btn-success">Complete Task</button></td>`
        }
        $('.viewTasks').append(`
        <tr data-id="${task.id}">
        <td>${task.task}</td>
        ${markCompletedElement}
        <td><button class="js-btn-delete btn btn-danger">Delete</button></td>
        </tr>`
        )
    }

    for (let task of completedArray) {
        $('.finished-tasks-table').append(`
        <tr data-id="${task.id}">
        <td>${task.task}</td>
        <td><button class="js-btn-delete btn btn-danger">Delete</button></td>
        </tr>
        `);
    };
};