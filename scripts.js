import {createClient} from 
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the client with your Supabase project URL and API key
const supabase = createClient('https://nhbfxiflraidpfehybvx.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oYmZ4aWZscmFpZHBmZWh5YnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxOTMwNDcsImV4cCI6MjAzMDc2OTA0N30.SC4S-bA1O5iHcNijXA7N9fdUGZD2ZHyA4RrlcVIoR1g');

function addNewDiv() {
    var newDiv = document.createElement('div');
    newDiv.style.display = 'inline-block';
    newDiv.style.margin = '5px';
    newDiv.style.padding = '5px';
    newDiv.style.border = '1px solid black';

    var newP = document.createElement('p');
    newP.textContent = 'Hello, this is a new div!';
    newDiv.appendChild(newP);

    // Add toggle functionality to the new div
    /*newDiv.onclick = function() {
        if (newDiv.style.display === 'block') {
            newDiv.style.display = 'none';
            newP.textContent = 'Click again to see the message!';
        } else {
            newDiv.style.display = 'block';
            newP.textContent = 'Hello, this is a new div!';
        }
    };*/
    
    document.getElementById('results').appendChild(newDiv);

}

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
        addNewDiv();
        document.getElementById('message').textContent = "Search Successful";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var submitBtn = document.getElementById('submitbutton1');
    if (submitBtn) {
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
    } else {
        console.log('The element with ID "submitbutton1" was not found.');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    var submitBtn = document.getElementById('submitbutton2');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            var plateNumber = document.getElementById('rego').value.trim();
            console.log("Plate number:", plateNumber);

            if (plateNumber === "") {
                document.getElementById('message').textContent = "Error";
            }
            else {
                fetchData(plateNumber, 'VehicleID', 'Vehicles'); 
            }
        });
    } else {
        console.log('The element with ID "submitbutton2" was not found.');
    }
});
