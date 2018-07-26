<template>
    <div id="main" ref='main'>
        <div class="cont">
            <List :brandList="brandList" :getDetailsList='getDetails'/>
            <Letter :letter="letter" :letterLink="letterLink"/>
            <Sub :Cls="Cls" :detailsList="detailsList" :hideCls="hideCls"/>
        </div>
    </div>
</template>

<script>
import List from './common/List.vue'
import Letter from './common/Letter.vue'
import Sub from './common/Sub.vue'

export default {
   data(){
		return {
			letter:[],
            brandList:[],
            detailsList:[],
            Cls:''
		}
    },
    components:{
        List,
        Letter,
        Sub
    },
    computed:{
        data(){
            return this.$store.state.car.main
        }
    },
	methods:{
		init(){
			fetch('https://baojia.chelun.com/v2-car-getMasterBrandList.html')
				.then(res=>{
					res.json().then(body=>{
                    if(body.code){
                        this.$store.dispatch({
                            type:'main',
                            data:body.data
                        })
                            let letter = [];
                            let brandList = [];
                            let len = -1;
                            this.data.forEach((item) => {
                                let spelling = item.Spelling[0];
                                if (letter[len] == spelling){
                                    brandList[len].list.push(item);
                                }else{
                                    len++;
                                    letter.push(spelling);
                                    brandList.push({
                                        spelling,
                                        list:[item]
                                    })
                                }
                            });
                                letter.unshift('#')
                                this.letter = letter;
                                this.brandList = brandList;
                        }else{
                            alert(body.msg);
                        }
                    })
                })
            
        },
        /**
         * 判断 传过来data的数据类型
         *  string 是滑过事件传来的值 item
         *  number 是点击事件传过来的下标 ind
         */
        letterLink(data){
            if(typeof data==='string'){
                if(data == '#'){
                    return this.$refs.app.scrollTop=0;
                }
                let scrollTop = document.querySelector(`#${data}`).offsetTop;
                this.$refs.main.scrollTop = scrollTop;
            }else if(typeof data=== 'number'){
                document.querySelector('#app').scrollTop=document.querySelectorAll('.cont')[data].offsetTop
            }
        },
        getDetails(id){
            fetch('https://baojia.chelun.com/v2-car-getMakeListByMasterBrandId.html?MasterID='+id)
            .then(res=>{
                res.json().then(body=>{
                    if(body.code){
                        this.detailsList= body.data;
                        this.Cls = 'active';
                    }else{
                        alert(body.msg);
                    }
                })
            })
        },
        hideCls(){
            this.Cls = ''
        }
    },
   
	mounted(){
		this.init()
    }
}
</script>

<style>
	@import '../css/App.css'
</style>
