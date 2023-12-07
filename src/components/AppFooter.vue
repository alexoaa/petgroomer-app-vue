<template>
  <footer class="text-center border-t-2 border-slate-600 py-10">
    <section class="flex flex-wrap items-center justify-center">
      <div class="logo-redes-container">
        <router-link class="footer-logo" :to="{ name: 'home' }">
          <img
            class="w-[70%] h-auto mb-4"
            src="@/assets/images/logo-footer.png"
          />
        </router-link>
        <p class="block w-full">Síguenos en:</p>
        <ul class="block w-full">
          <li>
            <a href="#">
              <svg><use href="/icons/icons.svg#facebook-logo" /></svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg><use href="/icons/icons.svg#instagram-logo" /></svg>
            </a>
          </li>
          <li>
            <a href="#">
              <svg><use href="/icons/icons.svg#tiktok-logo" /></svg>
            </a>
          </li>
        </ul>
      </div>
      <div class="footer-info-section-container">
        <div class="footer-info-section">
          <div
            class="p-title-footer"
            @click.stop="toggleAcerca"
            ref="acercaSection"
            :class="acercaVisible ? 'p-font-bold' : ''"
          >
            <span>ACERCA DE DOGBARBER</span>
            <svg :class="acercaVisible ? 'rotate-180' : ''">
              <use href="/icons/icons.svg#chevronDown" />
            </svg>
          </div>
          <ul
            class="text-left px-[30px] py[15px] info-section-container"
            :class="acercaVisible ? 'info-visible' : ''"
          >
            <li>
              <router-link
                class="p-text-footer"
                :to="{ name: 'aboutUs' }"
                text="Sobre DogBarber"
              />
            </li>
            <li>
              <router-link
                class="p-text-footer"
                :to="{ name: 'aboutUs' }"
                text="Blog"
              />
            </li>
            <li>
              <router-link
                class="p-text-footer"
                :to="{ name: 'aboutUs' }"
                text="Términos y condiciones"
              />
            </li>
          </ul>
        </div>
        <div class="footer-info-section">
          <div
            class="p-title-footer"
            @click="toggleInteres"
            ref="interesSection"
            :class="interesVisible ? 'p-font-bold' : ''"
          >
            <span>LINKS DE INTERÉS</span>
            <svg :class="interesVisible ? 'rotate-180' : ''">
              <use href="/icons/icons.svg#chevronDown" />
            </svg>
          </div>
          <ul
            class="text-left px-[30px] py[15px] info-section-container"
            :class="interesVisible ? 'info-visible' : ''"
          >
            <li>
              <router-link
                class="p-text-footer"
                :to="{ name: 'aboutUs' }"
                text="Preguntas frecuentes"
              />
            </li>
            <li>
              <router-link
                class="p-text-footer"
                :to="{ name: 'aboutUs' }"
                text="Política de Privacidad"
              />
            </li>
          </ul>
        </div>
        <div class="footer-info-section">
          <div
            class="p-title-footer"
            @click="toggleInfo"
            ref="infoSection"
            :class="infoVisible ? 'p-font-bold' : ''"
          >
            <span>INFORMACIÓN</span>
            <svg :class="infoVisible ? 'rotate-180' : ''">
              <use href="/icons/icons.svg#chevronDown" />
            </svg>
          </div>
          <ul
            class="text-left px-[30px] py[15px] info-section-container"
            :class="infoVisible ? 'info-visible' : ''"
          >
            <li class="p-text-footer">Teléfono: +525555555555</li>
            <li class="p-text-footer">soporte@dogbarber.com.mx</li>
            <li class="p-text-footer">CDMX y Área Metropolitana, México</li>
          </ul>
        </div>
      </div>
      <!-- Footer for large screens -->
      <div class="footer-info-section-container-l">
        <ul class="footer-info-section">
          <li>
            <span class="block mb-3 font-bold">ACERCA DE DOGBARBER</span>
          </li>
          <li>
            <router-link
              class="p-text-footer"
              :to="{ name: 'aboutUs' }"
              text="Sobre DogBarber"
            />
          </li>
          <li>
            <router-link
              class="p-text-footer"
              :to="{ name: 'aboutUs' }"
              text="Blog"
            />
          </li>
          <li>
            <router-link
              class="p-text-footer"
              :to="{ name: 'aboutUs' }"
              text="Términos y condiciones"
            />
          </li>
        </ul>
        <ul class="footer-info-section">
          <li>
            <span class="block mb-3 font-bold">LINKS DE INTERÉS</span>
          </li>
          <li>
            <router-link
              class="p-text-footer"
              :to="{ name: 'aboutUs' }"
              text="Preguntas frecuentes"
            />
          </li>
          <li>
            <router-link
              class="p-text-footer"
              :to="{ name: 'aboutUs' }"
              text="Política de Privacidad"
            />
          </li>
        </ul>
        <ul class="footer-info-section">
          <li class="block mb-3 font-bold">INFORMACIÓN</li>
          <li class="p-text-footer">Teléfono: +525555555555</li>
          <li class="p-text-footer">soporte@dogbarber.com.mx</li>
          <li class="p-text-footer">CDMX y Área Metropolitana, México</li>
        </ul>
      </div>
    </section>
    <div class="footer-subscribe-section">
      <p>Copyright © 2023. Todos los derechos reservados DogBarber.</p>
    </div>
  </footer>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { ref, onMounted } from "vue";

