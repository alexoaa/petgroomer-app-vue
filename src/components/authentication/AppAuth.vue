<template>
  <div class="fixed z-[100] inset-0 overflow-y-auto pt-4 px-4 pb-16" id="modal">
    <div
      class="flex items-center justify-center min-h-screen text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="py-5 text-left px-6" ref="modalTarget">
          <div v-if="!this.userStore.isAuthenticating">
            <!--Title-->
            <div class="flex justify-between items-center pb-4">
              <p class="text-3xl font-bold">Tu Cuenta</p>

              <!-- Modal Close Button -->
              <div
                class="cursor-pointer z-50 w-[30px] h-[30px] hover:opacity-80"
                @click="this.AuthModalIsOpen = false"
              >
                <svg class="fill-[var(--text-color)] w-full h-full">
                  <use href="@/assets/icons/icons.svg#cross" />
                </svg>
              </div>
            </div>

            <!-- Tabs -->
            <ul class="flex flex-wrap mb-4">
              <li class="flex-auto text-center w-1/2">
                <a
                  class="block rounded py-3 px-4 transition"
                  href="#"
                  @click.prevent="tab = 'login'"
                  :class="{
                    'hover:text-[var(--dark-text-color)] text-[var(--dark-text-color)] bg-[var(--dark-accent-color)] font-semibold':
                      tab === 'login',
                    'hover:text-[var(--dark-accent-color)] hover:font-semibold':
                      tab === 'register',
                  }"
                  >Iniciar Sesión</a
                >
              </li>
              <li class="flex-auto text-center w-1/2">
                <a
                  class="block rounded py-3 px-4 transition"
                  href="#"
                  @click.prevent="tab = 'register'"
                  :class="{
                    'hover:text-[var(--dark-text-color)] text-[var(--dark-text-color)] bg-[var(--dark-accent-color)] font-semibold':
                      tab === 'register',
                    'hover:text-[var(--dark-accent-color)] hover:font-semibold':
                      tab === 'login',
                  }"
                  >Registrarse</a
                >
              </li>
            </ul>

            <!-- The submit event will do 2 things, it'll enforce the validation before running the function we have in the expression. If the validation fails in any of the fields, it will not run the expression.
          Secondly, it'll prevent the page from refreshing when the form is submitted. -->
            <Transition
              enter-active-class="animate__animated animate__fadeInLeft"
              leave-active-class="animate__animated animate__fadeOutRight"
              mode="out-in"
              :duration="300"
            >
              <!-- Login Form -->
              <AuthLoginForm v-if="tab === 'login'"></AuthLoginForm>
              <!-- Registration Form -->
              <AuthRegisterForm v-else></AuthRegisterForm>
            </Transition>
          </div>
          <!-- Loading div -->
          <div v-else class="py-4">
            <div class="w-full flex justify-center mb-4">
              <div
                class="border-t-transparent border-solid animate-spin-slow rounded-full border-[var(--dark-accent-color)] border-[4px] h-[3rem] w-[3rem] mb-4"
              ></div>
            </div>
            <div>
              <h1
                class="text-[var(--dark-accent-color)] font-semibold text-[1.1rem] text-center"
              >
                Te has registrado correctamente, espera mientras te ingresamos y
                redirigimos a la página de inicio.
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapWritableState, mapStores } from "pinia";
import useGeneralVariablesStore from "@/stores/generalVariables";
import useUserStore from "@/stores/user";

import AuthLoginForm from "./LoginForm.vue";
import AuthRegisterForm from "./RegisterForm.vue";
import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

export default {
  name: "AppAuth",
  components: {
    AuthLoginForm,
    AuthRegisterForm,
  },
  data() {
    return {
      tab: "login",
    };
  },
  computed: {
    ...mapWritableState(useGeneralVariablesStore, ["AuthModalIsOpen"]),
    ...mapStores(useUserStore),
  },
  mounted() {
    const modalTarget = ref(this.$refs.modalTarget);
    onClickOutside(modalTarget, () => {
      this.AuthModalIsOpen = false;
    });
  },
};
</script>

<style scoped>
.animate__animated.animate__fadeInLeft,
.animate__animated.animate__fadeOutRight {
  --animate-duration: 400ms;
}
</style>
