function searchMovie (){
    $('#movie-list').html('');
    $.ajax({
        url: 'http://omdbapi.com',
        type: 'get',
        dataType: 'json',
        data: {
            'apikey' : 'cf30aa7e',
            's': $('#search-input').val()
        },
        success: function (result){
            if (result.Response == "True") {
                let movies = result.Search;

                $.each(movies, function (i, data) {
                    $('#movie-list').append(`
                        <div class="col-md-4">
                        <div class="card mb-3">
                            <img src="${data.Poster}" class="card-img-top" alt="...">
                            <div class="card-body">
                            <h5 class="card-title">${data.Title}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${data.Year}</h6>
                            <a href="#" class="card-link see-detail" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id="${data.imdbID}">See Details</a>
                        </div>
                        </div>

                    `);
                });

                $('#search-input').val('');

            } else{
                $('#movie-list').html(`
                <div class="col">
                    <h1 class="text-center">${result.Error}</h1>
                </div>
                `)
            }
        }
    });
};

$('#search-button').on('click', function () {
    searchMovie();
});

$('#search-input').on('keyup', function (e){
    if(e.keyCode === 13 ) {
        searchMovie();
    }
});

$('#movie-list').on('click', '.see-detail', function () {

    $.ajax({
        url: 'http://omdbapi.com',
        dataType: 'json',
        type: 'get',
        data: {
            'apikey' : 'cf30aa7e',
            'i': $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response === "True") {
                 $('.modal-body').html(`
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="${movie.Poster}" class="img-fluid">
                            </div>

                            <div class="col-md-8 mt-3">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>${movie.Title}</h3></li>
                                    <li class="list-group-item"><b>Release</b>: ${movie.Released}</li>
                                    <li class="list-group-item"><b>Genre</b>: ${movie.Genre}</li>
                                    <li class="list-group-item"><b>Director</b>: ${movie.Director}</li>
                                    <li class="list-group-item"><b>Writer</b>: ${movie.Writer}</li>
                                    <li class="list-group-item"><b>Actors</b>: ${movie.Actors}</li>
                                    <li class="list-group-item"><b>Plot</b>: ${movie.Plot}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                 `)
            }
        }
    })

});