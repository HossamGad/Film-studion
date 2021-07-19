//Hämta alla filmer vid uppstart av sidan
fetchMovies();

//Skapa en lista av movies
var moviesList = document.getElementById("flex-container");
var trivias = document.getElementById("trivia-container");
var moviebuttons = document.getElementById("movie-button");


//Funktion för att hämta alla filmer
function fetchMovies(studid) {
    fetch("/api/moviesapi")
        .then(function (response) {
            return response.json();
        })
        .then(function (movie) {
            
            ;
            moviesList.innerHTML = "";
            moviebuttons.innerHTML = "";
            moviesList.insertAdjacentHTML("beforeend","<p> Film name / Genre / Stock </p>")
            for (i = 0; i < movie.length; i++) {
                moviesList.insertAdjacentHTML("beforeend", "<div class='movie-container' id='movieid' onclick='getmovieid(" + movie[i].id + ', ' + studid + ")'>" + movie[i].title + " " + movie[i].genre + " " + movie[i].stock + "</div>")
            }
            moviebuttons.insertAdjacentHTML("beforeend", "<div><input id='get-movietitle' type='text' placeholder='Movie title..' /><div><input id='get-moviegenre' type='text'placeholder='Movie genre..' /><div><input id='get-moviestock' type='number' placeholder='Movie stock..' /></div><button onclick='addMovie()'>Lägg till movie</button></div>");

        })
}

// Hämta en specifik film
function getmovieid(id, studid) {
    fetch("/api/moviesapi")
        .then(function (response) {
            return response.json();
        })
        .then(function (movie) {

            moviesList.innerHTML = "";
            moviebuttons.innerHTML = "";

            var getMovie = movie.find(a => a.id == id)
            moviesList.insertAdjacentHTML("beforeend", "<div class='movie-container'>" + getMovie.id + " " + getMovie.title + " " + getMovie.genre + " " + getMovie.stock + "</div>")
            moviebuttons.insertAdjacentHTML("beforeend", "<div id='movie-button'><button id='back' onclick='fetchMovies()'>Gå tillbaka</button><button onclick='fetchTrivia(" + id + ")'>Trivia</button><button onclick='movieToReturn(" + getMovie.id + ")'>Lämna tillbaka film</button></div>")
            if (studid!==undefined)
            {
                moviebuttons.insertAdjacentHTML("beforeend","<button onclick='rentMovie2(" + getMovie.id + ', ' + studid + ")'>Låna Film</button>")

            }
            moviebuttons.insertAdjacentHTML("beforeend", "<div><input id='get-movietitle' type='text' value='" + getMovie.title + "' /><div><input id='get-moviegenre' type='text' value='" + getMovie.genre + "' /><div><input id='get-moviestock' type='number' value='" + getMovie.stock + "' /></div><button onclick='editMovie(" + getMovie.id + ")'>Ändra film egenskaper</button></div>");
            console.log(studid);
           
        })
}

//Add movie
function addMovie() {
    var titleInput = document.getElementById("get-movietitle").value;
    var genreInput = document.getElementById("get-moviegenre").value;
    var stockInput = document.getElementById("get-moviestock").value;

    var numberStockInput = Number(stockInput);

    fetch('/Api/moviesapi', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            title: titleInput,
            genre: genreInput,
            stock: numberStockInput,
        })
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));

    alert("movie skapad");
}

function editMovie(id) {
    
    var titleInput = document.getElementById("get-movietitle").value;
    var genreInput = document.getElementById("get-moviegenre").value;
    var stockInput = document.getElementById("get-moviestock").value;

    var numberStockInput = Number(stockInput);

    fetch('/Api/moviesapi/'+ id, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: titleInput,
            genre: genreInput,
            stock: numberStockInput,
        })
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));

    alert("film uppdaterad");

}

