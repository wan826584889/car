<template>
    <div class="Img">
        <div class="top">
            <div @click="getYearColor()">颜色</div>
            <div @click="getYearType()">车款</div>
        </div>
        <div id="imgList">
            <ul  v-for="(item,index) in data" :key="index" class="imgList">
                <li v-for="(val,ind) in item.List" :key="ind">
                    <img v-lazy='val.Url' alt="" >
                    <div v-if="ind==0" class="img_wrap">
                        <p>{{item.Name}}</p>
                        <p>{{item.Count}}张></p>
                    </div>
                </li>
                <br/>
            </ul>
        </div>

    </div>
</template>

<script>
    export default{
        data(){
            return{
                imgArr:[],
            }
        },
        computed:{
            data(){
                let arr = this.$store.state.car.allImg.length?this.$store.state.car.allImg:this.imgArr;
                return arr
            }
        },
        methods:{
            getImgArr(){
                fetch('http://baojia.chelun.com/v2-car-getImageList.html?SerialID='+this.$store.state.car.imgId)
                .then(res=>{
                    res.json().then(body=>{
                        if(body.code){
                            body.data.forEach((v)=>{
                                v.List.forEach((item)=>{
                                   item.Url= item.Url.replace('{0}',8)
                                })
                            })
                            this.imgArr = body.data
                        }
                    })
                })
            },
            getYearColor(){
                this.$router.push({
                    path:"/Color"
                })
            },
            getYearType(){
                this.$router.push({
                    path:"/Type"
                })
            }
        },
        mounted(){
            this.getImgArr()
        },
    }
</script>
<style>
@import '../css/Img.css'
</style>
