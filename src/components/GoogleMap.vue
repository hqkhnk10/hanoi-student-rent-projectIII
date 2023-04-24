<template>
    <GoogleMap api-key="AIzaSyCAw7c9fbHb81calvTAyptY1hDc7qjoCPg" style="width: 100%; height: 500px" :center="center"
        :zoom="15">
        <MarkerCluster>
            <Marker :options="{ position: center }">
                <InfoWindow>
                    <div>current Location {{ center }}</div>
                </InfoWindow>
            </Marker>
            <Marker v-for="(location, i) in locations" :options="{ position: location }" :key="i" />
        </MarkerCluster>
    </GoogleMap>
</template>
  
<script setup>
onBeforeMount(()=>{
    getLocation();
})
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}
const center = ref({ lat: -28.024, lng: 140.887 })

function showPosition(position) {
    center.value.lat = position.coords.latitude;
    center.value.lng = position.coords.longitude;
}
const locations = [
            { lat: -31.56391, lng: 147.154312 },
            { lat: -33.718234, lng: 150.363181 },
            { lat: -33.727111, lng: 150.371124 },
            { lat: -33.848588, lng: 151.209834 },
            { lat: -33.851702, lng: 151.216968 },
            { lat: -34.671264, lng: 150.863657 },
            { lat: -35.304724, lng: 148.662905 },
            { lat: -36.817685, lng: 175.699196 },
            { lat: -36.828611, lng: 175.790222 },
            { lat: -37.75, lng: 145.116667 },
            { lat: -37.759859, lng: 145.128708 },
            { lat: -37.765015, lng: 145.133858 },
            { lat: -37.770104, lng: 145.143299 },
            { lat: -37.7737, lng: 145.145187 },
            { lat: -37.774785, lng: 145.137978 },
            { lat: -37.819616, lng: 144.968119 },
            { lat: -38.330766, lng: 144.695692 },
            { lat: -39.927193, lng: 175.053218 },
            { lat: -41.330162, lng: 174.865694 },
            { lat: -42.734358, lng: 147.439506 },
            { lat: -42.734358, lng: 147.501315 },
            { lat: -42.735258, lng: 147.438 },
            { lat: -43.999792, lng: 170.463352 },
        ];
</script>

<script>
import { defineComponent, onBeforeMount, ref } from 'vue'
import { GoogleMap, Marker, MarkerCluster, InfoWindow } from 'vue3-google-map'

export default defineComponent({
    components: { GoogleMap, Marker, MarkerCluster, InfoWindow },
})
</script>