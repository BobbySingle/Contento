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
      this.$router.push("/CampaignManagement");
    } else if (role === "Editor") {
      this.$router.push("/CampaignRequest");
    } else if (role === "Writer") {
      this.$router.push("/TaskManagement");
    } else {
      this.$store.state.authentication.loggedUser = false;
    }
  }
};
</script>