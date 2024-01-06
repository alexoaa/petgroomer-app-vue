<template>
  <section class="check-appt">
    <header class="check-appt-header">
      <section>
        <div class="w-full flex px-[20px] justify-between">
          <button class="btn-primary" @click="checkTodayAppts">
            Citas de hoy
          </button>
          <button
            class="btn-secondary"
            @click="moreOptionsVisible = !moreOptionsVisible"
          >
            Mas opciones
          </button>
        </div>
      </section>
      <Transition
        enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOutUp"
      >
        <ul v-if="moreOptionsVisible" ref="moreOptionsUL">
          <li>Consulta semanal</li>
          <li>Consulta mensual</li>
          <li>Consulta anual</li>
        </ul>
      </Transition>
    </header>
    <section class="appt-general-info">
      <header>
        <h1>Información díaria:</h1>
      </header>
      <section>
        <ul class="appt-history-info">
          <li class="">Total de citas: {{ totalAppt }}</li>
          <li class="text-[var(--accent-color-100)]">
            Citas pendientes: {{ remainingAppt }}
          </li>
          <li class="text-[var(--green-color-100)]">
            Citas completadas: {{ completedAppt }}
          </li>
        </ul>
        <div>
          <span>Reporte</span>
          <button @click="downloadApptReport">
            <svg><use href="/icons/icons.svg#download-two" /></svg>
          </button>
        </div>
      </section>
    </section>
    <section class="container-timetable-appt">
      <div class="timetable-date">
        <div @click="openApptHistoryCalendar" id="btnDate">
          <svg>
            <use href="/icons/icons.svg#calendar-days" />
          </svg>
          <span> {{ dayOfWeekString }}, {{ selectedDate }}</span>
          <svg>
            <use href="/icons/icons.svg#calendar-days" />
          </svg>
        </div>
        <Transition
          enter-active-class="animate__animated animate__fadeIn"
          leave-active-class="animate__animated animate__fadeOut"
        >
          <CalendarEstetica
            class="calendarContainer"
            v-if="isApptCalendarIsActive"
            @datePicked="datePicked"
            @closeCalendar="closeCalendar"
            :isAdmin="true"
            :onClickOutsideNeeded="true"
          />
        </Transition>
      </div>
      <div
        v-if="getScheduleRequestLoading"
        class="my-[50px] flex justify-center items-center flex-wrap"
      >
        <video id="myVideo" autoplay loop>
          <source src="@/assets/icons/loading_paw.webm" type="video/webm" />
        </video>
        <p class="block w-full font-[700] animated-loading-text">
          Cargando los datos...
        </p>
      </div>
      <div v-else>
        <div
          v-if="isNoApptAlertActive"
          class="border-b border-[var(--light-gray-color)] p-4"
        >
          <p class="font-bold text-xl py-[20px]">{{ axiosResponseMessage }}</p>
          <router-link
            text="Agendar una cita"
            to="/estetica"
            class="btn-primary"
          />
        </div>
        <ul class="timetable-container-appt">
          <li
            class="timetable-appt-li"
            v-for="(value, key) in openTime"
            :key="key"
          >
            <div class="timetable-hour">
              <span>
                {{ key.split(":")[0] }}:{{ key.split(":")[1] }}
                {{ key.split(":")[0] < 12 ? "AM" : "PM" }}
              </span>
            </div>
            <div
              v-if="value[0]"
              class="timetable-appt-info"
              :id="value[0].appointment_id"
            >
              <div class="appt-info">
                <div id="petName">Mascota: {{ value[0].user_pet_name }}</div>
                <div id="petBreed">
                  Raza:
                  <span v-if="value[0].user_pet_breed">{{
                    value[0].user_pet_breed
                  }}</span
                  ><span v-else>N/A</span>
                </div>
                <div id="service">
                  Servicio: {{ value[0].appointment_service }}
                </div>
                <span
                  id="apptStatus"
                  :class="
                    value[0].appointment_state === 'PENDIENTE'
                      ? 'appt-pending'
                      : 'appt-completed'
                  "
                  >{{ value[0].appointment_state }}</span
                >
              </div>
              <div class="appt-info-btns">
                <button
                  class="btn-terciary-gray"
                  @click="openApptDetails(value[0])"
                >
                  Llamar cliente
                  <svg><use href="/icons/icons.svg#phone" /></svg>
                </button>
                <button
                  class="btn-terciary-gray"
                  @click="openApptDetails(value[0])"
                >
                  Mas detalles
                  <svg><use href="/icons/icons.svg#chevronDown" /></svg>
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
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

    <Transition
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <ApptDetailsModal
        v-if="isApptDetailsModalOpen"
        :apptInfo="apptInfo"
        @closeApptDetails="closeApptDetails"
        @updateApptDetails="updateApptDetails"
      />
    </Transition>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onClickOutside } from "@vueuse/core";
