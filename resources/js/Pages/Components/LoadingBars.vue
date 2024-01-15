<template>
    <div class="absolute bg-gray-700 flex h-full items-center justify-center left-0 opacity-70 rounded top-0 w-full z-10">
        <div id="bars1">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</template>

<script>
export default {
    name: "LoadingBars",
}
</script>

<style scoped>
/**===== bars1 =====*/
#bars1 {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    height: 50px;
    width: 50px;
    margin: -25px 0 0 -25px;
}

#bars1 span {
    position: absolute;
    display: block;
    bottom: 10px;
    width: 9px;
    height: 5px;
    background: rgba(0, 0, 0, 0.68);
    -webkit-animation: bars1 1.5s  infinite ease-in-out;
    animation: bars1 1.2s  infinite ease-in-out;
}

#bars1 span:nth-child(2) {
    left: 11px;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
}

#bars1 span:nth-child(3) {
    left: 22px;
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
}

#bars1 span:nth-child(4) {
    left: 33px;
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
}

#bars1 span:nth-child(5) {
    left: 44px;
    -webkit-animation-delay: 0.8s;
    animation-delay: 0.8s;
}

@keyframes bars1 {
    0% {
        height: 5px;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: rgba(0, 0, 0, 0.25);
    }
    25% {
        height: 30px;
        -webkit-transform: translateY(15px);
        transform: translateY(15px);
        -webkit-transform: translateY(15px);
        transform: translateY(15px);
        background: rgba(2, 2, 2, 0.96);
    }
    50% {
        height: 5px;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: rgba(0, 0, 0, 0.25);
    }
    100% {
        height: 5px;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: rgba(0, 0, 0, 0.25);
    }
}
@-webkit-keyframes bars1 {
    0% {
        height: 5px;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: rgba(0, 0, 0, 0.25);
    }
    25% {
        height: 30px;
        -webkit-transform: translateY(15px);
        transform: translateY(15px);
        background: #ffffff;
    }
    50% {
        height: 5px;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: rgba(0, 0, 0, 0.25);
    }
    100% {
        height: 5px;
        -webkit-transform: translateY(0px);
        transform: translateY(0px);
        background: rgba(0, 0, 0, 0.25);
    }
}
</style>
