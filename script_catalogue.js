/*+DATA RECHERCHE*/
//Data pour barre de recherche
function load_data_catalogue(query){
	$('#nav_pages').show();
	$.ajax({
		url:"searchbar.php",
		method:"post",
		data:{query:query},
		success:function(data){$('#result_catalogue').html(data);}
	});
}
//Data pour listing page current
function load_data_page_current_catalogue(query){
	$('#nav_pages').show();
	$.ajax({
		url:"listing.php",
		method:"post",
		data:{query:query},
		success:function(data){$('#result_catalogue').html(data);}
	});

	//mettre page current !
}
//Data pour listing toute la base de donnÃ©e
function load_data_all_catalogue(query){
	$('#nav_pages').hide();
	$.ajax({
		url:"listing_all.php",
		method:"post",
		data:{query:query},
		success:function(data){$('#result_catalogue').html(data);}
	});
}
//Recherche avec la barre
$('#search_text_catalogue').keyup(function(){
	var search = $(this).val();
	if(search != ''){load_data_catalogue(search);}
	else{load_data_page_current_catalogue();}
	//message empty si pas de resultats
	listeEmpty();
});
/*-DATA RECHERCHE*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var genresChecked = [];

/*+TRI PAR GENRES*/
//fonction remove ajoutÃ©e parceque javascript le met mÃªme pas dans sa bibliothÃ¨que standard
Array.prototype.remove = function() {
	var what, a = arguments, L = a.length, ax;
	while (L && this.length) {
		what = a[--L];
		while ((ax = this.indexOf(what)) !== -1) {
			this.splice(ax, 1);
		}
	}
	return this;
};
//(1) ResetList();
$('#btnResetList').click(function(){
	//uncheck tous les genres
	$('.form-checkbox').prop('checked', false);
	//reset les genres
	genresChecked = [];
	//reset la liste PAGE CURRENT pour afficher tous les rÃ©sultats
	load_data_page_current_catalogue();
});
//(2) TrierList();
$('#btnTriList').click(function(){
	//rendre le tableau correctement lisible pour les classes
	var correctGenresChecked = genresChecked.toString().split(',').join('.');
	//afficher seulement les classes cochÃ©es
	$('#result_catalogue .cardListAnime').show().filter(':not(.' + correctGenresChecked + ')').hide();
	//message empty si pas de resultats
	listeEmpty();
});
//(3) getCheckedGenres();
$('.form-checkbox').change(function() {
	//ajouter genres cochÃ©s
	if($(this).is(':checked')){
		//reset TOUTE la liste pour afficher tous les rÃ©sultats pour les trier
		load_data_all_catalogue();
		//transformer tableau en un seul bloc
		genresChecked.push($(this).val());
	}
	//enlever genres dÃ©cochÃ©s
	if(!$(this).is(':checked')){
		genresChecked.remove($(this).val());
	}
});
/*-TRI PAR GENRES*/

$("#noResult").hide();
function listeEmpty() {
	$('#nav_pages').hide();
	if ($('#result_catalogue').children(":visible").length == 0){$("#noResult").show();}
	else{$("#noResult").hide();}
}

function topFunction() {
	document.body.scrollTop = 0; // Safari
	document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
}