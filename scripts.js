import {createClient} from 
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the client with your Supabase project URL and API key
const supabase = createClient('https://nhbfxiflraidpfehybvx.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oYmZ4aWZscmFpZHBmZWh5YnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxOTMwNDcsImV4cCI6MjAzMDc2OTA0N30.SC4S-bA1O5iHcNijXA7N9fdUGZD2ZHyA4RrlcVIoR1g');

async function fetchData(searchValue, searchField, searchTable) {
    const { data, error } = await supabase
        .from(searchTable)
        .select()
        .ilike(searchField, `%${searchValue}%`);
    if (error) {
        console.error('Error fetching data:', error);
        document.getElementById('message').textContent = "Failed to fetch data, please check console for details.";
        return;
    } else if (data.length === 0) {
        document.getElementById('message').textContent = "No result found";
    } else {
        document.getElementById('message').textContent = "Search Successful";
    }
}

document.getElementById('submitbutton1').addEventListener('click', function() {
    var driverName = document.getElementById('name').value.trim();
    var licenseNumber = document.getElementById('license').value.trim();

    console.log("Driver's Name:", driverName);
    console.log("License Number:", licenseNumber);

    if ((driverName === "" && licenseNumber === "") || (driverName !== "" && licenseNumber !== "")) {
        document.getElementById('message').textContent = "Error";
    } else if (driverName !== "") {
        console.log("i'm here");
        fetchData(driverName, 'Name', 'People');
    } else {
        fetchData(licenseNumber, 'LicenseNumber', 'People'); 
    }
});

document.getElementById('submitbutton2').addEventListener('click', function() {
    var plateNumber = document.getElementById('rego').value.trim();

    console.log("Plate number:", plateNumber);

    if (plateNumber === "" ) {
        document.getElementById('message').textContent = "Error";
    }
    else {
        fetchData(plateNumber, 'VehicleID', 'Vehicle'); 
    }
});
