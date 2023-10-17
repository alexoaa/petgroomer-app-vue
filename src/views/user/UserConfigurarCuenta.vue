<template>
  <section class="flex justify-center h-screen">
    <aside class="cuenta-aside hidden py-10 px-6">
      <div class="user-name">
        <span class="text-lg">Bienvenido</span>
        <span class="text-2xl font-semibold">
          {{ this.fullName }}
        </span>
        <span class="text-sm" v-if="this.userStore.isAdmin">*Admin</span>
        <span class="text-sm">Spetiembre 01, 2022 - 9:54 am</span>
      </div>
      <ul>
        <li>
          <div class="li-item">
            <router-link to="">Informacion de tu cuenta</router-link>
          </div>
        </li>
        <li class="bottom-sidebar-btn">
          <div class="li-item">
            <button type="button" @click="this.closeSession()">
              Cerrar sesión
            </button>
          </div>
        </li>
      </ul>
    </aside>
    <section class="info-cuenta-form">
      <vee-form
        class="account-form"
        :validation-schema="accountInfoSchema"
        @submit="updateAccountInfo"
      >
        <h1 class="block font-bold text-xl mb-6">Información de tu cuenta</h1>
        <ul>
          <!-- Name -->
          <li class="relative my-4 w-full">
            <label
              class="block text-[var(--dark-accent-color)] text-lg"
              for="name"
              >Nombre</label
            >
            <div
              class="relative my-1.5 flex items-center w-full border border-solid border-[var(--light-gray-color)] rounded overflow-hidden"
            >
              <vee-field
                type="text"
                name="name"
                v-model="name"
                placeholder="Nombre"
                class="leading-8 py-2 focus:outline-none w-full px-3"
                autocomplete="off"
              />
            </div>
            <ErrorMessage name="name" class="error-message"></ErrorMessage>
          </li>
          <!-- LastName -->
          <li class="relative my-4 w-full">
            <label
              class="block text-[var(--dark-accent-color)] text-lg"
              for="lastName"
              >Apellido</label
            >
            <div
              class="relative my-1.5 flex items-center w-full border border-solid border-[var(--light-gray-color)] rounded overflow-hidden"
            >
              <vee-field
                type="text"
                name="lastName"
                v-model="lastName"
                placeholder="Apellido"
                class="leading-8 py-2 focus:outline-none w-full px-3"
                autocomplete="off"
              />
            </div>
            <ErrorMessage name="lastName" class="error-message"></ErrorMessage>
          </li>

          <!-- Email -->
          <li class="relative my-4 w-full">
            <label
              class="block text-[var(--dark-accent-color)] text-lg"
              for="email"
              >Correo electrónico</label
            >
            <div
              class="relative my-1.5 flex items-center w-full px-3 border border-solid border-[var(--light-gray-color)] rounded bg-[var(--light-gray-color-100)]"
            >
              <span class="leading-8 py-2 focus:outline-none w-full">{{
                email
              }}</span>
            </div>
          </li>

          <!-- Phone -->
          <li class="relative my-4 w-full">
            <label
              class="block text-[var(--dark-accent-color)] text-lg"
              for="phone"
              >Teléfono</label
            >
            <div
              class="relative my-1.5 flex items-center w-full border border-solid border-[var(--light-gray-color)] rounded overflow-hidden"
            >
              <vee-field
                type="tel"
                name="phone"
                maxlength="10"
                v-model="phone"
                placeholder="Teléfono"
                class="leading-8 py-2 focus:outline-none w-full px-3"
              />
            </div>
            <ErrorMessage name="phone" class="error-message"></ErrorMessage>
          </li>
          <!-- Save button -->
          <div class="submit-container">
            <button type="submit" id="btnGuardar" class="btn-submit w-full">
              Guardar
            </button>
          </div>
        </ul>
        <div class="mt-3">
          <span
            class="text-[var(--dark-accent-color)] font-semibold text-lg hover:cursor-pointer hover:text-[var(--dark-accent-color-100)]"
            @click="changePassword"
            >Cambiar contraseña</span
          >
        </div>
      </vee-form>
    </section>
  </section>
  <!-- Modal for save changes confirmation -->
  <div
    class="fixed z-[100] inset-0 overflow-hidden pt-4 px-4 pb-16"
    v-if="bgConfirmationModalIsOpen"
  >
    <div
      class="flex items-center justify-center min-h-screen text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div
          class="absolute inset-0 bg-[var(--lighter-main-color)] opacity-75"
        ></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <div
        class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle"
      >
        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <Transition
          enter-active-class="animate__animated animate__bounceIn"
          leave-active-class="animate__animated animate__bounceOut"
        >
          <ConfirmationModal
            v-if="this.modalsStore.ConfirmationModalIsOpen"
            :responseMessage="responseMessage"
            :success="success"
            @closing-modal-timeOut="clearModalsTimeOut"
            @bgCloseConfirmationModal="bgConfirmationModalIsOpen = false"
          />
        </Transition>
      </div>
    </div>
  </div>

  <!-- Modal for change password -->
  <div
    class="fixed z-[100] inset-0 overflow-hidden pt-4 px-4 pb-16"
    v-if="bgChangePasswordModalIsOpen"
  >
    <div
      class="flex items-center justify-center min-h-screen text-center sm:block sm:p-0"
    >
      <div class="fixed inset-0 transition-opacity">
        <div
          class="absolute inset-0 bg-[var(--lighter-main-color)] opacity-75"
        ></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
        >&#8203;</span
      >

      <!-- Add margin if you want to see some of the overlay behind the modal-->
      <Transition
        enter-active-class="animate__animated animate__fadeInDown"
        leave-active-class="animate__animated animate__fadeOutUp"
      >
        <ChangePasswordModal
          v-if="ChangePasswordModalIsOpen"
          @close-changePass-modal="closePasswordModal"
          class="inline-block align-bottom bg-[var(--background-main-color)] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        />
      </Transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapStores } from "pinia";
