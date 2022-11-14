<template>
    <div id="centerText">
        <h1 id="title">Log In</h1>
        <v-form>
            <v-card class="mx-auto" max-width="400" outlined color="transparent">
                <v-card-text>
                    <v-text-field label="Email Address" clearable v-model="email" :rules="emailRules" />
                    <v-text-field label="Password" type="password" clearable v-model="yourPassword"
                        :rules="passwordRules" />
                </v-card-text>
                <v-btn depressed large color="#FFF3E0" @click="login(email, yourPassword)">
                    Log In
                </v-btn>
            </v-card>
        </v-form>
        
        <p v-if="Error != null" id="errorStatus">
            {{ Error }}
        </p>
        <p id="signUpDesign">
            Don't have an account? &nbsp;&nbsp;<v-btn tile large color="#82B1FF" class="white--text" @click="signupPage">Sign Up</v-btn>
        </p>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
import { mapState } from 'vuex';
export default {
    name: 'LogIn',
    computed: {

        ...mapState({
            Customers: 'Customers'
        }),
        ...mapGetters({
            Success: 'getSuccess',
            Error: 'getErrorMessage'
        }),        
    },
    data() {
        return {
            email: '',
            yourPassword: '',
            emailRules: [
                v => !!v || 'Email is required',
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            passwordRules: [
                v => !!v || 'Password is required'
            ]
        }
    },
    methods: {
        login(value, key) {
            this.$store.dispatch('login', { emailData: value, passwordData: key });
        },
        signupPage(){
            this.$router.push(`/signup`);
        }

    },


}
</script>
<style scoped>
#title {
    font-style: oblique;
    font-size: 50px;
    font-family: "Segoe Script";
}

#centerText {
    text-align: center;
    margin-top: 50px;
}

#errorStatus{
    margin-top: 30px;
    color: red;
    font-size: 30px;
    font-family: "Futara";
    font-style: oblique;
}
#signUpDesign{
    margin-top: 200px;
    font-size: 26px;
    font-family: "Futara";
    font-style: oblique;
    color: blue;
}
</style>