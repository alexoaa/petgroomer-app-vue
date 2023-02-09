<template>
  <div class="wrapper">
    <div class="form-container">
      <h1>Registrarse</h1>
      <form action="/registrar" class="form-cita" method="POST">
        <div class="inputBox">
          <input type="text" id="nombre" name="nombre" required />
          <span>Nombre</span>
        </div>
        <div class="inputBox">
          <input type="number" id="telefono" name="telefono" required />
          <span>Telefono</span>
        </div>
        <div class="inputBox">
          <input
            type="text"
            id="email"
            name="email"
            autocomplete="email"
            required
          />
          <span>Email</span>
        </div>
        <div class="inputBox">
          <input
            type="password"
            id="password"
            name="password"
            autocomplete="new-password"
            required
          />
          <span>Contraseña</span>
          <div id="togglePass" onclick="togglePass()">
            <i class="fa-regular fa-eye toggle-seg-num"></i>
            <i class="fa-regular fa-eye-slash"></i>
          </div>
        </div>
        <div class="inputBox">
          <input
            type="password"
            id="passwordConf"
            name="passwordConf"
            autocomplete="current-password"
            required
          />
          <span>Confirmar contraseña</span>
          <div id="toggleConfPass" onclick="toggleConfPass()">
            <i class="fa-regular fa-eye toggle-seg-num"></i>
            <i class="fa-regular fa-eye-slash"></i>
          </div>
        </div>
        <div class="errors">
          <p>ERROR</p>
        </div>
        <div class="submit-container">
          <button type="submit" id="btnRegistrar" class="btn-submit">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterForm",
};
</script>
