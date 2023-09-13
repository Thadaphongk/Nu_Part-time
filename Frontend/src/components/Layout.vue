<template>
  <div class="layout">
      <Navbar />
      <div class="container-fluid">
       <slot name="buttons"></slot>
          <div class="row">
            <Sidebar />
            <div class="col-sm-10">
                 <slot></slot>
              </div>
              <div class="col-sm-3">
                  
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
export default {
components: {
  Navbar,
  Sidebar
}
};
</script>

<style scoped>
.container-fluid {
margin-top: 50px;
margin-left: 0px;
}

.row {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    margin-right: 0px;
    margin-left: 50px;
}

</style>

