<template>
  <div class="wrapper">
    <div class="subHeader-container">
      <div class="div-buscador">
        <form onsubmit="event.preventDefault();" role="search" class="buscador">
          <input
            id="search"
            type="search"
            placeholder="Buscar un cliente..."
            autofocus
            required
            autocomplete="off"
          />
          <button type="submit">Buscar</button>
        </form>
      </div>
      <div class="subHeader-div-btn">
        <button class="subHeader-btn">Citas</button>
        <button class="subHeader-btn">Clientes</button>
      </div>
    </div>
  </div>
</template>

<script></script>
