<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="myContainer lg:p-9 md:p-9 sm:p-7 p-7 " >
<div class="grid grid-cols-2   " >
    <div class="flex flex-col  md:gap-6 gap-3 justify-center   p-2 leading-relaxed ">
    <div class="md:text-[40px] sm:text-[30px] text-[20px] font-bold z-[10]" > <span class="md:text-[20px] sm:text-[15px] text-[10px]">Hi, my name is </span> <br><span class="test text-red-600 absolute "> Mohamed Temagoult</span><br> 
       I am a  <span class="test2 absolute  px-2">  Software Engineer</span> <span  class="test3 px-2  absolute  opacity-0 "> FrontEnd Developer </span ><br> 
    </div> 

    <div class=" flex gap-4">  
        <v-btn class="!w-[auto]"   href="https://github.com/temagoult"
    target="_blank" :ripple="false" icon flat > <v-icon class="md:text-[40px] sm:text-[30px] text-[20px]">mdi-github</v-icon></v-btn>  
        <v-btn class="!w-[auto]" :ripple="false" icon  flat ><v-icon class="!text-[#0a66c2] md:text-[40px] sm:text-[30px] text-[20px]">mdi-linkedin</v-icon></v-btn>
        <v-btn class="!w-[auto]"  :ripple="false" icon flat >  <v-icon class="!text-red-600 md:text-[40px] sm:text-[30px] text-[20px]"> mdi-gmail</v-icon></v-btn>
 
  </div>
  
 
</div>
    <div class="md:h-screen  " > 
        <v-img class="" src="../assets/images/photo.png"></v-img>

</div>

</div>

    </div>
</template>
<script>
export default{
    computed:{
        // eslint-disable-next-line vue/return-in-computed-property
},
data(){
    return{
        
    }
}

}

</script>
<style scoped >
.test2{
    animation: test1 10s 2s   infinite  ;
}
.test3{
    animation: test3 10s 2s   infinite   ;
}
@keyframes test1 {
    from{
    opacity:1;
    
    }
    50%{
        opacity: 0;
       
    }


    100%{
        opacity: 1;
    }
}
@keyframes test3 {
    from{
    opacity: 0;
   
    }
 
    50%{
        opacity: 1;
      
    }
   
    100%{
      
        opacity: 0;   
    }
}

</style>