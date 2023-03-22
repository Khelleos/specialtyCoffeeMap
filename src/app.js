import { loadBookmarks } from './firebase.js';
import { createMarkers } from './map.js';

/**
 * Renders the UI with the initial state
 */
function renderUI() {
  console.log('Bookmarks data has loaded. Rendering UI...');
  createMarkers();
}

// Load bookmarks and render the UI when they are loaded
loadBookmarks(renderUI);