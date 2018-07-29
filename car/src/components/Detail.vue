<template>
    <div class="detail">
        <div class="img" @click="Img()"><img :src="data.CoverPhoto" alt=""><span>{{data.pic_group_count}}张照片</span></div>
        <div class="info"><p>{{data.market_attribute&&data.market_attribute.dealer_price}}</p> <p>指导价 {{data.market_attribute&&data.market_attribute.official_refer_price}}</p> <div class="action active flex-row"><button data-hover="hover">询问底价</button></div></div>
        <TypesList :typeList='typeList' />
    </div>
</template>

<script>
import TypesList from './common/TypesList.vue'
    export default{
        data(){
            return{
                SerialID:'',
                data:[],
                typeList:[]
            }
        },
        components:{
            TypesList
        },
        beforeCreate:function(){
            this.SerialID=this.$route.query.id
            this.$store.state.car.imgId=this.$route.query.id
                fetch(`https://baojia.chelun.com/v2-car-getInfoAndListById.html?SerialID=${this.SerialID}`)
                .then(res=>{
                    res.json().then(body=>{
                       if(body.code){
                            this.data=body.data
                            this.typeList=body.data.list
                       }else{
                           console.error(body.msg)
                       }
                    })
                })
        },
        methods:{
            Img(){
               this.$router.push({
                    path:"/Img"
                })
            }
        }
    }
</script>
<style>
@import '../css/Detail.css';
</style>
