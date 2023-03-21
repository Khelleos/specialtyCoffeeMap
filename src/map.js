const map = L.map("map").setView([54.352, 18.646], 10);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; CartoDB",
}).addTo(map);

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
