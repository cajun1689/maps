<script>
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
            const data = await response.json();

            data.forEach(truck => {
                var position = [truck.Latitude, truck.Longitude];

                // Create a marker for each truck
                L.marker(position).addTo(map)
                    .bindPopup(truck.truckName);
            });
        } catch (error) {
            console.error('Error fetching truck data:', error);
        }
    }

    // Initialize the map when the page loads
    window.addEventListener('load', initMap);
</script>
