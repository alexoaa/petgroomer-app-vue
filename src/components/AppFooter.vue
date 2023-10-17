<template>
  <footer class="text-center border-t-2 border-slate-600 py-10">
    <div class="flex flex-wrap items-center justify-center">
      <div class="logo-redes-container">
        <img
          class="w-[70%] h-auto mb-4"
          src="@/assets/images/logo-footer.png"
        />
        <p class="block w-full">Síguenos en:</p>
        <p class="block w-full">
          <span class="filter-contrast-1"
            ><a target="_blank" rel="nofollow noopener" href="#" class=""
              ><i class="fab fa-youtube fa-2x"></i></a
          ></span>
          <span class="filter-contrast-1"
            ><a target="_blank" rel="nofollow noopener" href="#" class=""
              ><i class="fab fa-instagram fa-2x"></i></a
          ></span>
          <span class="filter-contrast-1"
            ><a target="_blank" rel="nofollow noopener" href="#" class=""
              ><i class="fab fa-facebook-square fa-2x"></i></a
          ></span>
        </p>
      </div>
      <div class="footer-info-section-container">
        <div class="footer-info-section">
          <div
            class="p-title-footer"
            @click="toggleAcerca"
            :class="this.acercaVisible ? 'p-font-bold' : ''"
          >
            <span>ACERCA DE DOGBARBER</span
            ><span :class="this.acercaVisible ? 'rotate-90' : ''"
              ><i
                id="arrow_footer_about"
                class="fas color_purple status_footer_arrow fa-chevron-right"
              ></i
            ></span>
          </div>
          <div
            class="text-left px-[30px] py[15px] info-section-container"
            :class="this.acercaVisible ? 'info-visible' : ''"
            id="acercaFSection"
          >
            <a href="#"><div class="p-text-footer">Sobre DogBarber</div></a>
            <a href="#"><div class="p-text-footer">Blog</div></a>
            <a href="#"
              ><div class="p-text-footer">Términos y condiciones</div></a
            >
          </div>
        </div>
        <div class="footer-info-section">
          <div
            class="p-title-footer"
            @click="toggleInteres"
            :class="this.interesVisible ? 'p-font-bold' : ''"
          >
            <span>LINKS DE INTERÉS</span
            ><span :class="this.interesVisible ? 'rotate-90' : ''"
              ><i
                id="arrow_footer_about"
                class="fas color_purple status_footer_arrow fa-chevron-right"
              ></i
            ></span>
          </div>
          <div
            class="text-left px-[30px] py[15px] info-section-container"
            :class="this.interesVisible ? 'info-visible' : ''"
            id="interesFSection"
          >
            <a href="#"
              ><div class="p-text-footer">Preguntas frecuentes</div></a
            >
            <a href="#"
              ><div class="p-text-footer">Política de Privacidad</div></a
            >
            <a href="#"
              ><div class="p-text-footer">Políticas de Entrega</div></a
            >
          </div>
        </div>
        <div class="footer-info-section">
          <div
            class="p-title-footer"
            @click="toggleInfo"
            :class="this.infoVisible ? 'p-font-bold' : ''"
          >
            <span>INFORMACIÓN</span
            ><span :class="this.infoVisible ? 'rotate-90' : ''"
              ><i
                id="arrow_footer_about"
                class="fas color_purple status_footer_arrow fa-chevron-right"
              ></i
            ></span>
          </div>
          <div
            class="text-left px-[30px] py[15px] info-section-container"
            :class="this.infoVisible ? 'info-visible' : ''"
            id="infoFSection"
          >
            <div class="p-text-footer">Teléfono: +525555555555</div>
            <div class="p-text-footer">servicioalcliente@dogbarber.com.mx</div>
            <div class="p-text-footer">CDMX y Área Metropolitana, México</div>
          </div>
        </div>

        <div class="footer-subscribe-section">
          <div class="block mb-3 font-medium">
            Copyright © 2023 Todos los derechos reservados. DogBarber.
          </div>
        </div>
      </div>

      <!-- Footer for large screens -->
      <div class="footer-info-section-container-l">
        <div class="footer-info-section">
          <span class="block mb-3 font-bold">ACERCA DE DOGBARBER</span>
          <a href="#"><div class="p-text-footer">Sobre DogBarber</div></a>
          <a href="#"><div class="p-text-footer">Blog</div></a>
          <a href="#"
            ><div class="p-text-footer">Términos y condiciones</div></a
          >
        </div>
        <div class="footer-info-section">
          <span class="block mb-3 font-bold">LINKS DE INTERÉS</span>
          <a href="#"><div class="p-text-footer">Preguntas frecuentes</div></a>
          <a href="#"
            ><div class="p-text-footer">Política de Privacidad</div></a
          >
          <a href="#"><div class="p-text-footer">Políticas de Entrega</div></a>
        </div>
        <div class="footer-info-section">
          <span class="block mb-3 font-bold">INFORMACIÓN</span>
          <div class="p-text-footer">Teléfono: +525555555555</div>
          <div class="p-text-footer">servicioalcliente@dogbarber.com.mx</div>
          <div class="p-text-footer">CDMX y Área Metropolitana, México</div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { onClickOutside } from "@vueuse/core";

