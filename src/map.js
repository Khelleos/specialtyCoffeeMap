import instagramLogo from '../assets/instagram.png';

const logoElement = document.createElement('img');
logoElement.src = instagramLogo;

const map = L.map("map").setView([54.352, 18.646], 12);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
  attribution: "&copy; CartoDB",
}).addTo(map);

function isCafeOpen(bookmark) {
  const now = new Date();
  const userTimezoneOffset = -now.getTimezoneOffset() * 60 * 1000;
  const localTime = new Date(now.getTime() + userTimezoneOffset);
  const dayOfWeek = localTime.getDay();
  const hourOfDay = localTime.getHours();
  const minuteOfDay = localTime.getMinutes();
  const currentWorkingHours = bookmark.workingHours[dayOfWeek];

  if (!currentWorkingHours) {
    return false;
  }

  const [openHour, openMinute] = currentWorkingHours.openAt.split(':');
  const [closeHour, closeMinute] = currentWorkingHours.closeAt.split(':');

  const openTime = Number(openHour) * 60 + Number(openMinute);
  const closeTime = Number(closeHour) * 60 + Number(closeMinute);
  const currentTime = hourOfDay * 60 + minuteOfDay;

  return currentTime >= openTime && currentTime < closeTime;
}

export function createMarkers() {
  window.bookmarks.forEach((bookmark) => {
    const marker = L.marker([bookmark.lat, bookmark.lng]).addTo(map);

    marker.on('click', () => {
      const isOpen = isCafeOpen(bookmark);
      const statusClass = isOpen ? 'open' : 'closed';

      const popupContent = `
              <div class="popup-title">
                  <img src="${instagramLogo}" alt="Instagram" width="20" height="20">
                  <a href="${bookmark.instagramLink}" target="_blank" class="popup-title-text" style="font-size: 20px;">${bookmark.name}</a>
              </div>
              <div class="popup-status ${statusClass}">${isOpen ? 'Open' : 'Closed'}</div>
              <div class="popup-address">${bookmark.address}</div>
          `;

      document.getElementById('popup-content').innerHTML = popupContent;
      document.getElementById('custom-popup').style.display = 'block';
    });
  });
}