let map;
const buuDien = { lat: 10.779931668812813, lng: 106.69997186996581 };
const quocTuGiam = { lat: 21.027847904091093, lng: 105.83550387007325 };
const radius = 13;
let buuDienLatLag;
let quocTuGiamLatLng;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: buuDien,
        zoom: 19,
    });
    const cirleBuuDien = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: buuDien,
        radius,
    });

    const cirleQuocTuGiam = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: quocTuGiam,
        radius,
    });

   
    buuDienLatLag = new google.maps.LatLng(buuDien.lat, buuDien.lng);
    const radiusX2 = radius * 2;
    var point1 = google.maps.geometry.spherical.computeOffset(buuDienLatLag, radiusX2, 120);
    var point2 = google.maps.geometry.spherical.computeOffset(buuDienLatLag, radiusX2, 0);
    var point3 = google.maps.geometry.spherical.computeOffset(buuDienLatLag, radiusX2, -120);

    const buuDienNgoaiTiep = new google.maps.Polygon({
        path: [point1, point2, point3],
        strokeColor: '#FDFDFD',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#00000',
        fillOpacity: 0.35,
        map
    });

    quocTuGiamLatLng = new google.maps.LatLng(quocTuGiam.lat, quocTuGiam.lng);
    var point1 = google.maps.geometry.spherical.computeOffset(quocTuGiamLatLng, radiusX2, 120);
    var point2 = google.maps.geometry.spherical.computeOffset(quocTuGiamLatLng, radiusX2, 0);
    var point3 = google.maps.geometry.spherical.computeOffset(quocTuGiamLatLng, radiusX2, -120);

    const quocTuGiamNgoaiTiep = new google.maps.Polygon({
        path: [point1, point2, point3],
        strokeColor: '#FDFDFD',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#00000',
        fillOpacity: 0.35,
        map
    });

    
    var point1 = google.maps.geometry.spherical.computeOffset(buuDienLatLag, radius, 120);
    var point2 = google.maps.geometry.spherical.computeOffset(buuDienLatLag, radius, 0);
    var point3 = google.maps.geometry.spherical.computeOffset(buuDienLatLag, radius, -120);

    const buudienNoiTiep = new google.maps.Polygon({
        path: [point1, point2, point3],
        strokeColor: 'green',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'green',
        fillOpacity: 0.35,
        map
    });

    var point1 = google.maps.geometry.spherical.computeOffset(quocTuGiamLatLng, radius, 120);
    var point2 = google.maps.geometry.spherical.computeOffset(quocTuGiamLatLng, radius, 0);
    var point3 = google.maps.geometry.spherical.computeOffset(quocTuGiamLatLng, radius, -120);

    const quocTuGiamNoiTiep = new google.maps.Polygon({
        path: [point1, point2, point3],
        strokeColor: 'green',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: 'green',
        fillOpacity: 0.35,
        map
    });
    markersAndInforWindows();
    directionsService();
}

function markersAndInforWindows() {
    let postMarker = new google.maps.Marker({
        position: buuDien,
        map
    });

    let quocTuGiamMarker = new google.maps.Marker({
        position: quocTuGiam,
        map
    });

    const postInfoWindow = new google.maps.InfoWindow({
        content: "Bưu Điện Trung Tâm Thành Phố Hồ Chí Minh",
        position: buuDien,
    });

    const quocTuGiamInfoWindow = new google.maps.InfoWindow({
        content: "Văn Miếu Quốc Tử Giám Hà Nội",
        position: quocTuGiam,
    });

    postMarker.addListener('click', () => {
        postInfoWindow.open(map);
    });

    quocTuGiamMarker.addListener('click', () => {
        quocTuGiamInfoWindow.open(map);
    });
}
function directionsService() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();

    directionsRenderer.setMap(map);
    directionsService.route(
        {
            origin: quocTuGiamLatLng,
            destination: buuDienLatLag,
            travelMode: google.maps.TravelMode.WALKING
        },

        (response, status) => {
            if (status === "OK") {
                directionsRenderer.setDirections(response);
            } else {
                window.alert("Direction request failed due to " + status);
            }
        }
    );
}