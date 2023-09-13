<template>
   <nav class="navbar navbar-expand-sm ">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="/img/logo1.png" alt="Logo">
    </a>
  </div>
  <a @click="onLogout()" class="btn-logout">
    <i class="fa fa-sign-out" aria-hidden="true"></i>
</a>
</nav>

     

        
</template>
<script>
import axios from 'axios';
export default {
   name:"navbar",
   methods:  {
    onLogout(){
      axios
      .post("/api/account/logout")
      .then(response =>{
        this.$store.commit("set_user", null);
        console.log(this.$store.state.user);
        this.$router.push({name : "Pagejob"});
      })
      .catch(error => alert(error.response.data.message));
    }
   }
};
</script>
<style scoped>
.navbar {
  background-color: #ffffff;
  height: 60px;
  border-bottom: solid 4px #ff6d43;
  padding-right: 0;
  
}
.navbar-brand img {
  width: 350px;
  height: 350px;
}

.btn-logout {
  width: 80px;
  height: 60px;
  color: #ffffff;
  background-color: #ff6d43;
  font-size: 24px;
  text-align: center;
  line-height: 60px;
  cursor: pointer;
  
}

.btn-logout i {
    color: white; /* กำหนดสีขาวให้กับไอคอนภายใน .btn-logout */
}
</style>
