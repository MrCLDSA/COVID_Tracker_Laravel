
let modal = document.getElementById('modal_handler');
let createform = document.getElementById('createform');
let updateform = document.getElementById('updateform');
let uniquedata = [];



// A form is initially added for the implementation of 'required' within the Front-End for preventing empty inputs.
// The listener then listens for submits on that specific form and prevents the default action so it can be handled via JS / AJAX instead.
// After preventing the default behavior, the input data is passed to submit_city_data function which will actually handle the POST.
createform.addEventListener('submit', function(event) {
    let input = document.getElementById('barangayname').value;
    let dropdown = document.getElementById('citynameselect');
    let selected_city_index = dropdown.options[dropdown.selectedIndex];
    let selected_city_id = selected_city_index.value;
    event.preventDefault();
    submit_data(input, selected_city_id);
})


// Triggers update_data - grabs the new value to replace the old one and grabs the id from the dataset-id attribute and passes it to
// trigger method.
updateform.addEventListener('submit', function(event){
    let input = document.getElementById('barangaynameupdate');
    let inputValue = input.value;
    let id = input.getAttribute('data-value');
    let dropdown = document.getElementById('citynameselectupdate');
    let selected_city_index = dropdown.options[dropdown.selectedIndex];
    let selected_city_id = selected_city_index.value;
    event.preventDefault();
    update_data(inputValue, id, selected_city_id);
})


// Runs a GET to the Cities Data in order to get a reference of all City names and IDs and passes it to the update dropdown method.
let get_dropdown_data = () => {
    let token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    $.ajax({
        url: '/cities/data',
        type: 'GET',
        headers: {
            'X-CSRF-TOKEN': token
        },
        success:function(response){
            let data = response.city_data;
            // Triggers the populate data function after it gets everything.
            update_dropdown_data(data);

        },
        error:function(xhr, status, error){

        }
    });

}

// Fills the dropdown selection for both updates and create with values from the Cities table.
// The name serves as the dropdown text while the Foreign Key / Primary ID of City serve as the value.
let update_dropdown_data = (data) => {
    const selectionid = document.getElementById('citynameselect');
    const selectionidupdate = document.getElementById('citynameselectupdate');
    if (data){
        data.forEach(data => {
            if (!uniquedata.includes(data.name)){
                let option = document.createElement('option');
                option.value = data['id'];
                option.text = data['name'];
                let option_clone = option.cloneNode(true);
                selectionid.add(option);
                selectionidupdate.add(option_clone);
                uniquedata.push(data['name']);
            }


        });
    }
    
}


let submit_data = (inputValue, city_id) => {
    // The data is being handled via JS and AJAX instead of using Forms therefore the CSRF being brought here in order to prevent 419.
    let token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    $.ajax({
        url: '/barangays/store',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': token
        },
        data: {
            name: inputValue,
            city_id: city_id
        },
        success:function(response){
            let responseStatus = response.status;
            if (responseStatus === "barangayexists"){
                $('#statusmessage').html("<p class='text-red-500'>Barangay already exists!</p>");
            }
            else if (responseStatus === "barangaycreated"){
                $('#statusmessage').html("<p class='text-green-500'>Barangay created!</p>");
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
        url: '/barangays/data',
        type: 'GET',
        headers: {
            'X-CSRF-TOKEN': token
        },
        success:function(response){
            let data = response.data;
            // Triggers the populate data function after it gets everything.
            populate_table(data);

        },
        error:function(xhr, status, error){

        }
    });
}

// Responsible for handling the table view appending and resetting.
let populate_table = (data) => {
    const main_table = document.getElementById('maintable');
    const main_table_body = main_table.querySelector('tbody');
    main_table_body.innerHTML = '';
    // If city data is not empty.
    if (data){
        data.forEach(data => {
            const row = main_table_body.insertRow();
            
            const barangay_id = row.insertCell();
            barangay_id.textContent = data['id'];
            barangay_id.classList.add('px-4', 'py-2', 'border-solid', 'border-white', 'border-[1px]', 'w-1/4', 'text-center');

            const barangay_name = row.insertCell();
            barangay_name.textContent = data['name'];
            barangay_name.classList.add('px-4', 'py-2', 'border-solid', 'border-white', 'border-[1px]', 'w-1/4', 'text-center');

            const city_name = row.insertCell();
            city_name.textContent = data.city.name;
            city_name.classList.add('px-4', 'py-2', 'border-solid', 'border-white', 'border-[1px]', 'w-1/4', 'text-center');

            const data_handlers = row.insertCell();
            data_handlers.classList.add('px-4', 'py-2', 'border-solid', 'border-white', 'border-[1px]', 'w-1/4', 'text-center');

            const view_button = document.createElement('button');
            view_button.textContent = 'View';
            view_button.classList.add('text-center', 'text-white', 'bg-slate-600', 'hover:bg-slate-500', 'font-semibold', 'rounded-lg', 'px-3');
            view_button.dataset.id = data['id'];
            view_button.dataset.name = data['name'];
            view_button.dataset.cityid = data['city_id'];
            view_button.dataset.cityname = data.city.name;
            view_button.addEventListener('click', view_modal);

            const update_button = document.createElement('button');
            update_button.textContent = 'Update';
            update_button.classList.add('text-center', 'text-white', 'bg-slate-600', 'hover:bg-slate-500', 'font-semibold', 'rounded-lg', 'px-3');
            update_button.dataset.id = data['id'];
            update_button.dataset.name = data['name'];
            update_button.dataset.cityid = data['city_id'];
            update_button.dataset.cityname = data.city.name;
            update_button.addEventListener('click', update_modal);

            const delete_button = document.createElement('button');
            delete_button.textContent = 'Delete';
            delete_button.classList.add('text-center', 'text-white', 'bg-slate-600', 'hover:bg-slate-500', 'font-semibold', 'rounded-lg', 'px-3');
            delete_button.dataset.id = data['id'];
            delete_button.dataset.name = data['name'];
            delete_button.dataset.cityid = data['city_id'];
            delete_button.dataset.cityname = data.city.name;
            delete_button.addEventListener('click', delete_modal);

            data_handlers.appendChild(view_button);
            data_handlers.appendChild(update_button);
            data_handlers.appendChild(delete_button);


        })
    }

}

// POSTS the Controller to update the data, passing the ID for reference and the new name, and the new City ID.
let update_data = (input, id, city_id) => {
    let token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    $.ajax({
        url: '/barangays/update',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': token
        },
        data: {
            name: input,
            id: id,
            city_id: city_id
        },
        success:function(response){
            let responseStatus = response.status;
            console.log(responseStatus);
            if (responseStatus === "barangayexists"){
                $('#updatemessage').html("<p class='text-red-500'>Barangay already exists!</p>");
            }
            else if (responseStatus === "barangayupdated"){
                $('#updatemessage').html("<p class='text-green-500'>Barangay name has been updated!</p>");
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
        url: '/barangays/delete',
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
    const { id, name, cityname } = event.target.dataset;
    let current_modal = document.getElementById('view_modal');
    $('#viewinfo').html("<p class='text-center mx-4'>" + name + "</p>");
    $('#viewinfocity').html("<p class='text-center mx-4'>" + cityname + "</p>");
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
    const update_input = document.getElementById('barangaynameupdate');
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

$(document).ready(function (){
    get_table_data();
    get_dropdown_data();
})