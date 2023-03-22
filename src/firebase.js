import firebaseConfig from './firebaseConfig.js';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const database = firebase.database();
const ref = database.ref('bookmarks');

console.log('Firebase initialization complete');

/**
 * Load bookmarks and call a callback function
 * @param {function} callback - A callback function to be executed when bookmarks are loaded
 */
export function loadBookmarks(callback) {
    ref.on('value', (snapshot) => {
        console.log('Bookmarks are loaded, parsing them');
        const bookmarksData = snapshot.val();
        window.bookmarks = Object.values(bookmarksData);
        callback();
    });
}
