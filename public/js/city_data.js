
let modal = document.getElementById('modal_handler');
let cityform = document.getElementById('cityform');
let cityformupdate = document.getElementById('cityformupdate');

$(document).ready(function (){
    get_table_data();
})

// A form is initially added for the implementation of 'required' within the Front-End for preventing empty inputs.
// The listener then listens for submits on that specific form and prevents the default action so it can be handled via JS / AJAX instead.
// After preventing the default behavior, the input data is passed to submit_city_data function which will actually handle the POST.
cityform.addEventListener('submit', function(event) {
    let input = document.getElementById('cityname').value;
    event.preventDefault();
    submit_city_data(input);
})


// Triggers update_data - grabs the new value to replace the old one and grabs the id from the dataset-id attribute and passes it to
// trigger method.
cityformupdate.addEventListener('submit', function(event){
    let input = document.getElementById('citynameupdate');
    let inputValue = input.value;
    let id = input.getAttribute('data-value');
    event.preventDefault();
    update_data(inputValue, id);
})


let submit_city_data = (inputValue) => {
    // The data is being handled via JS and AJAX instead of using Forms therefore the CSRF being brought here in order to prevent 419.
    let token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    $.ajax({
        url: '/cities/store',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': token
        },
        data: {
            name: inputValue,
        },
        success:function(response){
            let responseStatus = response.status;
            if (responseStatus === "cityexists"){
                $('#statusmessage').html("<p class='text-red-500'>City already exists!</p>");
            }
            else if (responseStatus === "citycreated"){
                $('#statusmessage').html("<p class='text-green-500'>City created!</p>");
                get_table_data();
            }
        },
        error:function(xhr, status, error){

            if (xhr.status === 422){
                let errors = xhr.responseJSON.errors;
                $('#statusmessage').empty();
                for (var field in errors) {
                    if (errors.hasOwnProperty(field)) {
                        errors[field].forEach(error => {
                            $('#statusmessage').append("<p class='text-red-500'>" + error + "</p>");
                        });
                    }
                }
            }
        }
    });
}

// This function handles running a GET to the route to trigger the Controller and receive all row data from the cities table.
let get_table_data = () => {
    // The data is being handled via JS and AJAX instead of using Forms therefore the CSRF being brought here in order to prevent 419.
    let token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    $.ajax({
        url: '/cities/data',
        type: 'GET',
        headers: {
            'X-CSRF-TOKEN': token
        },
        success:function(response){
            let city_data = response.city_data;
            // Triggers the populate data function after it gets everything.
            populate_table(city_data);

        },
        error:function(xhr, status, error){

        }
    });
}

// Responsible for handling the table view appending and resetting.
let populate_table = (city_data) => {
    const city_table = document.getElementById('citytable');
    const city_table_body = city_table.querySelector('tbody');
    city_table_body.innerHTML = '';
    // If city data is not empty.
    if (city_data){
        city_data.forEach(data => {
            const row = city_table_body.insertRow();
            
            const city_id = row.insertCell();
            city_id.textContent = data['id'];
            city_id.classList.add('px-4', 'py-2', 'border-solid', 'border-white', 'border-[1px]', 'w-1/3', 'text-center');

            const city_name = row.insertCell();
            city_name.textContent = data['name'];
            city_name.classList.add('px-4', 'py-2', 'border-solid', 'border-white', 'border-[1px]', 'w-1/3', 'text-center');

            const data_handlers = row.insertCell();
            data_handlers.classList.add('px-4', 'py-2', 'border-solid', 'border-white', 'border-[1px]', 'w-1/3', 'text-center');

            const view_button = document.createElement('button');
            view_button.textContent = 'View';
            view_button.classList.add('text-center', 'text-white', 'bg-slate-600', 'hover:bg-slate-500', 'font-semibold', 'rounded-lg', 'px-3');
            view_button.dataset.id = data['id'];
            view_button.dataset.name = data['name'];
            view_button.addEventListener('click', view_modal);

            const update_button = document.createElement('button');
            update_button.textContent = 'Update';
            update_button.classList.add('text-center', 'text-white', 'bg-slate-600', 'hover:bg-slate-500', 'font-semibold', 'rounded-lg', 'px-3');
            update_button.dataset.id = data['id'];
            update_button.dataset.name = data['name'];
            update_button.addEventListener('click', update_modal);

            const delete_button = document.createElement('button');
            delete_button.textContent = 'Delete';
            delete_button.classList.add('text-center', 'text-white', 'bg-slate-600', 'hover:bg-slate-500', 'font-semibold', 'rounded-lg', 'px-3');
            delete_button.dataset.id = data['id'];
            delete_button.dataset.name = data['name'];
            delete_button.addEventListener('click', delete_modal);

            data_handlers.appendChild(view_button);
            data_handlers.appendChild(update_button);
            data_handlers.appendChild(delete_button);

        })
    }

}

