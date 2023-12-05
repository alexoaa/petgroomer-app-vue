<template>
  <div>
    <div
      class="py-5 text-center px-6 min-w-[300px] flex flex-wrap flex-col justify-around"
      ref="modalTargetChangePass"
    >
      <vee-form
        class="w-full max-w-[500px]"
        :validation-schema="changePassSchema"
        @submit="updatePassword"
      >
        <h1 class="block font-bold text-xl mb-6">Cambia tu contraseña</h1>
        <ul class="text-left">
          <!-- Password -->
          <li class="relative my-4 w-full">
            <label
              class="block text-[var(--accent-color)] text-base"
              for="currentPassword"
              >Contraseña actual</label
            >
            <vee-field
              name="currentPassword"
              :bails="false"
              v-slot="{ field, errors }"
            >
              <div
                class="relative my-1.5 flex items-center w-full pr-3 border border-solid border-[var(--light-gray-color)] rounded overflow-hidden bg-white"
              >
                <input
                  :type="actualPassFieldType"
                  v-bind="field"
                  placeholder="Contraseña actual..."
                  class="leading-8 py-2 focus:outline-none w-full px-3"
                  tabindex="1"
                />
                <div
                  id="togglePass"
                  @click="toggleActualPass()"
                  class="cursor-pointer"
                >
                  <svg
                    class="w-[25px] h-[25px] fill-[var(--text-color)]"
                    v-if="this.actualPassFieldType === 'text'"
                  >
                    <use href="@/assets/icons/icons.svg#eye" />
                  </svg>
                  <svg
                    class="w-[25px] h-[25px] fill-[var(--text-color)]"
                    v-else
                  >
                    <use href="@/assets/icons/icons.svg#eye-slash" />
                  </svg>
                </div>
              </div>
              <div class="error-message" v-for="error in errors" :key="error">
                {{ error }}
              </div>
            </vee-field>
          </li>

          <!-- New Password -->
          <li class="relative my-4 w-full">
            <label
              class="block text-[var(--accent-color)] text-base"
              for="newPassword"
              >Nueva contraseña</label
            >
            <vee-field
              name="newPassword"
              :bails="false"
              v-slot="{ field, errors }"
            >
              <div
                class="relative my-1.5 flex items-center w-full pr-3 border border-solid border-[var(--light-gray-color)] rounded overflow-hidden bg-white"
              >
                <input
                  :type="newPassFieldType"
                  v-bind="field"
                  placeholder="Nueva contraseña..."
                  class="leading-8 py-2 focus:outline-none w-full px-3"
                  tabindex="2"
                />
                <div
                  id="togglePass"
                  @click="toggleNewPass()"
                  class="cursor-pointer"
                >
                  <svg
                    class="w-[25px] h-[25px] fill-[var(--text-color)]"
                    v-if="this.newPassFieldType === 'text'"
                  >
                    <use href="@/assets/icons/icons.svg#eye" />
                  </svg>
                  <svg
                    class="w-[25px] h-[25px] fill-[var(--text-color)]"
                    v-else
                  >
                    <use href="@/assets/icons/icons.svg#eye-slash" />
                  </svg>
                </div>
              </div>
              <div class="error-message" v-for="error in errors" :key="error">
                {{ error }}
              </div>
            </vee-field>
          </li>

          <!-- Confirm Password -->
          <li class="relative my-4 w-full">
            <label
              class="block text-[var(--accent-color)] text-base"
              for="confirmPassword"
              >Confirmar contraseña</label
            >
            <div
              class="relative my-1.5 flex items-center w-full pr-3 border border-solid border-[var(--light-gray-color)] rounded overflow-hidden bg-white"
            >
              <vee-field
                :type="confPassFieldType"
                name="confirmPassword"
                placeholder="Confirmar contraseña..."
                class="leading-8 py-2 focus:outline-none w-full px-3"
                tabindex="2"
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
              class="error-message"
            ></ErrorMessage>
          </li>

          <!-- Save button -->
          <div class="submit-container">
            <button
              type="submit"
              id="btnGuardarPasswordChanges"
              class="btn-submit"
              tabindex="3"
            >
              Guardar
            </button>
          </div>
          <!-- Save button -->
          <div class="submit-container">
            <button
              type="submit"
              id="btnGuardarPasswordChanges"
              class="btn-terciary-small"
              tabindex="3"
              @click="this.$emit('close-changePass-modal')"
            >
              Cancelar
            </button>
          </div>
        </ul>
      </vee-form>
    </div>
    <!-- Modal for save changes confirmation -->
    <div
      class="fixed z-[100] inset-0 overflow-hidden flex items-center justify-center"
      v-if="bgConfirmationModalIsOpen"
    >
      <div
        class="absolute inset-0 bg-[var(--background-dark-color)] opacity-75"
      ></div>
      <div
        class="inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle"
      >
        <Transition
          enter-active-class="animate__animated animate__bounceIn"
          leave-active-class="animate__animated animate__bounceOut"
        >
          <ConfirmationModal
            v-if="ConfirmationModalIsOpen"
            :responseMessage="responseMessage"
            :success="success"
            @closing-modal-timeOut="clearModalsTimeOut"
            @bgCloseConfirmationModal="bgConfirmationModalIsOpen = false"
          />
        </Transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapStores } from "pinia";