//Lämna tillbaka film
function movieToReturn(studioId) {

    console.log(studioId);

    fetch("/api/rentalserviceapi/")
        .then(function (response) {
            return response.json();
        })
        .then(function (rentedMovie) {


            moviesList.innerHTML = "";
            moviebuttons.innerHTML = "";

            var getMovie = rentedMovie.filter(a => a.studioNumber == studioId);
            for (i = 0; i < getMovie.length; i++) {
                moviesList.insertAdjacentHTML("beforeend", "<div class='movie-container'>" + getMovie[i].movieNumber + "Lämna tillbaka film " + getMovie[i].movieName + "" + getMovie[i].rentalId + "<button onclick='leaveReview(" + getMovie[i].movieNumber + ")'>Lämna betyg</button></div>")
                moviebuttons.insertAdjacentHTML("beforeend", "<div id='movie-button'><button onclick='returnMovie(" + getMovie[i].rentalId + ", " + getMovie[i].movieNumber + ")'>Lämna tillbaka film" + getMovie[i].movieName + "</button></div>")
            }
            //moviebuttons.insertAdjacentHTML("beforeend", "<div id='movie-button'><button id='back' onclick='fetchMoviesWhileLoggedIn()'>Gå tillbaka</button></div>")

        })
}

function fetchReviews() {

    fetch("/api/ReviewsApi")
        .then(function (response) {
            return response.json();
        })
        .then(function (review) {
            
            ;
            moviesList.innerHTML = "";
            moviebuttons.innerHTML = "";

            for (i = 0; i < review.length; i++) {
                moviesList.insertAdjacentHTML("beforeend", "<div class='movie-container' id='movieid' onclick='getreviewid(" + review[i].id + ")'>" + review[i].grade + " " + review[i].movie.title + "</div>")
            }
            //moviebuttons.insertAdjacentHTML("beforeend", "<div><input id='get-movietitle' type='text' placeholder='Movie title..' /><div><input id='get-moviegenre' type='text'placeholder='Movie genre..' /><div><input id='get-moviestock' type='number' placeholder='Movie stock..' /></div><button onclick='addMovie()'>Lägg till movie</button></div>");

        })

}

function leaveReview(movieId) {

    moviebuttons.insertAdjacentHTML("beforeend", "<div><input id='get-studioname' type='number' placeholder='Skriv ett betyg..' /><div><button onclick='addReview(" + movieId + ")'>Spara betyg</button></div>");

}

function addReview(movieId) {

    var reviewInput = document.getElementById("get-studioname").value;

    var reviewNumber = Number(reviewInput);

    fetch('/Api/ReviewsApi/', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            grade: reviewNumber,
            movieId: movieId
        })
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));

    alert("Betyg skapad");
}

//Lämna tillbaka en film
function returnMovie(rentalId, movieId) {

    console.log(rentalId);
    console.log(movieId);

        fetch("/api/moviesapi/" + movieId)
        .then(function (response) {
            return response.json();
        }).then(function(movie) {
            var id1 = movie.id;
            var title2 = movie.title;
            var genre2 = movie.genre;
            var stock2 = movie.stock;

            fetch('/Api/moviesapi/' + id1, {
                headers: { "Content-Type": "application/json; charset=utf-8" },
                method: 'PUT',
                body: JSON.stringify({
                    id: id1,
                    title: title2,
                    genre: genre2,
                    stock: stock2 + 1
                })
            })
            
        })
    

    //var returnedMovie = { id: Number(id), filmId: Number(movieId), studioId: Number(localStorage.getItem("userId")), returned: true }
    //console.log(returnedMovie);
    fetch(`/Api/RentalServiceApi/` + rentalId, {

        method: 'DELETE'
    
        }).then(function(reponse) {
            response = reponse.json();
            return reponse;
        }).then(function(data) {
            console.log(data);
        });
        
    
    alert("Lämnat tillbaka film");
}

//Låna en film
function rentMovie(studioId) {

    var studid = studioId;

    fetchMovies(studid);
}