// POSTS the Controller to update the data, passing the ID for reference and the new name.
let update_data = (input, id) => {
    let token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    $.ajax({
        url: '/cities/update',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': token
        },
        data: {
            name: input,
            id: id,
        },
        success:function(response){
            let responseStatus = response.status;
            console.log(responseStatus);
            if (responseStatus === "cityexists"){
                $('#updatemessage').html("<p class='text-red-500'>City already exists!</p>");
            }
            else if (responseStatus === "cityupdated"){
                $('#updatemessage').html("<p class='text-green-500'>City name has been updated!</p>");
                get_table_data();
            }
        },
        error:function(xhr, status, error){

            if (xhr.status === 422){
                let errors = xhr.responseJSON.errors;
                $('#updatemessage').empty();
                for (var field in errors) {
                    if (errors.hasOwnProperty(field)) {
                        errors[field].forEach(error => {
                            $('#updatemessage').append("<p class='text-red-500'>" + error + "</p>");
                        });
                    }
                }
            }
        }
    });

}


// Handles data deletion.
let delete_data = () => {
    const delete_button = document.getElementById('deletebutton');
    delete_target = delete_button.getAttribute('data-value');
    let token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    $.ajax({
        url: '/cities/delete',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': token
        },
        data: {
            id: delete_target,
        },
        success:function(response){
            let responseStatus = response.status;
            console.log(responseStatus);
            if (responseStatus === "deletionsuccessful"){
                hide_delete_modal();
                get_table_data();
            }
        },
        error:function(xhr, status, error){

            if (xhr.status === 422){
                let errors = xhr.responseJSON.errors;
                $('#deletemessage').empty();
                for (var field in errors) {
                    if (errors.hasOwnProperty(field)) {
                        errors[field].forEach(error => {
                            $('#updatemessage').append("<p class='text-red-500'>" + error + "</p>");
                        });
                    }
                }
            }
        }
    });
}



// Modal Handlers ---
// Grabs the dataset values from the button for the specific row and creates a paragraph with the name value.
let view_modal = () => {
    const { id, name } = event.target.dataset;
    let current_modal = document.getElementById('view_modal');
    $('#viewinfo').html("<p class='text-center'>" + name + "</p>");
    current_modal.classList.remove('hidden');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

let hide_view_modal = () => {
    $('#statusmessage').empty();
    let current_modal = document.getElementById('view_modal');
    current_modal.classList.add('hidden');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

let update_modal = () => {
    const { id, name } = event.target.dataset;
    const update_input = document.getElementById('citynameupdate');
    update_input.value = name;
    update_input.setAttribute('data-value', id);
    let current_modal = document.getElementById('update_modal');
    current_modal.classList.remove('hidden');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
 
}

let hide_update_modal = () => {
    $('updatemessage').empty();
    let current_modal = document.getElementById('update_modal');
    current_modal.classList.add('hidden');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

let delete_modal = () => {
    const { id, name } = event.target.dataset;
    let current_modal = document.getElementById('delete_modal');
    $('#deletionconfirmation').html("<p class='text-red-500 font-semibold my-4'> Are you sure you want to delete " + name + "?</p>");
    const delete_button = document.getElementById('deletebutton');
    delete_button.setAttribute('data-value', id);
    current_modal.classList.remove('hidden');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

let hide_delete_modal = () => {
    let current_modal = document.getElementById('delete_modal');
    current_modal.classList.add('hidden');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}


let show_modal = () => {
    let current_modal = document.getElementById('input_modal');
    current_modal.classList.remove('hidden');
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

let hide_modal = () => {
    let current_modal = document.getElementById('input_modal');
    current_modal.classList.add('hidden');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