import useGeneralVariablesStore from "@/stores/generalVariables";
import { useUserStore } from "@/stores/user";
import ConfirmationModal from "@/components/account/ConfirmationModal.vue";

import { onClickOutside } from "@vueuse/core";
import { ref } from "vue";

export default {
  name: "ChangePasswordModal",
  data() {
    return {
      actualPassFieldType: "password",
      newPassFieldType: "password",
      confPassFieldType: "password",
      changePassSchema: {
        currentPassword: "required|min:9|excluded:password",
        newPassword: "required|min:9|excluded:password",
        confirmPassword: "passwords_mismatch:@newPassword",
      },
      responseMessage: "",
      success: false,
      bgConfirmationModalIsOpen: false,
      ConfirmationModalIsOpen: false,
      closingModalsTimeOut: null,
    };
  },
  components: {
    ConfirmationModal,
  },
  emits: ["close-changePass-modal"],
  methods: {
    async updatePassword(values) {
      this.bgConfirmationModalIsOpen = true;
      const updatePasswordRequest = await this.changePassword(values);
      if (updatePasswordRequest.success) this.success = true;
      this.responseMessage = updatePasswordRequest.message;
      this.ConfirmationModalIsOpen = true;

      this.closingModalsTimeOut = setTimeout(() => {
        this.ConfirmationModalIsOpen = false;
        setTimeout(() => {
          this.bgConfirmationModalIsOpen = false;
          if (this.success) this.$emit("close-changePass-modal");
        }, 200);
      }, 2500);
    },
    clearModalsTimeOut() {
      clearTimeout(this.closingModalsTimeOut);
    },
    toggleActualPass() {
      this.actualPassFieldType =
        this.actualPassFieldType === "password" ? "text" : "password";
    },
    toggleNewPass() {
      this.newPassFieldType =
        this.newPassFieldType === "password" ? "text" : "password";
    },
    togglePassConf() {
      this.confPassFieldType =
        this.confPassFieldType === "text" ? "password" : "text";
    },
    ...mapActions(useGeneralVariablesStore, {
      closeChangePasswordModal: "closeChangePasswordModal",
    }),
    ...mapActions(useUserStore, {
      changePassword: "changePassword",
    }),
  },
  computed: {
    ...mapStores(useGeneralVariablesStore),
  },
  mounted() {
    const modalTargetChangePass = ref(this.$refs.modalTargetChangePass);
    onClickOutside(modalTargetChangePass, () => {
      this.$emit("close-changePass-modal");
    });
  },
};
</script>
