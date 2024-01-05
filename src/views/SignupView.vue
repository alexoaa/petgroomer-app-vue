<template>
  <section>
    <div class="form-container">
      <header>
        <router-link
          :to="{ name: 'login' }"
          tabindex="0"
          exact-active-class="view-active"
          text="Iniciar sesión"
          class="logo-image"
        />
        <router-link
          :to="{ name: 'signup' }"
          tabindex="0"
          exact-active-class="view-active"
          text="Registrarse"
          class="logo-image"
        />
      </header>
      <vee-form
        action="/register"
        class="form-cita"
        method="POST"
        :validation-schema="registerSchema"
        @submit="register"
      >
        <!-- Name -->
        <div class="relative my-2 w-full">
          <label class="block text-[var(--accent-color)] text-lg">Nombre</label>
          <div
            class="relative my-1.5 flex items-center w-full border-[2px] border-solid border-[var(--light-gray-color)] rounded-[6px] overflow-hidden"
          >
            <vee-field
              type="text"
              name="name"
              placeholder="Nombre..."
              class="leading-8 py-2.5 px-3 focus:outline-none w-full"
              autocomplete="off"
            />
          </div>
          <ErrorMessage
            name="name"
            class="text-[var(--red-color)]"
          ></ErrorMessage>
        </div>
        <!-- Last Name -->
        <div class="relative my-2 w-full">
          <label class="block text-[var(--accent-color)] text-lg"
            >Apellido</label
          >
          <div
            class="relative my-1.5 flex items-center w-full border-[2px] border-solid border-[var(--light-gray-color)] rounded-[6px] overflow-hidden"
          >
            <vee-field
              type="text"
              name="lastName"
              placeholder="Apellido..."
              class="leading-8 py-2.5 px-3 focus:outline-none w-full"
              autocomplete="off"
            />
          </div>
          <ErrorMessage
            name="lastName"
            class="text-[var(--red-color)]"
          ></ErrorMessage>
        </div>
        <!-- Phone -->
        <div class="relative my-2 w-full">
          <label class="block text-[var(--accent-color)] text-lg"
            >Teléfono</label
          >
          <div
            class="relative my-1.5 flex items-center w-full border-[2px] border-solid border-[var(--light-gray-color)] rounded-[6px] overflow-hidden"
          >
            <vee-field
              type="tel"
              name="phone"
              maxlength="10"
              placeholder="Teléfono..."
              class="leading-8 py-2.5 px-3 focus:outline-none w-full"
              autocomplete="email"
            />
          </div>
          <ErrorMessage
            name="phone"
            class="text-[var(--red-color)]"
          ></ErrorMessage>
        </div>
        <!-- Email -->
        <div class="relative my-2 w-full">
          <label class="block text-[var(--accent-color)] text-lg"
            >Correo electrónico</label
          >
          <div
            class="relative my-1.5 flex items-center w-full border-[2px] border-solid border-[var(--light-gray-color)] rounded-[6px] overflow-hidden"
          >
            <vee-field
              type="email"
              name="email"
              placeholder="Correo electrónico..."
              class="leading-8 py-2.5 px-3 focus:outline-none w-full"
              autocomplete="email"
            />
          </div>
          <ErrorMessage
            name="email"
            class="text-[var(--red-color)]"
          ></ErrorMessage>
        </div>
        <!-- Password -->
        <div class="relative my-2 w-full">
          <label class="block text-[var(--accent-color)] text-lg"
            >Contraseña</label
          >
          <vee-field name="password" :bails="false" v-slot="{ field, errors }">
            <div
              class="relative my-1.5 flex items-center w-full pr-3 border-[2px] border-solid border-[var(--light-gray-color)] rounded-[6px] overflow-hidden"
            >
              <input
                :type="passFieldType"
                v-bind="field"
                placeholder="Contraseña..."
                class="leading-8 py-2.5 px-3 focus:outline-none w-full px-3"
              />
              <div id="togglePass" @click="togglePass()" class="cursor-pointer">
                <svg
                  class="w-[25px] h-[25px] fill-[var(--text-color)]"
                  v-if="this.passFieldType === 'text'"
                >
                  <use href="/icons/icons.svg#eye" />
                </svg>
                <svg class="w-[25px] h-[25px] fill-[var(--text-color)]" v-else>
                  <use href="/icons/icons.svg#eye-slash" />
                </svg>
              </div>
            </div>
            <div
              class="text-[var(--red-color)]"
              v-for="error in errors"
              :key="error"
            >
              {{ error }}
            </div>
          </vee-field>
        </div>
        <!-- Confirm Password -->
        <div class="relative my-2 w-full">
          <label class="block text-[var(--accent-color)] text-lg"
            >Confirmar contraseña</label
          >
          <div
            class="relative my-1.5 flex items-center w-full pr-3 border-[2px] border-solid border-[var(--light-gray-color)] rounded-[6px] overflow-hidden"
          >
            <vee-field
              :type="confPassFieldType"
              name="confirmPassword"
              placeholder="Confirmar contraseña..."
              class="leading-8 py-2.5 px-3 focus:outline-none w-full px-3"
            />

            <div
              id="toggleConfPass"
              @click="togglePassConf()"
              class="cursor-pointer"
            >
              <svg
                class="w-[25px] h-[25px] fill-[var(--text-color)]"
                v-if="this.confPassFieldType === 'text'"
              >
                <use href="/icons/icons.svg#eye" />
              </svg>
              <svg class="w-[25px] h-[25px] fill-[var(--text-color)]" v-else>
                <use href="/icons/icons.svg#eye-slash" />
              </svg>
            </div>
          </div>
          <ErrorMessage
            name="confirmPassword"
            class="text-[var(--red-color)]"
          ></ErrorMessage>
        </div>
        <!-- ToS -->
        <div class="mb-3 pl-6 pt-2 w-full">
          <vee-field
            type="checkbox"
            name="tos"
            id="tos"
            value="1"
            class="w-4 h-4 float-left -ml-6 mt-1 rounded"
          />
          <label for="tos" class="inline-block cursor-pointer"
            >Acepto los
            <a href="#tos" class="text-[var(--accent-color)]"
              >terminos del servicio.</a
            ></label
          >
        </div>
        <ErrorMessage name="tos" class="text-[var(--red-color)]"></ErrorMessage>

        <!-- Register button -->
        <div class="submit-container">
          <button
            type="submit"
            id="btnSignup"
            class="btn-primary"
            :disabled="userIsBeingRegistered"
          >
            <span
              v-if="!userIsBeingRegistered"
              class="text-[var(--text-color)] font-bold"
            >
              Registrarse
            </span>
            <div
              v-else
              class="border-t-transparent border-solid animate-spin-slow rounded-full border-[var(--white-text-color)] border-[4px] h-[36px] w-[36px] mx-auto"
            />
          </button>
          <div class="error-message">
            {{ responseError }}
          </div>
          <div class="form-divisor" />
          <p>
            ¿Ya tienes una cuenta?
            <router-link
              :to="{ name: 'login' }"
              text="Iniciar sesión"
              tabindex="0"
              class="text-[var(--main-color)] hover:text-[var(--main-color)]"
            />
          </p>
        </div>
      </vee-form>
    </div>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { useUserStore } from "@/stores/user.js";
