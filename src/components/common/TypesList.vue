<template>
    <div class="typeList">
        <div class="tabYear">
            <span @click="changeYear(item,index)"  v-for="(item,index) in yearList" :key="index" :class="activeIndex==index?'active':''">{{item}}</span>
        </div>
        <div v-for="(item,index) in yearCar" :key='index' class="list">
            <h2 v-if="typeArr.indexOf(item.exhaust_str+item.max_power_str+item.inhale_type)==-1">
                {{item.exhaust_str}}/{{item.max_power_str}}{{item.inhale_type}}
            </h2>
            <p>{{item.market_attribute.year}}款 {{item.car_name}}</p>
            <p>{{item.horse_power}}马力 {{item.gear_num}}档</p>
            <p>指导价{{item.market_attribute.official_refer_price}} <span>{{item.market_attribute.dealer_price_min}}起</span></p>
            <h1>询问低价</h1>
        </div>
        <div class="bottom">
            <p>询问底价</p>
            <p>本地经销商为你报价</p>
        </div>
    </div>
</template>

<script>
    export default{
        data(){
            return{
                yearShow:'',
                carList:[],
                yearCar:[],
                activeIndex:'',
                typeArr:[]
            }
        },
        computed: {
            yearList: function(){
                let yearList = ['全部'],
                    carList = [];
                this.typeList.forEach(item=>{
                    let year = item.market_attribute.year;
                    if (yearList.indexOf(year) == -1){
                        yearList.push(year);
                    }
                    carList.push(item);
                    this.carList=carList;
                    this.yearCar=carList;
                })
                return yearList;
            }
        },
        props:{
            typeList:{
                type:Array
            }
        },
        methods:{
            getData(){
                let carList = [];
                // 排序
                let sortCar = (arr)=>{
                    return arr.sort((a, b)=>{
                        if (a.exhaust < b.exhaust){
                            return -1;
                        }else if(a.exhaust > b.exhaust){
                            return 1;
                        }else{
                            if (a.max_power < b.max_power){
                                return -1;
                            }else if(a.max_power > b.max_power){
                                return 1;
                            }else{
                                return b.inhale_type - a.inhale_type;
                            }
                        }
                    })
                }
                this.carList = carList;
                this.carList= sortCar(carList);
            },
            changeYear(data,index){
                this.activeIndex = index
                if(data=='全部'){
                    this.yearCar=this.carList
                }else{
                    let arr = this.carList.filter(item=>{
                    let year = item.market_attribute.year;
                    return year == data
                })
                    this.yearCar=arr
                }
            },
        },
        mounted(){
            this.getData()
        }
    }
</script>


<style>
    @import '../../css/typesList.css';
</style>
