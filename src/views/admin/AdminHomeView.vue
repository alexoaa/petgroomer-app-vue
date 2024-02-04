<template>
  <section class="flex flex-wrap justify-center pt-0">
    <section class="main-section">
      <router-link :to="{ name: 'adminConsultarCitas' }" class="today-appt">
        <div class="today-appt-info">
          <span>{{ totalAppt }}</span>
          <p>Total de citas de hoy</p>
        </div>
        <svg>
          <use href="/icons/icons.svg#chevronRight" />
        </svg>
      </router-link>
      <div class="today-appt today-appt-pend">
        <div class="today-appt-info">
          <span>{{ remainingAppt }}</span>
          <p>Citas pendientes</p>
        </div>
      </div>
      <router-link :to="{ name: 'adminAgendar' }" class="btn-primary">
        <svg>
          <use href="/icons/icons.svg#paw" />
        </svg>
        Agendar una cita
      </router-link>
      <div class="upcoming-appt">
        <h1>Próximas citas de hoy</h1>
        <div
          v-if="getScheduleRequestLoading"
          class="my-[50px] flex justify-center items-center flex-wrap"
        >
          <video id="myVideo" autoplay loop>
            <source src="@/assets/icons/loading_paw.webm" type="video/webm" />
          </video>
          <p class="block w-full font-[700] animated-loading-text text-center">
            Cargando los datos...
          </p>
        </div>
        <div v-else>
          <div v-if="isNoApptAlertActive">
            <p class="font-bold text-xl py-[20px]">
              {{ axiosResponseMessage }}
            </p>
          </div>
          <ul v-else>
            <li
              class="upcoming-appt-li"
              v-for="item in upcomingAppt"
              :key="item"
            >
              <div class="upcoming-appt-pet-info">
                <div>
                  <span>{{ item[0]["user_pet_name"] }}</span>
                  <span>{{ ` - ${item[0]["appointment_service"]} ` }}</span>
                </div>
                <p>
                  {{ item[0]["user_pet_specie"] }}
                  {{
                    item[0]["user_pet_breed"] != null
                      ? `- ${item[0]["user_pet_breed"]} `
                      : ""
                  }}
                </p>
              </div>
              <div class="upcoming-appt-time">
                <span
                  >{{ item[0]["appointment_time"].slice(0, 5)
                  }}{{
                    item[0]["appointment_time"].slice(0, 1) < 13 ? " AM" : " PM"
                  }}</span
                >
                <svg>
                  <use href="/icons/icons.svg#chevronRight" />
                </svg>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
    <router-view></router-view>
  </section>
  <!-- Modal for new appointment confirmation -->
  <div
    class="fixed z-[100] inset-0 overflow-hidden pt-4 px-4 pb-16"
    v-if="bgConfirmationModalIsOpen"
  >
    <div class="flex items-center justify-center min-h-screen text-center">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <Transition
        enter-active-class="animate__animated animate__bounceIn"
        leave-active-class="animate__animated animate__bounceOut"
      >
        <ConfirmationModal
          v-if="confirmationModalIsOpen"
          @close-confirmation-modal-button="closeConfirmationModal"
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all"
          :responseMessage="responseMessage"
          :success="success"
          :closeConfirmationButton="closeConfirmationButton"
        />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useAdminStore from "@/stores/admin";
import ConfirmationModal from "@/components/account/ConfirmationModal.vue";

const adminStore = useAdminStore();

const totalAppt = ref(0);
const remainingAppt = ref(0);
const upcomingAppt = ref([]);

const isNoApptAlertActive = ref(false);
const getScheduleRequestLoading = ref(true);
// Variables and functions for confirmation/error modal
const responseMessage = ref("");
const success = ref(false);
const bgConfirmationModalIsOpen = ref(false);
const confirmationModalIsOpen = ref(false);
const closeConfirmationButton = ref(true);
const axiosResponseMessage = ref("");

function closeConfirmationModal() {
  confirmationModalIsOpen.value = false;
  setTimeout(() => {
    bgConfirmationModalIsOpen.value = false;
  }, 100);
}
const date = new Date();
const day = String(date.getDate()).padStart(2, "0");
const month = String(date.getMonth() + 1).padStart(2, "0");
const year = date.getFullYear();
const today = `${day}/${month}/${year}`;

