<template>
      <div  class="bg-black navBar  md:fixed  w-[100%] z-[99]">  
    <v-navigation-drawer v-model="sidebar" app  class="md:hidden block" @click-outside="sidebar==false">
      <v-list >
       
        <v-list-item-content class="justify-center">
        <v-list-tile class="flex flex-col"
          v-for="item in menuItems"
          :key="item.title"
          >
          <v-list-tile-action>
        
          </v-list-tile-action>
          <v-btn    @click="scroll(item.title)" class="bg-black">{{ item.title }}</v-btn>
          <v-divider class="my-3"></v-divider>
        </v-list-tile>
       </v-list-item-content>
      </v-list>
    </v-navigation-drawer>
    <div class="myContainer">

    <v-toolbar app class="!bg-inherit   text-white ">
     
   
      <v-toolbar-title class="!p-2">
        <div  >
          {{ appTitle }}
        </div>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="md:!hidden !flex" icon @click="sidebar = !sidebar" ><v-icon>mdi-menu</v-icon></v-btn>
      <v-toolbar-items class="md:flex hidden">
        <v-btn
          flat
          v-for="item in menuItems"
          :key="item.title"
         @click="scroll(item.title)"
         
          >
     
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
   
    </v-toolbar>
  </div>

    
  </div>
</template>
<script>
export default {
    data(){
        return{
      appTitle: 'My Portfolio',
      sidebar: false,
      menuItems: [
          { title: 'home', icon: 'mdi-home' },
          { title: 'about', icon: 'mdi-home' },
          { title: 'skills', icon: 'mdi-face' },
          { title: 'projects', icon: 'mdi-lock-open' }
     ]
        }
    },
    methods:{
      scroll(e){
        const el = document.getElementById(e);
      el.scrollIntoView({behavior: "smooth"});
      }
    }
}
</script>