<template>
  <div
    class="w-full max-w-[350px] h-[600px] bg-[var(--background-main-color)] p-4 rounded-[6px] overflow-x-hidden absolute top-0 left-0"
  >
    <div class="close-modal-button">
      <button type="button" @click="closeEditApptDetails">
        <svg><use href="@/assets/icons/icons.svg#cross" /></svg>
      </button>
    </div>
    <h1 class="text-2xl font-bold w-full text-center py-4">
      Editar detalles de la cita
    </h1>
    <Form
      @submit="editApptDetails"
      method="PATCH"
      :validation-schema="editApptDetailsSchema"
      class="edit-appt-form"
    >
      <div class="edit-appt-field">
        <label for="apptDate">Fecha</label>
        <Field
          name="apptDate"
          v-model="apptDate"
          @click="openCalendarComp"
          type="text"
          readonly
        />
        <ErrorMessage name="apptDate" class="error-message" />
        <CalendarEstetica
          class="calendarContainer"
          v-if="isDateCalendarOpen"
          @datePicked="changeApptDate"
          @closeCalendar="closeCalendar"
          :isAdmin="true"
          :onClickOutsideNeeded="true"
        />
      </div>
      <div class="edit-appt-field" data-apptHour>
        <label for="apptHour">Hora</label>
        <div>
          <span>{{ apptHour.split(":")[0] < 12 ? "AM" : "PM" }}</span>
          <Field
            name="apptHour"
            v-model="apptHour"
            @click="openHourAvailabilitySelect"
            type="text"
            readonly
          />
        </div>
        <ErrorMessage name="apptHour" class="error-message" />
        <ul
          class="ul-appt-availability"
          v-if="isHourAvailabilitySelectOpen"
          ref="apptHourAvailabilityRef"
        >
          <li
            v-for="hour in apptHourAvailability"
            :key="hour"
            @click="selectedHour(hour)"
          >
            {{ hour }} <span>{{ hour.split(":")[0] < 12 ? "AM" : "PM" }}</span>
          </li>
        </ul>
      </div>
      <div class="edit-appt-field">
        <label for="apptService">Servicio</label>
        <div class="apptService-divAsInput" @click="openApptServices">
          {{ apptServiceName }}
        </div>
        <Field
          name="apptService"
          v-model="apptService"
          type="text"
          readonly
          class="hidden"
        />
        <ErrorMessage name="apptService" class="error-message" />
        <ul
          class="ul-appt-services"
          v-if="isApptServiceSelectOpen"
          ref="apptServiceSelectRef"
        >
          <li @click="selectedService(1)">Baño</li>
          <li @click="selectedService(2)">Completo</li>
          <li @click="selectedService(3)">Solo Corte</li>
        </ul>
      </div>
      <div class="edit-appt-field" data-apptPrice>
        <label for="apptPrice">Precio</label>
        <div>
          <span>$</span>
          <Field name="apptPrice" type="number" v-model="apptPrice" />
        </div>
        <ErrorMessage name="apptPrice" class="error-message" />
      </div>
      <div class="edit-appt-btns">
        <button
          type="button"
          class="btn-terciary-gray"
          @click="closeEditApptDetails"
        >
          Cancelar
        </button>
        <button type="submit" class="btn-primary">Guardar</button>
      </div>
    </Form>

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

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <Transition
          enter-active-class="animate__animated animate__bounceIn"
          leave-active-class="animate__animated animate__bounceOut"
        >
          <ConfirmationModal
            v-if="confirmationModalIsOpen"
            @close-confirmation-modal-button="closeConfirmationModal"
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all"
            :responseMessage="responseMessage"
            :success="successfulApptUpdate"
            :closeConfirmationButton="true"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import { onClickOutside } from "@vueuse/core";
import CalendarEstetica from "@/components/CalendarEstetica.vue";
import ConfirmationModal from "@/components/account/ConfirmationModal.vue";
import { useUserStore } from "@/stores/user";
import useAdminStore from "@/stores/admin";

const props = defineProps(["apptInfo"]);
const emit = defineEmits(["closeEditApptModal", "onUpdateApptDetails"]);
const userStore = useUserStore();
const adminStore = useAdminStore();

const bgConfirmationModalIsOpen = ref(false);
const confirmationModalIsOpen = ref(false);

const responseMessage = ref("");
const successfulApptUpdate = ref(false);
//
const isDateCalendarOpen = ref(false);
const apptDate = ref("");

const isHourAvailabilitySelectOpen = ref(false);
const apptHourAvailability = ref("");
const apptHourAvailabilityRef = ref(null);
const apptHour = ref("");

const apptService = ref("");
const apptServiceName = ref("");
const isApptServiceSelectOpen = ref(false);
const apptServiceSelectRef = ref(null);
const apptPrice = ref("");

