<template>
    <div ref="master" :class='"master "+Cls'
        @touchmove.stop='touchMove'
        @touchstart.stop='touchStart'
        @touchend='touchEnd'>
        <div v-for="(item,index) in detailsList" :key="index">
            <p class="name">{{item.GroupName}}</p>
            <dl v-for="(val,ind) in item.GroupList" :key="ind" @click="click(val.SerialID)">
               <dd><img :src="val.Picture"></dd> 
                <dt>
                    <p>{{val.AliasName}}</p>
                    <p>{{val.DealerPrice}}</p>
                </dt>
            </dl>    
        </div>
    </div>
</template>

<script>
    export default{
        props:{
            detailsList:{
                type:Array
            },
            Cls:{
                type:String
            },
            hideCls:{
                type:Function
            }
        },
        methods:{
            touchStart(e){
                this.startTouch = e.touches[0];
            },
            touchMove(e){
                let touch = e.touches[0];
                let moveX = touch.pageX - this.startTouch.pageX;
                let moveY = touch.pageY - this.startTouch.pageY;
                this.moveX = moveX;
                this.moveY = moveY;
                moveX<0?'':this.$refs.master.style = `transform:translate3d(${moveX}px,0,0)`;
            },
            touchEnd(e){
                this.$refs.master.style =``;
                this.moveX<100?'':this.hideCls()
            },
            click(id){
                this.$router.push({
                    path:"/detail?id="+id
                })
            }
        }
    }

</script>