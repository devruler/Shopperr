<!doctype html>
<html lang="en">
 <head>
 <!-- Required meta tags -->
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1">

 <!-- CoreUI CSS -->
 <link rel="stylesheet" href="{{asset('css/admin.css')}}" crossorigin="anonymous">

 <title>Admin Dashboard</title>
 </head>
 <body class="c-app">

    @yield('content')

 <!-- Optional JavaScript -->
 <!-- Popper.js first, then CoreUI JS -->
 <script src="https://unpkg.com/@popperjs/core@2"></script>
 <script src="https://unpkg.com/@coreui/coreui@3.4.0/dist/js/coreui.bundle.min.js"></script>
 <script src="{{asset('js/app.js')}}"></script>
 </body>
</html>