export default {
  name: "AppFooter",
  components: {},
  data() {
    return {
      acercaVisible: false,
      acercaFirstTime: true,
      acercaSection: document.getElementById("acercaFSection"),
      interesVisible: false,
      interesFirstTime: true,
      interesSection: document.getElementById("interesFSection"),
      infoVisible: false,
      infoFirstTime: true,
      infoSection: document.getElementById("infoFSection"),
    };
  },
  computed: {},
  methods: {
    toggleAcerca(event) {
      this.acercaVisible = !this.acercaVisible;
      if (this.acercaFirstTime) {
        this.acercaFirstTime = false;
        onClickOutside(
          event.target.nextElementSibling,
          () => {
            if (this.acercaVisible) {
              this.acercaVisible = false;
              this.infoVisible = false;
              this.interesVisible = false;
            }
          },
          {
            ignore: [this.interesSection, this.infoSection],
          }
        );
      }
    },
    toggleInfo(event) {
      this.infoVisible = !this.infoVisible;
      if (this.infoFirstTime) {
        this.infoFirstTime = false;
        onClickOutside(
          event.target.nextElementSibling,
          () => {
            if (this.infoVisible) {
              this.infoVisible = false;
              this.acercaVisible = false;
              this.interesVisible = false;
            }
          },
          {
            ignore: [this.interesSection, this.acercaSection],
          }
        );
      }
    },
    toggleInteres(event) {
      this.interesVisible = !this.interesVisible;
      if (this.interesFirstTime) {
        this.interesFirstTime = false;
        onClickOutside(
          event.target.nextElementSibling,
          () => {
            if (this.interesVisible) {
              this.interesVisible = false;
              this.infoVisible = false;
              this.acercaVisible = false;
            }
          },
          {
            ignore: [this.infoSection, this.acercaSection],
          }
        );
      }
    },
  },
};
</script>

<style>
.logo-redes-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px;
}
.footer-info-section-container {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.info-section-container {
  transition: all 0.2s ease-in-out;
  overflow: hidden;
  height: 0;
}
.info-section-container a:hover {
  font-weight: bold;
}
.footer-info-section {
  margin-top: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  width: 80%;
}
.footer-info-section a:hover {
  color: #535252;
}
.p-title-footer {
  padding: 15px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.p-title-footer span:first-of-type {
  width: 70%;
  text-align: left;
}
.p-text-footer {
  margin-bottom: 14px;
  font-size: 14px;
}
.info-visible {
  height: 114px;
}
.p-font-bold {
  font-weight: bold;
}
.footer-info-section-container-l {
  display: none;
}
.footer-subscribe-section {
  margin-top: 40px;
}
.input-suscribe {
  border: 1px solid #212121;
  border-radius: 5px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
}
.input-suscribe input {
  display: inline-block;
  width: 100%;
  padding: 10px;
  outline: none;
}

@media screen and (min-width: 1200px) {
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
  }
  .input-suscribe {
    border: 1px solid #212121;
    border-radius: 5px;
    margin-bottom: 1rem;
  }
}
</style>
