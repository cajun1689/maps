let map;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 42.8666, lng: -106.3131 }, // Coordinates for Casper, Wyoming
        zoom: 12,
    });

    fetchFoodTruckLocations();
}

async function fetchFoodTruckLocations() {
    try {
        const city = "casper"; // Lowercase to match the API's expected query parameter
        const apiUrl = `https://ff3d4knxkd.execute-api.us-east-1.amazonaws.com/prod/recent-trucks?city=${city}`;

        const response = await fetch(apiUrl);
        const result = await response.json();

        console.log("Raw response:", result); // Log the raw response

        if (response.ok && result.statusCode === 200) {
            let trucks;
            try {
                trucks = JSON.parse(result.body); // Parse the body
                console.log("Parsed trucks data:", trucks);
            } catch (e) {
                console.error('Error parsing response body:', e);
                return;
            }

            if (Array.isArray(trucks)) {
                trucks.forEach(truck => {
                    const position = new google.maps.LatLng(truck.Latitude, truck.Longitude);

                    new google.maps.Marker({
                        position: position,
                        map: map,
                        title: truck.truckName
                    });
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

window.addEventListener('load', initMap);
