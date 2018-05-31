<!DOCTYPE html>
<html lang="{{ $lang }}">
<head>
	<!-- Meta -->
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="description" content="@yield('description')">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
	<meta name="csrf-token" content="{{ csrf_token() }}">

	<title>@yield('title')</title>

	<!-- Style -->
	<link href="{{ mix('css/app.css') }}" rel="stylesheet" type="text/css">

	<!-- Fonts -->
	<link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>

	<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	<!--[if lt IE 9]>
	<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	<![endif]-->
</head>
<body>
	<!-- Navigation -->
	{{ menu('main', 'components.navbar.bootstrap') }}

	<div id="wrap">
		<div id="pt-main" class="pt-perspective">
			<div id="ajax_load_first" class="pt-page pt-page-1">
				@yield('content')
			</div>
			<div id="ajax_load_second" class="pt-page pt-page-2"></div>
		</div>
	</div>

	<!-- Scripts -->
	<script src="{{ mix('js/app.js') }}" async="async" type="text/javascript"></script>

</body>
</html>
