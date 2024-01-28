<template>
  <v-app class>
<NavBar></NavBar>
<Content id="home"></Content>
<About id="about"></About>
<MySkills id="skills"></MySkills>
<Projects id="projects"></Projects>
</v-app>
</template>

<script>
import NavBar from './views/NavBar.vue';
import Content from './views/Content.vue';
import MySkills from './views/MySkills.vue';
import Projects from './views/MyProject.vue';
import About from './views/AboutMe.vue';
export default {
  name: "App",
  components:{
    NavBar,Content,MySkills,Projects,About
  },
  data(){
    return {

    }
  },
};
</script>
<style>

@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
</style>