const bookmarks = [
    {
        name: "Coffee Moose Gdansk",
        address: "Aleja Grunwaldzka 116, 80-244 Gdańsk, Poland",
        lat: 54.37942340374769,
        lng: 18.60330220887711,
        instagramLink: "https://www.instagram.com/coffeemoose_gdansk/",
        workingHours: [
            [9, 19],  // Sunday
            [7, 19],  // Monday
            [7, 19],  // Tuesday
            [7, 19],  // Wednesday
            [7, 19],  // Thursday
            [7, 19],  // Friday
            [9, 19],  // Saturday
        ],
    },
];

// Export the bookmarks data as a global variable in the client-side JavaScript environment
window.bookmarks = bookmarks;