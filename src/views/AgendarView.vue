<template>
  <div class="wrapper">
    <div class="form-container">
      <h1>Agendar una cita</h1>
      <!-- https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data -->
      <form action="/nueva-cita" method="POST" class="form-cita">
        <div class="cita-section">
          <div class="inputBox">
            <input
              type="text"
              name="nombreCliente"
              id="nombreCliente"
              autocomplete="off"
              required
            />
            <span>Nombre Cliente</span>
          </div>
          <div class="inputBox">
            <input
              type="number"
              name="numeroTelefono"
              id="numeroTelefono"
              autocomplete="off"
              required
            />
            <span>Numero de Telefono</span>
          </div>
          <div class="inputBox toggle-seg-num" id="divSegundoNumTel">
            <input
              type="number"
              name="segundoNumTel"
              id="segundoNumTel"
              autocomplete="off"
              required
            />
            <span>Extra Numero de Telefono</span>
          </div>
          <div class="agregar-mas">
            <button
              type="button"
              id="btnAgregarTel"
              class="btn-agregar-seg-num"
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>

          <div class="mascotas">
            <div class="datos-mascota" id="datosMascota_0">
              <div></div>
              <div class="inputBox">
                <input
                  type="text"
                  name="nombreMascota"
                  id="nombreMascota_0"
                  autocomplete="off"
                  required
                />
                <span>Nombre Mascota</span>
              </div>
              <div class="inputBox">
                <input
                  type="text"
                  name="razaMascota"
                  id="razaMascota_0"
                  autocomplete="off"
                  required
                />
                <span>Raza Mascota</span>
              </div>
              <div class="servicio-select">
                <input type="text" id="inputServOpc_0" class="toggleDisplay" />
                <label
                  id="labelServicioMascota_0"
                  onclick="servicioOpc(this.id)"
                >
                  <span>Servicio</span>
                  <span>Selecciona un servicio...</span>
                  <i class="fa-solid fa-chevron-down"></i>
                </label>
                <ul class="slide" id="slide_0">
                  <li class="servicio-opc">
                    <label id="servOpcBano_0" onclick="servicioOpc(this.id)"
                      >Baño</label
                    >
                  </li>
                  <li class="servicio-opc">
                    <label
                      id="servOpcBanoCorte_0"
                      onclick="servicioOpc(this.id)"
                      >Baño y Corte</label
                    >
                  </li>
                  <li class="servicio-opc">
                    <label id="servOpcCorte_0" onclick="servicioOpc(this.id)"
                      >Corte</label
                    >
                  </li>
                  <li class="servicio-opc">
                    <label
                      id="servOpcCorteUnas_0"
                      onclick="servicioOpc(this.id)"
                      >Corte de Uñas</label
                    >
                  </li>
                </ul>
              </div>
              <div class="inputBox">
                <input
                  type="number"
                  name="precio"
                  id="precioServicioMascota_0"
                  autocomplete="off"
                  required
                />
                <span>Precio $ (opcional)</span>
              </div>
            </div>
          </div>

          <div class="agregar-mas">
            <button type="button" id="btnAgregarMascota">
              Añadir otra mascota
              <!-- <i class="fa-solid fa-plus"></i> -->
            </button>
          </div>

          <div class="horario-cont-fecha horario-container">
            <label for="fechaCita" id="labelFechaCita"
              >Fecha: <span></span><i class="fa-solid fa-calendar-days"></i
            ></label>
            <input type="checkbox" name="fechaCita" id="fechaCita" />
            <div class="calendarContainer">
              <div id="calendar" class="calendar"></div>
            </div>
          </div>

          <div class="horario-cont-hora horario-container">
            <label id="labelHorarioSelect">
              <i class="fa-regular fa-clock"></i>
              Hora:
              <select id="horarioSelect" disabled>
                <option value="0">Elige un horario</option>
              </select>
            </label>
          </div>

          <div class="mensaje-error">mensajeError</div>
        </div>
        <button id="btnAgendar" type="submit" class="btn-submit">
          Agendar
        </button>
      </form>
    </div>
  </div>
</template>

<!-- <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <script src="js/agendar.js"></script>
    <script src="js/vanilla-calendar.min.js"></script> -->
<script>
export default {
  name: "AgendarView",
  data() {
    return {};
  },
};
</script>
