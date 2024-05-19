const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`
};

export function fetchPlaces() {
  return fetch("http://localhost:8080/dashboard/place", { headers })
    .then(response => response.json());
}

export function fetchCities() {
  return fetch("http://localhost:8080/dashboard/city", { headers })
    .then(response => response.json());
}

export function postNewPlace(newPlaceData) {
  return fetch('http://localhost:8080/dashboard/general', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': headers.Authorization
    },
    body: JSON.stringify(newPlaceData)
  }).then(handleResponse);
}

export function postOpinion(opinionData) {
  return fetch("http://localhost:8080/dashboard/opinion", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': headers.Authorization
    },
    body: JSON.stringify(opinionData)
  }).then(handleResponse);
}

function handleResponse(response) {
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}
