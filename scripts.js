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

function addNewDiv(searchTable, item1, item2, item3, item4, item5, item6, item7) {
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
        newP.textContent = 'licensenumber: ' + item7;
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
        let item1, item2, item3, item4, item5, item6, item7;
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            console.log("Processing item index: ", i);
            if (searchTable === 'People') {
                item1 = item.PeopleID;
                item2 = item.Name;
                item3 = item.Address;
                item4 = item.DOB;
                item5 = item.LicenseNumber;
                item6 = item.ExpiryDate;
                item7 = "NULL"; 
            } else {
                item1 = item.VehicleID;
                item2 = item.Make;
                item3 = item.Model;
                item4 = item.Colour;
                item5 = item.OwnerID;
                if (!item5) {
                    console.error("OwnerID is undefined or null for item index:", i);
                    item6 = "null"; 
                    item7 = "null";
                }
                else{
                    const ownerIds = [item5]; 
    
                    const { data: peopleData, error: peopleError } = await supabase
                        .from('People')
                        .select('Name, LicenseNumber')
                        .in('PeopleID', ownerIds);
    
                    if (peopleError) {
                        console.error("Error fetching people:", peopleError);
                        return;
                    }
    
                    if (peopleData.length > 0) {
                        item6 = peopleData[0].Name;
                        item7 = peopleData[0].LicenseNumber;
                    } else {
                        item6 = "null"; 
                        item7 = "null";
                    }
                }
            }
            addNewDiv(searchTable, item1, item2, item3, item4, item5, item6, item7);
        }
        document.getElementById('message').textContent = "Search Successful";
    }
}

async function searchOwner(searchValue, plateNumber, vehicleMake, vehicleModel, vehicleColour) {
    let data, error;
    ({ data, error } = await supabase
            .from('People')
            .select()
            .eq('PeopleID', searchValue));
    if (error) {
        console.error('Error fetching data:', error);
        document.getElementById('message').textContent = "Failed to fetch data, please check console for details.";
        return;
    }

    if (data.length === 0) {
        var form = document.querySelector('.form2');
        form.style.display = 'block';
        console.log('Found no owner');
        return;
    }

    let insertError;
    ({ error: insertError } = await supabase.from('Vehicles')
            .insert({
                VehicleID: plateNumber,
                Make: vehicleMake,
                Model: vehicleModel,
                Colour: vehicleColour,
                OwnerID: searchValue
            }));

    if (insertError) {
        console.error('Error inserting data:', insertError);
        document.getElementById('message').textContent = "Error adding vehicle, please check console for details.";
    } else {
        document.getElementById('message').textContent = "Vehicle added successfully";
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

document.addEventListener('DOMContentLoaded', function() {
    var submitBtn = document.getElementById('submitbutton3');
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            var plateNumber = document.getElementById('rego').value.trim();
            var vehicleMake = document.getElementById('make').value.trim();
            var vehicleModel = document.getElementById('model').value.trim();
            var vehicleColour = document.getElementById('colour').value.trim();
            var vehicleOwner = document.getElementById('owner').value.trim();
            console.log("Plate number:", plateNumber);
            console.log("Vehicle Make:", vehicleMake);
            console.log("Vehicle Model:", vehicleModel);
            console.log("Vehicle Colour:", vehicleColour);
            console.log("Vehicle Owner:", vehicleOwner);
            
            if (plateNumber === "" || vehicleMake === "" || vehicleModel === "" || vehicleColour === "" || vehicleOwner === "") {
                document.getElementById('message').textContent = "Error";
            }
            else {
                searchOwner(vehicleOwner, plateNumber, vehicleMake, vehicleModel, vehicleColour); 
            }
        });
    } else {
        console.log('The element with ID "submitbutton3" was not found.');
    }
});
