<template>
  <div class="wrapper">
    <div class="w-full h-[80px] bg-[var(--main-color)]" />
    <section class="w-full h-auto">
      <EsteticaImageSlider />
    </section>
    <div class="form-container">
      <h1>Agenda una cita</h1>
      <!-- https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data -->
      <vee-form
        action="/nueva-cita"
        method="POST"
        class="form-cita"
        :validation-schema="agendarSchema"
        @submit="agendarCita"
      >
        <div class="cita-section">
          <!-- Nombre cliente -->
          <div id="nombreClienteDiv" class="fields-container">
            <div class="inputBox" v-if="!this.userStore.isAuth">
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
            <ErrorMessage
              name="nombreCliente"
              class="error-message"
            ></ErrorMessage>
          </div>
          <!-- TODO - WHEN USER IS AUTH NAME SHOULD BE AUTOMATICALLY DISPLAYED, SO PHONE, EMAIL-->
          <!-- Numero de telefono -->
          <div id="numeroTelefonoDiv" class="fields-container">
            <div class="inputBox">
              <vee-field
                type="number"
                name="numeroTelefono"
                v-model="numeroTelefono"
                id="numeroTelefono"
                autocomplete="off"
                required
              />
              <span>Numero de Telefono</span>
            </div>
            <ErrorMessage
              name="numeroTelefono"
              class="error-message"
            ></ErrorMessage>
          </div>
          <!-- Segundo numero de telefono -->
          <div
            id="divSegundoNumTelDiv"
            class="fields-container mb-0"
            v-if="this.segundoNumTelActive"
          >
            <div class="inputBox" id="divSegundoNumTel">
              <vee-field
                type="number"
                name="segundoNumTel"
                id="segundoNumTel"
                v-model="segundoNumTel"
                autocomplete="off"
                maxlength="10"
                required
              />
              <span>Extra Numero de Telefono</span>
            </div>
            <ErrorMessage
              name="segundoNumTel"
              class="error-message"
            ></ErrorMessage>
          </div>
          <!-- Boton Agregar segundo numero telefono -->
          <div class="agregar-mas">
            <button
              type="button"
              id="btnAgregarTel"
              class="btn-agregar-seg-num"
              @click="isSegundoNumTelActive"
            >
              <div
                :class="this.segundoNumTelActive ? 'toggle-display-none' : ''"
              >
                <i class="fa-solid fa-plus"></i>
                <span class="ml-2">Añadir otro numero de telefono</span>
              </div>
              <div
                class="text-red-500"
                :class="this.segundoNumTelActive ? '' : 'toggle-display-none'"
              >
                <i class="fa-solid fa-x"></i>
                <span class="ml-2">Borrar numero extra</span>
              </div>
            </button>
          </div>
          <!-- Mascotas -->
          <div class="mascotas">
            <div class="datos-mascota" id="datosMascota">
              <!-- TODO - WHEN USER INPUTS NAME OF PET, IF USER IS AUTH WE SHOULD LOOK AND OFFER AN OPTION TO CHOSE THAT PET -->
              <!-- Nombre mascota -->
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
                <ErrorMessage
                  name="nombreMascota"
                  class="error-message"
                ></ErrorMessage>
              </div>
              <!-- Especie mascota -->
              <div id="especieMascotaDiv" class="fields-container">
                <div class="servicio-select">
                  <vee-field
                    type="text"
                    id="especieMascota"
                    name="especieMascota"
                    class="toggleDisplay"
                    v-model="especieMascota"
                    placeholder="Selecciona la especie..."
                  />
                  <label
                    id="labelEspecieMascota"
                    @click="isEpecieMascotaActive"
                  >
                    <span>Especie</span>
                    <span>{{ this.especieMascotaLabel }}</span>
                    <i class="fa-solid fa-chevron-down"></i>
                  </label>
                  <ul
                    class="slide ease-in duration-1000"
                    id="slide"
                    :class="this.especieMascotaActive ? 'h-fit' : ''"
                  >
                    <li class="servicio-opc">
                      <label
                        id="servOpcBano"
                        @click="isEpecieMascotaActive('Perro')"
                        >Perro</label
                      >
                    </li>
                    <li class="servicio-opc">
                      <label
                        id="servOpcBanoCorte"
                        @click="isEpecieMascotaActive('Gato')"
                        >Gato</label
                      >
                    </li>
                  </ul>
                </div>
                <ErrorMessage
                  name="especieMascota"
                  class="error-message"
                ></ErrorMessage>
              </div>
              <!-- Raza mascota -->
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
                <ErrorMessage
                  name="razaMascota"
                  class="error-message"
                ></ErrorMessage>
              </div>
              <!-- Servicio de estetica -->
              <div id="servicioMascotaDiv" class="fields-container">
                <div class="servicio-select">
                  <vee-field
                    type="text"
                    id="servicioMascota"
                    name="servicioMascota"
                    class="toggleDisplay"
                    v-model="servicioMascota"
                    placeholder="Selecciona la especie..."
                  />
                  <label @click="isServicioSelectActive">
                    <span>Servicio</span>
                    <span>{{ this.servicioPickedLabel }}</span>
                    <i class="fa-solid fa-chevron-down"></i>
                  </label>
                  <ul
                    class="slide ease-in duration-1000"
                    id="slide"
                    :class="this.servicioSelectActive ? 'h-fit' : ''"
                  >
                    <li class="servicio-opc">
                      <label
                        @click="
                          isServicioSelectActive('Baño');
                          this.servicioMascota = 'Banio';
                        "
                        >Baño</label
                      >
                    </li>
                    <li class="servicio-opc">
                      <label
                        @click="
                          isServicioSelectActive('Baño y Corte');
                          this.servicioMascota = 'BanioCorte';
                        "
                        >Baño y Corte</label
                      >
                    </li>
                    <li class="servicio-opc">
                      <label
                        @click="
                          isServicioSelectActive('Corte');
                          this.servicioMascota = 'Corte';
                        "
                        >Corte</label
                      >
                    </li>
                    <li class="servicio-opc">
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
                <ErrorMessage
                  name="servicioMascota"
                  class="error-message"
                ></ErrorMessage>
              </div>
            </div>
          </div>
          <!-- Fecha de cita -->
          <div id="fechaCitaDiv">
            <div class="horario-container fecha-container">
              <label @click="toggleCalendarComp">
                <div class="flex w-full items-center">
                  <span class="inline-block mr-[1em]">Fecha:</span>
                  <span id="spanFechaCita" class="text-[#212121]">{{
                    this.fechaCita
                  }}</span>
                </div>
                <i class="fa-solid fa-calendar-days"></i
              ></label>
              <vee-field
                type="text"
                name="fechaCita"
                id="fechaCita"
                v-model="fechaCita"
              />
              <CalendarEstetica
                class="calendarContainer"
                v-if="this.generalVariablesStore.calendarEsteticaIsActive"
                @datePicked="datePicked"
                :onClickOutsideNeeded="true"
              />
            </div>
            <ErrorMessage name="fechaCita" class="error-message"></ErrorMessage>
          </div>
          <!-- Horario de cita -->
          <div id="horaCitaDiv">
            <div class="horario-container hora-container">
              <label id="labelHorarioSelect">
                <div class="flex w-[32%] items-center justify-between">
                  <i class="fa-regular fa-clock"></i>
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
            <ErrorMessage name="horaCita" class="error-message"></ErrorMessage>
          </div>
          <!-- Comentarios -->
          <div class="comentarios">
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
        <button id="btnAgendar" type="submit" class="btn-submit">
          Agendar
        </button>
      </vee-form>
    </div>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useUserStore } from "@/stores/user";
import useGeneralVariablesStore from "@/stores/generalVariables";
import EsteticaImageSlider from "@/components/EsteticaImageSlider.vue";
import CalendarEstetica from "@/components/CalendarEstetica.vue";

export default {
  name: "AdminAgendarCita",
  components: {
    EsteticaImageSlider,
    CalendarEstetica,
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
      horasDisponibles: ["10 AM", "11 AM"],
    };
  },
  methods: {
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
      setTimeout(() => {
        this.generalVariablesStore.calendarEsteticaIsActive = true;
      }, 100);
    },
    datePicked(date) {
      this.fechaCita = date;
    },
    agendarCita(values) {
      console.log(values);
      console.log(this.comentariosCita);
      console.log("Agendar submit form");
    },
  },
  computed: {
    ...mapStores(useUserStore, useGeneralVariablesStore),
  },
};
</script>
