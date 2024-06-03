
let modal = document.getElementById('modal_handler');
let createform = document.getElementById('createform');
let updateform = document.getElementById('updateform');
let case_dropdown_global = document.getElementById('casetypeselect');
let case_dropdown_update_global = document.getElementById('casetypeselectupdate');
let coronaselection = document.getElementById('coviddiv');
let coronaselectionupdate = document.getElementById('coviddivupdate');
let uniquedata = [];



// A form is initially added for the implementation of 'required' within the Front-End for preventing empty inputs.
// The listener then listens for submits on that specific form and prevents the default action so it can be handled via JS / AJAX instead.
// After preventing the default behavior, the input data is passed to submit_city_data function which will actually handle the POST.
createform.addEventListener('submit', function(event) {
    let name_input = document.getElementById('patientname').value;

    let barangay_dropdown = document.getElementById('barangaynameselect');
    let selected_barangay_index = barangay_dropdown.options[barangay_dropdown.selectedIndex];
    let selected_barangay_id = selected_barangay_index.value;

    let number_input = document.getElementById('phonenumber').value;

    let email_input = document.getElementById('email').value;

    let case_dropdown = document.getElementById('casetypeselect');
    let selected_case_index = case_dropdown.options[case_dropdown.selectedIndex];
    let selected_case_value = selected_case_index.value;

    
    let covid_status = "";

    if (selected_case_value === "POSITIVE"){
        let covid_dropdown = document.getElementById('covidstatusselect');
        let selected_covid_index = covid_dropdown.options[covid_dropdown.selectedIndex];
        covid_status = selected_covid_index.value;
    }

    else {
        covid_status = "NONE";
    }



    event.preventDefault();
    submit_data(name_input, selected_barangay_id, number_input, email_input, selected_case_value, covid_status);
})

case_dropdown_global.addEventListener('change', function(event){
    let selected_case_index = case_dropdown_global.options[case_dropdown_global.selectedIndex];
    let selected_case_value = selected_case_index.value;


    if (selected_case_value === "POSITIVE" && coronaselection.classList.contains('hidden')){
        coronaselection.classList.add('block');
        coronaselection.classList.remove('hidden');
    }
    else if (selected_case_value !== "POSITIVE" && coronaselection.classList.contains('block')){
        coronaselection.classList.remove('block');
        coronaselection.classList.add('hidden');
    }
})

case_dropdown_update_global.addEventListener('change', function(event){
    let selected_case_index = case_dropdown_update_global.options[case_dropdown_update_global.selectedIndex];
    let selected_case_value = selected_case_index.value;


    if (selected_case_value === "POSITIVE" && coronaselectionupdate.classList.contains('hidden')){
        coronaselectionupdate.classList.add('block');
        coronaselectionupdate.classList.remove('hidden');
    }
    else if (selected_case_value !== "POSITIVE" && coronaselectionupdate.classList.contains('block')){
        coronaselectionupdate.classList.remove('block');
        coronaselectionupdate.classList.add('hidden');
    }
})


// Triggers update_data - grabs the new value to replace the old one and grabs the id from the dataset-id attribute and passes it to
// trigger method.
updateform.addEventListener('submit', function(event){
    let name_input_container = document.getElementById('patientnameupdate');
    let name_input = document.getElementById('patientnameupdate').value;
    let id = name_input_container.getAttribute('data-value');

    let barangay_dropdown = document.getElementById('barangaynameselectupdate');
    let selected_barangay_index = barangay_dropdown.options[barangay_dropdown.selectedIndex];
    let selected_barangay_id = selected_barangay_index.value;

    let number_input = document.getElementById('phonenumberupdate').value;

    let email_input = document.getElementById('emailupdate').value;

    let case_dropdown = document.getElementById('casetypeselectupdate');
    let selected_case_index = case_dropdown.options[case_dropdown.selectedIndex];
    let selected_case_value = selected_case_index.value;

    
    let covid_status = "";

    if (selected_case_value === "POSITIVE"){
        let covid_dropdown = document.getElementById('covidstatusselect');
        let selected_covid_index = covid_dropdown.options[covid_dropdown.selectedIndex];
        covid_status = selected_covid_index.value;
    }

    else {
        covid_status = "NONE";
    }



    event.preventDefault();
    update_data(id, name_input, selected_barangay_id, number_input, email_input, selected_case_value, covid_status);
})


// Runs a GET to the Barangays Data in order to get a reference of all Barangay names and passes it to the update dropdown method.
let get_dropdown_data = () => {
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
            update_dropdown_data(data);

        },
        error:function(xhr, status, error){

        }
    });

}