async function getApptSchedule() {
  const adminOpenTimeRequest = await adminStore.getAppointmentDailyHistory(
    today
  );
  // Handle error
  if (!adminOpenTimeRequest.success) {
    bgConfirmationModalIsOpen.value = true;
    responseMessage.value = adminOpenTimeRequest.message;
    confirmationModalIsOpen.value = true;
    getScheduleRequestLoading.value = false;
    return;
  }

  Object.values(adminOpenTimeRequest.data.schedule).forEach((item) => {
    if (item.length > 0) upcomingAppt.value.push(item);
  });
  remainingAppt.value = adminOpenTimeRequest.data.apptPendingCounter;
  totalAppt.value = adminOpenTimeRequest.data.apptCounter;

  // If there are no appointments
  if (adminOpenTimeRequest.message) {
    axiosResponseMessage.value = adminOpenTimeRequest.message;
    isNoApptAlertActive.value = true;
  } else isNoApptAlertActive.value = false;
  getScheduleRequestLoading.value = false;
}

onMounted(async () => {
  // Getting todays appt
  getApptSchedule();
});
</script>

<style lang="scss" scoped>
section {
  width: 100%;
}
.main-section {
  position: relative;
  padding: 80px 5%;
  .today-appt {
    width: 100%;
    max-width: 400px;
    height: 180px;
    background-color: var(--secondary-color);
    box-shadow: 0 0 7px 4px var(--light-gray-color);
    border-radius: 20px;
    padding: 20px;
    display: flex;
    margin-bottom: 16px;
    .today-appt-info {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      span {
        color: var(--main-color);
        font-size: 54px;
        font-weight: 700;
        line-height: 65px;
      }
      p {
        color: var(--main-color);
        font-size: 26px;
        font-weight: 700;
        line-height: normal;
      }
    }
    svg {
      fill: var(--main-color);
      width: 50px;
      height: 65px;
    }
  }
  .today-appt-pend {
    background-color: var(--accent-color-100);
    .today-appt-info {
      span {
        color: var(--white-text-color);
      }
      p {
        color: var(--white-text-color);
      }
    }
  }
  .btn-primary {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
    height: fit-content;
    border-radius: 15px;
    max-width: 400px;
    svg {
      margin-right: 9px;
      width: 25px;
      height: 25px;
    }
  }
  .upcoming-appt {
    h1 {
      font-size: 1.5rem;
      font-weight: bold;
    }
    ul {
      flex-wrap: wrap;
      margin: 20px 0;
    }
    .upcoming-appt-li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px;
      border: 2px solid var(--black-text-color);
      border-radius: 10px;
      margin: 10px 0;
      transition: all 300ms ease;
      &:hover {
        background-color: var(--secondary-color-100);
        cursor: pointer;
        .upcoming-appt-time {
          svg {
            stroke: var(--main-color);
          }
        }
      }
      .upcoming-appt-pet-info {
        span {
          font-weight: 600;
          font-size: 1.2rem;
        }
        p {
          font-size: 1rem;
          font-weight: 500;
        }
      }
      .upcoming-appt-time {
        display: flex;
        span {
          font-size: 1.2rem;
          margin-right: 5px;
          font-weight: 500;
        }
        svg {
          height: 30px;
          width: 30px;
          fill: var(--main-color);
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  .btn-primary {
    width: 400px !important;
  }
}

@media screen and (min-width: 1024px) {
  .main-section {
    display: flex;
    flex-wrap: wrap;

    .today-appt {
      &:hover:first-child {
        .today-appt-info {
          span {
            color: var(--black-text-color);
          }
          p {
            color: var(--black-text-color);
          }
        }
        svg {
          fill: var(--black-text-color);
        }
      }
    }
    .today-appt-pend {
      margin-left: 50px;
    }
    .upcoming-appt {
      width: 100%;
      h1 {
        font-size: 1.5rem;
        font-weight: bold;
      }
      ul {
        flex-wrap: wrap;
        margin: 20px 0;
      }
      .upcoming-appt-li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 15px;
        border: 2px solid var(--black-text-color);
        border-radius: 10px;
        margin: 10px 0;
        transition: all 300ms ease;
        &:hover {
          background-color: var(--secondary-color-100);
          cursor: pointer;
          .upcoming-appt-time {
            svg {
              stroke: var(--main-color);
            }
          }
        }
        .upcoming-appt-pet-info {
          span {
            font-weight: 600;
            font-size: 1.2rem;
          }
          p {
            font-size: 1rem;
            font-weight: 500;
          }
        }
        .upcoming-appt-time {
          display: flex;
          span {
            font-size: 1.2rem;
            margin-right: 5px;
            font-weight: 500;
          }
          svg {
            height: 30px;
            width: 30px;
            fill: var(--main-color);
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1200px) {
}
</style>
