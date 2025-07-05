document.addEventListener("DOMContentLoaded", function () {
    // Only run this on the show page (if #map exists)
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
        var map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        var marker = L.marker([51.5, -0.09]).addTo(map);
        marker.bindPopup("<b>Listing Name</b><br>This is where the listing is located.").openPopup();
    }
});
