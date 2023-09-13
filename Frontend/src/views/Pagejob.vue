<template>
  <div>
    <Navbarpage></Navbarpage>
    <br>
    <br>
    <Searchuser :types="search_types" @onSearch="onSearch($event)" />
    <br>
    <br>
    
    <div class="row xs">
  <div class="col-6 mb-4" v-for="item in job.result" :key="item.j_id">
    <div class="card h-100">
      <div class="row align-items-center">
        <div class="col-4 col-sm-3 text-center">
          <!-- เพิ่ม class "d-flex" เพื่อจัดให้รูปอยู่กลางแนวตั้งและแนวนอน -->
          <div class="d-flex align-items-center justify-content-center">
            <img :src="`/api/uploads/${item.j_image}`" :alt="item.j_name" class="img-apply">
          </div>
        </div>
        <div class="col-8 col-sm-9">
          <div class="card-body">
            <div><i class="fa fa-home" aria-hidden="true"></i>  ชื่อร้าน : {{ item.j_name }}</div>
            <div class="d-flex justify-content-between align-items-center">
              <div><i class="fa fa-user" aria-hidden="true"></i>   ตำแหน่งงาน : {{ item.j_position }}</div>
              <div class="btn-apply">
                <button @click="onDetail(item)" class="btn btn-info btn-orange">
                  <i class="fa fa-check-square-o" ></i>  รายละเอียด
                </button>
              </div>
            </div>
            <div><i class="fa fa-map-marker" aria-hidden="true"></i>  สถานประกอบการ : {{ item.j_location || 'ไม่มีข้อมูล!' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<br>
    <br>

<div class="pagination-container">
  <Pagination :data="job" :page="page" @onPage="onPage($event)" />
</div>
<jobdetailDetailDialog :job="jobDetailItem" @onClose="jobDetailItem = null" @onBooking="jobItem = $event"/>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <div class="row xs" style="background-color: rgb(53, 45, 45); color: white;">
        
        <div class="col-xs-6 col-sm-4 col-xxs">
          <div class="row">
            <div class="col-sm-12">
              <h4 class="heading">Quick Links</h4>
            </div>
            <div class="col-sm-6">
              <ul class="list-unstyled mb0">
               
                <li><a href="https://www.thaijob.com/chiangmai">งานเชียงใหม่</a></li>
                <li><a href="https://www.thaijob.com/songkla">งานสงขลา (หาดใหญ่)</a></li>
                <li><a href="https://www.thaijob.com/phuket">งานภูเก็ต</a></li>
                <li><a href="https://www.thaijob.com/khonkaen">งานขอนแก่น</a></li>
                <li><a href="https://www.thaijob.com/chonburi">งานชลบุรี</a></li>
                
              </ul>
            </div>
            <div class="col-sm-6">
              <ul class="list-unstyled">
               
                <li><a href="https://www.thaijob.com/bangkok">งานกทม</a></li>
                <li><a href="https://www.thaijob.com/hotel">งานโรงแรม</a></li>
                <li><a href="https://www.thaijob.com/samutprakarn">งานสมุทรปราการ</a></li>
                <li><a href="https://www.medjob.in.th/">งานโรงพยาบาล</a></li>
                <li><a href="https://www.thaijob.com/samutsakhon">งานสมุทรสาคร</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div class="col-xs-6 col-sm-4 col-xxs left-border">
          <h4 class="heading">Contact Us</h4>
          <ul class="list-unstyled">
            <li>แจ้งปัญหา</li>
            <li>บริการเบอร์ติดต่อ : 0931575222</li>
            <li>อีเมล์ : thadaphongk63@nu.ac.th</li>
            <li>Line : momooo555zaza</li>
            <li>Facebook : Kenthadarphong</li>
          </ul>
          
          </div>
          <div class="col-xs-6 col-sm-4 col-xxs left-border">
          <h4 class="heading">Contact Us</h4>
          <ul class="list-unstyled">
            <li>แจ้งปัญหา</li>
            <li>บริการเบอร์ติดต่อ : 0931575222</li>
            <li>อีเมล์ : thadaphongk63@nu.ac.th</li>
            <li>Line : momooo555zaza</li>
            <li>Facebook : Kenthadarphong</li>
          </ul>
          <br>
    <br>
   
          </div>
        </div>
      </div>
        
      
            
      
       
        
    
   
  </template>
  
  
  <script>
  import Layoutuser from "@/components/Layoutuser";
  import Searchuser from "@/components/Searchuser";
  import Pagination from "@/components/Pagination";
  import Navbarpage from "@/components/Navbarpage";
  import jobdetailDetailDialog from "./jobdetail";
  import { mapState } from "vuex";
  export default {
  components: {
    Layoutuser  ,
    Searchuser,
    Pagination,
    Navbarpage,
    jobdetailDetailDialog
  
  },
  computed: {
    ...mapState(["job"])
  },
  created() {
    this.$store.dispatch("set_job_apply");
  },
  data() {
    return {
      search_types: [
        { name: "ชื่อร้าน", value: "j_name" },
        { name: "ตำแหน่ง", value: "j_position" },
        { name: "สถานที่", value: "j_location" }
      ],
      page: 1,
      search: "",
      jobItem: null,
      jobDetailItem: null
    };
  },
  mounted() {
    this.$store.dispatch("set_job_apply");
  },
  methods: {
    
    onDetail(item) {
    this.jobDetailItem = item;
  },

    // การแบ่งหน้า Pagination
    onPage(page) {
    this.page = page;
    this.$store.dispatch("set_job_apply", {
      page: this.page,
      ...this.search
    });
  },
  // การค้นหาข้อมูล Filter
  onSearch(search) {
      this.search = search;
      this.page = 1;
      this.$store.dispatch("set_job_apply",
      { page: this.page, 
        ...this.search });
    }
  }
  };
  </script>
  
  <style scoped>
  .btn-menu {
  color: #ffffff;
  background-color: #ced4da;
  margin-right: 7px;
  min-width: 120px;
  }
  .btn.router-link-active {
  background-color: #ff5c05;
  }
  .card {
  color: #525b62;
  border-right: solid 5px #ff5c05;
  }
  .card-body {
  padding-left: 5px;
  }
 
  .btn-apply .btn {
  margin-right: 10px;
  width: 150px;
  margin-top: 15px;
  }
  
  
  .btn-orange {
      background-color: #ff6d43;
      color: white;
      border: 2px solid #ff6d43; 
  }
  
  .btn-orange:hover {
      background-color: #525b62;
      border-color: #525b62; 
  }

  /* CSS สำหรับปรับขนาดการ์ดและบรรทัด */
.row.xs .card {
  margin-bottom: 10px; /* ปรับระยะห่างระหว่างการ์ดในบรรทัด */
}

.row.xs .card img.img-apply {
  max-width: 100%; /* ปรับขนาดภาพในการ์ดให้ไม่เกินความกว้างของการ์ด */
  height: auto;
}

/* ปรับขนาดของการ์ดเมื่อหน้าจอเล็ก (xs) */
@media (max-width: 767px) {
  .row.xs .card {
    width: 100%; /* ทำให้การ์ดเต็มความกว้างของบรรทัด */
  }
}

.row {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: 0px;
    margin-left: 0px;
}

/* CSS เพื่อปรับขนาดรูปภาพให้ตรงขอบของการ์ด */
.card img.img-apply {
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: 0 auto;
  object-fit: cover; /* ปรับขนาดรูปภาพให้เต็มขอบของการ์ดโดยไม่ทำให้สูงหรือกว้างเกิน */
}

.row.xs .card {
  margin-bottom: 10px;
  height: 100%; /* จำกัดความสูงของการ์ดให้เท่ากัน */
}
.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  /* ปรับขนาดและลักษณะของ Pagination ตามความต้องการ */
}
  </style>
  