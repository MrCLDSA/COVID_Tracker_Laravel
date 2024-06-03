<x-layout>

    {{-- Modals --}}
    <div id="modal_handler" class="hidden fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 justify-center items-center">

        <!-- Modal content for creating new cities -->
        <div id="input_modal" class="hidden bg-white w-1/4 p-8 rounded justify-center items-center mb-64">
            <form id="cityform">
                <div id="statusmessage">
                </div>
                <p>Input a new city</p>
            
                <div class="inline-block">
                    <label for="City Name" class="inline text-center font-semibold">City Name</label>
                    <input type="text" class="m-4 inline border-black border-[1px] border-solid" id="cityname" name="cityname" required>
                </div>
                
                {{-- <button type="button" onclick=submit_city_data() class="text-center text-white bg-slate-600 hover:bg-slate-500 inline font-semibold rounded-lg py-2 px-4">Save</button> --}}
                <button type="submit" class="text-center text-white bg-slate-600 hover:bg-slate-500 inline font-semibold rounded-lg py-2 px-4">Submit</button>
                <button type="button" onclick=hide_modal() class="text-center text-white bg-slate-600 hover:bg-slate-500 inline font-semibold rounded-lg py-2 px-4">Close</button>
            </form>
        </div>

        {{-- Modal Content for viewing data --}}
        <div id="view_modal" class="hidden bg-white w-1/4 p-8 rounded justify-center items-center mb-64">
                <div class="inline-block">
                    <label for="City Name" class="inline text-center font-semibold">City Name</label>
                    <div id="viewinfo" class="inline"> </div>
                </div>
                
                <button type="button" onclick=hide_view_modal() class="text-center text-white bg-slate-600 hover:bg-slate-500 block font-semibold rounded-lg py-2 px-4">Close</button>
        </div>

        {{-- Modal for updating data --}}

        <div id="update_modal" class="hidden bg-white w-1/4 p-8 rounded justify-center items-center mb-64">
            <form id="cityformupdate">
                <div id="updatemessage">
                </div>
                <p>Update the city name</p>
            
                <div class="inline-block">
                    <label for="City Name" class="inline text-center font-semibold">City Name</label>
                    <input type="text" class="m-4 inline border-black border-[1px] border-solid" data-value="" id="citynameupdate" name="citynameupdate" required>
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
            <p class="text-white text-center font-semibold text-3xl">List of Cities</p>
            
            <div class="my-4">
                <button type="button" onclick=show_modal() class="text-center text-white bg-slate-600 hover:bg-slate-500 font-semibold rounded-lg py-4 px-3">Create New +</button>
            </div>

            <table id="citytable" class="table-auto text-white border-white border-[1px] border-solid w-full">
                <thead>
                    <tr>
                        <th class="px-4 py-2 border-solid border-white border-[1px] w-1/3">ID</th>
                        <th class="px-4 py-2 border-solid border-white border-[1px] w-1/3">City Name</th>
                        <th class="px-4 py-2 border-solid border-white border-[1px] w-1/3">Actions</th>
                    </tr>
                </thead>
                <tbody id="citycontent">
                    
                </tbody>
            </table>
        
        </div>
    </div>
    @section('scripts')
        <script src="{{ asset('js/city_data.js') }}"></script>
    @endsection
    
</x-layout>