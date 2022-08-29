<template #container>
  <div class="form-demo">
    <div class="flex justify-content-center container">
            <div class="card">
                <h2 class="text-center">Sign Up</h2>
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
                    <div class="field">
                        <div class="p-float-label p-input-icon-right">
                            <i class="pi pi-envelope" />
                            <InputText id="email" v-model="v$.email.$model" :class="{'p-invalid':v$.email.$invalid && submitted}" aria-describedby="email-error"/>
                            <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email*</label>
                        </div>
                        <span v-if="v$.email.$error && submitted">
                            <span id="email-error" v-for="(error, index) of v$.email.$errors" :key="index">
                            <small class="p-error">{{error.$message}}</small>
                            </span>
                        </span>
                        <small v-else-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response" class="p-error">{{v$.email.required.$message.replace('Value', 'Email')}}</small>
                    </div>
                    <div class="field">
                        <div class="p-float-label">
                            <Password id="password" v-model="v$.password.$model" :class="{'p-invalid':v$.password.$invalid && submitted}"
                              :strongRegex = '/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{10,}$/' toggleMask>
                                <template #footer="sp">
                                    {{sp.level}}
                                    <Divider />
                                    <p class="mt-2 mb-2">Must follow these rules</p>
                                    <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                                        <li>• At least one lowercase</li>
                                        <li>• At least one uppercase</li>
                                        <li>• At least one numeric</li>
                                        <li>• At least one special character</li>
                                        <li>• Minimum 10 characters</li>
                                    </ul>
                                </template>
                            </Password>
                            <label for="password" :class="{'p-error':v$.password.$invalid && submitted}">Password*</label>
                        </div>
                        <small v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response" class="p-error">{{v$.password.required.$message.replace('Value', 'Password')}}</small>
                    </div>
                    <Button @click="handleSignup" :disabled="v$.$invalid" type="submit" :label="loading ? 'Loading...':'Submit' " class="mt-2" />
                </form>
            </div>
        </div>
  </div>
</template>

<script>
import { email, required, minLength } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core';

import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
// import NavbarVue from '@/components/Navbar.vue';
import { signup } from '../api';

export default {
  components: {
    Password,
    InputText,
    Divider,
    Button,
    // NavbarVue,
  },
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      submitted: false,
      showMessage: false,
    };
  },

  validations() {
    return {
      email: {
        required,
        email,
      },
      password: {
        required,
        valid(value) {
          const containsUppercase = /[A-Z]/.test(value);
          const containsLowercase = /[a-z]/.test(value);
          const containsNumber = /[0-9]/.test(value);
          const containsSpecial = /[#?!@$%^&*-]/.test(value);
          return containsUppercase && containsLowercase && containsNumber && containsSpecial;
        },
        minLength: minLength(10),
      },
    };
  },

  created(){
    document.title = "Signup";
  },
  methods: {
    handleSubmit() {
      this.submitted = true;
    },

    async handleSignup() {
      this.loading = true;
      const result = await signup(this.email, this.password);
      if (result.error) {
        this.$toast.add({
          severity: 'error', summary: result.error, life: 3000,
        });
      } else {
        localStorage.setItem('user_id', result._id);
        this.$store.commit('SET_IS_LOGGED_IN', true);
        this.$router.push('/dashboard');
      }
      this.loading = false;
    },

    resetForm() {
      this.email = '';
      this.password = '';
      this.submitted = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.form-demo {
  display : flex;
  height: 90vh;
  justify-content: center;
  align-items: center;
    .card {
        min-width: 350px;
        margin: 0 auto;

        form {
            margin-top: 2rem;
        }

        .field {
            margin-bottom: 1.5rem;
        }
    }

    @media screen and (max-width: 960px) {
        .card {
            width: 80%;
        }
    }
}

</style>
