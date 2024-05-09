import {createClient} from 
    'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// Initialize the client with your Supabase project URL and API key
const supabase = createClient('https://nhbfxiflraidpfehybvx.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oYmZ4aWZscmFpZHBmZWh5YnZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTUxOTMwNDcsImV4cCI6MjAzMDc2OTA0N30.SC4S-bA1O5iHcNijXA7N9fdUGZD2ZHyA4RrlcVIoR1g');

function toggleVisibilityByClass() {
    var elements = document.querySelectorAll('.searchresult');
    if (elements.length > 0) {
        elements.forEach(function(element) {
            element.style.display = 'none';
        });
    } else {
        console.log("No elements found with the class searchresult");
    }
}

function addNewDiv(searchTable, item1, item2, item3, item4, item5, item6) {
    var newDiv = document.createElement('div');
    newDiv.style.display = 'inline-block';
    newDiv.style.margin = '5px';
    newDiv.style.padding = '5px';
    newDiv.style.border = '1px solid black';
    newDiv.classList.add('searchresult');

    if(searchTable==='People'){
        var newP = document.createElement('p');
        newP.textContent = 'personid: ' + item1;
        newDiv.appendChild(newP);

        var newP = document.createElement('p');
        newP.textContent = 'name: ' + item2;
        newDiv.appendChild(newP);
        
        var newP = document.createElement('p');
        newP.textContent = 'address: ' + item3;
        newDiv.appendChild(newP);
        
        var newP = document.createElement('p');
        newP.textContent = 'dob: ' + item4;
        newDiv.appendChild(newP);

        var newP = document.createElement('p');
        newP.textContent = 'licensenumber: ' + item5;
        newDiv.appendChild(newP);

        var newP = document.createElement('p');
        newP.textContent = 'expirydate: ' + item6;
        newDiv.appendChild(newP);
    }
    else{
        var newP = document.createElement('p');
        newP.textContent = 'vehicleid: ' + item1;
        newDiv.appendChild(newP);

        var newP = document.createElement('p');
        newP.textContent = 'make: ' + item2;
        newDiv.appendChild(newP);
        
        var newP = document.createElement('p');
        newP.textContent = 'model: ' + item3;
        newDiv.appendChild(newP);

        var newP = document.createElement('p');
        newP.textContent = 'colour: ' + item4;
        newDiv.appendChild(newP);

        var newP = document.createElement('p');
        newP.textContent = 'ownerid: ' + item5;
        newDiv.appendChild(newP);

        var newP = document.createElement('p');
        newP.textContent = 'name: ' + item6;
        newDiv.appendChild(newP);

        var newP = document.createElement('p');
        newP.textContent = 'licensenumber: ';
        newDiv.appendChild(newP);
    }

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
        if(searchTable==='People'){
        data.forEach(item => {
            var item1 = item.PeopleID;
            var item2 = item.Name;
            var item3 = item.Address;
            var item4 = item.DOB;
            var item5 = item.LicenseNumber;
            var item6 = item.ExpiryDate;
        });
        }
        else{
            data.forEach(item => {
                var item1 = item.VehicleID;
                var item2 = item.Make;
                var item3 = item.Model;
                var item4 = item.Colour;
                var item5 = item.OwnerID;
                var item6="NULL";
            });
        }
        for(let i = 0; i<data.length; i++){
            addNewDiv(searchTable, item1, item2, item3, item4, item5, item6);
        }
        document.getElementById('message').textContent = "Search Successful";
    }
}

document.addEventListener('DOMContentLoaded', function() {
    var submitBtn = document.getElementById('submitbutton1');
    if (submitBtn) {
    document.getElementById('submitbutton1').addEventListener('click', function() {
        toggleVisibilityByClass();
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
            toggleVisibilityByClass();
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


