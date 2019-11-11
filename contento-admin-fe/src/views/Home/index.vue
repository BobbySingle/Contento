<template></template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getUser"])
  },
  mounted() {
    let role = this.getUser.role;
    console.log(role);
    if (role === "Marketer") {
      this.$router.push("/ManageCampaign");
    } else if (role === "Editor") {
      this.$router.push("/ApproveRequest");
    } else if (role === "Writer") {
      this.$router.push("/TaskManagement");
    }else if (role === "Admin") {
      this.$router.push("/ManageAccount");
    } else {
      localStorage.clear();
      this.$store.state.authentication.loggedUser = false;
    }
  }
};
</script>