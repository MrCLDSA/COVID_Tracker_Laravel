<x-layout>

    {{-- Modals --}}
    <div id="modal_handler" class="hidden fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 justify-center items-center">

        <!-- Modal content for creating new cities -->
        <div id="input_modal" class="hidden bg-white w-1/4 p-8 rounded justify-center items-center mb-64">
            <form id="createform">
                <div id="statusmessage">
                </div>
                <p>Input Patient Information</p>
            
                <div class="block">
                    <label for="Patient Name" class="inline text-center font-semibold">Name(*)</label>
                    <input type="text" class="m-4 inline border-black border-[1px] border-solid" id="patientname" name="patientname" required>
                </div>
                <div class="block">
                    <label for="City Dropdown" class="inline text-center font-semibold">Barangay(*)</label>
                    <select class="m-4 inline border-black border-[1px] border-solid" id="barangaynameselect" name="barangayname" required>
                    </select>
                </div>

                <div class="block">
                    <label for="Phone Number" class="inline text-center font-semibold">Number(*)</label>
                    <input type="text" class="m-4 inline border-black border-[1px] border-solid" id="phonenumber" name="phonenumber" required>
                </div>

                <div class="block">
                    <label for="Email" class="inline text-center font-semibold">Email</label>
                    <input type="text" class="m-4 inline border-black border-[1px] border-solid" id="email" name="email">
                </div>

                <div class="block">
                    <label for="City Dropdown" class="inline text-center font-semibold">Case Type (*)</label>
                    <select class="m-4 inline border-black border-[1px] border-solid" id="casetypeselect" name="casetype" required>
                        <option value="PUI">PUI</option>
                        <option value="PUM">PUM</option>
                        <option value="POSITIVE">POSITIVE ON COVID</option>
                        <option value="NEGATIVE">NEGATIVE ON COVID</option>
                    </select>
                </div>

                <div id="coviddiv" class="hidden">
                    <label for="City Dropdown" class="inline text-center font-semibold">Coronavirus Status</label>
                    <select class="m-4 inline border-black border-[1px] border-solid" id="covidstatusselect" name="covidstatus">
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="RECOVERED">RECOVERED</option>
                        <option value="DEATH">DEATH</option>
                    </select>
                </div>

                
                {{-- <button type="button" onclick=submit_city_data() class="text-center text-white bg-slate-600 hover:bg-slate-500 inline font-semibold rounded-lg py-2 px-4">Save</button> --}}
                <button type="submit" class="text-center text-white bg-slate-600 hover:bg-slate-500 inline font-semibold rounded-lg py-2 px-4">Submit</button>
                <button type="button" onclick=hide_modal() class="text-center text-white bg-slate-600 hover:bg-slate-500 inline font-semibold rounded-lg py-2 px-4">Close</button>
            </form>
        </div>

        {{-- Modal Content for viewing data --}}
        <div id="view_modal" class="hidden bg-white w-1/4 p-8 rounded justify-center items-center mb-64">
                <div class="inline-block">
                    <label for="Patient Data" class="inline text-center font-semibold mx-4">Patient Data</label>
                    <div id="viewinfo" class="inline"> </div>
                </div>

                
                <button type="button" onclick=hide_view_modal() class="text-center text-white bg-slate-600 hover:bg-slate-500 block font-semibold rounded-lg py-2 px-4">Close</button>
        </div>

        {{-- Modal for updating data --}}

        <div id="update_modal" class="hidden bg-white w-1/4 p-8 rounded justify-center items-center mb-64">
            <form id="updateform">
                <div id="updatemessage">
                </div>
                <p>Update Patient Information.</p>
            
                <div class="block">
                    <label for="Patient Name" class="inline text-center font-semibold">Name(*)</label>
                    <input type="text" class="m-4 inline border-black border-[1px] border-solid" id="patientnameupdate" name="patientname" required>
                </div>
                <div class="block">
                    <label for="Barangay Dropdown" class="inline text-center font-semibold">Barangay(*)</label>
                    <select class="m-4 inline border-black border-[1px] border-solid" id="barangaynameselectupdate" name="barangayname" required>
                    </select>
                </div>

                <div class="block">
                    <label for="Phone Number" class="inline text-center font-semibold">Number(*)</label>
                    <input type="text" class="m-4 inline border-black border-[1px] border-solid" id="phonenumberupdate" name="phonenumber" required>
                </div>

                <div class="block">
                    <label for="Email" class="inline text-center font-semibold">Email</label>
                    <input type="text" class="m-4 inline border-black border-[1px] border-solid" id="emailupdate" name="email">
                </div>

                <div class="block">
                    <label for="City Dropdown" class="inline text-center font-semibold">Case Type (*)</label>
                    <select class="m-4 inline border-black border-[1px] border-solid" id="casetypeselectupdate" name="casetype" required>
                        <option value="PUI">PUI</option>
                        <option value="PUM">PUM</option>
                        <option value="POSITIVE">POSITIVE ON COVID</option>
                        <option value="NEGATIVE">NEGATIVE ON COVID</option>
                    </select>
                </div>

                <div id="coviddivupdate" class="hidden">
                    <label for="City Dropdown" class="inline text-center font-semibold">Coronavirus Status</label>
                    <select class="m-4 inline border-black border-[1px] border-solid" id="covidstatusselectupdate" name="covidstatus">
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="RECOVERED">RECOVERED</option>
                        <option value="DEATH">DEATH</option>
                    </select>
                </div>
                
                <button type="submit" class="text-center text-white bg-slate-600 hover:bg-slate-500 inline font-semibold rounded-lg py-2 px-4">Update</button>
                <button type="button" onclick=hide_update_modal() class="text-center text-white bg-slate-600 hover:bg-slate-500 inline font-semibold rounded-lg py-2 px-4">Close</button>
            </form>
        </div>

        {{-- Modal for deleting data --}}

        <div id="delete_modal" class="hidden bg-white w-1/4 p-8 rounded justify-center items-center mb-64">
            <form id="cityformdelete">
                <div id="deletemessage">
                </div>
            
                <div id="deletionconfirmation">

                </div>     
                
                <button type="button" onclick=delete_data() id="deletebutton" class="text-center text-white bg-slate-600 hover:bg-slate-500 inline font-semibold rounded-lg py-2 px-4" data-value="">Delete</button>
                <button type="button" onclick=hide_delete_modal() class="text-center text-white bg-slate-600 hover:bg-slate-500 inline font-semibold rounded-lg py-2 px-4">Close</button>
            </form>
        </div>

        

        
      
    </div>

      
    {{-- End Modals --}}

    {{-- Main Content --}}
    <div class="mt-32 flex flex-wrap mx-64">
        <div class="bg-slate-900 border-solid border-black border-2 rounded-lg flex-col pt-4 px-12 pb-16 w-full">
            <p class="text-white text-center font-semibold text-3xl">List of Patients</p>
            
            <div class="my-4">
                <button type="button" onclick=show_modal() class="text-center text-white bg-slate-600 hover:bg-slate-500 font-semibold rounded-lg py-4 px-3">Create New +</button>
            </div>

            <table id="maintable" class="table-auto text-white border-white border-[1px] border-solid w-full">
                <thead>
                    <tr>
                        <th class="px-4 py-2 border-solid border-white border-[1px] w-1/6">ID</th>
                        <th class="px-4 py-2 border-solid border-white border-[1px] w-1/6">Name</th>
                        <th class="px-4 py-2 border-solid border-white border-[1px] w-1/6">City</th>
                        <th class="px-4 py-2 border-solid border-white border-[1px] w-1/6">Barangay</th>
                        <th class="px-4 py-2 border-solid border-white border-[1px] w-1/6">Case Type</th>
                        <th class="px-4 py-2 border-solid border-white border-[1px] w-1/6">Actions</th>
                    </tr>
                </thead>
                <tbody id="content">
                    
                </tbody>
            </table>
        
        </div>
    </div>
    @section('scripts')
        <script src="{{ asset('js/patient_data.js') }}"></script>
    @endsection
    
</x-layout>