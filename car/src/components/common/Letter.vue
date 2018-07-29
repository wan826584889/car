<template>
    <div class="letter"
        @touchstart="touchStart"
        @touchmove="touchMove">
        <span v-for="(item,index) in letter" :key="index" @click="letterLink(index)">
            {{item}}
        </span>
    </div>
</template>

<script>
export default{
    props:{
        letter:{
            type:Array,
            default:[]
        },
        letterLink:{
            type:Function
        }
    },
    methods:{
        touchStart(){
            this.height = window.innerWidth/750*100*0.4;
            this.offsetTop = (window.innerHeight - this.height*this.letter.length)/2;
        },
        touchMove(e){
            let touch = e.touches[0];
            let index = parseInt((touch.pageY - this.offsetTop)/20);
            if(index<0){
                index=0;
            }else if(index>this.letter.length-1){
                index=this.letter.length;
            }
            this.letterLink(this.letter[index])
        }
    }
}
</script>