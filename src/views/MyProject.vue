<template>
       <div class="myContainer lg:p-9 md:p-9 sm:p-7 p-6 " >
    <div class="flex flex-col items-center !p-2 ">

    <div class="title text-center  text-red-600 font-bold md:!text-[45px] sm:!text-[35px] !text-[30px] !p-2 " >
        Projects
<div class="bg-red-600 w-[100%] h-[1px]"></div>


    </div>

    </div>
    <div class="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 md:gap-4 gap-2 !p-2  " id="element">

<v-card
class="mx-auto !w-[100%]"

>
<v-img
  src="../assets/images/one.png"

  cover

></v-img>

<v-card-title>
template Houter
</v-card-title>

<v-card-subtitle>
 one of my best work
</v-card-subtitle>

<v-card-actions>
  <v-btn
  color="red"
    variant="text"
    href="https://github.com/temagoult/temaplateHouter"
    target="_blank"
  >
 see more
  </v-btn>


</v-card-actions>


</v-card>
<v-card
class="mx-auto !w-[100%]"

>
<v-img
  src="../assets/images/recentWork.png"

  cover
></v-img>

<v-card-title>
 Dream Agency 
</v-card-title>

<v-card-subtitle>
 agency travel
</v-card-subtitle>

<v-card-actions>
  <v-btn
    color="red"
    variant="text"
    href="https://github.com/temagoult/my-Agency-Template"
    target="_blank"
  >
 see more
  </v-btn>


</v-card-actions>


</v-card>
<v-card
class="mx-auto !w-[100%]"

>
<v-img
  src="../assets/images/blog.png"
height="175"
  cover
></v-img>

<v-card-title>
 Antropologica
</v-card-title>

<v-card-subtitle>
  phd sudents blog(current project)
</v-card-subtitle>

<v-card-actions>
  <v-btn
  color="red"
    variant="text"
   
   href="https://github.com/temagoult/antropologycaProject"
   target="_blank"

  >
 see more
  </v-btn>


</v-card-actions>


</v-card>
</div>
<div class="flex justify-center">
  <v-btn
  color="red"
    variant="text"
    href="https://github.com/temagoult"
    target="_blank"
    class="underline md:!text-[20px] sm:!text-[17px] !text-[13px] !p-2 text-center"
  >
 see more
  </v-btn>
</div>
       </div>
</template>
<script>
  export default {
    data: () => ({
      show: false,
      y:null
    }),mounted(){
    this.myScrollFunc()
},
    watch:{
    y(){
        window.addEventListener("scroll",  this.myScrollFunc);
        console.log(this.y+"ss")
    }},
    methods:{
        async  myScrollFunc () {
    
           
    const myID = document.getElementById("element");
   
this.y = window.scrollY;
  if (this.y >= 900  ) {
    myID.classList.add("animation")
   
  }else{
    myID.classList.remove("animation")

  }}},
  }
</script>
<style scoped>
.animation{
    animation: animation 3s   ease-in-out   ;
}
@keyframes animation {
    from{
transform: translateY(100%);
opacity: 0;
    }
    to{
        transform: translateY(0);
        opacity: 1;
    }
}
</style>