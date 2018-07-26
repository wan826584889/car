<template>
    <div class="color">
        <p data-hover="hover" @click="allImg()">全部颜色</p> 
        <div>
            <p class="c-type">
                <span v-for="(item,index) in yearArr" :class="index==ind?'active':''" :key="index" @click="yearData(item,index)">
                    {{item}}
                </span>
            </p>
            <ul >
                <li v-for="(item,index) in data" :key="index" @click="allImg(item)">
                    <span :style="{background:item.Value}" ></span>{{item.Name}}
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                data:[],
                yearArr:[],
                ind:0
            }
        },
        mounted(){
            this.getYearColor()
        },
        methods:{
            getYearColor(){
                fetch('http://baojia.chelun.com/v2-car-getModelImageYearColor.html?SerialID='+this.$store.state.car.imgId)
                .then(res=>{
                    res.json().then(body=>{
                        if(body.code){
                            this.$store.dispatch({
                                type:'imgArr',
                                data:body.data
                            })
                            for(let i in body.data){
                                this.yearArr.unshift(i)
                                this.data=body.data[i]
                            }
                            
                        }
                    })
                })
            },
            yearData(item,index){
                this.ind = index
                for(let i in this.$store.state.car.imgArr){
                    if(i==item){
                        this.data=this.$store.state.car.imgArr[i]
                    }
                }
            },
            allImg(item){
                if(item){
                    fetch('http://baojia.chelun.com/v2-car-getImageList.html?SerialID='+this.$store.state.car.imgId+'&ColorID='+item.ColorId)
                    .then(res=>{
                        return res.json()
                    })
                    .then(body=>{
                        console.log(this.$store.state.car.imgId)
                        body.data.forEach((v)=>{
                            v.List.forEach((item)=>{
                                item.Url= item.Url.replace('{0}',8)
                            })
                        })
                        console.log(body.data)
                        this.$store.state.car.allImg=body.data
                    })
                }else{
                    fetch('http://baojia.chelun.com/v2-car-getImageList.html?SerialID='+this.$store.state.car.imgId)
                    .then(res=>{
                        return res.json()
                    })
                    .then(body=>{
                        body.data.forEach((v)=>{
                            v.List.forEach((item)=>{
                                item.Url= item.Url.replace('{0}',8)
                            })
                        })
                        this.$store.state.car.allImg=body.data
                    })
                }
                this.$router.push({
                    path:"/Img"
                })
            }
        }
}
</script>

<style>
@import '../css/Color.css'
</style>
