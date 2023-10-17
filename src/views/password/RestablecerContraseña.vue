<template>
  <div class="wrapper">
    <div class="form-container">
      <div class="recov-form-container">
        <h2>Restablece tu contraseña</h2>
        <div v-if="success">
          <div class="div-recover text-left">
            Ingresa tu nueva contraseña y al finalizar te enviaremos de vuelta
            para iniciar sesión.
          </div>
          <vee-form
            action="/register"
            class="form-cita text-left"
            method="POST"
            :validation-schema="resetPassSchema"
            @submit="resetPass"
          >
            <!-- Password -->
            <div class="relative my-2 w-full">
              <label class="block text-sky-600 text-lg">Contraseña</label>
              <vee-field
                name="password"
                :bails="false"
                v-slot="{ field, errors }"
              >
                <div
                  class="relative my-1.5 flex items-center w-full px-3 border border-solid border-[#CBCFD8] rounded"
                >
                  <input
                    :type="passFieldType"
                    v-bind="field"
                    placeholder="Contraseña..."
                    class="leading-8 py-2.5 focus:outline-none w-full"
                  />
                  <div
                    id="togglePass"
                    @click="togglePass()"
                    class="hover:cursor-pointer"
                  >
                    <i
                      class="fa-regular fa-eye toggle-seg-num"
                      v-if="this.passFieldType === 'text'"
                    ></i>
                    <i class="fa-regular fa-eye-slash" v-else></i>
                  </div>
                </div>
                <div class="text-red-600" v-for="error in errors" :key="error">
                  {{ error }}
                </div>
              </vee-field>
            </div>

            <!-- Confirm Password -->
            <div class="relative my-2 w-full">
              <label class="block text-sky-600 text-lg"
                >Confirmar contraseña</label
              >
              <div
                class="relative my-1.5 flex items-center w-full px-3 border border-solid border-[#CBCFD8] rounded"
              >
                <vee-field
                  :type="confPassFieldType"
                  name="confirmPassword"
                  placeholder="Confirmar contraseña..."
                  class="leading-8 py-2.5 focus:outline-none w-full"
                />

                <div
                  id="toggleConfPass"
                  @click="togglePassConf()"
                  class="hover:cursor-pointer"
                >
                  <i
                    class="fa-regular fa-eye toggle-seg-num"
                    v-if="this.confPassFieldType === 'text'"
                  ></i>
                  <i class="fa-regular fa-eye-slash" v-else></i>
                </div>
              </div>
              <ErrorMessage
                name="confirmPassword"
                class="text-red-600"
              ></ErrorMessage>
            </div>

            <!-- Register button -->

            <div class="submit-container">
              <button type="submit" id="btnResetPass" class="btn-submit">
                Restablecer contraseña
              </button>
              <div class="error-message">
                <span>{{ responseError }}</span>
              </div>
            </div>
          </vee-form>
        </div>
        <div v-else>
          <div class="form-cita-recov mb-6">
            <div class="div-recover text-left">
              El enlace es inválido, probablemente porque ya fue usado, por
              favor haz un nuevo cambio de contraseña.
            </div>
            <router-link
              :to="{ name: 'home' }"
              class="a-login"
              text="< Regresar a inicio de sesión"
              @click="openAuthModal"
            ></router-link>
          </div>
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
  name: "RestablecerContraseña",
  data() {
    return {
      passFieldType: "password",
      confPassFieldType: "password",
      resetPassSchema: {
        password: "required|min:9|excluded:password",
        confirmPassword: "passwords_mismatch:@password",
      },
      responseError: "",
      success: null,
    };
  },
  props: ["user"],
  computed: {},
  methods: {
    togglePass() {
      this.passFieldType =
        this.passFieldType === "password" ? "text" : "password";
    },
    togglePassConf() {
      this.confPassFieldType =
        this.confPassFieldType === "text" ? "password" : "text";
    },
    async resetPass(values) {
      console.log(values);
      values.user = this.user;
      values.token = this.$route.query.t;
      const resetPasswordRequest = await this.resetPassword(values);
      console.log(resetPasswordRequest);
    },
    ...mapActions(useUserStore, {
      verifyResetLinkRequest: "verifyResetLinkRequest",
    }),
    ...mapActions(useModalsStore, { openAuthModal: "openAuthModal" }),
    ...mapActions(useUserStore, { resetPassword: "resetPassword" }),
  },
  async beforeMount() {
    const verifyDataRequest = await this.verifyResetLinkRequest({
      user: this.user,
      token: this.$route.query.t,
    });
    this.success = verifyDataRequest.success;
  },
};
</script>

<style scoped>
.a-login {
  color: var(--dark-accent-color);
  font-weight: bold;
  letter-spacing: 0.6px;
  font-size: 1.1em;
  margin-top: 15px;
}
</style>
