<template>
  <section class="flex flex-wrap justify-center pt-0">
    <section class="main-section">
      <div class="hero-content">
        <h1>ADMIN VIEW</h1>
        <p>
          Con nuestros servicios de peluquería y estética canina que harán que
          tu peludo se vea y se sienta genial!.
        </p>
        <router-link :to="{ name: 'estetica' }" class="btn-primary">
          <svg>
            <use href="/icons/icons.svg#paw" />
          </svg>
          Agendar una cita
        </router-link>
      </div>
      <div class="hero-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319">
          <path
            fill="var(--background-main-color)"
            fill-opacity="1"
            d="M0,32L48,53.3C96,75,192,117,288,122.7C384,128,480,96,576,117.3C672,139,768,213,864,245.3C960,277,1056,267,1152,245.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
    <router-view></router-view>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";

const serviceStepOne = ref(null);
const serviceStepTwo = ref(null);
const serviceStepThree = ref(null);
const serviceStepFour = ref(null);
const serviceStepFive = ref(null);

const serviceStepOneVisible = ref(false);
const serviceStepTwoVisible = ref(false);
const serviceStepThreeVisible = ref(false);
const serviceStepFourVisible = ref(false);
const serviceStepFiveVisible = ref(false);

onMounted(() => {
  onClickOutside(serviceStepOne, () => {
    serviceStepOneVisible.value = false;
  });
  onClickOutside(serviceStepTwo, () => {
    serviceStepTwoVisible.value = false;
  });
  onClickOutside(serviceStepThree, () => {
    serviceStepThreeVisible.value = false;
  });
  onClickOutside(serviceStepFour, () => {
    serviceStepFourVisible.value = false;
  });
  onClickOutside(serviceStepFive, () => {
    serviceStepFiveVisible.value = false;
  });
});
</script>

<style lang="scss" scoped>
section {
  width: 100%;
}
h1 {
  font-weight: bold;
}
.main-section {
  height: 100dvh;
  position: relative;
  background-image: url(@/assets/images/main-background.webp);
  background-size: cover;
  background-position-x: 800px;
  padding: 60px 5% 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #4f4f4f;
  background-blend-mode: overlay;

  .hero-content {
    position: relative;
    z-index: 50;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-wrap: balance;
    h1,
    p {
      color: var(--white-text-color);
    }
    h1,
    h1 span {
      font-weight: 900;
      font-size: clamp(2.2rem, 3dvw, 3.6rem);
      margin: auto;
    }
    p {
      margin: 30px 0;
      font-size: clamp(1.2rem, 2dvw, 1.5rem);
      text-wrap: pretty;
    }
    .btn-primary {
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        margin-right: 9px;
        width: 25px;
        height: 25px;
      }
    }
  }
  .hero-wave {
    position: absolute;
    left: 0;
    bottom: -5px;
    min-width: 660px;
    width: 100%;
    height: fit-content;

    svg {
      width: 100%;
      transform: scaleX(-1);
    }
  }
}
.feature-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;
  .feature-container {
    text-align: left;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    .feature-content {
      max-width: 100%;
    }
    .feature-image {
      height: 100%;
      width: 100%;
      max-width: 400px;
      box-shadow: 0px 2px 5px var(--light-gray-color);
      overflow: hidden;
      border-radius: 6px;
      overflow: hidden;
      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        object-position: center;
      }
    }
  }
}
.service-description-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3rem 0;
  padding: 3rem 0;
  background: var(--background-secondary-color);
  .service-description-container {
    text-align: left;
    width: 90%;
    .service-description-title {
      font-size: 1.875rem;
      line-height: 2.25rem;
      padding-bottom: 1rem;
      margin-bottom: 2rem;
      color: var(--black-text-color);
    }
    .service-description-steps {
      display: flex;
      align-items: flex-start;
      flex-wrap: wrap;
      li {
        margin-bottom: 1.75rem;
        overflow: hidden;
        border-bottom: 2px solid var(--black-text-color);
        width: 100%;
        padding-bottom: 1.75rem;
        div {
          display: flex;
          align-items: flex-start;
          padding-right: 10px;
          &:hover {
            cursor: pointer;
            h1,
            svg,
            span {
              color: var(--accent-color);
              fill: var(--accent-color);
            }
          }
          h1,
          span {
            transition: color 100ms ease-in-out;
          }
          h1 {
            width: 100%;
          }
          svg {
            width: 25px;
            height: 25px;
            fill: var(--black-text-color);
            transition: fill 100ms ease-in-out;
          }
        }
        .step-five-share-exp {
          ul {
            display: inline-flex;
            li {
              margin: 0;
              padding: 0;
              border: none;
            }
            svg {
              width: 20px;
              height: 20px;
              fill: var(--accent-color);
            }
          }
        }
        h1 {
          color: var(--black-text-color);
          span {
            color: var(--black-text-color);
            font-weight: bold;
          }
        }
        p {
          color: var(--black-text-color);
          padding-top: 1rem;
          font-weight: 500;
        }
      }
    }
  }
}
.services-section {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2rem 0;
  .services-section-container {
    text-align: left;
    width: 90%;
    .ul-services {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      text-align: center;
      gap: 30px;
      .li-services {
        max-width: 450px;
        width: 300px;
        flex-grow: 1;
        box-shadow: 0 3px 5px 1px var(--light-gray-color-100);
        border-radius: 6px;
        overflow: hidden;
        h1 {
          display: block;
          font-size: 1.5rem;
          line-height: 2rem;
          padding: 0 15px;
        }
        p {
          margin: 1rem 0 2rem;
          text-align: left;
          padding: 0 15px;
        }
        img {
          width: 100%;
          margin-bottom: 2rem;
        }
      }
    }
  }
}
.cta-section {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  margin: 3rem 0;
  background: var(--main-color);
  .cta-section-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    text-align: center;
    max-width: 900px;
    h1 {
      color: var(--white-text-color);
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
    p {
      color: var(--white-text-color);
      font-size: 1.25rem;
      font-weight: 500;
      margin: 1rem 0 2rem;
    }
    .btn-terciary {
      padding: 16px 32px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        fill: var(--main-color);
        margin-right: 8px;
        width: 25px;
        height: 25px;
      }
    }
  }
}
.testimonial-section {
  width: 90%;
  margin-bottom: 3rem;
  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
  }
  .ul-testimonials {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .li-testimonials {
    width: 100%;
    max-width: 400px;
    padding: 1.75rem;
    margin: 2.25rem 0;
    text-align: left;
    border-radius: 6px;
    box-shadow: 0 0 6px 1px var(--light-gray-color-100);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    ul {
      display: flex;
      li {
        width: 40px;
        height: 40px;
        svg {
          fill: var(--main-color);
          stroke: var(--main-color);
          width: 100%;
          height: 100%;
        }
      }
    }
    h1 {
      margin-bottom: 0;
      font-size: 1.25rem;
      width: 100%;
      text-align: center;
    }
    p {
      font-size: 1.25rem;
      line-height: 1.75rem;
      margin: 1.5rem 0;
      text-wrap: balance;
      text-align: center;
    }
    span {
      font-size: 1rem;
    }
  }
}

