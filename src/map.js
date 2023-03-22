import instagramLogo from '../assets/instagram.png';

const logoElement = document.createElement('img');
logoElement.src = instagramLogo;

const map = L.map("map").setView([54.352, 18.646], 12);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; CartoDB",
}).addTo(map);

/**
 * Create markers on the map
 */
export function createMarkers() {
  window.bookmarks.forEach((bookmark) => {
    const now = new Date();
    const dayOfWeek = now.getUTCDay();
    const hourOfDay = now.getUTCHours();
    const isOpen = bookmark.workingHours[dayOfWeek] && hourOfDay >= bookmark.workingHours[dayOfWeek][0] && hourOfDay < bookmark.workingHours[dayOfWeek][1];
    const statusClass = isOpen ? 'open' : 'closed';

    const popupContent = `
            <div class="popup-title">
                <img src="${instagramLogo}" alt="Instagram" width="20" height="20">
                <a href="${bookmark.instagramLink}" target="_blank" class="popup-title-text" style="font-size: 20px;">${bookmark.name}</a>
            </div>
            <div class="popup-status ${statusClass}">${isOpen ? 'Open' : 'Closed'}</div>
            <div class="popup-address">${bookmark.address}</div>
        `;

    const marker = L.marker([bookmark.lat, bookmark.lng]).addTo(map);

    marker.on('click', () => {
      document.getElementById('popup-content').innerHTML = popupContent;
      document.getElementById('custom-popup').style.display = 'block';
    });
  });
}
