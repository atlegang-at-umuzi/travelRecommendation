const travelData = {
  countries: [
    {
      id: 1,
      name: "Australia",
      cities: [
        {
          name: "Sydney, Australia",
          imageUrl: "sydney.jpg",
          description:
            "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge.",
        },
        {
          name: "Melbourne, Australia",
          imageUrl: "melbourne.jpg",
          description:
            "A cultural hub famous for its art, food, and diverse neighborhoods.",
        },
      ],
    },
    {
      id: 2,
      name: "Japan",
      cities: [
        {
          name: "Tokyo, Japan",
          imageUrl: "tokyo.jpg",
          description:
            "A bustling metropolis blending tradition and modernity, famous for its cherry blossoms and rich culture.",
        },
        {
          name: "Kyoto, Japan",
          imageUrl: "kyoto.jpg",
          description:
            "Known for its historic temples, gardens, and traditional tea houses.",
        },
      ],
    },
    {
      id: 3,
      name: "Brazil",
      cities: [
        {
          name: "Rio de Janeiro, Brazil",
          imageUrl: "rio.jpg",
          description:
            "A lively city known for its stunning beaches, vibrant carnival celebrations, and iconic landmarks.",
        },
        {
          name: "São Paulo, Brazil",
          imageUrl: "sao-paulo.jpg",
          description:
            "The financial hub with diverse culture, arts, and a vibrant nightlife.",
        },
      ],
    },
  ],
  temples: [
    {
      id: 1,
      name: "Angkor Wat, Cambodia",
      imageUrl: "angkor-wat.jpg",
      description:
        "A UNESCO World Heritage site and the largest religious monument in the world.",
    },
    {
      id: 2,
      name: "Taj Mahal, India",
      imageUrl: "taj-mahal.jpg",
      description:
        "An iconic symbol of love and a masterpiece of Mughal architecture.",
    },
  ],
  beaches: [
    {
      id: 1,
      name: "Bora Bora, French Polynesia",
      imageUrl: "bora-bora.jpg",
      description:
        "An island known for its stunning turquoise waters and luxurious overwater bungalows.",
    },
    {
      id: 2,
      name: "Copacabana Beach, Brazil",
      imageUrl: "copacabana.jpg",
      description:
        "A famous beach in Rio de Janeiro, Brazil, with a vibrant atmosphere and scenic views.",
    },
  ],
};

// Page navigation
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll(".page").forEach((page) => {
    page.classList.remove("active");
  });

  // Show selected page
  document.getElementById(pageId).classList.add("active");

  // Hide results when navigating to other pages
  if (pageId !== "home") {
    document.getElementById("resultsSection").style.display = "none";
  }
}

// Search functionality
function searchRecommendations() {
  const searchTerm = document
    .getElementById("searchInput")
    .value.toLowerCase()
    .trim();

  if (!searchTerm) {
    alert("Please enter a search term");
    return;
  }

  let results = [];

  // Search for beaches
  if (searchTerm.includes("beach") || searchTerm.includes("beaches")) {
    results = travelData.beaches;
  }
  // Search for temples
  else if (searchTerm.includes("temple") || searchTerm.includes("temples")) {
    results = travelData.temples;
  }
  // Search for countries
  else if (
    searchTerm.includes("country") ||
    searchTerm.includes("countries") ||
    searchTerm.includes("australia") ||
    searchTerm.includes("japan") ||
    searchTerm.includes("brazil")
  ) {
    results = [];
    travelData.countries.forEach((country) => {
      if (
        country.name.toLowerCase().includes(searchTerm) ||
        searchTerm.includes("country") ||
        searchTerm.includes("countries")
      ) {
        results = results.concat(country.cities);
      }
    });
  }
  // Search for specific destinations
  else {
    // Search through all categories
    const allDestinations = [
      ...travelData.beaches,
      ...travelData.temples,
      ...travelData.countries.flatMap((country) => country.cities),
    ];

    results = allDestinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(searchTerm) ||
        dest.description.toLowerCase().includes(searchTerm)
    );
  }

  displayResults(results);
}

// Display search results
function displayResults(results) {
  const resultsSection = document.getElementById("resultsSection");
  const resultsGrid = document.getElementById("resultsGrid");

  if (results.length === 0) {
    resultsGrid.innerHTML =
      '<p style="text-align: center; font-size: 1.2rem; color: #666;">No recommendations found. Try searching for "beach", "temple", or "country".</p>';
  } else {
    resultsGrid.innerHTML = results
      .map(
        (item) => `
                    <div class="result-card">
                        <div class="result-image">
                            📸 ${item.name}
                        </div>
                        <div class="result-content">
                            <h3 class="result-title">${item.name}</h3>
                            <p class="result-description">${item.description}</p>
                        </div>
                    </div>
                `
      )
      .join("");
  }

  resultsSection.style.display = "block";

  resultsSection.scrollIntoView({ behavior: "smooth" });
}

function clearResults() {
  document.getElementById("searchInput").value = "";
  document.getElementById("resultsSection").style.display = "none";
  document.getElementById("resultsGrid").innerHTML = "";
}

document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Simulate form submission
  alert(
    `Thank you, ${name}! Your message has been sent. We'll get back to you at ${email} soon.`
  );

  this.reset();
});

document
  .getElementById("searchInput")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      searchRecommendations();
    }
  });

console.log("Travel data loaded:", travelData);
