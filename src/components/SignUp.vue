<template>
    <div id="centerText">
        <h1 id="title">Sign Up</h1>
        <v-form>
            <v-card class="mx-auto" max-width="400" outlined color="transparent">
                <v-card-text>
                    <v-text-field label="Email Address" clearable v-model="insertEmail" :rules="emailRules" />
                    <v-text-field label="User Name" clearable v-model="insertName" :rules="[required]"  />
                    <v-text-field label="Password" type="password" v-model="insertPassword" :rules="[required, min6]"
                        :counter="6">
                        <template v-slot:append>
                            <v-icon v-if="successPass" color="green">{{ passRule }}</v-icon>
                            <v-icon v-if="!successPass" color="red">{{ passRule }}</v-icon>
                        </template>
                    </v-text-field>
                    <v-text-field label="Confirm Password" type="password" v-model="insertConfirmPassword"
                        :rules="[required, min6, matchingPasswords]" :counter="6">
                        <template v-slot:append>
                            <v-icon v-if="successPassTwo" color="green">{{ passRuleTwo }}</v-icon>
                            <v-icon v-if="!successPassTwo" color="red">{{ passRuleTwo }}</v-icon>
                        </template>
                    </v-text-field>
                </v-card-text>
                <v-btn depressed large color="#FFF3E0"
                    @click="signUp(insertEmail, insertPassword, insertConfirmPassword,insertName)">
                    Sign Up
                </v-btn>
                <p v-if="message != null" id="errorStatus">
                    {{ message }}
                </p>
            </v-card>
        </v-form>
        <p id="signUpDesign">
            Already have an account? &nbsp;&nbsp;<v-btn tile large color="#82B1FF" class="white--text"
                @click="loginPage">Log In</v-btn>
        </p>
    </div>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
    name: 'SignUp', data() {
        return {
            insertName:'',
            insertEmail: '',
            insertPassword: '',
            insertConfirmPassword: '',
            successPass: false,
            successPassTwo: false,
            emailRules: [
                v => !!v || 'Email is required',
                v => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
        }
    },
    methods: {
        required(value) {
            if (value) {
                return true;
            } else {
                return 'This field is required.';
            }
        },
        min6(value) {
            if (value.length >= 6) {
                return true;
            } else {
                return 'Password should have more than 6 characters.';
            }
        },
        matchingPasswords() {
            let self = this;
            if (self.insertPassword == self.insertConfirmPassword) {
                return true;
            } else {
                return 'Passwords does not match.';
            }
        },
        loginPage() {
            this.$router.push(`/`);
        },
        signUp(emaildata, passdata, condata,namedata) {
            this.$store.dispatch('signUp', { emaildAta: emaildata, passwordAta: passdata, confirmData: condata,nameData:namedata });
        }
    },
    computed: {
        passRule() {
            let self = this;
            if (self.insertPassword == '') {
                self.successPass = false;
                return '';
            } else if (self.min6(self.insertPassword) == true) {
                self.successPass = true;
                return 'mdi-check';
            } else {
                self.successPass = false;
                return 'mdi-close';
            }
        },
        passRuleTwo() {
            let self = this;
            if (self.insertConfirmPassword == '') {
                self.successPassTwo = false;
                return '';
            } else if (self.min6(self.insertConfirmPassword) == true && self.matchingPasswords() == true) {

                self.successPassTwo = true;
                return 'mdi-check';
            } else {
                self.successPassTwo = false;
                return 'mdi-close';
            }
        },
        ...mapGetters({
            message: 'getMessage'
        }),
    }
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

#errorStatus {
    margin-top: 30px;
    color: red;
    font-size: 20px;
    font-family: "Futara";
    font-style: oblique;
}

#signUpDesign {
    margin-top: 200px;
    font-size: 26px;
    font-family: "Futara";
    font-style: oblique;
    color: blue;
}
</style>