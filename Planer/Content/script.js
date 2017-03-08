$(document).ready(function () {
    $('.addTaskJs').on('click', function () {
        $('.form_container').toggleClass('open');
    });
});

$(document).on('click', '.submitJs', function () {
    var form = $(this).closest('form');
    if (simpleValidateForm(form)) {
        submitTask(form);
    }
    return false;
});

$(document).on('click', '.taskRemoveJs', function () {
    var taskId = parseInt($(this).attr('data-task-id'), 10);
    var action = $(this).attr('data-delete-url');
    if (taskId > 0 && action != '') {       
        if (confirm("Вы уверенны?")) {
            deleteTask(taskId, action);
        }
    }
});

$(document).on('click', '.taskEditJs', function () {
    $('.tasks_area .edit_form').remove();
    $('.tasks_area tr td').css('display', 'table-cell');

    var parentTr = $(this).closest('tr');
    var title = $(parentTr).find('.jsTitle > span').text().trim();
    var description = $(parentTr).find('.jsDescription > span').text().trim();
    var sort = parseInt($(parentTr).find('.jsSort > span').text(), 10);
    var id = parseInt($(this).attr('data-task-id'), 10);


    var formView = getTaskEditForm(id, title, description, sort);
    if (formView) {
        $(this).closest('tr').find('td').hide();
        $(this).closest('tr').append(formView);
    }
    return false;
});
$(document).on('click', '.cancelJs', function () {
    var parentTr = $(this).closest('tr');
    $(parentTr).find('.edit_form').remove();
    $(parentTr).find('td').css('display', 'table-cell');
});