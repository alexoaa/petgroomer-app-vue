<template>
  <div class="py-[60px]">
    <div class="form-container">
      <vee-form
        action="/new-appointment"
        method="POST"
        class="form-appointment"
        :validation-schema="agendarSchema"
        @submit="newAppointment"
        v-slot="{ errors }"
      >
        <div class="appointment-section">
          <!-- Client info -->
          <div class="user-contact-info">
            <h1>Introduce los datos de contacto</h1>
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
                <span>Nombre del cliente*</span>
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
                <span>Numero de teléfono*</span>
              </div>
              <ErrorMessage name="numeroTelefono" class="error-message" />
            </div>
            <!-- Second phone number -->
            <div id="divSegundoNumTelDiv" class="fields-container mb-0">
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
                <span>Numero de teléfono (Opcional)</span>
              </div>
              <ErrorMessage name="segundoNumTel" class="error-message" />
            </div>
          </div>
          <!-- Pets -->
          <div class="pets">
            <div class="pet-info" id="datosMascota">
              <div class="w-full">
                <h1>Datos de la mascota</h1>
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
                    <span>Nombre de la mascota*</span>
                  </div>
                  <ErrorMessage name="nombreMascota" class="error-message" />
                </div>
                <!-- Pet specie -->
                <div id="especieMascotaDiv" class="fields-container">
                  <div class="breed-select">
                    <vee-field
                      type="text"
                      id="especieMascota"
                      name="especieMascota"
                      class="toggle-display-none"
                      v-model="especieMascota"
                    />
                    <label
                      id="labelEspecieMascota"
                      tabindex="0"
                      @click="isEpecieMascotaActive"
                      @keyup.tab="isEpecieMascotaActive"
                    >
                      <span
                        :class="{
                          'span-active':
                            this.especieMascotaActive ||
                            this.especieMascotaLabel,
                        }"
                        >Especie*</span
                      >
                      <span>{{ this.especieMascotaLabel }}</span>
                      <svg
                        :style="
                          this.especieMascotaActive
                            ? 'transform: rotate(180deg)'
                            : ''
                        "
                      >
                        <use href="/icons/icons.svg#chevronDown" />
                      </svg>
                    </label>
                    <ul
                      class="ul-service-option ease-in duration-1000"
                      id="slide"
                      :class="
                        this.especieMascotaActive ? 'height-fit-content' : ''
                      "
                    >
                      <li
                        class="service-option"
                        :class="
                          this.especieMascotaLabel === 'Perro'
                            ? 'bg-[var(--light-gray-color-100)]'
                            : ''
                        "
                      >
                        <label
                          id="servOpcBano"
                          tabindex="0"
                          @click="isEpecieMascotaActive('Perro')"
                          @keyup.enter="isEpecieMascotaActive('Perro')"
                          >Perro</label
                        >
                      </li>
                      <li
                        class="service-option"
                        :class="
                          this.especieMascotaLabel === 'Gato'
                            ? 'bg-[var(--light-gray-color-100)]'
                            : ''
                        "
                      >
                        <label
                          id="servOpcBanoCorte"
                          tabindex="0"
                          @click="isEpecieMascotaActive('Gato')"
                          @keyup.enter="isEpecieMascotaActive('Gato')"
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
                    <span>Raza</span>
                  </div>
                  <ErrorMessage name="razaMascota" class="error-message" />
                </div>
              </div>
            </div>
          </div>
          <!-- Grooming service -->
          <div class="services-container">
            <h1>Selecciona un servicio</h1>
            <ul class="services">
              <li>
                <vee-field
                  type="radio"
                  id="bath"
                  name="servicioMascota"
                  v-model="servicioMascota"
                  value="Baño"
                  checked
                />
                <label
                  for="bath"
                  tabindex="0"
                  @keyup.enter="serviceInputIsChecked"
                >
                  <svg>
                    <use href="/icons/icons.svg#bath" />
                  </svg>
                  <span>Solo Baño</span>
                </label>
              </li>
              <li>
                <vee-field
                  type="radio"
                  id="bathHaircut"
                  name="servicioMascota"
                  v-model="servicioMascota"
                  value="Completo"
                />
                <label
                  for="bathHaircut"
                  tabindex="0"
                  @keyup.enter="serviceInputIsChecked"
                >
                  <svg>
                    <use href="/icons/icons.svg#bathHaircut" />
                  </svg>
                  <span>Baño y Corte</span>
                </label>
              </li>
              <li>
                <vee-field
                  type="radio"
                  id="brush"
                  name="servicioMascota"
                  v-model="servicioMascota"
                  value="Deslanado"
                />
                <label
                  for="brush"
                  tabindex="0"
                  @keyup.enter="serviceInputIsChecked"
                >
                  <svg>
                    <use href="/icons/icons.svg#brush" />
                  </svg>
                  <span>Cepillado / Deslanado</span>
                </label>
              </li>
            </ul>
            <div class="services-included">
              <h2>Todos los servicios incluyen*:</h2>
              <ul>
                <li>
                  <svg>
                    <use href="/icons/icons.svg#tick" />
                  </svg>
                  <span>Shampoo natural y de limpieza profunda </span>
                </li>
                <li>
                  <svg><use href="/icons/icons.svg#tick" /></svg>
                  <span> Fragancia </span>
                </li>
                <li>
                  <svg><use href="/icons/icons.svg#tick" /></svg>
                  <span>Limpieza de las glándulas anales </span>
                </li>
                <li>
                  <svg><use href="/icons/icons.svg#tick" /></svg>
                  <span> Secado </span>
                </li>
                <li>
                  <svg><use href="/icons/icons.svg#tick" /></svg>
                  <span> Limpieza de oídos </span>
                </li>
                <li>
                  <svg><use href="/icons/icons.svg#tick" /></svg>
                  <span> Corte de uñas </span>
                </li>
                <li>
                  <svg><use href="/icons/icons.svg#tick" /></svg>
                  <span> Cepillado </span>
                </li>
              </ul>
            </div>
            <ErrorMessage name="servicioMascota" class="error-message" />
          </div>
          <!-- Appointment date & time-->
          <div class="appointment-schedule">
            <h1>Selecciona la fecha y hora *</h1>
            <div class="md:flex md:flex-wrap md:justify-evenly">
              <div class="date-schedule-container">
                <div class="date-schedule">
                  <vee-field
                    type="text"
                    name="fechaCita"
                    id="fechaCita"
                    v-model="fechaCita"
                  />
                  <CalendarEstetica
                    class="calendar-container"
                    @datePicked="datePicked"
                    :onClickOutsideNeeded="false"
                  />
                </div>
                <ErrorMessage name="fechaCita" class="error-message" />
              </div>
              <div
                class="hidden md:block w-[2px] rounded bg-[var(--light-gray-color)] m-[10px]"
              />
              <!-- Appointment time -->
              <div class="md:max-w-[50%] text-center">
                <h2>{{ this.fechaCitaSpanish }}</h2>
                <div class="time-schedule-container">
                  <div class="time-schedule">
                    <ul>
                      <vee-field
                        type="text"
                        name="horaCita"
                        v-model="horaCita"
                        class="hidden"
                      />
                      <li v-for="hour in availableHours" :key="hour">
                        <input
                          type="radio"
                          :id="hour"
                          v-model="horaCita"
                          :value="hour"
                        />
                        <label
                          :for="hour"
                          tabindex="0"
                          @keyup.enter="apptTimeInputIsChecked"
                          >{{ hour }}
                          <span>{{
                            hour.split(":")[0] < 12 ? "AM" : "PM"
                          }}</span>
                        </label>
                      </li>
                    </ul>
                  </div>
                  <ErrorMessage name="horaCita" class="error-message" />
                </div>
              </div>
            </div>
          </div>
          <!-- Comments -->
          <div class="comments">
            <vee-field name="comentariosCita">
              <textarea
                id="comentariosCita"
                v-model="comentariosCita"
                placeholder="Ingresa información que deberiamos tener en cuenta sobre la mascota o que apliquemos en la cita..."
              />
            </vee-field>
            <label
              for="comentariosCita"
              :style="this.comentariosCita ? 'opacity: 1' : ''"
              >Comentarios</label
            >
          </div>
        </div>
        <button id="btnAgendar" type="submit" class="btn-primary">
          Agendar
        </button>
        <span
          class="error-message text-left w-full"
          v-if="Object.keys(errors).length"
          >Todos los campos * son necesarios.</span
        >
      </vee-form>
    </div>
    <!-- Modal to confirm appointment details before booking -->
    <div
      class="fixed z-[100] inset-0 overflow-hidden px-4"
      v-if="bgApptDetailsConfirmationModal"
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
          <div
            v-if="apptDetailsConfirmationModal"
            class="p-6 text-center min-w-[350px] min-h-[250px] max-w-[600px] max-h-[600px] overflow-y-auto bg-[var(--background-main-color)] bg-white rounded-lg shadow-xl transform transition-all"
            ref="apptDetailsConfirmationModal"
          >
            <h1 class="text-[1.3rem] font-bold">Detalles de la cita</h1>
            <ul class="appt-details-ul w-full text-left my-4">
              <li>
                <span>Nombre del cliente: </span>{{ this.nombreCliente || "-" }}
              </li>
              <li>
                <span>Número de teléfono: </span
                >{{ this.numeroTelefono || "-" }}
              </li>
              <li>
                <span>Télefono alterno: </span>{{ this.segundoNumTel || "-" }}
              </li>
              <li>
                <span>Nombre de la mascota: </span
                >{{ this.nombreMascota || "-" }}
              </li>
              <li><span>Especie: </span>{{ this.especieMascota || "-" }}</li>
              <li><span>Raza: </span>{{ this.razaMascota || "-" }}</li>
              <li><span>Servicio: </span>{{ this.servicioMascota || "-" }}</li>
              <li>
                <span>Fecha: </span>
                {{ this.fechaCitaSpanish || "-" }}
              </li>
              <li><span>Hora: </span>{{ this.horaCita || "-" }}</li>
              <li>
                <span>Comentarios: </span>{{ this.comentariosCita || "-" }}
              </li>
            </ul>
            <button
              @click="closeApptDetailsConfirmationModal"
              type="button"
              class="py-[10px] px-[20px] hover:font-bold underline mb-3 text-[1.1rem]"
            >
              Cancelar
            </button>
            <button
              @click="apptDetailsConfirmation()"
              type="button"
              class="btn-submit text-[1.1rem]"
            >
              Agendar
            </button>
          </div>
        </Transition>
      </div>
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
import { useUserStore } from "@/stores/user.js";
import useGeneralVariablesStore from "@/stores/generalVariables";
import router from "@/router";
import CalendarEstetica from "@/components/CalendarEstetica.vue";
import ConfirmationModal from "@/components/account/ConfirmationModal.vue";

