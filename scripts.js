/*import {createClient} from 
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the client with your Supabase project URL and API key
const supabase = createClient('https://nhbfxiflraidpfehybvx.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oYmZ4aWZscmFpZHBmZWh5YnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxOTMwNDcsImV4cCI6MjAzMDc2OTA0N30.SC4S-bA1O5iHcNijXA7N9fdUGZD2ZHyA4RrlcVIoR1g');

// Fetch data from the table
async function fetchData() {
    const { data, error } = await supabase.from('People').select();
    console.log('Fetched data:', data);
}

// Call the fetchData function to retrieve data
document.querySelector('#button1').addEventListener('click', fetchData);*/

document.getElementById('submitbutton1').addEventListener('click', function() {

    var driverName = document.getElementById('name').value;
    var licenseNumber = document.getElementById('license').value;

    console.log("Driver's Name:", driverName);
    console.log("License Number:", licenseNumber);
    
    if((driverName==="" && licenseNumber==="") || (driverName!=="" && licenseNumber!=="")){
        document.getElementById('message').textContent = "Error";
    }
    else{
        document.getElementById('message').textContent = "Search Succesful";
        document.getElementById('message').textContent = "No result found";
    }
});