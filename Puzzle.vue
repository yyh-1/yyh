<template>
<div class="puzzle" :style="{width:width+'px',height:height+'px'}">
<div
    class = "puzzle__block"
    v-for="(item,index) in blockPoints"
    :key="item.id"
    :style="{
        
        width:blockWidth + 'px',
        height:blockHeight + 'px',
        left:item.x + 'px',
        top:item.y + 'px',
        backgroundImage:`url(${img})`,
        backgroundPosition:`-${correctPoints[index].x}px -${correctPoints[index].y}px`,
        opacity:index === blockPoints.length - 1 && 0
        }"
        @click="handleClick"         
        :ref="index === blockPoints.length - 1 ? 'empty' : 'block'"
        :data-correctX = "correctPoints[index].x"
        :data-correctY = "correctPoints[index].y"
      
/>
</div>
</template>

<script>
export default {
    props:{
        width:{
            type:Number,
            default:500
        },
        height:{
            type:Number,
            default:500
        },
        row:{
            type:Number,
            default:3
        },
        col:{
            type:Number,
            default:3
        },
        img:{
            type:String,
            required:true
        }
    },
    computed:{
        blockWidth(){
            return this.width / this.col;
        },
        blockHeight(){
            return this.height / this.row;
        },
        correctPoints(){
            const {row,col,blockWidth,blockHeight} = this;
            const arr = [];
            for(let i = 0;i < row;i ++){
                for(let j = 0;j < row;j ++){
                    arr.push({
                        x:j * blockWidth,
                        y:i * blockHeight,
                        id:new Date().getTime() + Math.random()*100
                    })
                }
            }
            return arr;
        },
        blockPoints(){
            const points = this.correctPoints;
            const length = points.length;
            const lastEle = points[length - 1];
            const newArr = [...points];
            newArr.length = length - 1;
            newArr.sort(() => Math.random() -0.5);
            newArr.push(lastEle);

            return newArr;
        }
    },
    methods: {
        handleClick(e){
            const blockDom = e.target;
            const emptyDom = this.$refs.empty[0];
            if(!this.isAdiacent(blockDom,emptyDom)){
                return;
            }
            const {left,top} = blockDom.style;
            blockDom.style.left = emptyDom.style.left;
            blockDom.style.top = emptyDom.style.top;
            emptyDom.style.left = left;
            emptyDom.style.top = top;
            const winFag = this.checkWin();
            if(winFag){
                this.winGame(emptyDom)
            }
        },
        isAdiacent(blockDom,emptyDom){
            const {left:domLeft,top:domTop,width,height} = blockDom.style;
            const {left:emptyLeft,top:emptyTop,} = emptyDom.style;
            const xDis = Math.floor(Math.abs(parseFloat(domLeft) - parseFloat(emptyLeft)));
            const yDis = Math.floor(Math.abs(parseFloat(domTop) - parseFloat(emptyTop)));
            const flag = (domLeft === emptyLeft && yDis === parseInt(height)) || (domTop === emptyTop && xDis === parseInt(width));

            return flag;
        },
        checkWin(){
            const blockDomArr = this.$refs.block;
            return blockDomArr.every(dom =>{
                const{left:domLeft,top:domTop} = dom.style;
                const{correctx:correctX,correcty:correctY} = dom.dataset;
                const flag = parseInt(domLeft) === parseInt(correctX) && parseInt(domTop) === parseInt(correctY);
                return flag;

            })
        },
        winGame(emptyDom){
                setTimeout(() => {
                    alert('恭喜你!');
                    emptyDom.style.opacity = 1;
                    this.goToNextLevel();
                    setTimeout(() => {
                        this.goToNextLevel();
                    },300)
                },300)
        },
        goToNextLevel(){
            const answerFlag = window.confirm('要玩下一关吗');
            if(answerFlag){
                this.$emit('next');
            }
        }
    },
}
</script>

<style>
.puzzle{
    position:relative;
    border:2px solid #ccc ;
}
.puzzle__block{
    box-sizing:border-box;
    position:absolute;
    border:1px solid #fff;
    transition:all .1s;
    
}
</style>