// Vee validate
const editApptDetailsSchema = {
  apptDate: "date",
  apptHour: "hour",
  apptService: "max:1|integer",
  apptPrice: "integer",
};
function closeEditApptDetails() {
  emit("closeEditApptModal");
}
//
async function editApptDetails(values) {
  values.apptId = props.apptInfo.appointment_id;
  const adminUpdateApptDetails = await adminStore.modifyAppointment(values);
  bgConfirmationModalIsOpen.value = true;
  confirmationModalIsOpen.value = true;
  responseMessage.value = adminUpdateApptDetails.message;
  successfulApptUpdate.value = adminUpdateApptDetails.success;

  if (adminUpdateApptDetails.success)
    emit("onUpdateApptDetails", adminUpdateApptDetails.success, {
      apptHour: `${values.apptHour}:00`,
      apptId: values.apptId,
    });
}
function openCalendarComp() {
  isDateCalendarOpen.value = true;
}
async function changeApptDate(date) {
  apptDate.value = date;
  const getHourAvailability = await userStore.getHourAvailability(
    apptDate.value
  );
  if (getHourAvailability.success)
    apptHourAvailability.value = getHourAvailability.message;
}
function closeCalendar() {
  isDateCalendarOpen.value = false;
}
//
function openApptServices() {
  isApptServiceSelectOpen.value = true;
}
function selectedService(service) {
  switch (service) {
    case 1:
      apptServiceName.value = "Baño";
      apptService.value = 1;
      break;
    case 2:
      apptServiceName.value = "Completo";
      apptService.value = 2;
      break;
    case 3:
      apptServiceName.value = "Solo Corte";
      apptService.value = 3;
      break;
  }
  isApptServiceSelectOpen.value = false;
}
function openHourAvailabilitySelect() {
  isHourAvailabilitySelectOpen.value = true;
}
function selectedHour(hour) {
  apptHour.value = hour;
  isHourAvailabilitySelectOpen.value = false;
}
function closeConfirmationModal() {
  confirmationModalIsOpen.value = false;
  setTimeout(() => {
    bgConfirmationModalIsOpen.value = false;
    emit("closeEditApptModal");
  }, 200);
}

onMounted(async () => {
  apptDate.value = `${
    props.apptInfo.appointment_date.split("T")[0].split("-")[2]
  }/${props.apptInfo.appointment_date.split("T")[0].split("-")[1]}/${
    props.apptInfo.appointment_date.split("T")[0].split("-")[0]
  }`;
  apptHour.value = props.apptInfo.appointment_time.slice(0, -3);

  const getHourAvailability = await userStore.getHourAvailability(
    apptDate.value
  );
  if (getHourAvailability.success)
    apptHourAvailability.value = getHourAvailability.message;
  onClickOutside(apptHourAvailabilityRef, (e) => {
    isHourAvailabilitySelectOpen.value = false;
    e.stopPropagation();
  });
  apptServiceName.value = props.apptInfo.appointment_service;
  apptService.value =
    apptServiceName.value === "Baño"
      ? 1
      : apptServiceName.value === "Completo"
      ? 2
      : 3;

  onClickOutside(apptServiceSelectRef, (e) => {
    isApptServiceSelectOpen.value = false;
    e.stopPropagation();
  });
  apptPrice.value = props.apptInfo.appointment_price;
});
</script>

<style scoped lang="scss">
.close-modal-button {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  svg {
    width: 30px;
    height: 30px;
    transition: scale 200ms ease-in-out;
  }
  &:hover {
    svg {
      scale: 1.05;
    }
  }
}
.edit-appt-form {
  position: relative;
  overflow: hidden;
  padding: 0 20px;
  width: 100%;
  .edit-appt-field {
    position: relative;
    margin: 15px 0;
    width: 100%;
    label {
      display: block;
      margin-bottom: 5px;
    }
    input,
    .apptService-divAsInput {
      min-height: 44px;
      border: 2px solid var(--light-gray-color);
      border-radius: 6px;
      width: 100%;
      padding: 8px 16px;
      &:active,
      &:focus {
        outline: none;
      }
      &:not([data-apptPrice] input) {
        cursor: pointer;
      }
    }
    .ul-appt-availability {
      width: fit-content;
      border-radius: 6px;
      border: 1px solid var(--light-gray-color);
      box-shadow: 0 0px 3px 0 var(--light-gray-color),
        0 1px 2px 0 var(--light-gray-color);
      background: var(--background-main-color);
      top: 36px;
      left: 50%;
      position: absolute;
      z-index: 10;
      height: 220px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 5px;
      }
      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      &::-webkit-scrollbar-thumb {
        box-shadow: inset 0 0 4px rgba(0, 0, 0, 0.2);
      }
      li {
        padding: 8px 16px;
        transition: background 100ms ease-in-out;
        &:not(:last-of-type) {
          border-bottom: 1px solid var(--light-gray-color-100);
        }
        &:hover {
          background: var(--light-gray-color-100);
          cursor: pointer;
        }
      }
    }
    .ul-appt-services {
      position: absolute;
      width: 100%;
      z-index: 10;
      margin-top: 8px;
      background: var(--background-main-color);
      box-shadow: 0 0px 3px 0 var(--light-gray-color),
        0 1px 2px 0 var(--light-gray-color);
      border-radius: 6px;
      border: 1px solid var(--light-gray-color);
      li {
        padding: 8px 16px;
        transition: background 100ms ease-in-out;
        &:not(&:last-of-type) {
          border-bottom: 1px solid var(--light-gray-color-100);
        }
        &:hover {
          background: var(--light-gray-color-100);
          cursor: pointer;
        }
      }
    }
  }
  [data-apptHour] {
    div {
      position: relative;
      display: flex;
      align-items: center;
      span {
        position: absolute;
        left: 62px;
        cursor: pointer;
      }
    }
  }
  [data-apptPrice] {
    input {
      padding-left: 24px;
    }
    div {
      position: relative;
      display: flex;
      align-items: center;
      span {
        position: absolute;
        left: 16px;
      }
    }
  }
}
.edit-appt-btns {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  button {
    flex-grow: 1;
  }
}
.btn-terciary-gray {
  padding: 10px 20px;
  line-height: normal;
}
.btn-primary {
  font-size: 1rem;
  padding: 10px 20px;
  max-width: 120px;
  line-height: normal;
}
.calendarContainer {
  position: absolute;
  top: 80px;
  left: 50%;
  translate: -50% 0;
  z-index: 99;
  width: fit-content !important;
}
</style>
