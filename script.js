// Write your JavaScript code here!
window.addEventListener("load", function () {
    missionDestination();
    let form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        verificationForm(event);
    });

});

function verificationForm(event) {
    let pilotNameInput = document.querySelector("input[name = pilotName]");
    let copilotNameInput = document.querySelector("input[name = copilotName]");
    let fuelLevelInput = document.querySelector("input[name = fuelLevel]");
    let cargoMassInput = document.querySelector("input[name = cargoMass]");

    checkType(pilotNameInput, copilotNameInput, fuelLevelInput, cargoMassInput, event);

    const colorRed = "red";
    const colorGreen = "green";
    const messageReadyForLaunch = "Shuttle Ready For Launch";
    const shuttleNotReadyForLaunch = "Shuttle Not Ready For Launch";
    const cargoMassLowEnoughForLaunch = 'Cargo mass low enough for launch';
    const tooMuchMassToTakeOff = 'That there is too much mass for the shuttle to take off';

    if (event.defaultPrevented === false) {
        let pilotStatus = document.getElementById("pilotStatus");
        pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} ready to start`;

        let copilotStatus = document.getElementById("copilotStatus");
        copilotStatus.innerHTML = `Copilot ${copilotNameInput.value} ready to start`;

        let faultyItemsStatus = document.getElementById("fuelStatus");
        let cargoMassStatus = document.getElementById("cargoStatus");

        if (Number(fuelLevelInput.value) < 10000) {
            faultyItemsStatus.innerHTML = 'There is not enough fuel for the journey';
            if (Number(cargoMassInput.value) >= 10000) {
                cargoMassStatus.innerHTML = tooMuchMassToTakeOff;
            } else {
                cargoMassStatus.innerHTML = cargoMassLowEnoughForLaunch;
            }

            faultStatusChange(shuttleNotReadyForLaunch, colorRed);
        } else if (Number(fuelLevelInput.value) >= 10000) {
            faultyItemsStatus.innerHTML = 'Fuel level high enough for launch';
            if (Number(cargoMassInput.value) < 10000) {
                cargoMassStatus.innerHTML = cargoMassLowEnoughForLaunch;
                faultStatusChange(messageReadyForLaunch, colorGreen);
            } else {
                cargoMassStatus.innerHTML = tooMuchMassToTakeOff;
                faultStatusChange(shuttleNotReadyForLaunch, colorRed);
            }

        }

        document.getElementById("faultyItems").style.visibility = "visible";
        event.preventDefault();
    }
}

function checkType(pilotNameInput, copilotNameInput, fuelLevelInput, cargoMassInput, event) {
    let pattern = /[A-Za-z]/g;
    let isStringPilot = pilotNameInput.value.match(pattern);
    let isStringCopilot = copilotNameInput.value.match(pattern);

    if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === ""
        || cargoMassInput.value === "") {
        alert("All fields are required");
        event.preventDefault();
    } else if (event.defaultPrevented === false) {
        if (!isStringPilot) {
            wrongTypes(pilotNameInput, event);
        } else if (!isStringCopilot) {
            wrongTypes(copilotNameInput, event);
        } else if (isNaN(fuelLevelInput.value)) {
            wrongTypes(fuelLevelInput, event);
        } else if (isNaN(cargoMassInput.value)) {
            wrongTypes(cargoMassInput, event);
        }
    }
}

function missionDestination() {
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        response.json().then(function (json) {
            let destination = json[Math.floor(Math.random() * 6)];

            let missionTarget = document.getElementById("missionTarget");
            missionTarget.innerHTML =
                `<h2>Mission Destination</h2>
                    <ol>
                    <li>Name: ${destination.name}</li>
                    <li>Diameter: ${destination.diameter}</li>
                    <li>Star: ${destination.star}</li>
                    <li>Distance from Earth: ${destination.distance}</li>
                    <li>Number of Moons: ${destination.moons}</li>
                    </ol>
                    <img src="${destination.image}"> `
        });
    });
}

function wrongTypes(pilotNameInput, event) {
    pilotNameInput.value = "";
    alert("Make sure to enter valid information for each fields");

    event.preventDefault();
}

function faultStatusChange(message, color) {
    let launchStatus = document.getElementById("launchStatus");
    launchStatus.innerHTML = message;
    launchStatus.style.color = color;
}


/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/


