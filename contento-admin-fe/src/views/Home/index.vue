<template>
</template>
<script>
export default {
  created(){
        localStorage.setItem("role","Maketer");
  },
  mounted() {
    let role =  localStorage.getItem("role");
    if(role === "Maketer"){
        this.$router.push("/CampaignManagement");
    }else if (role === "Editor"){
        this.$router.push("/CampaignRequest");
    }else if (role === "Writer"){
        this.$router.push("/TaskManagement");
    }
  },
}
</script>