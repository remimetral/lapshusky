@extends('layouts.switcher')

@section('description'){{ strip_tags(ucfirst(Lang::get('meta.description'))) }}@stop

@section('title'){{ strip_tags(ucfirst(Lang::get('meta.title.home'))) }}@stop

@section('content')

	<input class="page_title" type="hidden" value="{{ strip_tags(ucfirst(Lang::get('meta.title.home'))) }}">
	<input class="page_id" type="hidden" value="{{ $page_id }}">
	<input class="page_menu_id" type="hidden" value="{{ $page_id }}">
	<input class="page_lang_url_id" type="hidden" value="{{ route($page_id.'-'.$langreverse) }}">

	<div class="container_page {{ $page_id }}">
		<div class="bg_page">
			<div class="trame"></div>
			<div class="gradient"></div>
			<div class="background" data-depth="0.1"></div>
		</div>
		<div class="content_scroll">
			<div class="content">
				<div class="row">
					<div class="small-12 columns">
						<div class="title">Иоятнгn</div>
						<div class="caption">As far as you can imagine.</div>
						<div class="whatido">
							<div class="cre">Create. </div>
							<div class="des">Design. </div>
							<div class="dev">Devlop. </div>
							<div class="exp">Experience.</div>
						</div>
					</div>
				</div>
				<div class="scroll_down"></div>
			</div>
		</div>
	</div>

@endsection
