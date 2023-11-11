let map;

function initMap() {
    // Initialize the map with a default location (update the lat and lng to your city's coordinates)
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 42.8666, lng: -106.3131 }, // Coordinates for Casper, Wyoming
        zoom: 12,
    });

    // Fetch and display the food truck locations
    fetchFoodTruckLocations();
}

async function fetchFoodTruckLocations() {
    try {
        // Specify the city as a query parameter
        const city = "Casper";
        const apiUrl = `https://ff3d4knxkd.execute-api.us-east-1.amazonaws.com/prod/recent-trucks?city=${city}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        data.forEach(truck => {
            const position = new google.maps.LatLng(truck.Latitude, truck.Longitude);

            const marker = new google.maps.Marker({
                position: position,
                map: map,
                title: truck.truckName
            });
        });
    } catch (error) {
        console.error('Error fetching truck data:', error);
    }
}

// This event listener will call initMap() when the page loads
window.addEventListener('load', initMap);