function rentMovie2(id, studid) {

    fetch("/api/moviesapi")
        .then(function (response) {
            return response.json();
        })
        .then(function (movie) {

            var getMovie = movie.find(a => a.id == id)

            var id1 = getMovie.id;
            var id2 = studid;
            var title2 = getMovie.title;
            var genre2 = getMovie.genre;
            var stock2 = getMovie.stock;

            if(stock2 === 0) {
                alert("Det går inte att låna filmen. Alla filmer är utlånade");
                id1 = null;
                rentMovie(id2);
            } else {

                fetch('/Api/moviesapi/' + id1, {
                    headers: { "Content-Type": "application/json; charset=utf-8" },
                    method: 'PUT',
                    body: JSON.stringify({
                        id: id1,
                        title: title2,
                        genre: genre2,
                        stock: stock2 - 1
                    })
                })
                    .then((res) => console.log("res", res))
                    .then(
    
                        fetch("/api/studiosapi/" + id2)
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (studio) {
    
                                var getStudioName = studio.name;
    
                                fetch('/Api/rentalserviceapi', {
                                    headers: { "Content-Type": "application/json; charset=utf-8" },
                                    method: 'POST',
                                    body: JSON.stringify({
                                        movieNumber: id1,
                                        movieName: title2,
                                        studioNumber: id2,
                                        studioName: getStudioName,
                                    })
                                })
                                .then((res) => console.log("res", res))
                                .then(alert("Filmen har lånats"))
    
                            })
      
                    )
                    .catch(err => console.log(JSON.stringify(err)));

            }

        })

}

function fetchRentals() {
    fetch("/api/RentalServiceApi")
        .then(function (response) {
            return response.json();
        })
        .then(function (rental) {

            console.log(rental);

            moviesList.innerHTML = "";
            moviebuttons.innerHTML = "";
            moviesList.insertAdjacentHTML("beforeend","<p> Film name / Studio name </p>")
            for (i = 0; i < rental.length; i++) {
                moviesList.insertAdjacentHTML("beforeend", "<div class='rental-container' id='rentalId' onclick='getrentalid(" + rental[i].rentalId + ")'>" + rental[i].movieName + " " + rental[i].studioName + "</div>")
            }
        });
}

//Funktion för att hämta alla trivia för en film
function fetchTrivia(movieid) {
    fetch("/api/moviesapi/" + movieid + "/triviasapi")
        .then(function (response) {
            return response.json();
        })
        .then(function (trivia) {
            
            ;
            moviesList.innerHTML = "";
            moviebuttons.innerHTML = "";

            var getTrivia = trivia

            
                moviesList.insertAdjacentHTML("beforeend", "<div class='movie-container'>" + getTrivia.title + "</div>")
                moviebuttons.insertAdjacentHTML("beforeend","<div><button onclick='deleteTrivia(" + movieid + ", " + getTrivia.id + ")'>Ta bort trivia</button></div>")
        })
        .catch(err => console.log(JSON.stringify(err)));

    moviesList.innerHTML = "";
    moviebuttons.innerHTML = "";

    moviesList.insertAdjacentHTML("beforeend", "<div class='movie-container'>Tomt, lägg till en trivia</div>")
    moviebuttons.insertAdjacentHTML("beforeend", "<div><input id='get-movietitle' type='text' placeholder='Triviatitel...' /><div><input id='get-moviegenre' type='number' value='" + movieid + "' /></div><button onclick='newTrivia(" + movieid + ")'>Lägg till ny trivia</button></div>");

}


//Funktion för att hämta alla trivia
function gettriviaid(id) {
    fetch("/api/TrivisApi")
        .then(function (response) {
            return response.json();
        })
        .then(function (trivia) {


            moviesList.innerHTML = "";
            moviebuttons.innerHTML = "";
            var findTrivia = trivia.filter(a => a.filmId == id)

            for (i = 0; i < findTrivia.length; i++) {

                moviebuttons.insertAdjacentHTML("beforeend", "<div class='movie-container'>" + 'Trivia' + '<br>' + findTrivia[i].trivia + "</div>")
            }
            moviebuttons.insertAdjacentHTML("afterbegin", "<div id='movie-button'><button onclick='RentReturnMovie()'>Låna Film</button><button id='back' onclick='fetchMoviesWhileLoggedIn()'>Gå tillbaka</button><button onclick='fetchTrivia(" + id + ")'>Trivia</button><button onclick='newTrivia(" + id + ")'>Lägg till trivia</button></div>")

        })
}

// add new trivia

