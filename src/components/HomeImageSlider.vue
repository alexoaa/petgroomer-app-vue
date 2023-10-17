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
// import "@splidejs/vue-splide/css/skyblue";

export default {
  name: "HomeImageSlider",
  components: {
    Splide,
    SplideTrack,
    SplideSlide,
  },
  data() {
    return {
      slides: [
        {
          src: `src/assets/images/HomeCarousel/imageSlider.webp`,
          alt: `Image 1`,
        },
        {
          src: `src/assets/images/HomeCarousel/imageSlider1.webp`,
          alt: `Image 2`,
        },
        {
          src: `src/assets/images/HomeCarousel/imageSlider2.webp`,
          alt: `Image 3`,
        },
        {
          src: `src/assets/images/HomeCarousel/imageSlider3.webp`,
          alt: `Image 4`,
        },
      ],
      options: {
        rewind: true,
        autoplay: true,
        rewindByDrag: true,
      },
    };
  },
};
</script>
