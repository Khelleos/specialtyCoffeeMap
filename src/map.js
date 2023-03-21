const map = L.map("map").setView([54.352, 18.646], 12);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; CartoDB",
}).addTo(map);

export function createMarkers() {
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
      `;

    const marker = L.marker([bookmark.lat, bookmark.lng]).addTo(map);

    marker.on("click", () => {
      document.getElementById("popup-content").innerHTML = popupContent;
      document.getElementById("custom-popup").style.display = "block";
    });
  });
}
