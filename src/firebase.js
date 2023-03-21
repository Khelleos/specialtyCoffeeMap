// Initialize Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBdrD8wLRY53HWspBkVn6HsNiuEEG_sScQ",
    authDomain: "specialtycoffeemap.firebaseapp.com",
    databaseURL: "https://specialtycoffeemap-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "specialtycoffeemap",
    storageBucket: "specialtycoffeemap.appspot.com",
    messagingSenderId: "571095206387",
    appId: "1:571095206387:web:c7d9f812c4c411b4bbaa86"
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
