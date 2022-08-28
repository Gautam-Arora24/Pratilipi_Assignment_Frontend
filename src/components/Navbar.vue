<template>
<div class="c-menu-bar">
    <div class="left">
        <img alt="logo" src="../assets/logo.webp" height="40" class="mr-2">
    </div>
    <div v-if="isLoggedIn" class="right" >
      <Button @click="handleLogout()" label="Logout" class="p-button-text" icon="pi pi-sign-out" style="color: black"></Button>
    </div>
</div>
</template>

<script>
import Button from 'primevue/button';

export default {
  data() {
    return {
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isLoggedIn;
    },
  },
  components: {
    Button,
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('user_id');
      this.$store.commit('SET_IS_LOGGED_IN', false);
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss">
.c-menu-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    padding: 1rem;
    border: 1px solid #dee2e6;
    background-color:#f8f9fa;

    .p-button-text {
        color: var(--text-color-secondary);
    }

}
</style>
