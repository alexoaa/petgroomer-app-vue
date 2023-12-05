<template>
  <div id="calendar" class="calendar" ref="calendarAppointment"></div>
</template>

<script setup>
import { onClickOutside } from "@vueuse/core";
import { onMounted, ref } from "vue";

// JS Script
import VanillaCalendar from "@uvarov.frontend/vanilla-calendar";

// Basic styles
import "@uvarov.frontend/vanilla-calendar/build/vanilla-calendar.min.css";

// Additional styles
import "@uvarov.frontend/vanilla-calendar/build/themes/light.min.css";
// import "@uvarov.frontend/vanilla-calendar/build/themes/dark.min.css";

const calendarAppointment = ref(null);
const emit = defineEmits(["datePicked", "closeCalendar"]);
const props = defineProps(["isAdmin", "onClickOutsideNeeded"]);

const returnDate = (date) => {
  date = date[0].split("-");
  date = `${date[2]}/${date[1]}/${date[0]}`;
  emit("datePicked", date);
};

onMounted(() => {
  const today = new Date();
  let dateToDisplay = today;
  let year = today.getFullYear();
  let month = String(today.getMonth() + 1).padStart(2, "0");
  let day = String(today.getDate()).padStart(2, "0");
  const currentTimeOptions = {
    timeZone: "America/Mexico_City",
    hour: "2-digit",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  };
  const currentTime = new Date().toLocaleTimeString([], currentTimeOptions);
  const currentHour = currentTime.split(":")[0];

  if (currentHour > 18) {
    today.setDate(today.getDate() + 1);

    year = dateToDisplay.getFullYear();
    month = String(dateToDisplay.getMonth() + 1).padStart(2, "0");
    day = String(dateToDisplay.getDate()).padStart(2, "0");
  }

  const formattedDate = `${year}-${month}-${day}`;

  // Options for calendar
  const options = {
    date: {
      min: props.isAdmin ? "" : formattedDate,
      max: "2038-12-31",
    },
    settings: {
      range: {
        min: props.isAdmin ? "" : formattedDate,
        max: "2038-12-31",
      },
      visibility: {
        disabled: true,
        theme: "light",
      },
      lang: "define",
    },
    locale: {
      months: [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
      ],
      weekday: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
    },
    actions: {
      clickDay: (event, dates) => {
        emit("closeCalendar");
        returnDate(dates);
      },
    },
  };

  const calendar = new VanillaCalendar("#calendar", options);
  calendar.init();
  if (props.onClickOutsideNeeded) {
    onClickOutside(calendarAppointment, (e) => {
      emit("closeCalendar");
      e.stopPropagation(); // Stops bug when clicking in the button to close it, it reopens
    });
  }
});
</script>
<style scoped>
[data-calendar-theme="light"].vanilla-calendar {
  box-shadow: 0 0 5px 2px var(--light-gray-color);
}
</style>
