<template>
  <div class="wrapper">
    <section class="w-full h-auto">
      <EsteticaImageSlider />
    </section>
    <div class="form-container">
      <h1>Agenda una cita</h1>
      <vee-form
        action="/new-appointment"
        method="POST"
        class="form-appointment"
        :validation-schema="agendarSchema"
        @submit="newAppointment"
      >
        <div class="appointment-section">
          <!-- Client name -->
          <div id="nombreClienteDiv" class="fields-container">
            <div class="inputBox">
              <vee-field
                type="text"
                name="nombreCliente"
                v-model="nombreCliente"
                id="nombreCliente"
                autocomplete="off"
                required
              />
              <span>Nombre Cliente</span>
            </div>
            <ErrorMessage name="nombreCliente" class="error-message" />
          </div>
          <!-- Phone number -->
          <div id="numeroTelefonoDiv" class="fields-container">
            <div class="inputBox pl-[95px] pl-[0]">
              <vee-field
                type="tel"
                maxlength="15"
                name="numeroTelefono"
                v-model="numeroTelefono"
                id="numeroTelefono"
                autocomplete="off"
                required
              />
              <span>Numero de Telefono</span>
            </div>
            <ErrorMessage name="numeroTelefono" class="error-message" />
          </div>
          <!-- Second phone number -->
          <div
            id="divSegundoNumTelDiv"
            class="fields-container mb-0"
            v-if="this.segundoNumTelActive"
          >
            <div class="inputBox" id="divSegundoNumTel">
              <vee-field
                type="tel"
                name="segundoNumTel"
                id="segundoNumTel"
                v-model="segundoNumTel"
                autocomplete="off"
                maxlength="10"
                required
              />
              <span>Numero de Telefono Extra</span>
            </div>
            <ErrorMessage name="segundoNumTel" class="error-message" />
          </div>
          <!-- Add second number button -->
          <div class="add-number">
            <button
              type="button"
              id="btnAgregarTel"
              @click="isSegundoNumTelActive"
            >
              <div
                class="btn-add-number"
                :class="this.segundoNumTelActive ? 'toggle-display-none' : ''"
              >
                <svg><use href="@/assets/icons/icons.svg#plus" /></svg>
                <span class="ml-2">Añadir otro numero</span>
              </div>
              <div
                class="btn-delete-number"
                :class="this.segundoNumTelActive ? '' : 'toggle-display-none'"
              >
                <svg><use href="@/assets/icons/icons.svg#cross" /></svg>
                <span class="ml-2">Borrar numero</span>
              </div>
            </button>
          </div>
          <!-- Pets -->
          <div class="pets">
            <div class="pet-info" id="datosMascota">
              <!-- TODO - WHEN USER INPUTS NAME OF PET, IF USER IS AUTH WE SHOULD LOOK AND OFFER AN OPTION TO CHOSE THAT PET -->
              <!-- Pet name -->
              <div id="nombreMascotaDiv" class="fields-container">
                <div class="inputBox">
                  <vee-field
                    type="text"
                    name="nombreMascota"
                    id="nombreMascota"
                    v-model="nombreMascota"
                    autocomplete="off"
                    required
                  />
                  <span>Nombre Mascota</span>
                </div>
                <ErrorMessage name="nombreMascota" class="error-message" />
              </div>
              <!-- Pet specie -->
              <div id="especieMascotaDiv" class="fields-container">
                <div class="service-select">
                  <vee-field
                    type="text"
                    id="especieMascota"
                    name="especieMascota"
                    class="toggle-display-none"
                    v-model="especieMascota"
                    placeholder="Selecciona la especie..."
                  />
                  <label
                    id="labelEspecieMascota"
                    @click="isEpecieMascotaActive"
                  >
                    <span>Especie</span>
                    <span>{{ this.especieMascotaLabel }}</span>
                    <svg>
                      <use href="@/assets/icons/icons.svg#chevronDown" />
                    </svg>
                  </label>
                  <ul
                    class="ul-service-option ease-in duration-1000"
                    id="slide"
                    :class="
                      this.especieMascotaActive ? 'height-fit-content' : ''
                    "
                  >
                    <li class="service-option">
                      <label
                        id="servOpcBano"
                        @click="isEpecieMascotaActive('Perro')"
                        >Perro</label
                      >
                    </li>
                    <li class="service-option">
                      <label
                        id="servOpcBanoCorte"
                        @click="isEpecieMascotaActive('Gato')"
                        >Gato</label
                      >
                    </li>
                  </ul>
                </div>
                <ErrorMessage name="especieMascota" class="error-message" />
              </div>
              <!-- Pet breed -->
              <div id="razaMascotaDiv" class="fields-container">
                <div class="inputBox">
                  <vee-field
                    type="text"
                    name="razaMascota"
                    id="razaMascota"
                    v-model="razaMascota"
                    autocomplete="off"
                    required
                  />
                  <span>Raza Mascota</span>
                </div>
                <ErrorMessage name="razaMascota" class="error-message" />
              </div>
              <!-- Grooming service -->
              <div id="servicioMascotaDiv" class="fields-container">
                <div class="service-select">
                  <vee-field
                    type="text"
                    id="servicioMascota"
                    name="servicioMascota"
                    class="toggle-display-none"
                    v-model="servicioMascota"
                    placeholder="Selecciona la especie..."
                  />
                  <label @click="isServicioSelectActive">
                    <span>Servicio</span>
                    <span>{{ this.servicioPickedLabel }}</span>
                    <svg>
                      <use href="@/assets/icons/icons.svg#chevronDown" />
                    </svg>
                  </label>
                  <ul
                    class="ul-service-option ease-in duration-1000"
                    id="slide"
                    :class="
                      this.servicioSelectActive ? 'height-fit-content' : ''
                    "
                  >
                    <li class="service-option">
                      <label
                        @click="
                          isServicioSelectActive('Baño');
                          this.servicioMascota = 'Baño';
                        "
                        >Baño</label
                      >
                    </li>
                    <li class="service-option">
                      <label
                        @click="
                          isServicioSelectActive('Baño y Corte');
                          this.servicioMascota = 'BañoCorte';
                        "
                        >Baño y Corte</label
                      >
                    </li>
                    <li class="service-option">
                      <label
                        @click="
                          isServicioSelectActive('Corte');
                          this.servicioMascota = 'Corte';
                        "
                        >Corte</label
                      >
                    </li>
                    <li class="service-option">
                      <label
                        @click="
                          isServicioSelectActive('Corte de uñas');
                          this.servicioMascota = 'CorteUnias';
                        "
                        >Corte de Uñas</label
                      >
                    </li>
                  </ul>
                </div>
                <ErrorMessage name="servicioMascota" class="error-message" />
              </div>
            </div>
          </div>
          <!-- Appointment date -->
          <div id="fechaCitaDiv" class="div-schedule-container">
            <div class="schedule-container">
              <label @click.stop="toggleCalendarComp">
                <div class="flex w-full items-center">
                  <svg>
                    <use href="@/assets/icons/icons.svg#calendar-days" />
                  </svg>
                  <span class="inline-block mr-[1em]">Fecha:</span>
                  <span id="spanFechaCita" class="text-[var(--text-color)]">{{
                    this.fechaCita
                  }}</span>
                </div>
              </label>
              <vee-field
                type="text"
                name="fechaCita"
                id="fechaCita"
                v-model="fechaCita"
              />
              <Transition
                enter-active-class="animate__animated animate__fadeIn"
                leave-active-class="animate__animated animate__fadeOut"
              >
                <CalendarEstetica
                  class="calendarContainer"
                  v-if="this.sidebarStore.calendarEsteticaIsActive"
                  @datePicked="datePicked"
                />
              </Transition>
            </div>
            <ErrorMessage name="fechaCita" class="error-message" />
          </div>
          <!-- Appointment time -->
          <div id="horaCitaDiv" class="div-schedule-container">
            <div class="schedule-container">
              <label id="labelHorarioSelect">
                <div class="flex items-center pr-2">
                  <svg>
                    <use href="@/assets/icons/icons.svg#clock" />
                  </svg>
                  <span>Hora:</span>
                </div>
                <select id="horarioSelect" v-model="horaCita">
                  <option value="">Elige un horario</option>
                  <option
                    v-for="hora in horasDisponibles"
                    :key="hora"
                    :value="hora"
                  >
                    {{ hora }}
                  </option>
                </select>
              </label>
              <vee-field
                type="text"
                name="horaCita"
                id="horaCita"
                v-model="horaCita"
              />
            </div>
            <ErrorMessage name="horaCita" class="error-message" />
          </div>
          <!-- Comments -->
          <div class="comments">
            <vee-field name="comentariosCita">
              <textarea
                id="comentariosCita"
                v-model="comentariosCita"
                placeholder="Comentarios ..."
              />
            </vee-field>

            <span>Comentarios</span>
          </div>
        </div>
        <button id="btnAgendar" type="submit" class="btn-submit max-w-[300px]">
          Agendar
        </button>
      </vee-form>
    </div>
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

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <Transition
          enter-active-class="animate__animated animate__bounceIn"
          leave-active-class="animate__animated animate__bounceOut"
        >
          <ConfirmationModal
            v-if="ConfirmationModalIsOpen"
            @close-confirmation-modal-button="closeConfirmationModal"
            class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all"
            :responseMessage="responseMessage"
            :success="success"
            :closeConfirmationButton="closeConfirmationButton"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapStores, mapActions } from "pinia";
