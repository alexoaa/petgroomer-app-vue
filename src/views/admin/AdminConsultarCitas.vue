<template>
  <div class="container-citas-dia">
    <div class="info-citas-dia">
      <h1>Información del día:</h1>
      <div id="opcInfoCitaDia"><span>Total de citas: </span><span></span></div>
      <div id="opcInfoCitaDiaCompl">
        <span>Citas completadas: </span><span></span>
      </div>
      <div id="opcInfoCitaDiaPend">
        <span>Citas pendientes: </span><span></span>
      </div>
    </div>

    <div class="container-timetable-citas-dia">
      <div class="row timetable-fecha">
        <div class="col-3 btnTTFecha" id="btnTimeTableFechaLeft">
          <i class="fa-solid fa-chevron-left"></i>
        </div>
        <div class="col" id="divTimeTableFecha"><span></span></div>
        <div class="col-3 btnTTFecha" id="btnTimeTableFechaRight">
          <i class="fa-solid fa-chevron-right"></i>
        </div>
      </div>

      <div class="citas-dia container">
        <div class="row row-cols-sm-4" id="tTCitasDiaHora_11">
          <div class="divHora col-3">11:00 am</div>
          <div class="citaInfoDia col">
            <!-- <div class="citaInfoDia-child">
                                <span id="nombre_1">Hashi</span>
                                <span id="raza_1">ChowChow</span>
                                <span id="servicio_1">Baño y Corte</span>
                                <span id="precio_1">$480</span>
                            </div> -->
          </div>
        </div>
        <div class="row row-cols-sm-4" id="tTCitasDiaHora_12">
          <div class="divHora col-3">12:00 am</div>
          <div class="citaInfoDia col"></div>
        </div>
        <div class="row row-cols-sm-4" id="tTCitasDiaHora_13">
          <div class="divHora col-3">13:00 pm</div>
          <div class="citaInfoDia col"></div>
        </div>
        <div class="row row-cols-sm-4" id="tTCitasDiaHora_14">
          <div class="divHora col-3">14:00 pm</div>
          <div class="citaInfoDia col"></div>
        </div>
        <div class="row row-cols-sm-4" id="tTCitasDiaHora_15">
          <div class="divHora col-3">15:00 pm</div>
          <div class="citaInfoDia col"></div>
        </div>
        <div class="row row-cols-sm-4" id="tTCitasDiaHora_16">
          <div class="divHora col-3">16:00 pm</div>
          <div class="citaInfoDia col"></div>
        </div>
        <div class="row row-cols-sm-4" id="tTCitasDiaHora_17">
          <div class="divHora col-3">17:00 pm</div>
          <div class="citaInfoDia col"></div>
        </div>
        <div class="row row-cols-sm-4" id="tTCitasDiaHora_18">
          <div class="divHora col-3">18:00 pm</div>
          <div class="citaInfoDia col"></div>
        </div>
        <div class="row row-cols-sm-4" id="tTCitasDiaHora_19">
          <div class="divHora col-3">19:00 pm</div>
          <div class="citaInfoDia col"></div>
        </div>
        <div class="row row-cols-sm-4" id="tTCitasDiaHora_20">
          <div class="divHora col-3">20:00 pm</div>
          <div class="citaInfoDia col"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminConsultarCitas",
  data() {
    return {};
  },
};
</script>