import useAdminStore from "@/stores/admin";
import ApptDetailsModal from "@/components/admin/consultarCitas/ApptDetailsModal.vue";
import CalendarEstetica from "@/components/CalendarEstetica.vue";
import ConfirmationModal from "@/components/account/ConfirmationModal.vue";

const adminStore = useAdminStore();
const totalAppt = ref(0);
const completedAppt = ref(0);
const remainingAppt = ref(0);
const moreOptionsVisible = ref(false);
const moreOptionsUL = ref(null);
const openTime = ref(null);
const apptInfo = ref(null);
const isApptDetailsModalOpen = ref(false);
const isApptCalendarIsActive = ref(false);
const selectedDate = ref(null);
const dayOfWeekString = ref(null);
const axiosResponseMessage = ref("");
const isNoApptAlertActive = ref(false);
const getScheduleRequestLoading = ref(false);
// Variables and functions for confirmation/error modal
const responseMessage = ref("");
const success = ref(false);
const bgConfirmationModalIsOpen = ref(false);
const confirmationModalIsOpen = ref(false);
const closeConfirmationButton = ref(true);

function closeConfirmationModal() {
  confirmationModalIsOpen.value = false;
  setTimeout(() => {
    bgConfirmationModalIsOpen.value = false;
  }, 100);
}
//
const date = new Date();
const day = String(date.getDate()).padStart(2, "0");
const month = String(date.getMonth() + 1).padStart(2, "0");
const year = date.getFullYear();
const spanishDaysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

function openApptHistoryCalendar() {
  isApptCalendarIsActive.value = !isApptCalendarIsActive.value;
}
function closeCalendar() {
  isApptCalendarIsActive.value = false;
}
function openApptDetails(appt) {
  isApptDetailsModalOpen.value = true;
  apptInfo.value = appt;
}
function closeApptDetails() {
  isApptDetailsModalOpen.value = false;
}
async function updateApptDetails(successfulApptUpdate, appointmentUpdated) {
  if (successfulApptUpdate) {
    await getApptSchedule();
    apptInfo.value = openTime.value[appointmentUpdated.apptHour][0];
  }
}
function datePicked(date) {
  selectedDate.value = date;
  getApptSchedule();
}
function checkTodayAppts() {
  selectedDate.value = `${day}/${month}/${year}`;
  getApptSchedule();
}
function downloadApptReport() {}

async function getApptSchedule() {
  getScheduleRequestLoading.value = true;
  dayOfWeekString.value =
    spanishDaysOfWeek[
      new Date(
        `${selectedDate.value.split("/")[2]}-${
          selectedDate.value.split("/")[1]
        }-${selectedDate.value.split("/")[0]}`
      ).getDay()
    ];

  const adminOpenTimeRequest = await adminStore.getAppointmentDailyHistory(
    selectedDate.value
  );
  // Handle error
  if (!adminOpenTimeRequest.success) {
    bgConfirmationModalIsOpen.value = true;
    responseMessage.value = adminOpenTimeRequest.message;
    confirmationModalIsOpen.value = true;
    getScheduleRequestLoading.value = false;
    return;
  }
  openTime.value = adminOpenTimeRequest.data.schedule;
  totalAppt.value = adminOpenTimeRequest.data.apptCounter;
  remainingAppt.value = adminOpenTimeRequest.data.apptPendingCounter;
  completedAppt.value = adminOpenTimeRequest.data.apptCompletedCounter;

  if (adminOpenTimeRequest.message) {
    axiosResponseMessage.value = adminOpenTimeRequest.message;
    isNoApptAlertActive.value = true;
  } else isNoApptAlertActive.value = false;
  getScheduleRequestLoading.value = false;
}

