<template>
    <div class="main">
        <div class="cont"></div>
        <div v-for="(item,index) in brandList" :key="index" class="cont" :id="item.spelling">
                <p  class="spelling">{{item.spelling}}</p>
                <dl v-for="(val,ind) in item.list" :key="ind" @click="getDetailsList(val.MasterID)">
                    <!-- <dd><img :src="val.CoverPhoto" alt=""></dd> -->
                    <dd><img v-lazy='val.CoverPhoto' alt=""></dd>
                    <dt>{{val.Name}}</dt>
                </dl>
        </div>
    </div>
</template>

<script>
    export default{
        props:{
            brandList:{
                type:Array,
                default:[]
            },
            getDetailsList:{
                type:Function,
                default:()=>{}
            }
        }
    }
</script>