export default {
  name: "AdminAgendarCita",
  components: {
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
      servicioMascota: "Baño",
      fechaCita: "",
      fechaCitaSpanish: "",
      horaCita: "",
      comentariosCita: "",
      especieMascotaLabel: "",
      especieMascotaActive: false,
      availableHours: [],
      formValues: {},

      bgApptDetailsConfirmationModal: false,
      apptDetailsConfirmationModal: false,

      responseMessage: "",
      success: false,
      bgConfirmationModalIsOpen: false,
      ConfirmationModalIsOpen: false,
      closeConfirmationButton: true,
      reloadPage: false,

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
    ...mapStores(useUserStore, useGeneralVariablesStore),
  },
  methods: {
    ...mapActions(useUserStore, { getUserAccountInfo: "getUserAccountInfo" }),
    ...mapActions(useUserStore, { scheduleAppointment: "scheduleAppointment" }),
    ...mapActions(useUserStore, { getHourAvailability: "getHourAvailability" }),

    isEpecieMascotaActive(especie) {
      if (especie != undefined && typeof especie != "object") {
        this.especieMascota = especie;
        this.especieMascotaLabel = especie;
      }
      this.especieMascotaActive = !this.especieMascotaActive;
    },
    serviceInputIsChecked(e) {
      const serviceInputChecked = document.getElementById(
        e.target.getAttribute("for")
      );
      serviceInputChecked.checked = true;
      this.servicioMascota = serviceInputChecked.value;
    },
    apptTimeInputIsChecked(e) {
      const apptTimeInputChecked = document.getElementById(
        e.target.getAttribute("for")
      );
      apptTimeInputChecked.checked = true;
      this.horaCita = apptTimeInputChecked.value;
    },
    async datePicked(date) {
      this.fechaCita = date;
      date = date.split("/");
      date = `${date[2]}-${date[1]}-${date[0]}T00:00:00`;
      const dateSpanish = new Date(date);
      const spanishDateString = dateSpanish.toLocaleDateString("es-MX", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });

      this.fechaCitaSpanish = spanishDateString
        .split(" ")
        .map((word) => {
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");

      const availableHoursRequest = await this.getHourAvailability(
        this.fechaCita
      );
      if (availableHoursRequest.success)
        this.availableHours = availableHoursRequest.message;
      else {
        this.bgConfirmationModalIsOpen = true;
        this.responseMessage = availableHoursRequest.message;
        this.ConfirmationModalIsOpen = true;
      }
    },
    async newAppointment(values) {
      this.formValues = values;
      // Modal to confirm the appointment details before booking
      this.bgApptDetailsConfirmationModal = true;
      this.apptDetailsConfirmationModal = true;
      // Wait for confirmation from the modal
    },
    async apptDetailsConfirmation() {
      let appTime = "PM";
      this.reloadPage = true;
      this.formValues.servicioMascota =
        this.formValues.servicioMascota === "Baño"
          ? 1
          : this.formValues.servicioMascota === "Completo"
          ? 2
          : 3;
      this.closeApptDetailsConfirmationModal();
      this.bgConfirmationModalIsOpen = true;
      const scheduleAppointmentRequest = await this.scheduleAppointment(
        this.formValues
      );
      if (!scheduleAppointmentRequest.success) {
        this.responseMessage = scheduleAppointmentRequest.message;
        this.ConfirmationModalIsOpen = false;
      } else {
        if (this.horaCita.split(":")[0] < 12) appTime = "AM";
        this.responseMessage = `Has agendado una cita de ${this.servicioMascota} para ${this.nombreMascota}  el día ${this.fechaCitaSpanish} a las ${this.horaCita} ${appTime}. <br/><br/>
        En unos momentos recibirás un correo electrónico confirmando los detalles de la cita.`;
      }
      this.success = scheduleAppointmentRequest.success;
      this.ConfirmationModalIsOpen = true;
    },
    closeConfirmationModal() {
      this.ConfirmationModalIsOpen = false;
      setTimeout(() => {
        this.bgConfirmationModalIsOpen = false;
        if (this.reloadPage) router.go("/estetica");
      }, 100);
    },
    closeApptDetailsConfirmationModal() {
      this.apptDetailsConfirmationModal = false;
      setTimeout(() => {
        this.bgApptDetailsConfirmationModal = false;
      }, 100);
    },
  },
};
</script>

<style lang="scss" scoped>
.animate__animated.animate__fadeIn,
.animate__animated.animate__fadeOut {
  --animate-duration: 300ms;
}
.appt-details-ul {
  li {
    word-break: break-all;
    margin: 5px 0;
    span {
      font-weight: 700;
    }
  }
}
#btnAgendar {
  width: 100%;
  margin: 0 0 20px;
}
.btn-submit {
  margin: 0;
}
</style>
