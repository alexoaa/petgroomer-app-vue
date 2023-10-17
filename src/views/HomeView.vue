<template>
  <main class="flex flex-wrap justify-center f" id="mainHomeView">
    <section class="main-section">
      <div>
        <h1>DogBarber, el mejor lugar para tu peludo!</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est atque
          nostrum voluptatum nulla laborum perspiciatis harum id iusto
          cupiditate vero ut deserunt.
        </p>
        <router-link :to="{ name: 'estetica' }" class="btn-primary">
          Agendar una cita
          <svg>
            <use href="@/assets/icons/icons.svg#paw" />
          </svg>
        </router-link>
      </div>
    </section>
    <section class="feature-section">
      <div class="feature-container">
        <div class="feature-content">
          <div class="mb-7">
            <h1 class="text-3xl mb-6">Lorem ipsum</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure
              dolorem cum quam recusandae voluptas voluptates aut eligendi
              libero esse iste minima officiis aspernatur similique, deserunt
              cumque officia nulla excepturi nostrum!
            </p>
          </div>
          <section>
            <div class="mb-7">
              <h1 class="text-2xl mb-5">Lorem ipsum</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quisquam, vero nisi. Consectetur nisi sint accusamus harum
                animi. Ipsam doloremque ea voluptas illum assumenda, et magnam
                tempora maiores quisquam earum qui?
              </p>
            </div>
            <div class="mb-10">
              <h1 class="text-2xl mb-5">Lorem ipsum</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Quisquam, vero nisi. Consectetur nisi sint accusamus harum
                animi. Ipsam doloremque ea voluptas illum assumenda, et magnam
                tempora maiores quisquam earum qui?
              </p>
            </div>
          </section>
        </div>
        <div class="feature-image">
          <img
            src="src/assets/images/EsteticaCarousel/imageSlider1.avif"
            alt="Descripción"
          />
        </div>
      </div>
    </section>
    <section class="service-description-section">
      <div class="service-description-container">
        <div class="service-description-desc">
          <h1 class="text-3xl">¿Cómo funciona?</h1>
        </div>
        <section>
          <div class="mb-7">
            <h1 class="text-2xl mb-5">Agenda tu cita</h1>
            <p class="mb-6">
              Escoge la fecha que mas te conviene, rellena los datos del
              formulario y dale al boton Agendar!
            </p>
          </div>
          <div class="mb-7">
            <h1 class="text-2xl mb-5">Agenda tu cita</h1>
            <p class="mb-6">
              Escoge la fecha que mas te conviene, rellena los datos del
              formulario y dale al boton Agendar!
            </p>
          </div>
          <div class="mb-7">
            <h1 class="text-2xl mb-5">Agenda tu cita</h1>
            <p class="mb-6">
              Escoge la fecha que mas te conviene, rellena los datos del
              formulario y dale al boton Agendar!
            </p>
          </div>
          <router-link
            to="/estetica"
            text="Agendar una cita"
            class="btn-secondary my-0"
          />
        </section>
      </div>
    </section>
    <section class="services-section">
      <div class="services-section-container">
        <h1 class="text-3xl mb-9">Nuestros Servicios</h1>
        <ul class="ul-services">
          <li class="li-services">
            <img
              style="width: 300px; height: 200px"
              src="src/assets/images/EsteticaCarousel/imageSlider1.avif"
              alt="Descripción"
            />
            <h1>Baño</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quisquam, vero nisi. Consectetur nisi sint accusamus harum animi.
            </p>
          </li>
          <li class="li-services">
            <img
              style="width: 300px; height: 200px"
              src="src/assets/images/EsteticaCarousel/imageSlider1.avif"
              alt="Descripción"
            />
            <h1>Baño</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quisquam, vero nisi. Consectetur nisi sint accusamus harum animi.
            </p>
          </li>
          <li class="li-services">
            <img
              style="width: 300px; height: 200px"
              src="src/assets/images/EsteticaCarousel/imageSlider1.avif"
              alt="Descripción"
            />
            <h1>Baño</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quisquam, vero nisi. Consectetur nisi sint accusamus harum animi.
            </p>
          </li>
          <li class="li-services">
            <img
              style="width: 300px; height: 200px"
              src="src/assets/images/EsteticaCarousel/imageSlider1.avif"
              alt="Descripción"
            />
            <h1>Baño</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Quisquam, vero nisi. Consectetur nisi sint accusamus harum animi.
            </p>
          </li>
        </ul>
      </div>
    </section>
    <section class="cta-section">
      <div class="cta-section-container">
        <h1>Transforma la apariencia de tu mascota</h1>
        <p>Dale una de las mejores experiencias a tu peludo.</p>
        <router-link
          :to="{ name: 'estetica' }"
          text="Agendar una cita"
          class="btn-primary-dark m-0"
        />
      </div>
    </section>
    <section class="testimonial-section">
      <h1 class="block w">Opiniones de nuestros clientes</h1>
      <ul class="ul-testimonials">
        <li class="li-testimonials">
          <ul>
            <li>
              <svg>
                <use href="@/assets/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="@/assets/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="@/assets/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="@/assets/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="@/assets/icons/icons.svg#star" />
              </svg>
            </li>
          </ul>
          <p>
            Me gusta llevar a mi perro a Dogbarber porque el trabajo que hacen
            es excepcional. Mi perro se ve hermoso.
          </p>
          <h1>Jean Case</h1>
          <span>Dueño de Manchitas</span>
        </li>
        <li class="li-testimonials">
          <ul>
            <li>
              <svg>
                <use href="@/assets/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="@/assets/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="@/assets/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="@/assets/icons/icons.svg#star" />
              </svg>
            </li>
            <li>
              <svg>
                <use href="@/assets/icons/icons.svg#star" />
              </svg>
            </li>
          </ul>
          <p>
            Me gusta llevar a mi perro a Dogbarber porque el trabajo que hacen
            es excepcional. Mi perro se ve hermoso.
          </p>
          <h1>Jean Case</h1>
          <span>Dueño de Manchitas</span>
        </li>
      </ul>
    </section>
  </main>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style lang="scss" scoped>
