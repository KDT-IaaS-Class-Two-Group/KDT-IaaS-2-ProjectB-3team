<template>
  <div>
    <h1>Location</h1>
    <MapDisplayer />
    <LocationInputter />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MapDisplayer from "./map/MapDisplayer.vue";
import LocationInputter from "./input/LocationInputter.vue";

/**
 * @yuxincxoi 24.10.01
 * * 지도 컴포넌트 + 검색창 컴포넌트
 */
export default defineComponent({
  name: "LocationComponent",
  components: {
    MapDisplayer,
    LocationInputter,
  },
});
</script>
