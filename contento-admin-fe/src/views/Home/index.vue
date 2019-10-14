<template></template>
<script>
export default {
  created() {
    this.$axios({
      method: "post",
      url: "authenticationservice/api/authentication/login",
      data: {
        email: "hieuntse62694@gmail.com",
        password: "Hieunguyen1@"
      }
    })
      // axios
      //   .get(`http://34.87.31.23:8066/api/campaign`)
      .then(rs => {
        let token = rs.data.token;
        let profile = {
          fullname: rs.data.fullName,
          imagePath: rs.data.imagePath,
          role: rs.data.role
        };
        localStorage.setItem("access-token", token);
        this.$axios.defaults.headers["Authorization"] = token;
        localStorage.setItem("role", profile.role);
      })
      .catch(er => {
        console.log(er);
      });
  },
  mounted() {
    let role = localStorage.getItem("role");
    if (role === "Marketer") {
      this.$router.push("/CampaignManagement");
    } else if (role === "Editor") {
      this.$router.push("/CampaignRequest");
    } else if (role === "Writer") {
      this.$router.push("/TaskManagement");
    }
  }
};
</script>