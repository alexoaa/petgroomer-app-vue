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
        action="/login"
        class="form-cita"
        :validation-schema="loginSchema"
        @submit="loginUser"
      >
        <!-- Email -->
        <div class="relative my-2 w-full">
          <label class="block text-[var(--accent-color)] text-lg"
            >Correo electronico</label
          >
          <div
            class="relative my-1.5 flex items-center w-full border-[2px] border-solid border-[var(--light-gray-color)] rounded-[6px] overflow-hidden"
          >
            <vee-field
              type="email"
              name="email"
              placeholder="Correo electronico..."
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
          <div
            class="relative my-1.5 flex items-center w-full pr-3 border-[2px] border-solid border-[var(--light-gray-color)] rounded-[6px] overflow-hidden"
          >
            <vee-field
              :type="passFieldType"
              name="password"
              placeholder="Contraseña..."
              autocomplete="password"
              class="leading-8 py-2.5 focus:outline-none w-full px-3"
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
          <ErrorMessage
            name="password"
            class="text-[var(--red-color)]"
          ></ErrorMessage>
        </div>
        <!-- Login button -->
        <div class="submit-container">
          <button
            type="submit"
            class="btn-primary"
            :disabled="userIsBeingLoggedIn"
            :class="{ 'btn-disabled': userIsBeingLoggedIn }"
          >
            <span
              v-if="!userIsBeingLoggedIn"
              class="text-[var(--text-color)] font-bold"
            >
              Iniciar sesión
            </span>
            <div
              v-else
              class="border-t-transparent border-solid animate-spin-slow rounded-full border-[var(--white-text-color)] border-[4px] h-[36px] w-[36px] mx-auto"
            />
          </button>
          <div class="error-message">
            {{ responseError }}
          </div>
          <router-link
            :to="{ name: 'recuperarContraseña' }"
            text="¿Olvidaste tu contraseña?"
            tabindex="0"
            class="text-[var(--accent-color)] hover:text-[var(--accent-color-100)] my-[18px]"
          />
          <div class="form-divisor" />
          <p class="text-center">
            ¿No tienes una cuenta?
            <router-link
              :to="{ name: 'signup' }"
              text="Crear una cuenta"
              tabindex="0"
              class="text-[var(--main-color)] hover:text-[var(--secondary-color)]"
            />
          </p>
        </div>
      </vee-form>
    </div>
  </section>
</template>

<script>
import { mapStores, mapActions } from "pinia";
import { useUserStore } from "@/stores/user";
import router from "@/router";

export default {
  name: "LoginForm",
  data() {
    return {
      passFieldType: "password",
      loginSchema: {
        email: "required|email",
        password: "required",
      },
      responseError: "",
      userIsBeingLoggedIn: false,
    };
  },
  methods: {
    async loginUser(values) {
      this.userIsBeingLoggedIn = true;
      this.responseError = "";
      const loginRequest = await this.userStore.login(values);
      if (!loginRequest.success) this.responseError = loginRequest.message;
      else if (loginRequest.isAdmin) router.push("/admin/home");
      else router.push("/");
      this.userIsBeingLoggedIn = false;
    },
    togglePass() {
      this.passFieldType =
        this.passFieldType === "password" ? "text" : "password";
    },
    ...mapActions(useUserStore, { loadData: "loadData" }),
    ...mapActions(useUserStore, { login: "login" }),
  },
  computed: {
    ...mapStores(useUserStore),
  },
};
</script>

<style scoped lang="scss">
section {
  padding: 70px 0;
}
.form-container {
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
  section {
  }
  .form-container {
    padding: 60px 0;
  }
}
</style>
