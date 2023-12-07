<template>
  <section class="flex flex-wrap justify-center pt-0">
    <section class="main-section">
      <div class="hero-content">
        <h1>
          ¡Dale a tu
          <span class="text-[var(--main-color)]">Mejor Amigo</span> el Lujo de
          Lucir Impecable!
        </h1>
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
    <section class="feature-section">
      <div class="feature-container">
        <div class="feature-content">
          <div class="mb-7">
            <p class="text-xl mb-6 font-bold">
              Bienvenido a DogBarber: donde el cuidado y la belleza canina se
              fusionan para hacer que tu peludo compañero brille como una
              estrella.⭐
            </p>
          </div>
          <ul>
            <li class="mb-7 flex">
              <svg class="block w-[24px] h-[24px] mr-2">
                <use href="/icons/icons.svg#bone" />
              </svg>
              <div class="w-full">
                <h1 class="text-xl mb-3">Piel y Pelaje Saludable:</h1>
                <p>
                  El baño y el corte de pelo regulares ayudan a prevenir
                  problemas de piel, eliminar nudos y mantener el pelaje de tu
                  perro suave y saludable, asi como también dejará a tu perro
                  luciendo limpio y fresco y oliendo rico.
                </p>
              </div>
            </li>
            <li class="mb-10 flex">
              <svg class="block w-[24px] h-[24px] mr-2">
                <use href="/icons/icons.svg#bone" />
              </svg>
              <div class="w-full">
                <h1 class="text-xl mb-3">
                  Reduce los Pelos por Toda tu Casa y Ropa:
                </h1>
                <p>
                  Una casa con menos pelos es una casa más limpia y cómoda, y
                  también ayuda a tu mascota a sentirse mas fresca sin tanto
                  pelo muerto acumulado.
                </p>
              </div>
            </li>
            <li class="mb-10 flex">
              <svg class="block w-[24px] h-[24px] mr-2">
                <use href="/icons/icons.svg#bone" />
              </svg>
              <div class="w-full">
                <h1 class="text-xl mb-3">
                  Detección Temprana de Problemas de Salud:
                </h1>
                <p>
                  Con visitas frecuentes podemos detectar signos de problemas de
                  salud, como parásitos, infecciones de la piel y problemas
                  dentales. Con el fin de tratarlos antes de que se conviertan
                  en problemas graves.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div class="feature-image">
          <img
            loading="lazy"
            src="@/assets/images/general/feature-image.webp"
            alt="Características de DogBarber"
          />
        </div>
      </div>
    </section>
    <section class="services-section">
      <div class="services-section-container">
        <h1 class="text-3xl mb-12">Nuestros Servicios</h1>
        <ul class="ul-services">
          <li class="li-services">
            <img
              loading="lazy"
              src="@/assets/images/general/service-bath.jpg"
              alt="Descripción"
            />
            <h1>Solo Baño</h1>
            <p>
              Utilizamos productos de la más alta calidad, especialmente
              seleccionados para cada tipo de pelaje y piel, para brindarle a su
              mascota un baño que no solo los deja limpios, sino que también
              garantiza protección para su piel y un pelaje suave y brillante.
            </p>
          </li>
          <li class="li-services">
            <img
              loading="lazy"
              src="@/assets/images/general/service-hair-trim.jpg"
              alt="Descripción"
            />
            <h1>Servicio completo: Baño y Corte de Pelo</h1>
            <p>
              Comenzamos con un baño que elimina la suciedad y los olores no
              deseados, seguido de un corte de pelo a su elección, que resalta
              la belleza y el confort de tu mascota. Ya sea un corte de pelo
              clásico o un estilo personalizado, nuestro servicio está diseñado
              para mantener a tu peludo compañero luciendo y sintiéndose
              fabuloso.
            </p>
          </li>

          <li class="li-services">
            <img
              loading="lazy"
              src="@/assets/images/general/service-hair-brush.jpg"
              alt="Descripción"
            />
            <h1>Deslanado / Cepillado</h1>
            <p>
              Nuestro equipo de profesionales en estética canina se encargará de
              eliminar el exceso de pelo, enredos y nudos, aplicando técnicas
              suaves y herramientas especializadas dejando a tu mascota con un
              aspecto impecable y cómodo.<br /><br />
              Además de mejorar la apariencia, el cepillado regular contribuye a
              la salud de la piel y el pelaje, promoviendo la circulación
              sanguínea, previniendo problemas como la acumulación de pelo
              muerto y la irritación cutánea.
            </p>
          </li>
        </ul>
        <p class="text-sm mt-10">
          *Todos nuestros servicios inlcuyen corte de uñas, limpieza de oídos y
          de glándulas.
        </p>
      </div>
    </section>
    <section class="cta-section">
      <div class="cta-section-container">
        <h1>Porque tu mascota se lo merece</h1>
        <p>
          ¡Mantén a tu mascota limpia y saludable con nuestro servicio de
          peluquería canina!
        </p>
        <router-link :to="{ name: 'estetica' }" class="btn-terciary">
          <svg>
            <use href="/icons/icons.svg#paw" />
          </svg>
          Agendar una cita
        </router-link>
      </div>
    </section>
    <section class="testimonial-section">
      <h1 class="block w">Opiniones de nuestros clientes</h1>
      <ul class="ul-testimonials">
        <li class="li-testimonials">
          <ul>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
          </ul>
          <p>
            "Me gusta llevar a mi perro a Dogbarber porque el trabajo que hacen
            es excepcional. Mi perro se ve hermoso."
          </p>
          <h1>Jean Case</h1>
          <span>Dueño de Manchitas</span>
        </li>
        <li class="li-testimonials">
          <ul>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
          </ul>
          <p>
            "Me gusta llevar a mi perro a Dogbarber porque el trabajo que hacen
            es excepcional. Mi perro se ve hermoso."
          </p>
          <h1>Aldair Pérez</h1>
          <span>Dueño de Hachi</span>
        </li>
        <li class="li-testimonials">
          <ul>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="/icons/icons.svg#star" />
              </svg>
            </li>
          </ul>
          <p>
            "Me gusta llevar a mi perro a Dogbarber porque el trabajo que hacen
            es excepcional. Mi perro se ve hermoso."
          </p>
          <h1>Jean Case</h1>
          <span>Dueño de Manchitas</span>
        </li>
      </ul>
    </section>
    <section class="service-description-section">
      <div class="service-description-container">
        <h1 class="service-description-title">¿Cómo funciona?</h1>
        <ul class="service-description-steps">
          <li ref="serviceStepOne">
            <div @click.stop="serviceStepOneVisible = !serviceStepOneVisible">
              <h1 class="text-2xl"><span>Paso 1:</span> Agenda tu Cita</h1>
              <svg><use href="/icons/icons.svg#plus" /></svg>
            </div>
            <p v-show="serviceStepOneVisible">
              - Elije el servicio que desees para tu mascota.<br /><br />
              - Proporciona tus datos de contacto y la información de tu
              mascota.<br /><br />
              - Elije una Fecha y Hora disponible.<br /><br />
              Si requieres de un baño o corte en especial, o hay detalles
              importantes que debamos conocer sobre tu mascota, dejanoslo
              saber!<br /><br />
              Esto nos ayuda a brindarte el mejor servicio posible y garantizar
              la seguridad de tu peludo amigo.
            </p>
          </li>
          <li ref="serviceStepTwo">
            <div @click.stop="serviceStepTwoVisible = !serviceStepTwoVisible">
              <h1 class="text-2xl"><span>Paso 2:</span> Confirma tu Cita</h1>
              <svg><use href="/icons/icons.svg#plus" /></svg>
            </div>
            <p v-show="serviceStepTwoVisible">
              Una vez que hayas completado tus datos, confirma la cita.
              Recibirás una confirmación por correo electrónico con todos los
              detalles de la reserva.
            </p>
          </li>
          <li ref="serviceStepThree">
            <div
              @click.stop="serviceStepThreeVisible = !serviceStepThreeVisible"
            >
              <h1 class="text-2xl"><span>Paso 3:</span> Día de la Cita</h1>
              <svg><use href="/icons/icons.svg#plus" /></svg>
            </div>
            <p v-show="serviceStepThreeVisible">
              El día de la cita, 3 horas antes, recibirás un recordatorio por
              medio de un mensaje de texto.<br /><br />
              Estaremos esperando a tu mascota para que nuestro personal
              capacitado realicen el servicio, estos cuidarán de tu mascota con
              cariño y profesionalismo.
            </p>
          </li>
          <li ref="serviceStepFour">
            <div @click.stop="serviceStepFourVisible = !serviceStepFourVisible">
              <h1 class="text-2xl">
                <span>Paso 4:</span> Recoge a tu Mascota y Programa tu Próxima
                Cita
              </h1>
              <svg><use href="/icons/icons.svg#plus" /></svg>
            </div>
            <p v-show="serviceStepFourVisible">
              Después del servicio, puedes hablar con nuestro equipo sobre tus
              comentarios del servicio y de cuándo deberías programar la próxima
              cita.<br /><br />
              El mantenimiento regular es clave para mantener a tu mascota feliz
              y saludable.
            </p>
          </li>
          <li ref="serviceStepFive">
            <div @click.stop="serviceStepFiveVisible = !serviceStepFiveVisible">
              <h1 class="text-2xl step-five-share-exp">
                <span>Paso 5:</span> !Comparte tu Experiencia!
                <ul>
                  <li>
                    <svg>
                      <use href="/icons/icons.svg#star" />
                    </svg>
                  </li>
                  <li>
                    <svg>
                      <use href="/icons/icons.svg#star" />
                    </svg>
                  </li>
                  <li>
                    <svg>
                      <use href="/icons/icons.svg#star" />
                    </svg>
                  </li>
                  <li>
                    <svg>
                      <use href="/icons/icons.svg#star" />
                    </svg>
                  </li>
                  <li>
                    <svg>
                      <use href="/icons/icons.svg#star" />
                    </svg>
                  </li>
                </ul>
              </h1>
              <svg><use href="/icons/icons.svg#plus" /></svg>
            </div>
            <p v-show="serviceStepFiveVisible">
              Si quedas satisfecho con nuestros servicios, no dudes en compartir
              tu experiencia en línea. <br /><br />
              Tu opinión nos ayuda a mejorar nuestro servicio y atención, y a
              otros dueños de mascotas a descubrir de esta maravillosa
              experiencia de estética de calidad.
            </p>
          </li>
        </ul>
      </div>
    </section>
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
