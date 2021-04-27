<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/frontend" active-class="active" class="nav-link">Frontend</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/backend" active-class="active" class="nav-link">Backend</router-link>
        </li>
      </ul>
    </header>
  </div>

  <div class="album py-5 bg-light">
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>
