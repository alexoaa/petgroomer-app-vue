<template>
  <div
    class="fixed top-0 left-0 z-[100] w-screen h-screen bg-opacity-80 bg-black overflow-hidden flex items-center justify-center py-[20%] px-[5%]"
  >
    <div
      class="relative w-[350px] h-[600px] bg-[var(--background-main-color)] p-4 rounded-[6px] overflow-y-auto"
      ref="apptDetailsModal"
    >
      <div class="close-modal-button">
        <button @click="emit('closeApptDetails')">
          <svg><use href="/icons/icons.svg#cross" /></svg>
        </button>
      </div>
      <h1 class="text-2xl font-bold w-full text-center pb-4">
        Detalles de la cita
      </h1>
      <ul class="appt-details-list">
        <li>
          <span class="font-bold"> Estado: </span>
          <span
            class="font-bold"
            :style="
              props.apptInfo.appointment_state === 'PENDIENTE'
                ? 'color: var(--accent-color-100)'
                : 'color:var(--green-color-100)'
            "
            >{{ props.apptInfo.appointment_state }}</span
          >
        </li>
        <li>
          <span class="font-bold"> Cliente: </span>
          <span v-if="props.apptInfo.user_name">{{
            props.apptInfo.user_name
          }}</span
          ><span v-else>N/A</span>
        </li>
        <li>
          <span class="font-bold"> Telefono: </span>

          <span v-if="props.apptInfo.user_phone">{{
            props.apptInfo.user_phone
          }}</span
          ><span v-else>N/A</span>
        </li>
        <li>
          <span class="font-bold"> Segundo telefono: </span>

          <span v-if="props.apptInfo.user_second_phone">{{
            props.apptInfo.user_second_phone
          }}</span
          ><span v-else>N/A</span>
        </li>
        <li>
          <span class="font-bold"> Mascota: </span>

          <span v-if="props.apptInfo.user_pet_name">{{
            props.apptInfo.user_pet_name
          }}</span
          ><span v-else>N/A</span>
        </li>
        <li>
          <span class="font-bold"> Especie: </span>

          <span v-if="props.apptInfo.user_pet_specie">{{
            props.apptInfo.user_pet_specie
          }}</span
          ><span v-else>N/A</span>
        </li>
        <li>
          <span class="font-bold"> Raza: </span>

          <span v-if="props.apptInfo.user_pet_breed">{{
            props.apptInfo.user_pet_breed
          }}</span
          ><span v-else>N/A</span>
        </li>
        <li>
          <span class="font-bold"> Servicio de estetica: </span>
          <span v-if="props.apptInfo.appointment_service">{{
            props.apptInfo.appointment_service
          }}</span
          ><span v-else>N/A</span>
        </li>
        <li>
          <span class="font-bold">Precio: </span>
          $<span>{{ props.apptInfo.appointment_price }}</span>
        </li>
        <li>
          <span class="font-bold">Comentarios del cliente: </span>
          <span v-if="props.apptInfo.appointment_comment">{{
            props.apptInfo.appointment_comment
          }}</span
          ><span v-else>N/A</span>
        </li>
      </ul>
      <div class="appt-details-btns">
        <button
          class="btn-appt-details"
          @click="completeApptDetails()"
          id="completeApptDetails"
        >
          Completar
          <svg><use href="/icons/icons.svg#tick" /></svg>
        </button>
        <button
          class="btn-appt-details"
          @click="cancelApptDetails()"
          id="cancelApptDetails"
        >
          Cancelar
          <svg><use href="/icons/icons.svg#cross" /></svg>
        </button>
        <button
          class="btn-appt-details bg-[var(--light-gray-color)]"
          @click="openEditApptmodal()"
        >
          Editar
          <svg><use href="/icons/icons.svg#edit" /></svg>
        </button>
        <button
          class="btn-appt-details bg-[var(--light-gray-color-100)] text-[var(--black-text-color)]"
          @click="emit('closeApptDetails')"
        >
          Cerrar
        </button>
      </div>

      <Transition>
        <EditApptModal
          v-if="isEditApptModalOpen"
          @closeEditApptModal="closeEditApptModal"
          @onUpdateApptDetails="updateApptDetails"
          :apptInfo="props.apptInfo"
        />
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import EditApptModal from "@/components/admin/consultarCitas/EditApptModal.vue";

const props = defineProps(["apptInfo"]);
const emit = defineEmits(["closeApptDetails", "updateApptDetails"]);
const apptDetailsModal = ref(null);
const isEditApptModalOpen = ref(false);

function openEditApptmodal() {
  isEditApptModalOpen.value = true;
}
function closeEditApptModal() {
  isEditApptModalOpen.value = false;
}
function updateApptDetails(successfulApptUpdate, appointmentUpdated) {
  emit("updateApptDetails", successfulApptUpdate, appointmentUpdated);
}
function cancelApptDetails() {}
function completeApptDetails() {}

onMounted(() => {
  onClickOutside(apptDetailsModal, () => {
    emit("closeApptDetails");
  });
});
</script>

<style scoped lang="scss">
.appt-details-list {
  padding-bottom: 15px;
  li {
    padding: 5px 0;
  }
}
.appt-details-btns {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  button {
    // margin-right: 10px;
  }
}
.btn-appt-details {
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 6px;
  font-size: 1em;
  font-weight: bold;
  transition: background-color 200ms ease-in-out;
  min-width: 140px;
  flex-grow: 1;
  svg {
    display: inline;
    width: 25px;
    height: 25px;
    margin-left: 5px;
    stroke: var(--black-text-color);
  }
}
#cancelApptDetails {
  background-color: var(--red-color);
  color: var(--white-text-color);
  svg {
    fill: var(--white-text-color);
  }
}
#completeApptDetails {
  background-color: var(--green-color-100);
  color: var(--white-text-color);
  svg {
    stroke: var(--white-text-color);
  }
}
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
.animate__animated .animate__fadeIn,
.animate__animated .animate__fadeOut {
  animation-duration: 200ms;
}
</style>
