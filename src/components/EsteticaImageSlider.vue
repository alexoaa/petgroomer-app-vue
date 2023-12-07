<template>
  <div class="wrapper img-slider-size">
    <Splide :options="options" :has-track="false" class="img-slider-size">
      <div style="position: relative" class="img-slider-size">
        <SplideTrack>
          <SplideSlide v-for="slide in slides" :key="slide.alt">
            <img :src="slide.src" :alt="slide.alt" class="img-sliders" />
          </SplideSlide>
        </SplideTrack>
        <div class="splide__progress">
          <div class="splide__progress__bar"></div>
        </div>
      </div>
    </Splide>
  </div>
</template>

<script>
import { Splide, SplideSlide, SplideTrack } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

import image1 from "@/assets/images/EsteticaCarousel/imageSlider.webp";
import image2 from "@/assets/images/EsteticaCarousel/imageSlider1.webp";
import image3 from "@/assets/images/EsteticaCarousel/imageSlider2.webp";
import image4 from "@/assets/images/EsteticaCarousel/imageSlider3.webp";

export default {
  name: "EsteticaImageSlider",
  components: {
    Splide,
    SplideTrack,
    SplideSlide,
  },
  data() {
    return {
      slides: [
        {
          src: image1,
          alt: `Image 1`,
        },
        {
          src: image2,
          alt: `Image 2`,
        },
        {
          src: image3,
          alt: `Image 3`,
        },
        {
          src: image4,
          alt: `Image 4`,
        },
      ],
      options: {
        rewind: true,
        autoplay: true,
        rewindByDrag: true,
        speed: 800,
        interval: 2500,
      },
    };
  },
};
</script>

<style>
.splide__pagination li {
  background-color: #fff4;
  padding: 2.5px 2;
  padding-bottom: 3px;
}
.splide__pagination li:first-of-type {
  padding-left: 10px;
  border-top-left-radius: 60px;
  border-bottom-left-radius: 60px;
}
.splide__pagination li:last-of-type {
  padding-right: 10px;
  border-top-right-radius: 60px;
  border-bottom-right-radius: 60px;
}
.splide__pagination li button {
  background-color: #fff;
}
</style>
