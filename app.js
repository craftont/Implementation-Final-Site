document.addEventListener('DOMContentLoaded', function() {
    setupPageFunctions(); // Set up page-specific functions based on URL
});

function setupPageFunctions() {
    const path = window.location.pathname;
    if (path.includes('index.html')) {
        loadMovies();
    } else if (path.includes('showings.html')) {
        loadMovieDetails();
    } else if (path.includes('booking.html')) {
        loadBookingDetails();
        setupBookingForm(); // Ensure this is called only once
    }
}


function getWeekendDates(year, month) {
    const dates = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
        const dayOfWeek = date.getDay();
        if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {  // 5 = Friday, 6 = Saturday, 0 = Sunday
            dates.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));  // Format as 'MMM D'
        }
        date.setDate(date.getDate() + 1);
    }
    return dates;
}


const movies = [
    {
        title: "The Shawshank Redemption",
        rating: "R",
        month: "April",
        image: "images/shawshank.jpg",
        description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        showtimes: getWeekendDates(2024, 3)  // April 2024 (month index is 3 because January is 0)
    },
    {
        title: "Forrest Gump",
        rating: "PG-13",
        month: "May",
        image: "images/forrestgump.jpg",
        description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
        showtimes: getWeekendDates(2024, 4)  // May 2024
    },
    {
        title: "Interstellar",
        rating: "PG-13",
        month: "June",
        image: "images/interstellar.jpg",
        description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        showtimes: getWeekendDates(2024, 5)  // May 2024
    },
    {
        title: "The Matrix",
        rating: "R",
        month: "July",
        image: "images/thematrix.jpg",
        description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
        showtimes: getWeekendDates(2024, 6)  // May 2024
    },
    {
        title: "Pulp Fiction",
        rating: "R",
        month: "August",
        image: "images/pulpfiction.jpg",
        description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
        showtimes: getWeekendDates(2024, 7)  // May 2024
    },
    {
        title: "Jurassic Park",
        rating: "PG-13",
        month: "September",
        image: "images/jurassicpark.jpg",
        description: "During a preview tour, a theme park suffers a major power breakdown that allows its cloned dinosaur exhibits to run amok.",
        showtimes: getWeekendDates(2024, 8)  // May 2024
    },
    {
        title: "Jaws",
        rating: "PG",
        month: "October",
        image: "images/jaws.jpg",
        description: "A local sheriff, a marine biologist and an old seafarer team up to hunt down a great white shark wreaking havoc in a beach resort.",
        showtimes: getWeekendDates(2024, 9)  // May 2024
    },
    {
        title: "Inception",
        rating: "PG-13",
        month: "November",
        image: "images/inception.jpg",
        description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.",
        showtimes: getWeekendDates(2024, 10)  // May 2024
    },
    {
        title: "A Christmas Carol",
        rating: "PG",
        month: "December",
        image: "images/christmascarol.webp",
        description: "An old bitter miser is given a chance for redemption when he is haunted by three ghosts on Christmas Eve.",
        showtimes: getWeekendDates(2024, 11)  // May 2024
    }
];

console.log(movies);

function loadMovies() {
    console.log("Loading movies...");
    const mainContent = document.getElementById('main-content');
    mainContent.innerHTML = '<div class="movie-container"></div>';
    const movieContainer = document.querySelector('.movie-container');

    movies.forEach(movie => {
        const movieTile = document.createElement('a');
        movieTile.href = `showings.html?movie=${encodeURIComponent(movie.title)}`;
        movieTile.className = 'movie-tile';

        const img = document.createElement('img');
        img.src = movie.image;
        img.alt = movie.title;

        const title = document.createElement('h2');
        title.textContent = movie.title;

        const rating = document.createElement('p');
        rating.textContent = `Rated: ${movie.rating}`;

        const month = document.createElement('p');
        month.textContent = `${movie.month} 2024`;

        movieTile.appendChild(img);
        movieTile.appendChild(title);
        movieTile.appendChild(rating);
        movieTile.appendChild(month);
        movieContainer.appendChild(movieTile);
    });
}

function loadMovieDetails() {
    const movieTitle = decodeURIComponent(new URLSearchParams(window.location.search).get('movie'));
    const movie = movies.find(m => m.title === movieTitle);

    const detailsContainer = document.querySelector('.movie-details');
    const showingsOptions = document.querySelector('.showing-options');

    if (movie) {
        detailsContainer.innerHTML = `<img src="${movie.image}" alt="${movie.title}" style="width:100%;">
                                      <h2>${movie.title}</h2>
                                      <p>Rated: ${movie.rating}</p>
                                      <p>${movie.description}</p>`;

        showingsOptions.innerHTML = '<h3>Available Showtimes:</h3>';
        movie.showtimes.forEach(date => {
            const timeButton = document.createElement('button');
            timeButton.textContent = date;
            timeButton.onclick = () => {
                window.location.href = `booking.html?movie=${encodeURIComponent(movie.title)}&date=${date}`;
            };
            showingsOptions.appendChild(timeButton);
        });
    } else {
        detailsContainer.innerHTML = '<p>Movie details not found.</p>';
    }
}

function loadBookingDetails() {
    const params = new URLSearchParams(window.location.search);
    const movieTitle = decodeURIComponent(params.get('movie'));
    const dateString = params.get('date');
    const movie = movies.find(m => m.title === movieTitle);

    if (movie) {
        const detailsContainer = document.querySelector('.movie-details');
        detailsContainer.innerHTML = `<img src="${movie.image}" alt="${movie.title}" style="width:100%;">
                                      <h2>${movie.title}</h2>
                                      <p>Rated: ${movie.rating}</p>
                                      <p>${movie.description}</p>`;

        const date = new Date(dateString + ", " + new Date().getFullYear());
        const dayOfWeek = date.getDay();

        const timeSelect = document.getElementById('time');
        timeSelect.innerHTML = ''; // Clear previous options
        const dateLabel = document.getElementById('showing-date');
        dateLabel.textContent = `Selected Date: ${dateString}`;
        dateLabel.setAttribute('data-date', dateString); // Store the date in a data attribute

        // Set time options based on the day of the week
        if (dayOfWeek === 5) { // Friday
            timeSelect.innerHTML = `<option value="7:00 PM">7:00 PM</option>`;
        } else if (dayOfWeek === 0) { // Sunday
            timeSelect.innerHTML = `<option value="2:00 PM">2:00 PM</option>`;
        } else if (dayOfWeek === 6) { // Saturday
            timeSelect.innerHTML = `<option value="1:00 PM">1:00 PM</option>
                                    <option value="6:00 PM">6:00 PM</option>`;
        }
    } else {
        detailsContainer.innerHTML = '<p>Movie details not found.</p>';
    }
}

function setupBookingForm() {
    const form = document.getElementById('booking-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        submitBookingForm();
    });
}

function submitBookingForm() {
    const date = document.getElementById('showing-date').getAttribute('data-date');
    const time = document.getElementById('time').value;
    const email = document.getElementById('email').value;
    const tickets = document.getElementById('tickets').value;

    // Alert the user and redirect
    alert(`Your booking on ${date} at ${time} was successful. Confirmation will be sent to ${email}.`);
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('index.html')) {
        loadMovies();
    } else if (window.location.pathname.includes('showings.html')) {
        loadMovieDetails();
    } else if (window.location.pathname.includes('booking.html')) {
        loadBookingDetails();
        setupBookingForm(); 
    }
});
