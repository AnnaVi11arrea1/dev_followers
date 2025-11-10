const initialUrl = "https://dev.to/api/followers/users?page=1&per_page=1000";
async function fetchAllPages(initialUrl) {
    let allResults = [];
    let currentPageUrl = initialUrl;
    let pageNumber = 1;

    while (true) {
        try {
            const response = await fetch(currentPageUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': 'DEVTO_API_KEY'
                },
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            
            // Assuming the API returns an array of results in a 'results' property
            const currentResults = data || [];
            allResults = allResults.concat(currentResults);
            
            // Check the number of results on the current page
            console.log(`All results count: ${allResults.length}`);
            if (currentResults.length >= 1 && currentResults.length <= 1000) {
                
                // Construct the URL for the next page.
                // This will depend on your API's pagination mechanism (e.g., 'page' parameter, 'next_page' URL in response).
                // Example: If your API uses a 'page' query parameter:
                currentPageUrl = `${initialUrl.split('?')[0]}?page=${++pageNumber}&per_page=1000`;
                console.log(`currentPageUrl: ${currentPageUrl}`);
                console.log(`pageNumber: ${pageNumber}`);
            } else {
                console.log(`Fetching: ${currentPageUrl}`);
                break; // Result count is outside the 1-1000 range, stop fetching
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            break; // Exit the loop on error
        }
        console.log(`currentPageUrl: ${currentPageUrl}`);
        console.log(`pageNumber: ${pageNumber}`);
    }
    return allResults;
}

fetchAllPages(initialUrl)
    .then(allResults => {
        console.log("All fetched results:", allResults);
    })
    .catch(error => {
        console.error("Failed to fetch all pages:", error);
    });


async function countFollowers() {
    const followers = await fetchAllPages(initialUrl);
    totalFollowers = followers.length;
    console.log(`Total followers count: ${totalFollowers}`);
}
var totalFollowers = countFollowers();
console.log(`Total followers outside function: ${totalFollowers}`);

document.getElementById("followers").innerText = totalFollowers;