@media screen and (min-width: 768px) {
  .main-section {
    justify-content: flex-start;
    background-position-x: left;
    .hero-content {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      text-wrap: balance;
      max-width: 65%;
      h1,
      p {
        color: var(--white-text-color);
      }
      h1,
      h1 span {
        font-weight: 900;
        margin: auto;
      }
      .btn-primary {
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
          margin-right: 9px;
          width: 25px;
          height: 25px;
        }
      }
    }
    .hero-wave {
      position: absolute;
      left: 0;
      bottom: -5px;
      width: 100%;
      height: fit-content;
      overflow: hidden;
      svg {
        width: 100%;
        transform: scaleX(-1);
      }
    }
  }
  .feature-section {
    .feature-container {
      .feature-content {
      }
    }
  }
  .services-section {
    .services-section-container {
      text-align: left;
      width: 90%;
    }
  }
  .cta-section {
    .cta-section-container {
      padding: 3.25rem 4rem;
    }
  }
  .testimonial-section {
    .ul-testimonials {
      justify-content: space-around;
    }
  }
}

@media screen and (min-width: 1024px) {
  .main-section {
    background-position-y: 0px;
    padding: 80px 35px 40px;

    .hero-wave {
      svg {
        translate: 0 20px;
      }
    }
  }
  .feature-section {
    .feature-container {
      justify-content: space-between;
      .feature-content {
        width: 55%;
      }
    }
  }
  .services-section {
    .services-section-container {
      .ul-services {
        gap: 3rem;
        text-align: left;
      }
    }
  }
  .testimonial-section {
    .ul-testimonials {
      justify-content: flex-start;
      .li-testimonials {
        margin-right: 3rem;
      }
    }
  }
}
@media screen and (min-width: 1200px) {
  .main-section {
    .hero-content {
      max-width: 50%;
    }
  }
  .feature-container {
    flex-wrap: nowrap !important;
    justify-content: flex-start !important;
    .feature-content {
      max-width: 60% !important;
      margin-right: 2rem;
      ul {
        margin-top: 3rem;
        div {
          margin: 0;
        }
      }
    }
  }
  .services-section {
    .services-section-container {
      .ul-services {
        justify-content: flex-start;
      }
    }
  }
  .cta-section {
    .cta-section-container {
      a {
        width: fit-content;
        margin: 0 auto;
      }
      padding: 3.25rem 8rem;
    }
  }
}
</style>
