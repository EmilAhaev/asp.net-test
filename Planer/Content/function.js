function submitTask(formSelector)
{
    var sendData = $(formSelector).serialize();
    var action = $(formSelector).attr('action');
    $.ajax({
        url: action,
        type: "POST",
        data: sendData,
        cache: false,
        success: function (data) {
            updateTaskList();
            $('.form_container').removeClass('open');
            $(formSelector)[0].reset();

        }
    });
}
function updateTaskList()
{    
    $.ajax({
        url: '/Home/TaskList',
        type: "POST",
        data: '',
        cache: false,
        success: function (data) {
            $('.tasks_area').html(data);
        }
    });
}

function deleteTask(taskId, action)
{    
    if (taskId > 0 && action != '') {       
        $.ajax({
            url: action,
            type: "POST",
            data: { 'id': taskId },
            cache: false,
            success: function (data) {
                updateTaskList();
                $('#castom_modal').hide();
            }
        });
    }        
}

function simpleValidateForm(formSelector)
{
    var requiredInputs = $(formSelector).find('.required');
    var errors = 0;
    $.each(requiredInputs, function (index, value) {
        if ($(value).val() != '') {
            if ($(value).hasClass('error')) {
                $(value).removeClass('error');
            }          
        } else {
            $(value).addClass('error');
            errors++;
        }

    });
    if (errors > 0) {
        return false;
    } else {
        return true;
    }
}
function getTaskEditForm(id, title, description, sort)
{
    return $.ajax({
        url: '/Home/GetTaskEditForm',
        type: "POST",
        data: { 'id': id, 'title': title, 'description': description, 'sort': sort, 'id': id},
        cache: false,
        async: false,
        success: function (data) {

        }
    }).responseText;
    
}
