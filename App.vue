<template>
<div>
<d-puzzle  v-bind = "puzzleConfig[level]" @next = "handleNext"/>
</div>
</template>

<script>
import DPuzzle from './Puzzle'
export default {
    components:{
        DPuzzle
    },
    data(){
        return{
            level:0,
            puzzleConfig:[
                { row: 3,col: 3,img:'./puzzle.img/zr2.jpg'},
                { row: 4,col: 4,img:'./puzzle.img/zr2.jpg'},
                { row: 5,col: 5,img:'./puzzle.img/zr2.jpg'},
                { row: 6,col: 6,img:'./puzzle.img/zr2.jpg'},
                { row: 7,col: 7,img:'./puzzle.img/zr2.jpg'},
            ]
        }
    },
    methods:{
        handleNext(){
            ++ this.level;
            if(this.level = this.puzzleConfig.length){
                const answerFlag = window.confirm('恭喜你全部通关');
                if(answerFlag){
                    this.level = 0;
                }
            }
        }
    }
}
</script>