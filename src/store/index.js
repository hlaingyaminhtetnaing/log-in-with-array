import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Customers: [
      {
        email: 'hlaingyaminhtetnaing@gmail.com',
        password: '123456h@',
        username: 'Hlaing Yamin Htet Naing',
      },
      {
        email: 'hlaingyamin778@gmail.com',
        password: '123321n@',
        username: 'Hlaing Yamin',
      }
    ],
    success: false,
    errorMessage: '',
    Message: '',
    emailSuccess: true,
    updateMessage: '',
  },

  getters: {
    getSuccess(state) {
      return state.success;
    },
    getErrorMessage(state) {
      return state.errorMessage;
    },
    getMessage(state) {
      return state.Message;
    },
    getUpdateMessage(state) {
      return state.updateMessage;
    },
  },

  mutations: {
    LOG_IN(state, { emailData, passwordData }) {
      for (let index = 0; index < state.Customers.length; index++) {
        if (state.Customers[index].email == emailData && state.Customers[index].password == passwordData) {
          router.push(`/home/${index}`);
          state.errorMessage ='';
          return state.success = true;
        } else {
          state.success = false;
        }
      }
      if (state.success == false) {
        state.errorMessage = "Your input is wrong!"
      }
    },

    SIGN_UP(state, { emaildAta, passwordAta, confirmData, nameData }) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emaildAta)) {
        if (nameData != null) {
          if (passwordAta == confirmData) {
            for (let index = 0; index < state.Customers.length; index++) {
              if (state.Customers[index].email == emaildAta) {
                state.emailSuccess = false;
                return state.Message = "Email is already exist"
              } else {
                state.emailSuccess = true;
                state.Message ='';
              }
            }
            if (state.emailSuccess == true) {
              state.Customers.push({
                email: emaildAta,
                password: passwordAta,
                username: nameData
              });
              router.push(`/`);
            }
          }
          else {
            state.Message = "Password does not match!Please try again"
          }
        } else {
          state.Message = "Name is empty"
        }

      } else {
        state.Message = "Email is not valid!Please try again"
      }

    },

    UPDATE_NAME(state, { nameData, passwordData, index }) {
      if(nameData != ""){
        if (state.Customers[index].password == passwordData) {
          state.Customers[index].username = nameData;
          state.updateMessage='';
          router.push(`/`);
        }
        else {
          return state.updateMessage="Your Password is incorrect"
        }
      }else{
        return state.updateMessage="Name is Required"
      }
    }
  },

  actions: {
    login({ commit }, { emailData, passwordData }) {
      commit('LOG_IN', { emailData, passwordData });
    },
    signUp({ commit }, { emaildAta, passwordAta, confirmData, nameData }) {
      commit('SIGN_UP', { emaildAta, passwordAta, confirmData, nameData });
    },
    updateName({ commit }, { nameData, passwordData, index }) {
      commit('UPDATE_NAME', { nameData, passwordData, index })
    }
  },
  modules: {
  }
})
