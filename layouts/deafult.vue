<template>
  <div>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <b-navbar-brand href="#">NavBar</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto" v-if="isLoggedIn">
            <b-nav-item :to="{name: 'secret'}">Secret Page</b-nav-item>
            <b-nav-item href="#" right @click="logout">Logout</b-nav-item>
          </b-navbar-nav>

          <b-navbar-nav class="ml-auto" v-else>
            <b-nav-item :to="{name: 'login'}">Login</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
    <nuxt />
  </div>
</template>

<script>
  export default {
    computed: {
      isLoggedIn() {
        return this.$store.state.token;
      }
    },

    methods: {
      logout() {
        this.$axios.$post('logout')
          .then(resp => {
            this.$store.dispatch('logout');
            this.$router.push('/');
          })
          .catch(errors => {
            console.dir(errors);
          });
      }
    }
  }
</script>