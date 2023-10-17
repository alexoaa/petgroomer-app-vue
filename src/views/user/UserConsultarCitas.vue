<template>
  <main class="p-4">
    <!-- Upcoming appointments -->
    <article class="upcoming-appointment">
      <h1>Proximas citas</h1>
      <section>
        <div
          class="flex justify-around items-left flex-wrap w-full mt-3 px-4 py-4"
        >
          <p
            class="block font-bold text-xl self-baseline w-full pb-4 mb-8 border-b-[1px]"
          >
            Fri, Jul 22 02:15 PM
          </p>
          <ul class="w-full mb-8">
            <li class="mb-1">
              <span class="font-bold">Mascota: </span>
              <span>{{ mascota.name }}</span>
            </li>
            <li class="mb-1">
              <span class="font-bold">Servicio: </span>
              <span>{{ mascota.service }}</span>
            </li>
            <li class="mb-1">
              <span class="font-bold">Precio: </span>
              <span>${{ mascota.price }}</span>
            </li>
            <li class="mb-1">
              <span class="font-bold">Comentarios: </span>
              <span>{{ mascota.comments }}</span>
            </li>
          </ul>
          <div class="w-full">
            <button
              class="block px-[40px] py-[20px] bg-[#1e90ff] text-white text-[1.1rem] font-bold rounded-md w-full mb-4 hover:bg-[#ffffff] hover:text-[#1e90ff] hover:outline"
            >
              Modificar
            </button>
            <button
              class="block px-[40px] py-[20px] text-[1.1rem] font-bold rounded-md w-full underline hover:no-underline hover:outline"
            >
              Cancelar
            </button>
          </div>
        </div>
      </section>
    </article>

    <!-- If no upcoming appointments -->
    <article class="no-citas">
      <section>
        <h1>¡Parece que no tienes una cita agendada!</h1>
        <hr class="border border-solid border-slate-300 w-full mb-[3rem]" />
        <router-link to="/estetica"
          >Agenda una cita para tu mascota</router-link
        >
      </section>
    </article>
    <!-- Past appointments -->
    <article class="historial-citas">
      <section>
        <h1>Citas pasadas</h1>
        <div class="appointment-history">
          <section>
            <p class="block text-red-500 font-bold">Status</p>
            <div class="flex justify-around items-left flex-wrap w-full mt-4">
              <p
                class="block font-bold text-lg self-baseline w-full pb-4 mb-8 border-b-[1px]"
              >
                Fri, Jul 22 02:15 PM
              </p>
              <ul class="w-full mb-8">
                <li class="mb-1">
                  <span class="font-bold">Mascota: </span>
                  <span>{{ mascota.name }}</span>
                </li>
                <li class="mb-1">
                  <span class="font-bold">Servicio: </span>
                  <span>{{ mascota.service }}</span>
                </li>
                <li class="mb-1">
                  <span class="font-bold">Precio: </span>
                  <span>${{ mascota.price }}</span>
                </li>
                <li class="mb-1">
                  <span class="font-bold">Comentarios: </span>
                  <span>{{ mascota.comments }}</span>
                </li>
              </ul>
              <div class="w-full">
                <button
                  class="block px-[40px] py-[20px] bg-[#1e90ff] text-white text-[1.1rem] font-bold rounded-md w-full hover:bg-[#ffffff] hover:text-[#1e90ff] hover:outline"
                >
                  Volver a agendar
                </button>
              </div>
            </div>
          </section>
          <section>
            <p class="block text-red-500 font-bold">Status</p>
            <div class="flex justify-around items-left flex-wrap w-full mt-4">
              <p
                class="block font-bold text-lg self-baseline w-full pb-4 mb-8 border-b-[1px]"
              >
                Fri, Jul 22 02:15 PM
              </p>
              <ul class="w-full mb-8">
                <li class="mb-1">
                  <span class="font-bold">Mascota: </span>
                  <span>{{ mascota.name }}</span>
                </li>
                <li class="mb-1">
                  <span class="font-bold">Servicio: </span>
                  <span>{{ mascota.service }}</span>
                </li>
                <li class="mb-1">
                  <span class="font-bold">Precio: </span>
                  <span>${{ mascota.price }}</span>
                </li>
                <li class="mb-1">
                  <span class="font-bold">Mascota: </span>
                  <span>{{ mascota.name }}</span>
                </li>
              </ul>
              <div class="w-full">
                <button
                  class="block px-[40px] py-[20px] bg-[#1e90ff] text-white text-[1.1rem] font-bold rounded-md w-full hover:bg-[#ffffff] hover:text-[#1e90ff] hover:outline"
                >
                  Volver a agendar
                </button>
              </div>
            </div>
          </section>
          <section>
            <p class="block text-red-500 font-bold">Status</p>
            <div class="flex justify-around items-left flex-wrap w-full mt-4">
              <p
                class="block font-bold text-lg self-baseline w-full pb-4 mb-8 border-b-[1px]"
              >
                Fri, Jul 22 02:15 PM
              </p>
              <ul class="w-full mb-8">
                <li class="mb-1">
                  <span class="font-bold">Mascota: </span>
                  <span>{{ mascota.name }}</span>
                </li>
                <li class="mb-1">
                  <span class="font-bold">Servicio: </span>
                  <span>{{ mascota.service }}</span>
                </li>
                <li class="mb-1">
                  <span class="font-bold">Precio: </span>
                  <span>${{ mascota.price }}</span>
                </li>
                <li class="mb-1">
                  <span class="font-bold">Mascota: </span>
                  <span>{{ mascota.name }}</span>
                </li>
              </ul>
              <div class="w-full">
                <button
                  class="block px-[40px] py-[20px] bg-[#1e90ff] text-white text-[1.1rem] font-bold rounded-md w-full hover:bg-[#ffffff] hover:text-[#1e90ff] hover:outline"
                >
                  Volver a agendar
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </article>
  </main>
