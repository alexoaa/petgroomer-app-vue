import { defineStore } from "pinia";
import axios from "axios";

export default defineStore("admin", {
  state: () => ({}),
  actions: {
    async getAppointmentDailyHistory(date) {
      try {
        let apptCounter = 0;
        let apptPendingCounter = 0;
        let apptCompletedCounter = 0;
        const axiosRequest = await axios.get(
          `https://us-central1-dogbarber-server.cloudfunctions.net/api/user/admin/appointments-daily-history?date-selected=${date}`,
          { withCredentials: true }
        );
        if (!axiosRequest.data.appointments)
          return {
            success: true,
            data: {
              schedule: axiosRequest.data.schedule,
              apptCounter,
              apptPendingCounter,
              apptCompletedCounter,
            },
            message: axiosRequest.data.message,
          };

        axiosRequest.data.appointments.forEach((appointment) => {
          const { appointment_time, appointment_state } = appointment;

          apptCounter++;
          if (appointment_state === "PENDIENTE") apptPendingCounter++;
          if (appointment_state === "COMPLETADA") apptPendingCounter++;

          if (
            Object.prototype.hasOwnProperty.call(
              axiosRequest.data.schedule,
              appointment_time
            )
          ) {
            axiosRequest.data.schedule[appointment_time].push(appointment);
          }
        });

        return {
          success: true,
          data: {
            schedule: axiosRequest.data.schedule,
            apptCounter,
            apptPendingCounter,
            apptCompletedCounter,
          },
        };
      } catch (axiosError) {
        if (axiosError.response)
          return { success: false, message: axiosError.response.data.message };
        else
          return {
            success: false,
            message: "Ha ocurrido un error, intenta mas tarde.",
          };
      }
    },
    async modifyAppointment(values) {
      try {
        const axiosRequest = await axios.patch(
          `https://us-central1-dogbarber-server.cloudfunctions.net/api/user/admin/modify-existing-appointment`,
          { values },
          { withCredentials: true }
        );
        if (axiosRequest.status === 200)
          return { success: true, message: axiosRequest.data.message };
      } catch (axiosError) {
        if (axiosError.response)
          return { success: false, message: axiosError.response.data.message };
        else
          return {
            success: false,
            message: "Ha ocurrido un error, intenta mas tarde.",
          };
      }
    },
  },
  persist: true,
});
