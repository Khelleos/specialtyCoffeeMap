// Initialize Firebase
var firebaseConfig = {
    apiKey: "apiKey",
    authDomain: "authDomain",
    databaseURL: "databaseURL",
    projectId: "projectId",
    storageBucket: "storageBucket",
    messagingSenderId: "messagingSenderId",
    appId: "appId"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

// Get a reference to the bookmarks collection
var ref = database.ref("bookmarks");


console.log('Firebase initialization complete');
// Function to load bookmarks and call a callback function
function loadBookmarks(callback) {
    ref.on("value", function (snapshot) {
        console.log('Bookmarks are loaded, parsing them');
        // Get the bookmarks data from the snapshot
        var bookmarksData = snapshot.val();

        // Convert the bookmarks data to an array
        var bookmarksArray = [];
        for (var key in bookmarksData) {
            if (bookmarksData.hasOwnProperty(key)) {
                bookmarksArray.push(bookmarksData[key]);
            }
        }

        // Assign the bookmarks data to the bookmarks variable
        window.bookmarks = bookmarksArray;

        // Call the callback function
        callback();
    });
}

// Add the following function to your code
function createMarkers() {
    window.bookmarks.forEach((bookmark) => {
        const now = new Date();
        const dayOfWeek = now.getUTCDay(); // 0 = Sunday, 1 = Monday, etc.
        const hourOfDay = now.getUTCHours();
        const isOpen = bookmark.workingHours[dayOfWeek] && hourOfDay >= bookmark.workingHours[dayOfWeek][0] && hourOfDay < bookmark.workingHours[dayOfWeek][1];
        const statusColor = isOpen ? "green" : "red";

        const popupContent = `
          <div class="popup-title">
            <a href="${bookmark.instagramLink}" target="_blank" class="popup-title-text" style="font-size: 20px;">${bookmark.name}</a>
          </div>
          <div class="popup-status" style="margin-top: 10px; margin-bottom: 10px; color: ${statusColor};">${isOpen ? "Open" : "Closed"}</div>
          <div class="popup-address">${bookmark.address}</div>
          <a href="https://www.google.com/maps/dir/?api=1&destination=${bookmark.lat},${bookmark.lng}" target="_blank" class="popup-directions">
            <i class="fas fa-map-marker-alt"></i>
          </a>
          <div class="popup-body"></div>
        `;

        L.marker([bookmark.lat, bookmark.lng]).addTo(map).bindPopup(popupContent, { minWidth: 200 });
    });
}

// Render the UI with the initial state
function renderUI() {
    // Add code to render UI with the loaded bookmarks data
    console.log("Bookmarks data has loaded. Rendering UI...");
    createMarkers();
}

// Load bookmarks and render the UI when they are loaded
loadBookmarks(renderUI);