section {
  width: 100%;
}
h1 {
  font-weight: bold;
}
.main-section {
  height: calc(95dvh - 80px);
  background-image: url(src/assets/images/main-background.webp);
  background-size: cover;
  background-position: center;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: #666565;
  background-blend-mode: lighten;

  div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    max-width: 600px;
    margin-right: auto;
    h1 {
      font-weight: 900;
      font-size: 2.7rem;
      margin-bottom: 20px;
      text-shadow: 1px 1px 1px;
    }
    p {
      font-size: 1.2rem;
      margin-bottom: 20px;
      font-weight: 500;
    }
    .btn-primary {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 0;
      svg {
        margin-left: 9px;
        width: 25px;
        height: 25px;
        fill: var(--dark-text-color);
      }
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
    width: 80%;
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
      box-shadow: 0px 2px 5px var(--main-color);
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
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
  background: var(--main-color);
  .service-description-container {
    text-align: left;
    width: 80%;
    h1,
    p {
      color: white;
    }
    .service-description-desc {
      padding-bottom: 1rem;
      margin-bottom: 2rem;
      border-bottom: 2px solid var(--dark-text-color);
    }
    section {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-wrap: wrap;
    }
  }
}
.services-section {
  display: flex;
  align-items: center;
  justify-content: center;
  .services-section-container {
    text-align: left;
    width: 80%;
    .ul-services {
      .li-services {
        width: 300px;
        margin-bottom: 4rem;
        text-align: center;
        border-bottom: 2px solid var(--main-color);
        h1 {
          display: block;
          font-size: 1.5rem;
          line-height: 2rem;
        }
        p {
          margin: 1rem 0 1.5rem;
        }
        img {
          margin-bottom: 2rem;
          border-radius: var(--rad);
          box-shadow: 0px 2px 5px var(--main-color);
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
  background: var(--dark-accent-color);
  .cta-section-container {
    box-shadow: 0px 1px 5px 2px var(--main-color);
    padding: 2.25rem 1.5rem;
    text-align: center;
    border-radius: var(--rad);
    h1 {
      font-size: 1.875rem;
      line-height: 2.25rem;
      margin-bottom: 1.5rem;
    }
    p {
      font-size: 1.25rem;
      font-weight: 500;
      margin-bottom: 2rem;
    }
  }
}
.testimonial-section {
  width: 80%;
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
    max-width: 300px;
    padding: 0.75rem 1.25rem;
    margin: 2.25rem 0;
    text-align: left;
    border-right: 2px solid var(--main-color);
    border-left: 2px solid var(--main-color);
    ul {
      width: 100%;
      display: flex;
      li {
        width: 40px;
        height: 40px;
        svg {
          fill: var(--dark-accent-color);
          stroke: var(--dark-accent-color);
          width: 100%;
          height: 100%;
        }
      }
    }
    h1 {
      margin-bottom: 0.5rem;
      font-size: 1.5rem;
    }
    p {
      font-size: 1.25rem;
      line-height: 1.75rem;
      margin: 1.5rem 0;
      text-wrap: balance;
    }
    span {
      font-size: 1.25rem;
    }
  }
}

@media screen and (min-width: 768px) {
  .feature-section {
    .feature-container {
      .feature-content {
        section {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
  .services-section {
    .services-section-container {
      text-align: left;
      width: 80%;
      .ul-services {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        .li-services {
          margin-right: 4rem;
        }
      }
    }
  }
  .cta-section {
    .cta-section-container {
      a {
        width: 100%;
      }
      padding: 3.25rem 4rem;
    }
  }
  .testimonial-section {
    .ul-testimonials {
      justify-content: space-around;
      .li-testimonials {
        margin: 0;
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .service-description-section {
    .service-description-container {
      .service-description-desc {
      }
      section {
        align-items: flex-start;
        div {
          flex-basis: 250px;
          flex-grow: 1;
          max-width: 350px;
          margin: 0 1rem 0 0;
        }
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
  .home-main-section {
    div {
      padding: 20px;
    }
  }
  .feature-container {
    flex-wrap: nowrap !important;
    .feature-content {
      max-width: 40% !important;
      margin-right: 1rem;
      section {
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