import useUserStore from "@/stores/user.js";
import useSidebarStore from "@/stores/sidebar";
import router from "@/router";
import EsteticaImageSlider from "@/components/EsteticaImageSlider.vue";
import CalendarEstetica from "@/components/CalendarEstetica.vue";
import ConfirmationModal from "@/components/account/ConfirmationModal.vue";

export default {
  name: "EsteticaView",
  components: {
    EsteticaImageSlider,
    CalendarEstetica,
    ConfirmationModal,
  },
  data() {
    return {
      nombreCliente: "",
      numeroTelefono: "",
      segundoNumTel: "",
      nombreMascota: "",
      especieMascota: "",
      razaMascota: "",
      servicioMascota: "",
      fechaCita: "",
      horaCita: "",
      comentariosCita: "",
      especieMascotaLabel: "Selecciona la especie...",
      servicioPickedLabel: "Selecciona un servicio...",
      segundoNumTelActive: false,
      especieMascotaActive: false,
      servicioSelectActive: false,
      horasDisponibles: [],

      responseMessage: "",
      success: false,
      bgConfirmationModalIsOpen: false,
      ConfirmationModalIsOpen: false,
      closeConfirmationButton: true,

      agendarSchema: {
        nombreCliente: "required|alphaSpaces|min:3|max:100",
        numeroTelefono: "required|integer|min:10|max:10",
        segundoNumTel: "integer|min:10|max:10",
        nombreMascota: "required|alphaSpaces|min:3|max:100",
        especieMascota: "required|alphaSpaces|min:3|max:100",
        razaMascota: "alphaSpaces|min:3|max:100",
        servicioMascota: "required",
        fechaCita: "required",
        horaCita: "required",
      },
    };
  },
  computed: {
    ...mapStores(useUserStore, useSidebarStore),
  },
  methods: {
    ...mapActions(useUserStore, { getUserAccountInfo: "getUserAccountInfo" }),
    ...mapActions(useUserStore, { scheduleAppointment: "scheduleAppointment" }),
    ...mapActions(useUserStore, { getHourAvailability: "getHourAvailability" }),
    isSegundoNumTelActive() {
      this.segundoNumTelActive = !this.segundoNumTelActive;
    },
    isEpecieMascotaActive(especie) {
      if (especie != undefined && typeof especie != "object") {
        this.especieMascota = especie;
        this.especieMascotaLabel = especie;
      }
      this.especieMascotaActive = !this.especieMascotaActive;
    },
    isServicioSelectActive(servicio) {
      if (servicio != undefined && typeof servicio != "object")
        this.servicioPickedLabel = servicio;
      this.servicioSelectActive = !this.servicioSelectActive;
    },
    toggleCalendarComp() {
      this.sidebarStore.calendarEsteticaIsActive = true;
    },
    async datePicked(date) {
      this.fechaCita = date;
      const availableHoursRequest = await this.getHourAvailability(
        this.fechaCita
      );
      this.horasDisponibles = availableHoursRequest.message;
    },
    async newAppointment(values) {
      this.bgConfirmationModalIsOpen = true;
      const scheduleAppointmentRequest = await this.scheduleAppointment(values);
      if (!scheduleAppointmentRequest.success) {
        this.responseMessage = scheduleAppointmentRequest.message;
        this.ConfirmationModalIsOpen = false;
      }
      this.responseMessage = `${this.nombreMascota} tiene una cita de ${this.servicioPickedLabel}  el ${this.fechaCita} a las ${this.horaCita}.`;
      this.success = scheduleAppointmentRequest.success;
      this.ConfirmationModalIsOpen = true;
    },
    closeConfirmationModal() {
      this.ConfirmationModalIsOpen = false;
      setTimeout(() => {
        this.bgConfirmationModalIsOpen = false;
        router.go("/estetica");
      }, 100);
    },
    // Method that will call the getUserAccountInfo from userStore to automatically fill fields with user info
    async getUserInfoAuthed() {
      const userInfoRequest = await this.getUserAccountInfo();
      this.nombreCliente = `${userInfoRequest.data.name} ${userInfoRequest.data.lastName}`;
      this.numeroTelefono = userInfoRequest.data.phone;
    },
  },
  created() {
    // Watcher to isAuth userStore, when user logs in while being on /estetica, the fields will automatically update to the user info
    const usingUserStore = useUserStore();
    this.$watch(
      () => usingUserStore.isAuth,
      (newVal) => {
        if (newVal) this.getUserInfoAuthed();
      }
    );
    // If user isAuth or the localStorage isAuth are true, the fields will automatically update to the user info
    if (this.userStore.isAuth || localStorage.isAuthenticated) {
      this.getUserInfoAuthed();
    }
  },
};
</script>

<style lang="scss" scoped>
.country-code-select {
  div {
    margin-right: 0 !important;
  }
  position: absolute;
  z-index: 100;
  top: 15px;
  left: 10px;
  border: 1px solid #dbddde;
  border-radius: 6px;
  background-color: #eceeef;

  .country-code-options-container {
    border-radius: 6px;
    background-color: #eceeef;
    .country-code-container {
      display: flex;
      align-items: center;
      padding: 0 5px;
      &:not(:first-child) {
        display: none;
        margin: 5px 0;
      }
      div {
        margin: 0 0 0 5px !important;
        line-height: 5px;
      }
    }
  }
}

.animate__animated.animate__fadeIn,
.animate__animated.animate__fadeOut {
  --animate-duration: 300ms;
}
</style>