// Fills the dropdown selection for both updates and create with values from the Barangays table.
// The name serves as the dropdown text while the Foreign Key / Primary ID of Barangay serve as the value.
let update_dropdown_data = (data) => {
    const selectionid = document.getElementById('barangaynameselect');
    const selectionidupdate = document.getElementById('barangaynameselectupdate');
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


let submit_data = (name, brgy_id, number, email, case_type, coronavirus_status) => {
    // The data is being handled via JS and AJAX instead of using Forms therefore the CSRF being brought here in order to prevent 419.
    let token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    $.ajax({
        url: '/patientinfos/store',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': token
        },
        data: {
            name: name,
            brgy_id: brgy_id,
            number: number,
            email: email,
            case_type: case_type,
            coronavirus_status: coronavirus_status
        },
        success:function(response){
            let responseStatus = response.status;
            if (responseStatus === "patientexists"){
                $('#statusmessage').html("<p class='text-red-500'>Patient already exists!</p>");
            }
            else if (responseStatus === "patientcreated"){
                $('#statusmessage').html("<p class='text-green-500'>New Patient added!</p>");
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
        url: '/patientinfos/data',
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
            
            const patient_id = row.insertCell();
            patient_id.textContent = data['id'];
            patient_id.classList.add('px-4', 'py-2', 'border-solid', 'border-white', 'border-[1px]', 'w-1/6', 'text-center');

            const patient_name = row.insertCell();
            patient_name.textContent = data['name'];
            patient_name.classList.add('px-4', 'py-2', 'border-solid', 'border-white', 'border-[1px]', 'w-1/6', 'text-center');

            const city_name = row.insertCell();
            city_name.textContent = data.barangay.city.name;
            city_name.classList.add('px-4', 'py-2', 'border-solid', 'border-white', 'border-[1px]', 'w-1/6', 'text-center');

            const barangay_name = row.insertCell();
            barangay_name.textContent = data.barangay.name;
            barangay_name.classList.add('px-4', 'py-2', 'border-solid', 'border-white', 'border-[1px]', 'w-1/6', 'text-center');

            const case_type = row.insertCell();
            case_type.textContent = data['case_type'];
            case_type.classList.add('px-4', 'py-2', 'border-solid', 'border-white', 'border-[1px]', 'w-1/6', 'text-center');

            const data_handlers = row.insertCell();
            data_handlers.classList.add('px-4', 'py-2', 'border-solid', 'border-white', 'border-[1px]', 'w-1/6', 'text-center');

            const view_button = document.createElement('button');
            view_button.textContent = 'View';
            view_button.classList.add('text-center', 'text-white', 'bg-slate-600', 'hover:bg-slate-500', 'font-semibold', 'rounded-lg', 'px-3');
            view_button.dataset.id = data['id'];
            view_button.dataset.name = data['name'];
            view_button.dataset.barangayid = data['brgy_id'];
            view_button.dataset.number = data['number'];
            view_button.dataset.email = data['email'];
            view_button.dataset.casetype = data['case_type'];
            view_button.dataset.coronastatus = data['coronavirus_status'];
            view_button.dataset.barangayname = data.barangay.name;
            view_button.dataset.cityid = data.barangay.city.id;
            view_button.dataset.cityname = data.barangay.city.name;
            view_button.addEventListener('click', view_modal);

            const update_button = document.createElement('button');
            update_button.textContent = 'Update';
            update_button.classList.add('text-center', 'text-white', 'bg-slate-600', 'hover:bg-slate-500', 'font-semibold', 'rounded-lg', 'px-3');
            update_button.dataset.id = data['id'];
            update_button.dataset.name = data['name'];
            update_button.dataset.barangayid = data['brgy_id'];
            update_button.dataset.barangayname = data.barangay.name;
            update_button.dataset.number = data['number'];
            update_button.dataset.email = data['email'];
            update_button.dataset.casetype = data['case_type'];
            update_button.dataset.coronastatus = data['coronavirus_status'];
            update_button.dataset.cityid = data.barangay.city.id;
            update_button.dataset.cityname = data.barangay.city.name;
            update_button.addEventListener('click', update_modal);

            const delete_button = document.createElement('button');
            delete_button.textContent = 'Delete';
            delete_button.classList.add('text-center', 'text-white', 'bg-slate-600', 'hover:bg-slate-500', 'font-semibold', 'rounded-lg', 'px-3');
            delete_button.dataset.id = data['id'];
            delete_button.dataset.name = data['name'];
            delete_button.dataset.barangayid = data['brgy_id'];
            delete_button.dataset.number = data['number'];
            delete_button.dataset.email = data['email'];
            delete_button.dataset.casetype = data['case_type'];
            delete_button.dataset.coronastatus = data['coronavirus_status'];
            delete_button.dataset.barangayname = data.barangay.name;
            delete_button.dataset.cityid = data.barangay.city.id;
            delete_button.dataset.cityname = data.barangay.city.name;
            delete_button.addEventListener('click', delete_modal);

            data_handlers.appendChild(view_button);
            data_handlers.appendChild(update_button);
            data_handlers.appendChild(delete_button);


        })
    }

}

// POSTS the Controller to update the data, passing the ID for reference and the new name, and the new City ID.
let update_data = (id, name, brgy_id, number, email, case_type, coronavirus_status) => {
    let token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    $.ajax({
        url: '/patientinfos/update',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': token
        },
        data: {
            id: id,
            name: name,
            brgy_id: brgy_id,
            number: number,
            email: email,
            case_type: case_type,
            coronavirus_status: coronavirus_status
        },
        success:function(response){
            let responseStatus = response.status;
            if (responseStatus === "patientupdated"){
                $('#updatemessage').html("<p class='text-green-500'>Patient Information updated!</p>");
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
    const { id, name, barangayname, number, email, casetype, coronastatus } = event.target.dataset;
    let current_modal = document.getElementById('view_modal');
    $('#viewinfo').html("");
    $('#viewinfo').append("<p class='text-center mx-4'>Name: " + name + "</p>");
    $('#viewinfo').append("<p class='text-center mx-4'>Barangay: " + barangayname + "</p>");
    $('#viewinfo').append("<p class='text-center mx-4'>Number: " + number + "</p>");
    $('#viewinfo').append("<p class='text-center mx-4'>Email: " + email + "</p>");
    $('#viewinfo').append("<p class='text-center mx-4'>Case Type: " + casetype + "</p>");
    $('#viewinfo').append("<p class='text-center mx-4'>Coronavirus Status: " + coronastatus + "</p>");
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
    const { id, name, barangayid, number, email, case_type } = event.target.dataset;
    const name_update = document.getElementById('patientnameupdate');
    const phone_update = document.getElementById('phonenumberupdate');
    const email_update = document.getElementById('emailupdate');
    name_update.value = name;
    phone_update.value = number;
    email_update.value = email;
    name_update.setAttribute('data-value', id);
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