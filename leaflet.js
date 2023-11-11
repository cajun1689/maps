var map;

function initMap() {
    // Initialize the map
    map = L.map('map').setView([42.8666, -106.3131], 12); // Coordinates for Casper, Wyoming

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Fetch and display food truck locations
    fetchFoodTruckLocations();
}

async function fetchFoodTruckLocations() {
    try {
        const city = "casper";
        const apiUrl = `https://ff3d4knxkd.execute-api.us-east-1.amazonaws.com/prod/recent-trucks?city=${city}`;

        const response = await fetch(apiUrl);
        const result = await response.json();

        console.log("Response:", result); // Log the raw response

        if (response.ok && result.statusCode === 200) {
            const trucks = JSON.parse(result.body); // Parse the body to get the array
            console.log("Trucks data:", trucks); // Log the parsed trucks data

            trucks.forEach(truck => {
                console.log("Creating marker for:", truck); // Log each truck data
                var position = [truck.Latitude, truck.Longitude];
                
                // Create a marker for each truck
                L.marker(position).addTo(map)
                    .bindPopup(truck.truckName);
            });
        } else {
            console.error('Error fetching truck data:', result);
        }
    } catch (error) {
        console.error('Error fetching truck data:', error);
    }
}


// Initialize the map when the page loads
window.addEventListener('load', initMap);
