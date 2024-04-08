<template>
    <div class=" my-6 mx-auto w-10/12">
        <div class=" mt-6 pb-6 ">
            <h1>商品</h1>
        </div>
        <div class=" w-full border-2 bg-white ">
            <div v-for="item in projects" :key="item.id" class=" relative rounded border-b-2 ">
                <div class=" m-4 w-10/12 flex">
                    <div class=" m-2 rounded overflow-hidden ">
                        <img :src='item.imgSrc' alt="" class=" w-20">
                    </div>
                    <div class=" m-2">
                        <ul>
                            <li class=" mb-1">{{ item.name }}</li>
                            <li class=" text-sm font-light">{{ item.style }}</li>
                            <li class=" text-sm font-light">{{ item.describe }}</li>
                            <li class=" mt-9">{{ item.price }}</li>
                        </ul>
                    </div>

                    <div class=" absolute right-6 top-6 h-32">
                        <div>
                            <button class=" group">
                                <svg t="1712586588076" class="icon " viewBox="0 0 1024 1024" version="1.1"
                                    xmlns="http://www.w3.org/2000/svg" p-id="1540" width="20" height="20">
                                    <path class=" group-hover:fill-slate-500"
                                        d="M861.184 192.512q30.72 0 50.688 10.24t31.744 25.6 16.384 33.28 4.608 33.28q0 7.168-0.512 11.264t-0.512 7.168l0 6.144-67.584 0 0 537.6q0 20.48-8.192 39.424t-23.552 33.28-37.376 23.04-50.688 8.704l-456.704 0q-26.624 0-50.176-8.192t-40.448-23.04-26.624-35.84-9.728-47.616l0-527.36-63.488 0q-1.024-1.024-1.024-5.12-1.024-5.12-1.024-31.744 0-13.312 6.144-29.696t18.432-30.208 31.744-23.04 46.08-9.216l91.136 0 0-62.464q0-26.624 18.432-45.568t45.056-18.944l320.512 0q35.84 0 49.664 18.944t13.824 45.568l0 63.488q21.504 1.024 46.08 1.024l47.104 0zM384 192.512l320.512 0 0-64.512-320.512 0 0 64.512zM352.256 840.704q32.768 0 32.768-41.984l0-475.136-63.488 0 0 475.136q0 21.504 6.656 31.744t24.064 10.24zM545.792 839.68q17.408 0 23.552-9.728t6.144-31.232l0-475.136-63.488 0 0 475.136q0 40.96 33.792 40.96zM738.304 837.632q18.432 0 24.576-9.728t6.144-31.232l0-473.088-64.512 0 0 473.088q0 40.96 33.792 40.96z"
                                        p-id="1541" fill="#bfbfbf"></path>
                                </svg>
                            </button>

                        </div>
                    </div>
                </div>

            </div>
            <div class=" border-b-2 mb-2">
                <div class=" m-4 border-b-2">
                    <div class=" flex justify-between mb-2 text-sm font-normal">
                        <div>
                            原价格
                        </div>
                        <div>
                            $321
                        </div>
                    </div>
                    <div class=" flex justify-between mb-2 text-sm font-normal">
                        <div>
                            优惠
                        </div>
                        <div>
                            $0
                        </div>
                    </div>
                    <div class=" flex justify-between mb-2 text-sm font-normal">
                        <div>
                            总价格
                        </div>
                        <div>
                            $321
                        </div>
                    </div>
                </div>
                <div class=" m-4 ">
                    <div class=" flex justify-between mb-2 text-sm font-normal">
                        <div class=" text-base font-semibold">
                            总价格
                        </div>
                        <div class=" text-base font-semibold">
                            $321
                        </div>
                    </div>
                </div>
            </div>

            <div class=" w-11/12 mx-auto mb-2 h-9">
                <button
                    class=" bg-indigo-600 text-white w-full h-full rounded-md hover:bg-indigo-700 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-indigo-700 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-700">提交订单</button>
            </div>
        </div>



    </div>
</template>

<script setup>
const projects = [
    {
        id: '1',
        name: '长袖',
        style: '黑色',
        describe: '保暖很厚',
        price: '$123',
        imgSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-01.jpg',
    },
    {
        id: '2',
        name: '长袖',
        style: '黑色',
        describe: '保暖很厚',
        price: '$123',
        imgSrc: 'https://tailwindui.com/img/ecommerce-images/checkout-page-02-product-02.jpg',
    }
]
</script>