onMounted(async () => {
  // Getting open time and appointment daily history
  selectedDate.value = `${day}/${month}/${year}`;
  getApptSchedule();

  onClickOutside(moreOptionsUL, (e) => {
    moreOptionsVisible.value = false;
    e.stopPropagation();
  });
});
</script>

<style scoped lang="scss">
.check-appt {
  width: 100%;
  padding: 60px 0;
  .check-appt-header {
    position: relative;
    width: 100%;
    background: var(--background-main-color);
    section {
      padding-top: 20px;

      z-index: 3;
      position: relative;
      background: var(--background-main-color);
      button {
        width: 45%;
        font-size: 1rem;
        padding: 8px 16px;
      }
    }
    ul {
      position: absolute;
      width: 90%;
      left: 50%;
      translate: -50% 0;
      background: var(--background-main-color);
      border: 3px solid var(--accent-color);
      transition: 2s ease-in-out;
      border-radius: 6px;
      z-index: 2;
      li {
        padding: 16px;
        font-weight: 500;
        &:not(:last-of-type) {
          border-bottom: 2px solid var(--accent-color);
        }
      }
    }
  }
}
.appt-general-info {
  padding: 0 20px;
  header {
    h1 {
      min-width: 80%;
      text-align: center;
      font-size: 1.5rem;
      font-weight: bold;
      border-bottom: 1px solid var(--light-gray-color);
      padding: 10px 0;
    }
  }
  section {
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .appt-history-info {
      li {
        padding: 8px 0;
        font-size: 1.3rem;
        font-weight: 600;
        width: 100%;
      }
    }
    div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      width: 80px;
      text-align: center;
      span {
        font-weight: 600;
        font-size: 1.1rem;
        margin-bottom: 6px;
      }
      button {
        background-color: var(--light-gray-color-100);
        border-radius: 6px;
        transition: background-color 200ms ease-in-out;
        padding: 6px;
        svg {
          width: 35px;
          height: 30px;
        }
      }
    }
  }
}
.container-timetable-appt {
  text-align: center;
  border: 1px solid var(--light-gray-color);

  .timetable-date {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px;
    position: relative;
    border-bottom: 1px solid var(--light-gray-color);
    #btnDate {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: fit-content;
      transition: scale 100ms ease-in-out;
      &:hover {
        cursor: pointer;
        scale: 1.03;
      }
      svg {
        width: 30px;
        height: 30px;
      }
      span {
        font-size: 1.2em;
        font-weight: 500;
      }
    }
  }
  .timetable-container-appt {
    .timetable-appt-li {
      position: relative;
      display: flex;
      align-items: center;
      height: 140px;
      border-bottom: 1px solid var(--light-gray-color);
      .timetable-hour {
        min-width: 70px;
        height: 100%;
        border-right: 1px solid var(--light-gray-color);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.8rem;
      }
      .timetable-appt-info {
        width: 100%;
        height: 100%;
        padding: 10px;
        .appt-info {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          width: 100%;
          div {
            text-align: left;
            width: 100%;
          }
          #apptStatus {
            position: absolute;
            top: 10px;
            right: 10px;
            border-radius: 6px;
            padding: 5px 10px;
            font-size: 0.7rem;
            font-weight: 500;
            color: var(--white-text-color);
          }
        }
        .appt-info-btns {
          width: 100%;
          font-size: 0.8rem;
          display: flex;
          align-items: center;
          margin-top: 10px;
          .btn-terciary-gray {
            padding: 6px 12px;
            display: flex;
            align-items: center;
            line-height: normal;
            svg {
              display: inline;
              width: 20px;
              height: 20px;
              margin-left: 5px;
              stroke: var(--black-text-color);
            }
            &:not(&:last-of-type) {
              margin-right: 10px;
            }
          }
        }
      }
    }
  }

  .appt-pending {
    background: var(--accent-color-100);
  }

  .appt-completed {
    background: var(--green-color-100);
  }
}
.calendarContainer {
  position: absolute;
  top: 60px;
  left: 50%;
  translate: -50% 0;
  z-index: 99;
  width: fit-content !important;
}

.animate__animated.animate__fadeIn,
.animate__animated.animate__fadeOut {
  --animate-duration: 300ms;
}
.animate__animated.animate__fadeInDown,
.animate__animated.animate__fadeOutUp {
  --animate-duration: 300ms;
}
</style>
