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
          src: `src/assets/images/EsteticaCarousel/imageSlider.avif`,
          alt: `Image 1`,
        },
        {
          src: `src/assets/images/EsteticaCarousel/imageSlider2.avif`,
          alt: `Image 2`,
        },
        {
          src: `src/assets/images/EsteticaCarousel/imageSlider1.avif`,
          alt: `Image 3`,
        },
        {
          src: `src/assets/images/EsteticaCarousel/imageSlider3.avif`,
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
