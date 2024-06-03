<x-layout>
{{-- Main Content --}}
<div class="mt-32 flex flex-wrap mx-64 justify-center">
    <div class="bg-slate-900 border-solid border-black border-2 rounded-lg flex-col pt-4 px-12 pb-16">
        <p class="text-white text-center font-semibold text-3xl">Awareness Reports</p>
        
        
        <label for="City Dropdown" class="inline text-center font-semibold text-white">City</label>
        <select class="m-4 inline border-black border-[1px] border-solid" id="citylist" name="citylist">

        </select>

        <label for="Barangay Dropdown" class="inline text-center font-semibold text-white">Barangays</label>
        <select class="m-4 inline border-black border-[1px] border-solid" id="barangaylist" name="barangaylist">
        </select>
        <center>
        <div class="my-4">
            <button type="button" onclick=generate_report() class="text-center text-white bg-slate-600 hover:bg-slate-500 font-semibold rounded-lg py-4 px-3">Generate Report</button>
        </div>
        </center>

        <div id="report">
        

        </div>
    
    </div>
</div>
@section('scripts')
    <script src="{{ asset('js/awareness_data.js') }}"></script>
@endsection
</x-layout>