import router from "@/router";

export default {
  name: "RegisterForm",
  data() {
    return {
      passFieldType: "password",
      confPassFieldType: "password",
      registerSchema: {
        name: "required|alphaSpaces|min:3|max:100",
        lastName: "required|alphaSpaces|min:3|max:100",
        phone: "required|integer|min:10|max:10",
        email: "required|email",
        password: "required|min:9|excluded:password",
        confirmPassword: "passwords_mismatch:@password",
        tos: "tos",
      },
      responseError: "",
      userIsBeingRegistered: false,
    };
  },
  methods: {
    async register(values) {
      this.userIsBeingRegistered = true;
      const registerRequest = await this.userStore.register(values);
      if (!registerRequest.success)
        this.responseError = registerRequest.message;
      else router.push("/");
      this.userIsBeingRegistered = false;
    },
    togglePass() {
      this.passFieldType =
        this.passFieldType === "password" ? "text" : "password";
    },
    togglePassConf() {
      this.confPassFieldType =
        this.confPassFieldType === "text" ? "password" : "text";
    },
  },
  computed: {
    ...mapStores(useUserStore),
  },
};
</script>

<style scoped lang="scss">
.form-container {
  padding: 70px 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 500px;
  margin: 0 auto;
  header {
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 320px;
    margin-bottom: 40px;
    box-shadow: 0 4px 6px 1px var(--light-gray-color);
    border-radius: 6px;
    overflow: hidden;
    a {
      padding: 10px 20px;
      position: relative;
      width: 100%;
      font-weight: 500;
      text-align: center;
      &:hover {
        cursor: pointer;
        color: var(--main-color);
      }
    }
  }
}
.btn-primary {
  width: 100%;
}
.view-active {
  background: var(--main-color);
  color: var(--white-text-color);
}
@media screen and (min-width: 768px) {
  .form-container {
    padding-top: 90px;
  }
}
</style>
