@extends('layouts.app')



@section('content')

    <div id="cart"></div>

@endsection

@section('scripts')

    <script
        src="https://www.paypal.com/sdk/js?client-id={{ !empty(env('PAYPAL_LIVE_CLIENT_ID')) ? env('PAYPAL_LIVE_CLIENT_ID') : env('PAYPAL_SANDBOX_CLIENT_ID') }}">
    </script>

@endsection
