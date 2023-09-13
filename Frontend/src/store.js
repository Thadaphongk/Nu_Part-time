import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  user:null ,
  owner:null ,
  equipments: [],
  job : [],
  apply_histories: [],
  job_histories: [],
  applys: []
  },
  mutations: {
set_user:(state, user) => state.user = user,
set_owner:(state, owner) => state.owner = owner,
set_job : (state, job) => state.job = job,
set_job_histories:(state,job_histories) => state.job_histories = job_histories,
set_apply_histories: (state, apply_histories) => state.apply_histories = apply_histories,
set_apply: (state, apply) => state.applys = apply
  },
  actions: {
  get_user_login:({commit}) => Axios.post('/api/account/getUserLogin').then(res => commit('set_user', res.data)),
  get_owner_login:({commit}) => Axios.post('/api/owner/getownerLogin').then(res => commit('set_owner', res.data)),
  set_job: ({ commit }, params = { page: 1 }) => Axios.get(`/api/job`, { params }).then(res => commit('set_job', res.data)),
  set_job_histories: ({ commit }, params = { page: 1 }) => Axios.get(`/api/job/history`, { params }).then(res => commit('set_job_histories', res.data)),
  set_apply_job: ({ commit }, params = { page: 1 }) => Axios.get(`/api/jobshow`, { params }).then(res => commit('set_job', res.data)),
  set_job_apply: ({ commit }, params = { page: 1 }) => Axios.get(`/api/jobapp`, { params }).then(res => commit('set_job', res.data)),
  set_apply_histories: ({ commit }, params = { page: 1 }) => Axios.get(`/api/apply/history`, { params }).then(res => commit('set_apply_histories', res.data)),
  set_apply: ({ commit }, params = { page: 1 }) => Axios.get(`/api/apply/manage`, { params }).then(res => commit('set_apply', res.data)),
}
})
