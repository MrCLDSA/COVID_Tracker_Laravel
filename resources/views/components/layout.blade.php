<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>COVID Tracker</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script
    src="https://code.jquery.com/jquery-3.7.1.js"
    integrity="sha256-eKhayi8LEQwp4NKxN+CfCh+3qOVUtJn3QNZ0TciWLP4="
    crossorigin="anonymous"></script>
</head>
<body>
    <nav class="bg-slate-900 w-full text-white">
        <div class="mx-8 py-4 flex flex-row flex-shrink">
            <a class="p-3 font-semibold text-lg" href="/">COVID Tracker</p>
            <a class="p-3 text-lg mx-8 hover:bg-slate-700" href="/cities">Cities</a>
            <a class="p-3 text-lg mx-8 hover:bg-slate-700" href="/barangays">Barangays</a>
            <a class="p-3 text-lg mx-8 hover:bg-slate-700" href="/patientinfos">Patients</a>
            <a class="p-3 text-lg mx-8 hover:bg-slate-700" href="/awareness">Awareness Reports</a>
            <a class="p-3 text-lg mx-8 hover:bg-slate-700" href="/covidreport">COVID Reports</a>
        </div>
    </nav>
    
    {{ $slot }}

    {{-- Scripts --}}
    @yield('scripts')
</body>
</html>