// Function to toggle dark mode and save preference
function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark-mode");

    console.log("Dark mode toggled. Current state:", body.classList.contains("dark-mode"));

    if (body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}

// Function to load dark mode preference on page load
function loadDarkModePreference() {
    const darkMode = localStorage.getItem("darkMode");
    if (darkMode === "enabled") {
        document.body.classList.add("dark-mode");
        document.getElementById("darkModeToggle").checked = true;
    }
}

// Load dark mode preference when the page loads
window.onload = loadDarkModePreference;

// Function for moving slides in photography sliders
function moveSlide(direction, trackId) {
    const track = document.getElementById(trackId);
    if (!track) {
        console.error(`Carousel track with ID '${trackId}' not found.`);
        return;
    }

    const slides = track.querySelectorAll('.slide');
    const totalSlides = slides.length;

    let currentIndex = parseInt(track.dataset.currentIndex || "0");
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = totalSlides - 1;
    } else if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    track.dataset.currentIndex = currentIndex;
    const slideWidth = slides[0].clientWidth;
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

$(document).ready(function() {

    $.ajax({
        url: "photography_collections.json",
        dataType: "json",
        success: function (data) {
            let container = $("#collections-container");

            console.log("Loaded collections:", data);

            // Creating and adding collections to the container
            for (let i = 0; i < data.length; i++) {
                let collection = data[i];
                createCollectionCard(container, collection);
            }
            console.log("Collections loaded successfully.");
        },
        error: function (xhr, status, error) {
            console.error("Failed to load JSON file:", status, error);
        }
    });

    function createCollectionCard(container, collection) {
        console.log("Creating collection card for:", collection);

        // Ensure collection.id exists by generating one if missing
        if (!collection.id) {
            collection.id = collection.name.replace(/\s+/g, '-').toLowerCase();
            console.warn(`Generated ID for collection '${collection.name}': ${collection.id}`);
        }

        let card = $("<div>").addClass("photo-collection").hide();
        $("<h3>").text(collection.name).appendTo(card);

        let carouselContainer = $("<div>").addClass("collections-container").appendTo(card);
        let carousel = $("<div>").addClass("carousel").appendTo(carouselContainer);

        let carouselTrack = $("<div>")
            .addClass("carousel-track")
            .attr("id", collection.id)
            .appendTo(carousel);

        collection.images.forEach(image => createSlide(carouselTrack, image));

        // Create navigation buttons
        $("<button>")
            .addClass("prev")
            .html("&#9664;")
            .click(() => moveSlide(-1, collection.id))
            .appendTo(carouselContainer);

        $("<button>")
            .addClass("next")
            .html("&#9654;")
            .click(() => moveSlide(1, collection.id))
            .appendTo(carouselContainer);

        container.append(card);
        card.show();
    }

    function createSlide(carouselTrack, image) {
        let slide = $("<div>").addClass("slide");

        $("<img>")
            .attr({
                src: `assets/photos/${image.src}`,
                alt: image.alt,
                title: image.caption,
            })
            .appendTo(slide);

        $("<div>").addClass("caption").text(image.caption).appendTo(slide);
        carouselTrack.append(slide);
    }

    console.log("Page fully loaded");
});
