<template>
   <div>
    <Navbarlogin></Navbarlogin>
    <div class="register">
        <img src="/img/p1.png" alt="Logo" class="img-logo">
        <div class="card">
            <h1 class="card-header">
                ลงทะเบียนผู้ประกอบการ
            </h1>
            <div class="card-body">
                <form @submit.prevent="onSubmit()">
                    <div class="form-group">
                        <label for="">ชื่อผู้ใช้งาน</label>
                        <input type="text" name="o_username"
                            v-validate="{ required: true, regex: /^[A-Za-z0-9]{6,15}$/ }"
                            v-model.trim="form.o_username"
                            :class="{ 'is-invalid': errors.has('o_username') }"
                            class="form-control">
                        <span class="invalid-feedback">{{ errors.first('o_username') }}</span>
                    </div>
  
                    <div class="form-group">
                        <label for="">รหัสผ่าน</label>
                        <input type="password" name="o_password"
                            v-validate="{ required: true, regex: /^[A-Za-z0-9]{6,15}$/ }"
                            v-model.trim="form.o_password"
                            :class="{ 'is-invalid': errors.has('o_password') }"
                            class="form-control">
                        <span class="invalid-feedback">{{ errors.first('o_password') }}</span>
                    </div>
  
                    <div class="form-group">
                        <label for="">ชื่อ</label>
                        <input type="text" name="o_firstname"
                            v-validate="'required'"
                            v-model.trim="form.o_firstname"
                            :class="{ 'is-invalid': errors.has('o_firstname') }"
                            class="form-control">
                        <span class="invalid-feedback">{{ errors.first('o_firstname') }}</span>
                    </div>
  
                    <div class="form-group">
                        <label for="">นามสกุล</label>
                        <input type="text" name="o_lastname"
                            v-validate="'required'"
                            v-model.trim="form.o_lastname"
                            :class="{ 'is-invalid': errors.has('o_lastname') }"
                            class="form-control">
                        <span class="invalid-feedback">{{ errors.first('o_lastname') }}</span>
                    </div>
  
                    <div v-if="errorMessage" class="alert alert-warning text-center">
                        {{ errorMessage }}
                    </div>
  
                    <div class="form-group buttons">
                      <button type="submit" class="btn btn-block btn-orange">
                        ลงทะเบียน
                       </button>
  
                        <button type="button" @click="onRedirectToLogin()" class="btn btn-secondary btn-block">
                            เข้าสู่ระบบ
                        </button>
                    </div>
                </form>
  
            </div>
        </div>
    </div>
  </div>
  </template>
  
  <script> 
  
  import Navbarlogin from "@/components/Navbarlogin";
  import axios from "axios";
  export default {
    components: {
    Navbarlogin
  },
  data() {
    return {
      form: {
        o_username: "",
        o_password: "",
        o_firstname: "",
        o_lastname: ""
      },
      errorMessage: ""
    };
  },
  methods: {
    // บันทึกข้อมูลลงทะเบียน
    onSubmit() {
    this.$validator.validateAll().then(valid => {
      if (!valid) return;
      axios
        .post("api/owner/register", this.form)
        .then(response => {
          this.onReset();
          this.onRedirectToLogin();
          this.alertify.success("สมัครสมาชิกสำเร็จ"); 
        })
        .catch(err => {
          this.errorMessage = err.response.data.message;
          this.alertify.error("เกิดข้อผิดพลาดในการสำรองข้อมูล"); 
        });
    });
  },
    // ล้างค่า Form
    onReset() {
      this.errorMessage = null;
      this.$validator.reset();
      this.form = {
        o_username: "",
        o_password: "",
        o_firstname: "",
        o_lastname: ""
      };
    },
    // ไปที่หน้าเข้าสู่ระบบ
    onRedirectToLogin() {
      this.$router.push({ name: "loginowner" });
    }
  }
  };
  </script>
  
  <style scoped>
  .register {
  max-width: 500px;
  margin: 2% auto;
  }
  .img-logo {
  width: 40%;
  display: block;
  margin: auto;
  margin-bottom: 30px;
  }
  h1 {
  font-size: 19px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 2px;
  }
  .card-body {
  padding-left: 15%;
  padding-right: 15%;
  }
  .buttons .btn-secondary {
  margin-top: 20px;
  }
  .buttons {
  margin-top: 30px;
  margin-bottom: 50px;
  }
  .btn-orange {
      background-color: #ff6d43;
      color: white;
      transition: background-color 0.3s; 
  }
  
  .btn-orange:hover {
      background-color: black; 
  }
  </style>
  
  
  