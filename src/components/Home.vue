<template>
    <div>
        <h1>
            Home
        </h1>
        <div  id="successText">
            {{ Customers[id].username }}
            <v-btn color="green" @click="Change" v-show="!isChange" style="border-radius: 20%;color:blanchedalmond;margin-left: 10px;">
            Change UserName
        </v-btn>
        </div>
        
        <v-card class="mx-auto" max-width="500" outlined color="transparent">
            <v-card-text>
                <!--`${Customers[this.$route.params.id].username}` -->
                <v-text-field :label="Customers[id].username" clearable v-model="username" v-show="isChange" />
            </v-card-text>
            <v-card-text>
                <v-text-field label="Password" type="password" clearable v-model="passwordType" :rules="[required,min6]"
                    v-show="isChange" />
            </v-card-text>
            <v-card-actions>
                <v-btn icon color="red" @click="Back" v-show="isChange">
                    <v-icon>
                        mdi-arrow-left-thick
                    </v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn icon color="green" @click="nameChange(username, passwordType, id)" v-show="isChange">
                    <v-icon>mdi-cached</v-icon>
                </v-btn>
                <!-- <v-btn tile color="#FAFAFA">
                    Change
                </v-btn> -->
            </v-card-actions>
            <p v-if="updateMessage != null" id="errorStatus">
                {{ updateMessage }}
            </p>
        </v-card>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { mapGetters } from 'vuex';
export default {
    name: 'Home',
    data() {
        return {
            username: '',
            passwordType: '',
            isChange: false,
            label: '',
            id: 0,
        }
    },
    computed: {
        ...mapState({
            Customers: 'Customers',
        }),
        ...mapGetters({
            updateMessage: 'getUpdateMessage'
        })

    },
    methods: {
        Change() {
            let self = this;
            self.isChange = true;
        },
        nameChange(value, key, indx) {
            this.$store.dispatch('updateName', { nameData: value, passwordData: key, index: indx });
        },
        Back() {
            let self = this;
            self.isChange = false;
        },
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
    },
    created() {
        this.id = this.$route.params.id;
    }
}
</script>
<style scoped>
#successText {
    margin-top: 50px;
    color: green;
    font-family: "Futara";
    text-align: center;
    font-size: 30px;
}

#errorStatus {
    margin-top: 30px;
    color: red;
    font-size: 20px;
    font-family: "Futara";
    font-style: oblique;
}
h1{
    margin-top: 50px;
    color: green;
    font-family: "Futara";
    text-align: center;
}
</style>