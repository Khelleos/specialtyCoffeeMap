var bookmarks = [
  {
    "name": "Coffee Moose Gdansk",
    "address": "Aleja Grunwaldzka 116, 80-244 Gdańsk, Poland",
    "lat": 54.37942340374769, 
    "lng": 18.60330220887711,
    "instagramLink": "https://www.instagram.com/coffeemoose_gdansk/",
    "workingHours": [
      [9, 19],  // Sunday
      [7, 19],  // Monday
      [7, 19],  // Tuesday
      [7, 19],  // Wednesday
      [7, 19],  // Thursday
      [7, 19],  // Friday
      [9, 19]   // Saturday
    ]
  }
];

// Initialize map with Gdansk as the default location
var map = L.map('map').setView([54.352, 18.646], 10);

// Add a grey tile layer to the map
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; CartoDB'
}).addTo(map);

// Loop through bookmarks and add markers to the map
for (var i = 0; i < bookmarks.length; i++) {
  var bookmark = bookmarks[i];

  // Get current day and time
  var now = new Date();
  var dayOfWeek = now.getUTCDay(); // 0 = Sunday, 1 = Monday, etc.
  var hourOfDay = now.getUTCHours();

  // Calculate open/closed status based on working hours
  var isOpen = false;
  if (bookmark.workingHours[dayOfWeek] && hourOfDay >= bookmark.workingHours[dayOfWeek][0] && hourOfDay < bookmark.workingHours[dayOfWeek][1]) {
    isOpen = true;
  }

  // Determine the color of the open/closed status
  var statusColor = isOpen ? 'green' : 'red';

  // Create popup content
  var popupContent = '<div class="popup-title">' +
    '<a href="' + bookmark.instagramLink + '" target="_blank" class="popup-title-text" style="font-size: 20px;">' + bookmark.name + '</a>' +
    '</div>' +
    '<div class="popup-status" style="margin-top: 10px; margin-bottom: 10px; color: ' + statusColor + ';">' + (isOpen ? 'Open' : 'Closed') + '</div>' +
    '<div class="popup-address">' + bookmark.address + '</div>' +
    '<a href="https://www.google.com/maps/dir/?api=1&destination=' + bookmark.lat + ',' + bookmark.lng + '" target="_blank" class="popup-directions">' +
    '<i class="fas fa-map-marker-alt"></i>' +
    '</a>' +
    '<div class="popup-body">' +
    '</div>';

  // Add marker to the map
  L.marker([bookmark.lat, bookmark.lng]).addTo(map)
    .bindPopup(popupContent, { minWidth: 200 });
}
