<template>
   <div class="myContainer lg:p-9 md:p-9 sm:p-7 p-6 " >
    <div class="flex flex-col items-center">
    <div class="title text-center  text-red-600 font-bold md:!text-[45px] sm:!text-[35px] !text-[30px] !p-2 " >
        Skills
<div class="bg-red-600 w-[100%] h-[1px] text-center  "></div>
</div>
    </div>
    <div class="grid md:grid-cols-3 sm:grid-cols-2  gap-2 !p-2 skills ">
 <v-card
    class="mx-auto md:my-8 bg-zinc-950  text-white cursor-pointer  !w-[100%] !text-[10px] "
    id="Element"
  title="HTML"
    
    prepend-icon="mdi-language-html5 "
  ></v-card>  <v-card
    class="mx-auto md:my-8 !w-[100%] bg-zinc-950  text-white cursor-pointer  "
    id="Element2"
    title="CSS"
    prepend-icon="mdi-language-css3"
    
  ></v-card>
  <v-card
  id="Element3"
    class="mx-auto md:my-8 !w-[100%]  bg-zinc-950  text-white cursor-pointer  "
     title="TAILWIND"
    prepend-icon="mdi-tailwind "
  ></v-card>   <v-card
  class="mx-auto md:my-8 !w-[100%] bg-zinc-950  text-white cursor-pointer   "
  id="Element4"
    title="JAVA SCRIPT"
    prepend-icon="mdi-language-javascript"

  ></v-card>  <v-card
  id="Element5"
  class="mx-auto md:my-8 !w-[100%] bg-zinc-950  text-white cursor-pointer "
   
    title="VUEJS"
    prepend-icon="mdi-vuejs"

  ></v-card>  <v-card
  class="mx-auto md:my-8  !w-[100%] bg-zinc-950  text-white cursor-pointer   "
  id="Element6"
    title="REACTJS"
    prepend-icon="mdi-react"
  
  ></v-card><v-card
  class="mx-auto md:my-8  !w-[100%] bg-zinc-950  text-white cursor-pointer   "
  id="Element7"
    title="JAVA"
    prepend-icon="mdi-language-java"
  
  ></v-card><v-card
  class="mx-auto md:my-8  !w-[100%] bg-zinc-950  text-white cursor-pointer   "
  id="Element8"
    title="C#"
    prepend-icon="mdi-language-csharp"
  
  ></v-card><v-card
  class="mx-auto md:my-8  !w-[100%] bg-zinc-950  text-white cursor-pointer   "
  id="Element9"
    title="JAVAEE"
    prepend-icon="mdi-language-java"
  
  ></v-card></div>
    </div>
</template>
<script>

export default{
    data(){
        return{
           y:null
        }
    },
mounted(){
    this.myScrollFunc()
},
    watch:{
    y(){
        window.addEventListener("scroll",  this.myScrollFunc);
        console.log(this.y)
    }},
    methods:{
        async  myScrollFunc () {
    
           
    const myID = document.getElementById("Element");
    const myID2 = document.getElementById("Element2");
    const myID3 = document.getElementById("Element3");
    const myID4 = document.getElementById("Element4");
    const myID5 = document.getElementById("Element5");
    const myID6 = document.getElementById("Element6");
    const myID7 = document.getElementById("Element7");
    const myID8 = document.getElementById("Element8");
    const myID9 = document.getElementById("Element9");
this.y = window.scrollY;
  if (this.y >= 30  ) {
    myID.classList.add("anime1")
    myID2.classList.add("anime2")
    myID3.classList.add("anime3")
    myID4.classList.add("anime4")
    myID5.classList.add("anime5")
    myID6.classList.add("anime6")
    myID7.classList.add("anime7")
    myID8.classList.add("anime8")
    myID9.classList.add("anime9")
  }else{
    myID.classList.remove("anime1")
    myID2.classList.remove("anime2")
    myID3.classList.remove("anime3")
    myID4.classList.remove("anime4")
    myID5.classList.remove("anime5")
    myID6.classList.remove("anime6")
    myID7.classList.remove("anime7")
    myID8.classList.remove("anime8")
    myID9.classList.remove("anime9")
  }}
    }
}
</script>
<style scoped>
.anime1{
    animation: anime1 2s   ease-in-out   ;
}
.anime2{
    animation: anime2 4s    ease-in-out   ;
}
.anime3{
    animation: anime3 6s   ease-in-out   ;
}
.anime4{
    animation: anime4 8s   ease-in-out   ;
}
.anime5{
    animation: anime5 10s   ease-in-out   ;
}
.anime6{
    animation: anime6 12s  ease-in-out   ;
}
.anime7{
    animation: anime7 14s  ease-in-out   ;
}
.anime8{
    animation: anime8 16s  ease-in-out   ;
}
.anime9{
    animation: anime9 18s  ease-in-out   ;
}
@keyframes anime1 {
    from{
transform: translateX(100%);
opacity: 0;
    }
    to{
        transform: translateX(0);
        opacity: 1;
    }
}
@keyframes anime2 {
    from{
transform: translateX(100%);
opacity: 0;
    }
    to{
        transform: translateX(0);
        opacity: 1;
    }
}
@keyframes anime3 {
    from{
transform: translateX(100%);
opacity: 0;
    }
    to{
        transform: translateX(0);
        opacity: 1;
    }
}
@keyframes anime4 {
    from{
transform: translateX(100%);
opacity: 0;
    }
    to{
        transform: translateX(0);
        opacity: 1;
    }
}
@keyframes anime5 {
    from{
         transform: translateX(100%);
        opacity: 0;
    }
    to{
        transform: translateX(0);
        opacity: 1;
    }
}
@keyframes anime6 {
    from{
transform: translateX(100%);
opacity: 0;
    }
    to{
        transform: translateX(0);
          opacity: 1;
    }
}
@keyframes anime7 {
    from{
transform: translateX(100%);
opacity: 0;
    }
    to{
        transform: translateX(0);
          opacity: 1;
    }
}@keyframes anime8{
    from{
transform: translateX(100%);
opacity: 0;
    }
    to{
        transform: translateX(0);
          opacity: 1;
    }
}@keyframes anime9{
    from{
transform: translateX(100%);
opacity: 0;
    }
    to{
        transform: translateX(0);
          opacity: 1;
    }
}
.v-title {
    font-size: 95px !important;

}
</style>