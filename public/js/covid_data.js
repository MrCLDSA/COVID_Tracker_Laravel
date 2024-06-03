
let barangaylist = document.getElementById('barangaylist');
let citylist = document.getElementById('citylist');
let uniquedata = [];

// Runs a GET to get a list of City IDs & Names.
let get_city_dropdown_data = () => {
    let token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    $.ajax({
        url: '/cities/data/barangays',
        type: 'GET',
        headers: {
            'X-CSRF-TOKEN': token
        },
        success:function(response){
            let city_data = response.city_data;
            update_city_dropdown_data(city_data);
        },
        error:function(xhr, status, error){

        }
    });
}

// Assigns all the city values to the citylist selection. Name -> option text while the option.value would hold the primary ID.
let update_city_dropdown_data = (data) => {

    if (data){
        data.forEach(data => {
            if (!uniquedata.includes(data.name)){
                let option = document.createElement('option');
                option.value = data['id'];
                option.text = data['name'];
                citylist.add(option);
                uniquedata.push(data['name']);
            }


        });
        first_data = data[0];
        // Assigns the first city on the list to a variable and triggers the get_barangay_method, passing its City ID.
        get_barangay_data(first_data.id);
    }

}

// The method receives City ID and then through the relationships, finds all the Barangays related to it.
let get_barangay_data = (city_id) => {
    let token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');
    $.ajax({
        url: '/barangays/data/dropdown',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': token
        },
        data: {
            'id': city_id,
        },
        success:function(response){
            let barangay_data = response.data;
            // After receiving all the Barangays related to the Specific City ID - it is all added as options in a drop down via this function.
            update_barangay_dropdown_data(barangay_data)
        },
        error:function(xhr, status, error){

        }
    });


}

// Assigns all the city values to the barangaylist selection. Name -> option text while the option.value would hold the primary ID.
let update_barangay_dropdown_data = (data) => {
    let uniquedata_barangay = [];
    barangaylist.innerHTML = ''


    if (data){
        data.forEach(data => {
            if (!uniquedata_barangay.includes(data.name)){
                let option = document.createElement('option');
                option.value = data['id'];
                option.text = data['name'];
                barangaylist.add(option);
                uniquedata_barangay.push(data['name']);
            }


        });
    }

}

// This function takes the section value of the current dropdown index (which contains the Primary ID of the Barangay)
// and passes a POST to the PatientInfoController where it counts the number of Overall, Active, Recovered, and Deaths
// in a specific Barangay ID.
let generate_report = () => {
    let token = document.head.querySelector('meta[name="csrf-token"]').getAttribute('content');

    let selected_barangay_index = barangaylist.options[barangaylist.selectedIndex];
    let selected_barangay_id = selected_barangay_index.value;
    console.log('generate');
    $.ajax({
        url: '/patientinfos/covidreport',
        type: 'POST',
        headers: {
            'X-CSRF-TOKEN': token
        },
        data: {
            'id': selected_barangay_id,
        },
        success:function(response){
            console.log('response received');
            let covidcount = response.coviddata;
            let activecount = response.active;
            let recoveredcount = response.recovered;
            let deathcount = response.death;
            $('#report').html("");
    
            $('#report').append("<p class='text-white text-center'>Coronavirus Cases: " + covidcount +  "</p>");
            $('#report').append("<p class='text-white text-center'>Active: " + activecount +  "</p>");
            $('#report').append("<p class='text-white text-center'>Recovered: " + recoveredcount +  "</p>");
            $('#report').append("<p class='text-white text-center'>Dead: " + deathcount +  "</p>");
            
            
        },
        error:function(xhr, status, error){

        }
    });


}

citylist.addEventListener('change', function(event) {
    let selected_city_index = citylist.options[citylist.selectedIndex];
    let selected_city_id = selected_city_index.value;
    get_barangay_data(selected_city_id);
})

// Runs the method within in order to get the list of cities.
$(document).ready(function (){
    get_city_dropdown_data();
})