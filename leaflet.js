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
        const city = "Casper";
        const apiUrl = `https://ff3d4knxkd.execute-api.us-east-1.amazonaws.com/prod/recent-trucks?city=${city}`;

        const response = await fetch(apiUrl);
        const result = await response.json();

        console.log("Raw response:", result); // Log the raw response

        if (response.ok && result.statusCode === 200) {
            let trucks;
            try {
                trucks = JSON.parse(result.body); // Try parsing the body to get the array
            } catch (e) {
                console.error('Error parsing response body:', e);
                return;
            }

            console.log("Parsed trucks data:", trucks); // Log the parsed trucks data

            if (Array.isArray(trucks)) {
                trucks.forEach(truck => {
                    console.log("Creating marker for:", truck); // Log each truck data
                    var position = [truck.Latitude, truck.Longitude];

                    // Create a marker for each truck
                    L.marker(position).addTo(map)
                        .bindPopup(truck.truckName);
                });
            } else {
                console.error('Trucks data is not an array:', trucks);
            }
        } else {
            console.error('Error fetching truck data:', result);
        }
    } catch (error) {
        console.error('Error fetching truck data:', error);
    }
}


// Initialize the map when the page loads
window.addEventListener('load', initMap);