const acercaVisible = ref(false);
const interesVisible = ref(false);
const infoVisible = ref(false);
const acercaSection = ref(null);
const interesSection = ref(null);
const infoSection = ref(null);

const toggleAcerca = () => {
  acercaVisible.value = !acercaVisible.value;
};
const toggleInteres = () => {
  interesVisible.value = !interesVisible.value;
};
const toggleInfo = () => {
  infoVisible.value = !infoVisible.value;
};

onMounted(() => {
  onClickOutside(acercaSection, () => {
    if (acercaVisible.value) acercaVisible.value = false;
  });
  onClickOutside(interesSection, () => {
    if (interesVisible.value) interesVisible.value = false;
  });
  onClickOutside(infoSection, () => {
    if (infoVisible.value) infoVisible.value = false;
  });
});
</script>

<style lang="scss" scoped>
.logo-redes-container {
  width: 100%;
  max-width: 600px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
  .footer-logo {
    margin-bottom: 10px;
    img {
      margin: 0 auto;
    }
  }
  ul {
    display: flex;
    gap: 5px;
    justify-content: center;
    margin-top: 5px;
    svg {
      width: 30px;
      height: 30px;
      transition: scale 200ms ease-in-out;
      &:hover {
        scale: 1.1;
      }
    }
  }
}
.footer-info-section-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.info-section-container {
  transition: height 0.2s ease-in-out;
  overflow: hidden;
  height: 0;
  a:hover {
    font-weight: bold;
  }
}
.footer-info-section {
  margin-top: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  width: 80%;
  a:hover {
    color: red;
  }
}
.p-title-footer {
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  span {
    display: block;
    width: 100%;
    text-align: left;
  }
  svg {
    width: 30px;
    height: 30px;
    transition: scale 0.2s ease-in-out, rotation 0.2s ease-in-out;
    stroke: var(--black-text-color);
  }
}
.p-text-footer {
  margin-bottom: 14px;
  font-size: 14px;
  display: block;
}
.info-visible {
  height: 114px;
}
.p-font-bold {
  span {
    font-weight: bold;
  }
  svg {
    scale: 1.5;
  }
}
.footer-info-section-container-l {
  display: none;
}
.footer-subscribe-section {
  margin: 40px 20px 0;
}

@media screen and (min-width: 1024px) {
  .logo-redes-container {
    max-width: 250px;
  }
  .footer-info-section-container {
    display: none;
  }
  .footer-info-section-container-l {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    flex-grow: 0.7;
  }
  .footer-info-section {
    margin: 0;
    box-shadow: none;
    text-align: left;
    flex-basis: 100px;
    flex-grow: 1;
    flex-shrink: 1;
    max-width: 200px;
    .p-text-footer {
      display: block;
    }
  }
  .footer-subscribe-section {
    margin-top: 0;
  }
}
</style>
