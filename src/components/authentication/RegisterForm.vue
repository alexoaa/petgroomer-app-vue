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
        <div class="inputBox">
          <vee-field type="text" id="name" name="name" />
          <span>Nombre</span>
        </div>
        <ErrorMessage name="name" class="text-red-600"></ErrorMessage>

        <!-- Phone -->
        <div class="inputBox">
          <vee-field type="number" id="phone" name="phone" />
          <span>Telefono</span>
        </div>
        <ErrorMessage name="phone" class="text-red-600"></ErrorMessage>

        <!-- Email -->
        <div class="inputBox">
          <vee-field type="text" id="email" name="email" autocomplete="email" />
          <span>Email</span>
        </div>
        <ErrorMessage name="email" class="text-red-600"></ErrorMessage>

        <!-- Password -->
        <div class="inputBox">
          <vee-field
            type="password"
            id="password"
            name="password"
            :bails="false"
            v-slot="{ field, errors }"
          >
            <input type="password" v-bind="field" />
            <div class="text-red-600" v-for="error in errors" :key="error">
              {{ error }}
            </div>
          </vee-field>
          <span>Contraseña</span>
          <div id="togglePass" onclick="togglePass()">
            <i class="fa-regular fa-eye toggle-seg-num"></i>
            <i class="fa-regular fa-eye-slash"></i>
          </div>
        </div>
        <ErrorMessage name="password" class="text-red-600"></ErrorMessage>

        <!-- Confirm Password -->
        <div class="inputBox">
          <vee-field
            type="password"
            id="confirmPassword"
            name="confirmPassword"
          />
          <span>Confirmar contraseña</span>
          <div id="toggleConfPass" onclick="toggleConfPass()">
            <i class="fa-regular fa-eye toggle-seg-num"></i>
            <i class="fa-regular fa-eye-slash"></i>
          </div>
        </div>
        <ErrorMessage
          name="confirmPassword"
          class="text-red-600"
        ></ErrorMessage>

        <!-- ToS -->
        <div class="mb-3 pl-6">
          <vee-field
            type="checkbox"
            name="tos"
            id="tos"
            value="1"
            class="w-4 h-4 float-left -ml-6 mt-1 rounded"
          />
          <label for="tos" class="inline-block"
            >Acepto los <a href="#tos">terminos del servicio.</a></label
          >
        </div>
        <ErrorMessage name="tos" class="text-red-600"></ErrorMessage>

        <!-- Register button -->
        <div class="submit-container">
          <button type="submit" id="btnRegistrar" class="btn-submit">
            Registrarse
          </button>
          <div class="text-red-600"><span>Error</span></div>
        </div>
      </vee-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
  data() {
    return {
      registerSchema: {
        name: "required|alphaSpaces|min:3|max:100",
        phone: "required|integer|min:10|max:10",
        email: "required|email",
        password: "required|min:9|excluded:password",
        confirmPassword: "passwords_mismatch:@password",
        tos: "tos",
      },
    };
  },
  methods: {
    register(values) {
      console.log(values);
    },
  },
};
</script>
