<template>
  <div class="wrapper">
    <div class="form-container">
      <div class="recover-pass-form-container">
        <h2>Restablece tu contraseña</h2>
        <vee-form
          class="form-recover-pass"
          action="/recover"
          :validation-schema="recoverSchema"
          @submit="recoverPass"
          v-if="!confirmationNotification && !waitingResponse"
        >
          <div class="div-text-recover-pass">
            <p>
              Ingresa tu correo electrónico o número de celular para buscar tu
              cuenta.
            </p>
          </div>

          <!-- Email -->
          <div class="input-recover-pass">
            <vee-field
              type="email"
              name="email"
              tabindex="0"
              placeholder="Correo electronico..."
              class="leading-8 py-2.5 focus:outline-none w-full"
              autocomplete="email"
            />
            <ErrorMessage name="email" class="error-message" />
          </div>
          <div class="error-message">
            {{ this.responseError }}
          </div>
          <div class="submit-container-recover-pass">
            <router-link
              :to="{ name: 'home' }"
              tabindex="0"
              text="Cancelar"
              exact-active-class="no-active"
              @click="openAuthModal"
              class="btn-terciary-small"
              id="btnCancelar"
            />
            <button
              id="btnAceptar"
              class="btn-submit-small"
              type="submit"
              tabindex="0"
            >
              Aceptar
            </button>
          </div>
        </vee-form>
        <div
          class="form-recover-pass"
          v-else-if="confirmationNotification && !waitingResponse"
        >
          <div class="div-text-recover-pass">
            <p class="confirmation-message">
              {{ confirmationMessage }}
            </p>
          </div>
          <div class="submit-container-recover-pass">
            <router-link
              :to="{ name: 'home' }"
              tabindex="0"
              text="Iniciar sesion"
              exact-active-class="no-active"
              class="btn-aceptar"
              id="btnCancelar"
            />
          </div>
        </div>
        <div class="form-recover-pass w-full" v-if="waitingResponse">
          <video id="myVideo" autoplay loop>
            <source src="@/assets/icons/loading_paw.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import useModalsStore from "@/stores/modalsStore";
import useUserStore from "@/stores/user";

export default {
  name: "RecuperarContraseña",
  data() {
    return {
      recoverSchema: {
        email: "required|email",
      },
      responseError: "",
      confirmationMessage: "",
      confirmationNotification: false,
      waitingResponse: false,
    };
  },
  methods: {
    async recoverPass(values) {
      this.waitingResponse = true;
      const recoverRequest = await this.recoverPassword(values);
      this.waitingResponse = false;
      if (!recoverRequest.success) this.responseError = recoverRequest.message;
      else {
        this.confirmationNotification = false;
        this.confirmationMessage = recoverRequest.message;
      }
      console.log(recoverRequest);
    },
    ...mapActions(useModalsStore, { closeAuthModal: "closeAuthModal" }),
    ...mapActions(useModalsStore, { openAuthModal: "openAuthModal" }),
    ...mapActions(useUserStore, { recoverPassword: "recoverPassword" }),
  },
};
</script>

<style lang="scss">
.recover-pass-form-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 50px 20px 0;
  max-width: 500px;
  justify-self: center;
  text-align: center;
  h2 {
    font-size: 2rem;
  }
  .form-recover-pass {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    position: relative;
    max-width: 500px;
  }
  .submit-container-recover-pass {
    width: 100%;
    border-top: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 0 0 8px 8px;
    padding: 16px;
    padding-right: 0;
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    a,
    button {
      margin-left: 8px;
    }
  }

  .div-text-recover-pass {
    width: 100%;
    margin: 20px 0;
  }

  .input-recover-pass {
    width: 100%;
    text-align: left;
    input {
      position: relative;
      margin: 0.8em 0;
      padding: 10px 15px;
      display: flex;
      align-items: center;
      border: 1px solid rgba(100, 100, 100, 1);
      border-radius: 5px;
      letter-spacing: 1px;
    }
  }
}
.confirmation-message {
  letter-spacing: 0.2px;
  line-height: 20px;
  font-size: 1em;
  text-align: justify;
  word-wrap: break-word;
}
</style>
