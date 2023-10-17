<template>
  <div class="wrapper">
    <div class="form-container">
      <h1>Registrarse</h1>
      <vee-form
        action="/register"
        class="form-cita"
        method="POST"
        :validation-schema="registerSchema"
        @submit="register"
      >
        <!-- Name -->
        <div class="relative my-2 w-full">
          <label class="block text-[var(--dark-accent-color)] text-lg"
            >Nombre</label
          >
          <div
            class="relative my-1.5 flex items-center w-full px-3 border border-solid border-[var(--light-gray-color)] rounded"
          >
            <vee-field
              type="text"
              name="name"
              placeholder="Nombre..."
              class="leading-8 py-2.5 focus:outline-none w-full"
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
          <label class="block text-[var(--dark-accent-color)] text-lg"
            >Apellido</label
          >
          <div
            class="relative my-1.5 flex items-center w-full px-3 border border-solid border-[var(--light-gray-color)] rounded"
          >
            <vee-field
              type="text"
              name="lastName"
              placeholder="Apellido..."
              class="leading-8 py-2.5 focus:outline-none w-full"
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
          <label class="block text-[var(--dark-accent-color)] text-lg"
            >Teléfono</label
          >
          <div
            class="relative my-1.5 flex items-center w-full px-3 border border-solid border-[var(--light-gray-color)] rounded"
          >
            <vee-field
              type="tel"
              name="phone"
              maxlength="10"
              placeholder="Teléfono..."
              class="leading-8 py-2.5 focus:outline-none w-full"
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
          <label class="block text-[var(--dark-accent-color)] text-lg"
            >Correo electrónico</label
          >
          <div
            class="relative my-1.5 flex items-center w-full px-3 border border-solid border-[var(--light-gray-color)] rounded"
          >
            <vee-field
              type="email"
              name="email"
              placeholder="Correo electrónico..."
              class="leading-8 py-2.5 focus:outline-none w-full"
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
          <label class="block text-[var(--dark-accent-color)] text-lg"
            >Contraseña</label
          >
          <vee-field name="password" :bails="false" v-slot="{ field, errors }">
            <div
              class="relative my-1.5 flex items-center w-full pr-3 border border-solid border-[var(--light-gray-color)] rounded"
            >
              <input
                :type="passFieldType"
                v-bind="field"
                placeholder="Contraseña..."
                class="leading-8 py-2.5 focus:outline-none w-full px-3"
              />
              <div id="togglePass" @click="togglePass()" class="cursor-pointer">
                <svg
                  class="w-[25px] h-[25px] fill-[var(--text-color)]"
                  v-if="this.passFieldType === 'text'"
                >
                  <use href="@/assets/icons/icons.svg#eye" />
                </svg>
                <svg class="w-[25px] h-[25px] fill-[var(--text-color)]" v-else>
                  <use href="@/assets/icons/icons.svg#eye-slash" />
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
          <label class="block text-[var(--dark-accent-color)] text-lg"
            >Confirmar contraseña</label
          >
          <div
            class="relative my-1.5 flex items-center w-full pr-3 border border-solid border-[var(--light-gray-color)] rounded"
          >
            <vee-field
              :type="confPassFieldType"
              name="confirmPassword"
              placeholder="Confirmar contraseña..."
              class="leading-8 py-2.5 focus:outline-none w-full px-3"
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
                <use href="@/assets/icons/icons.svg#eye" />
              </svg>
              <svg class="w-[25px] h-[25px] fill-[var(--text-color)]" v-else>
                <use href="@/assets/icons/icons.svg#eye-slash" />
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
            <a href="#tos" class="text-[var(--dark-accent-color)]"
              >terminos del servicio.</a
            ></label
          >
        </div>
        <ErrorMessage name="tos" class="text-[var(--red-color)]"></ErrorMessage>

        <!-- Register button -->
        <div class="submit-container">
          <button type="submit" id="btnRegistrar" class="btn-submit">
            Registrarse
          </button>
          <div class="error-message">
            {{ responseError }}
          </div>
        </div>
      </vee-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapStores, mapActions } from "pinia";
import useUserStore from "@/stores/user.js";
import useGeneralVariablesStore from "@/stores/generalVariables";

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
    };
  },
  methods: {
    async register(values) {
      try {
        const axiosRequest = await axios.post(
          "http://localhost:5600/register",
          {
            name: values.name,
            lastName: values.lastName,
            phone: values.phone,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            tos: values.tos,
          }
        );
        //TODO - LOGEAR CUANDO SE REGISTRE
        console.log(axiosRequest.data.message);
        //Passing values to the store action to assign user data

        this.assignData(axiosRequest.data.data);
        if (axiosRequest.status === 200) {
          this.userStore.isAuthenticating = true;
          setTimeout(() => {
            this.userStore.isAuth = true;
            this.userStore.isAuthenticating = false;
            this.closeAuthModal();
          }, 3000);
        }
      } catch (axiosError) {
        this.responseError = axiosError.response.data.message;
        console.log(axiosError.response.data);
      }
    },
    togglePass() {
      this.passFieldType =
        this.passFieldType === "password" ? "text" : "password";
    },
    togglePassConf() {
      this.confPassFieldType =
        this.confPassFieldType === "text" ? "password" : "text";
    },
    ...mapActions(useUserStore, { assignData: "loadData" }),
    ...mapActions(useGeneralVariablesStore, {
      closeAuthModal: "closeAuthModal",
    }),
  },
  computed: {
    ...mapStores(useUserStore),
  },
};
</script>
