"use strict";
let map;
let leavingMarker = null;
let arrivedMarker = null;
map = L.map("map").setView([0, 0], 2);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
}).addTo(map);
map.on("click", function (e) {
    if (!leavingMarker) {
        leavingMarker = L.marker(e.latlng, {
            draggable: true
        }).addTo(map)
            .bindPopup("Lieu de départ")
            .openPopup();
        updateInputWithLocationName(e.latlng, "departurePoint");
        leavingMarker.on('dragend', function (event) {
            let marker = event.target;
            let position = marker.getLatLng();
            updateInputWithLocationName(position, "departurePoint");
            if (arrivedMarker) {
                calculateDistance(position, arrivedMarker.getLatLng());
            }
        });
    }
    else if (!arrivedMarker) {
        arrivedMarker = L.marker(e.latlng, {
            draggable: true
        }).addTo(map)
            .bindPopup("Lieu d'arrivée")
            .openPopup();
        updateInputWithLocationName(e.latlng, "arrivalPoint");
        calculateDistance(leavingMarker.getLatLng(), e.latlng);
        arrivedMarker.on('dragend', function (event) {
            let marker = event.target;
            let position = marker.getLatLng();
            updateInputWithLocationName(position, "arrivalPoint");
            calculateDistance(leavingMarker.getLatLng(), position);
        });
    }
    else {
        arrivedMarker.setLatLng(e.latlng);
        updateInputWithLocationName(e.latlng, "arrivalPoint");
        calculateDistance(leavingMarker.getLatLng(), e.latlng);
    }
});
function updateInputWithLocationName(latlng, inputId) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
        .then(response => response.json())
        .then(data => {
        if (inputId === "departurePoint") {
            const country = data.address.country || `${latlng.lat}, ${latlng.lng}`;
            const departPoint = document.getElementById(inputId);
            if (departPoint) {
                departPoint.value = country;
            }
        }
        else if (inputId === "arrivalPoint") {
            const country = data.address.country || `${latlng.lat}, ${latlng.lng}`;
            const arrivalPoint = document.getElementById(inputId);
            if (arrivalPoint) {
                arrivalPoint.value = country;
            }
        }
    })
        .catch(error => {
        console.error('Error fetching location name:', error);
        const input = document.getElementById(inputId);
        input.value = `${latlng.lat}, ${latlng.lng}`;
    });
}
function calculateDistance(start, end) {
    const lat1 = start.lat;
    const lon1 = start.lng;
    const lat2 = end.lat;
    const lon2 = end.lng;
    const R = 6371; // Radius of the Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
            Math.cos((lat2 * Math.PI) / 180) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    const inputDistance = document.getElementById("distance");
    inputDistance.value = distance.toFixed(2);
}
setTimeout(() => {
    map.invalidateSize();
}, 100);