import useUserStore from "@/stores/user";
import useModalsStore from "@/stores/modalsStore";
import ConfirmationModal from "@/components/account/ConfirmationModal.vue";
import ChangePasswordModal from "@/components/account/ChangePasswordModal.vue";
import router from "@/router";

export default {
  name: "UserConfigurarCuenta",
  data() {
    return {
      name: "",
      lastName: "",
      email: "",
      phone: "",
      accountInfoSchema: {
        name: "required|alphaSpaces|min:3|max:100",
        lastName: "required|alphaSpaces|min:3|max:100",
        phone: "required|integer|min:10|max:10",
      },
      responseMessage: "",
      success: false,
      bgConfirmationModalIsOpen: false,
      closingModalsTimeOut: null,
      ChangePasswordModalIsOpen: false,
      bgChangePasswordModalIsOpen: false,
    };
  },
  components: {
    ConfirmationModal,
    ChangePasswordModal,
  },
  async mounted() {
    const userInfoRequest = await this.getUserAccountInfo();
    this.name = userInfoRequest.data.name;
    this.lastName = userInfoRequest.data.lastName;
    this.email = userInfoRequest.data.email;
    this.phone = userInfoRequest.data.phone;
  },
  methods: {
    ...mapActions(useUserStore, { getUserAccountInfo: "getUserAccountInfo" }),
    ...mapActions(useUserStore, {
      updateUserAccountInfo: "updateUserAccountInfo",
    }),
    ...mapActions(useModalsStore, {
      openConfirmationModal: "openConfirmationModal",
    }),
    ...mapActions(useModalsStore, {
      closeConfirmationModal: "closeConfirmationModal",
    }),
    ...mapActions(useUserStore, { logout: "logout" }),
    clearModalsTimeOut() {
      clearTimeout(this.closingModalsTimeOut);
    },
    async updateAccountInfo(values) {
      this.bgConfirmationModalIsOpen = true;
      const updateInfoRequest = await this.updateUserAccountInfo(values);
      if (updateInfoRequest.success) {
        this.responseMessage = updateInfoRequest.message;
        this.success = true;
        this.openConfirmationModal();
      } else {
        this.responseMessage = updateInfoRequest.message;
        this.success = false;
        this.openConfirmationModal();
      }
      this.closingModalsTimeOut = setTimeout(() => {
        this.closeConfirmationModal();
        setTimeout(() => {
          this.bgConfirmationModalIsOpen = false;
        }, 200);
      }, 2500);
    },
    changePassword() {
      this.bgChangePasswordModalIsOpen = true;
      setTimeout(() => {
        this.ChangePasswordModalIsOpen = true;
      }, 50);
    },
    closePasswordModal() {
      this.ChangePasswordModalIsOpen = false;
      setTimeout(() => {
        this.bgChangePasswordModalIsOpen = false;
      }, 200);
    },
    closeSession() {
      this.logout();
      router.push("/");
    },
  },
  computed: {
    fullName() {
      return `${this.userStore.userName} ${this.userStore.userLastName} `;
    },
    ...mapStores(useModalsStore, useUserStore),
  },
};
</script>

<style lang="scss" scoped>
.info-cuenta-form {
  width: 80%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  .account-form {
    width: 100%;
    max-width: 500px;
    height: fit-content;
    padding: 20px;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  }
}
.animate__animated.animate__fadeInDown,
.animate__animated.animate__fadeOutUp {
  --animate-duration: 500ms;
}

@media screen and (min-width: 1024px) {
  section {
    justify: space-around;
  }
  .info-cuenta-form {
    width: 80%;
    display: flex;
    justify-content: center;
    margin: 4rem;
    .account-form {
      margin: 0 5rem;
      width: 80%;
    }
  }
  .cuenta-aside {
    display: block !important;
    overflow: hidden;
    width: 20%;
    min-width: 250px;
    box-shadow: 0 0 20px -7px var(--lighter-main-color);
    .user-name {
      border-bottom: 1.5px solid var(--dark-accent-color);
      padding-bottom: 1rem;
      margin-bottom: 1.75rem;
      span:not(:last-of-type) {
        display: block;
        margin-bottom: 1rem;
      }
    }
    ul {
      height: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      .li-item {
        padding: 10px 0;
        &:hover {
          font-weight: bold;
          color: var(--dark-accent-color);
        }
      }
    }
  }
}
</style>
