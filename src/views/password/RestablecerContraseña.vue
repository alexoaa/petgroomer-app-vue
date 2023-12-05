<template>
  <div class="mt-[60px] flex justify-center">
    <div class="recov-form-container">
      <div v-if="success" class="valid-link">
        <div v-if="!passResetSuccess">
          <h1>Restablece tu contraseña</h1>
          <h2>
            Ingresa tu nueva contraseña y al finalizar te enviaremos de vuelta
            para iniciar sesión.
          </h2>
          <vee-form
            action="/register"
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
        <div v-else class="my-[100px] flex justify-center flex-wrap">
          <h1 class="mb-[50px]">
            {{ responseError }}
          </h1>
          <router-link
            :to="{ name: 'login' }"
            tabindex="0"
            text="Iniciar sesion"
            exact-active-class="no-active"
            class="btn-primary"
          />
        </div>
      </div>
      <div v-else class="invalid-link">
        <div>
          El enlace es inválido, probablemente porque ya fue usado, por favor
          haz un nuevo cambio de contraseña.
        </div>
        <router-link
          :to="{ name: 'login' }"
          class="a-login"
          text="< Regresar a inicio de sesión"
        ></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "pinia";
import { useUserStore } from "@/stores/user";

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
      passResetSuccess: false,
    };
  },
  props: ["user"],
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
      values.user = this.user;
      values.token = this.$route.query.t;
      const resetPasswordRequest = await this.resetPassword(values);
      if (resetPasswordRequest.success) {
        this.passResetSuccess = resetPasswordRequest.success;
      }
      this.responseError = resetPasswordRequest.message;
    },
    ...mapActions(useUserStore, {
      verifyResetLinkRequest: "verifyResetLinkRequest",
    }),
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

<style scoped lang="scss">
.recov-form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 600px;

  .valid-link {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 40px;
    h1 {
      font-size: 1.5rem;
      font-weight: 500;
    }
    h2 {
      margin: 20px 0;
    }
    form {
    }
  }
  .invalid-link {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 40px 10px;
    div {
      margin-bottom: 30px;
    }
  }
}
.a-login {
  color: var(--dark-accent-color);
  font-weight: 600;
  font-size: 1.1em;
  margin-top: 15px;
  &:hover {
    font-weight: 900;
  }
}
</style>
