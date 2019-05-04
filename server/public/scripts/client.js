$(document).ready(onReady);

function onReady(){
    console.log('Im ready!');
    $('.js-btn-task').on('click', postTask);
};

function postTask(){
    console.log('I work!');
}