</template>

<script setup>
import useUserStore from "@/stores/user.js";
import { onBeforeMount } from "vue";

const userStore = useUserStore();

onBeforeMount(async () => {
  const request = await userStore.checkUpcomingAppointments({});
  console.log(request);
});

const mascota = {
  name: "Hashi",
  service: "Baño",
  price: "180",
  date: "03/08/2023",
  time: "15:00 PM",
  comments: "Comentarios...",
};
</script>

<!-- <script>
import { mapActions } from "pinia";
import useUserStore from "@/stores/user.js";

export default {
  name: "UserConsultarCitas",
  methods: {
    ...mapActions(useUserStore, {
      checkUpcomingAppointments: "checkUpcomingAppointments",
    }),
    ...mapActions(useUserStore, {
      getAppointmentHistory: "getAppointmentHistory",
    }),
  },
  async created() {
    const requestResponse = await this.checkUpcomingAppointments();
    console.log(requestResponse);
  },
};
</script> -->

<style lang="scss" scoped>
.upcoming-appointment {
  background: rgba(203, 213, 225, 0.3);
  padding-bottom: 2rem;
  border-radius: 5px;
  h1 {
    font-size: 2rem;
    font-weight: 600;
    padding: 1rem 15px;
    width: 100%;
    background: rgba(203, 213, 225, 0.9);
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  section {
    border-radius: 5px;
    border-bottom: 1px solid rgb(203 213 225);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.101676);
    background: #ffffff;
    margin: 0 1rem;
  }
}
.no-citas {
  padding: 6rem 2rem;
  border-bottom: 2px solid #434343;
  display: flex;
  justify-content: center;
  section {
    max-width: 600px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    h1 {
      display: block;
      text-align: center;
      font-size: clamp(1.3rem, 3vw, 40px);
      font-weight: 600;
      margin-bottom: 3rem;
    }
    a {
      display: block;
      font-size: 1.1rem;
      font-weight: 600;
      text-align: center;
      padding: 15px 30px;
      border-radius: 5px;
      color: #ffffff;
      background: var(--btn-color);
      &:hover {
        background: #0d80ee;
      }
    }
  }
}
.historial-citas {
  padding: 2rem 0;
  section {
    h1 {
      font-size: 2rem;
      font-weight: 600;
    }

    .appointment-history {
      margin: 2rem 0;
      border: 1px solid rgb(203 213 225);
      border-radius: 5px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.101676);
      section {
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid rgb(203 213 225);
      }
    }
  }
}

@media screen and (min-width: 1200px) {
  .upcoming-appointment {
    section {
      div {
        justify-content: space-between;
        padding-inline: 2rem;
        ul {
          width: 33%;
        }
        div {
          width: 25%;
        }
      }
    }
  }
  .historial-citas {
    padding: 2rem 0;
    section {
      h1 {
        font-size: 2rem;
        font-weight: 600;
      }

      .appointment-history {
        section {
          div {
            justify-content: space-between;
            padding-inline: 2rem;
            ul {
              width: 33%;
            }
            div {
              width: 25%;
            }
          }
        }
      }
    }
  }
}
</style>