function newTrivia(movieid) {

    var titleInput = document.getElementById("get-movietitle").value;

    fetch('/Api/MoviesApi/' + movieid + '/TriviasApi', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            title: titleInput,
            movieId: movieid
        })
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));

    alert("Trivia skapad");

}
// Delete trivia
function deleteTrivia(movieid, triviaId) {
    fetch('/Api/MoviesApi/' + movieid + '/TriviasApi/' + triviaId, {

        method: 'DELETE'
    
        }).then(function(reponse) {
            response = reponse.json();
            return reponse;
        }).then(function(data) {
            console.log(data);
        });

        alert("tagit bort trivia");
}




//Funktion för att lägga till nya Studios

function addStudio() {
    var nameInput = document.getElementById("get-studioname").value;
    var ortInput = document.getElementById("get-studioort").value;

    fetch('/Api/StudiosApi', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
            name: nameInput,
            ort: ortInput,
        })
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));

    alert("Studio skapad");
}


//Funktion för att hämta alla Studios --- Skriver ut allting just nu
//var logutButton = document.getElementById("logout");



function fetchStudios() {
    fetch("/api/studiosapi")
        .then(function (response) {
            return response.json();
        })
        .then(function (studio) {
            
            moviesList.innerHTML = "";
            moviebuttons.innerHTML = "";
            moviesList.insertAdjacentHTML("beforeend","<p> Studio name / Ort </p>")
            for (i = 0; i < studio.length; i++) {
                moviesList.insertAdjacentHTML("beforeend", "<div class='studio-container' id='studioId' onclick='getstudioid(" + studio[i].studioId + ")'>" + studio[i].name + " " + studio[i].ort + " " + studio[i].movies + "</div>")
            }

            moviebuttons.insertAdjacentHTML("beforeend", "<div><input id='get-studioname' type='text'placeholder='Studio namn..' /><div><input id='get-studioort' type='text'placeholder='Studio ort..' /><button onclick='addStudio()'>Lägg till studio</button></div>");

        })
}

function getstudioid(StudioId) {
    fetch("/api/studiosapi")
        .then(function (response) {
            return response.json();
        })
        .then(function (studio) {

            console.log(StudioId);

            moviesList.innerHTML = "";
            moviebuttons.innerHTML = "";

            var getStudio = studio.find(a => a.studioId == StudioId)
            console.log(getStudio);
            moviesList.insertAdjacentHTML("beforeend", "<div class='studio-container'>" + getStudio.studioId + " " + getStudio.name + "</div>")
            moviebuttons.insertAdjacentHTML("beforeend", '<div><button onclick=\'rentMovie(' + getStudio.studioId + ')\'>Låna Film</button><button id=\'back\' onclick=\'fetchStudios()\'>Gå tillbaka</button></div>');
            moviebuttons.insertAdjacentHTML("beforeend", "<button onclick=\'fetchTrivia()\'>Trivia</button><button onclick='movieToReturn(" + getStudio.studioId + ")'>Lämna tillbaka film</button>");
            moviebuttons.insertAdjacentHTML("beforeend", "<div id='studio-button'><button onclick='deleteStudio(" + getStudio.studioId + ")'>Ta bort studio</button></div>")
            moviebuttons.insertAdjacentHTML("beforeend", "<div><input id='get-movietitle' type='text' value='" + getStudio.name + "' /><div><input id='get-moviegenre' type='text' value='" + getStudio.ort + "' /><button onclick='editStudio(" + getStudio.studioId + ")'>Ändra studio egenskaper</button></div>");
            
        })
}

// Tar bort studio
function deleteStudio(studioId) {
    fetch('/Api/StudiosApi/' + studioId, {

        method: 'DELETE'
    
        }).then(function(reponse) {
            response = reponse.json();
            return reponse;
        }).then(function(data) {
            console.log(data);
        });

        alert("tagit bort studio");
}

//Edit Studio
function editStudio(studioId) {
    
    var nameInput = document.getElementById("get-movietitle").value;
    var ortInput = document.getElementById("get-moviegenre").value;

    fetch('/Api/StudiosApi/'+ studioId, {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'PUT',
        body: JSON.stringify({
            studioId: studioId,
            name: nameInput,
            ort: ortInput,
        })
    })
        .then((res) => console.log("res", res))
        .catch(err => console.log(JSON.stringify(err)));
        

    alert("Studio uppdaterad");

}