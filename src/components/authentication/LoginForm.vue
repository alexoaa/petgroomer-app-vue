<template>
  <div class="wrapper">
    <div class="form-container">
      <h1>Iniciar sesión</h1>
      <form action="/login" method="POST" class="form-cita">
        <div class="inputBox">
          <input
            type="text"
            id="email"
            name="email"
            autocomplete="off"
            required
          />
          <span>Email</span>
        </div>
        <div class="inputBox">
          <input
            type="password"
            id="password"
            name="password"
            autocomplete="off"
            required
          />
          <span>Contraseña</span>
          <div id="togglePass" onclick="togglePass()">
            <i class="fa-regular fa-eye toggle-seg-num"></i>
            <i class="fa-regular fa-eye-slash"></i>
          </div>
        </div>

        <div class="errors">
          <p>ERROR</p>
        </div>
        <div class="submit-container">
          <button type="submit" id="btnIngresar" class="btn-submit">
            Iniciar sesión
          </button>
          <div class="form-divisor"></div>
          <a href="/password/reset">¿Olvidaste tu contraseña?</a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "LoginForm",
};
</script>
