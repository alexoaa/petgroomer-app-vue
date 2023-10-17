import { defineStore } from "pinia";
import axios from "axios";

export default defineStore("user", {
  state: () => ({
    isAuth: false,
    isAdmin: false,
    isAuthenticating: false,
    userId: "",
    userName: "",
    userLastName: "",
    userPhone: "",
    userEmail: "",
    userRole: "",
  }),
  actions: {
    loadData(data) {
      this.userId = data.id;
      this.userName = data.name;
      this.userLastName = data.lastName;
      this.userRole = data.role;
      this.isAuth = data.isAuth;
      localStorage.isAuthenticated = this.isAuth;
      if (data.role === "admin") this.isAdmin = true;
    },
    async logout() {
      try {
        const axiosRequest = await axios.delete(
          "http://localhost:5600/logout",
          { withCredentials: true }
        );
        if (axiosRequest.status === 200) {
          this.resetData();
        }
      } catch (axiosError) {
        console.log(axiosError);
      }
    },
    resetData() {
      this.userId = "";
      this.userName = "";
      this.userLastName = "";
      this.userPhone = "";
      this.userEmail = "";
      this.userRole = "";
      this.isAuth = false;
      this.isAdmin = false;
      this.isAuthenticating = false;
      localStorage.removeItem("isAuthenticated");
      document.cookie = "connect.sid=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    },
    async login(values) {
      try {
        const axiosRequest = await axios.post(
          "http://localhost:5600/login",
          {
            email: values.email,
            password: values.password,
          },
          // In order to accept cookies from server, this option must be true and configured in the server
          { withCredentials: true }
        );
        //
        this.loadData(axiosRequest.data.data);
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
    async getUserAccountInfo() {
      try {
        const axiosRequest = await axios.get(
          "http://localhost:5600/user/info-account",
          { withCredentials: true }
        );
        if (axiosRequest.status === 200) {
          return { data: axiosRequest.data.data };
        }
      } catch (axiosError) {
        console.log(axiosError);
      }
    },
    async updateUserAccountInfo(values) {
      try {
        const axiosRequest = await axios.post(
          "http://localhost:5600/user/account/update-info",
          { values },
          { withCredentials: true }
        );
        setTimeout(() => {
          this.userName = values.name;
          this.userLastName = values.lastName;
          this.userPhone = values.phone;
        }, 4000);
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
    async changePassword(values) {
      try {
        const axiosRequest = await axios.post(
          "http://localhost:5600/user/account/password/change-password",
          {
            currentPassword: values.currentPassword,
            newPassword: values.newPassword,
            confirmPassword: values.confirmPassword,
          },
          { withCredentials: true }
        );
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
    async scheduleAppointment(values) {
      try {
        const axiosRequest = await axios.post(
          "http://localhost:5600/new-appointment",
          {
            user_name: values.nombreCliente,
            user_phone: values.numeroTelefono,
            user_second_phone: values.segundoNumTel || null,
            user_pet_name: values.nombreMascota,
            user_pet_specie: values.especieMascota,
            user_pet_breed: values.razaMascota || null,
            appointment_service: values.servicioMascota,
            appointment_price: values.precioCita || null,
            appointment_date: values.fechaCita,
            appointment_time: values.horaCita,
            appointment_comment: values.comentariosCita || null,
          },
          { withCredentials: true }
        );
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
    async getHourAvailability(dateSelected) {
      try {
        const axiosRequest = await axios.get(
          `http://localhost:5600/appointment-availability?date-selected=${dateSelected}`,
          { withCredentials: true }
        );
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
    async recoverPassword(values) {
      try {
        const axiosRequest = await axios.post(
          "http://localhost:5600/recover-password/email",
          {
            email: values.email,
          },
          { withCredentials: true }
        );
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
    async verifyResetLinkRequest(values) {
      try {
        const axiosRequest = await axios.get(
          `http://localhost:5600/recover-password/verify/${values.user}?t=${values.token}`,
          { withCredentials: true }
        );
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
    async resetPassword(values) {
      try {
        const axiosRequest = await axios.post(
          "http://localhost:5600/recover-password/reset",
          {
            token: values.token,
            user: values.user,
            newPassword: values.password,
            confirmPassword: values.confirmPassword,
          },
          { withCredentials: true }
        );
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
    async checkUpcomingAppointments() {
      console.log("checkUpcomingAppointments");
      try {
        const axiosRequest = await axios.get(
          `http://localhost:5600/user/upcoming-appointments`,
          { withCredentials: true }
        );
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
    async getAppointmentHistory(values) {
      console.log("getAppointmentHistory");
      return;
      try {
        const axiosRequest = await axios.get(
          `http://localhost:5600/get-appointments-history/${values.user}?t=${values.token}`,
          { withCredentials: true }
        );
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
});
