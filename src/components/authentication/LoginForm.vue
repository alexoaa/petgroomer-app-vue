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
        <div class="inputBox">
          <vee-field type="text" id="email" name="email" />
          <span>Email</span>
        </div>
        <ErrorMessage name="email" class="text-red-600"></ErrorMessage>

        <!-- Password -->
        <div class="inputBox">
          <vee-field type="password" id="password" name="password" />
          <span>Contraseña</span>
          <div id="togglePass" onclick="togglePass()">
            <i class="fa-regular fa-eye toggle-seg-num"></i>
            <i class="fa-regular fa-eye-slash"></i>
          </div>
        </div>
        <ErrorMessage name="password" class="text-red-600"></ErrorMessage>

        <!-- Login button -->
        <div class="submit-container">
          <button type="submit" id="btnIngresar" class="btn-submit">
            Iniciar sesión
          </button>
          <div class="text-red-600"><span>Error</span></div>
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
  },
};
</script>
