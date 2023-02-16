<template>
  <div class="wrapper">
    <div class="form-container">
      <h1>Iniciar sesión</h1>
      <!-- Email -->
      <vee-form
        action="/login"
        class="form-cita"
        :validation-schema="loginSchema"
        @submit="login"
      >
        <!-- Email -->
        <div class="relative my-2 w-full">
          <label class="block text-sky-600 text-lg">Correo electronico</label>
          <div
            class="relative my-1.5 flex items-center w-full px-3 border border-solid border-slate-500 rounded"
          >
            <vee-field
              type="email"
              name="email"
              placeholder="Correo electronico..."
              class="leading-8 py-2.5 focus:outline-none w-full"
              autocomplete="email"
            />
          </div>
          <ErrorMessage name="email" class="text-red-600"></ErrorMessage>
        </div>

        <!-- With pure CSS -->
        <!-- <div class="inputBox">
          <vee-field type="text" id="email" name="email" />
          <span>Email</span>
        </div>
        <ErrorMessage name="email" class="text-red-600"></ErrorMessage> -->

        <!-- Password -->
        <div class="relative my-2 w-full">
          <label class="block text-sky-600 text-lg">Contraseña</label>
          <div
            class="relative my-1.5 flex items-center w-full px-3 border border-solid border-slate-500 rounded"
          >
            <vee-field
              :type="passFieldType"
              name="password"
              placeholder="Contraseña..."
              class="leading-8 py-2.5 focus:outline-none w-full"
            />

            <div id="togglePass" @click="togglePass()">
              <i class="fa-regular fa-eye toggle-seg-num"></i>
              <i class="fa-regular fa-eye-slash"></i>
            </div>
          </div>
          <ErrorMessage name="password" class="text-red-600"></ErrorMessage>
        </div>

        <!-- With pure CSS -->
        <!-- <div class="inputBox">
          <vee-field :type="passFieldType" id="password" name="password" />
          <span>Contraseña</span>
          <div id="togglePass" @click="togglePass()">
            <i class="fa-regular fa-eye toggle-seg-num"></i>
            <i class="fa-regular fa-eye-slash"></i>
          </div>
          <ErrorMessage name="password" class="text-red-600"></ErrorMessage>
        </div> -->

        <!-- Login button -->
        <div class="submit-container">
          <button type="submit" id="btnIngresar" class="btn-submit">
            Iniciar sesión
          </button>
          <div class="text-red-600 py-4"><span>Error</span></div>
          <div class="form-divisor"></div>
          <a href="/password/reset">¿Olvidaste tu contraseña?</a>
        </div>
      </vee-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      passFieldType: "password",
      loginSchema: {
        email: "required|email",
        password: "required",
      },
    };
  },
  methods: {
    login(values) {
      console.log(values);
    },
    togglePass() {
      this.passFieldType =
        this.passFieldType === "password" ? "text" : "password";
    },
  },
};
</script>
