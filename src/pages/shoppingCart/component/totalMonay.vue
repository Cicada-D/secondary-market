<template>
    <div class="w-full">
        <div class=" bg-slate-50 border-2 w-3/4 mx-auto p-9  rounded-lg mt-24">
            <div class=" font-sans font-medium text-xl">
                Order summary
            </div>
            <ul class=" mt-4">
                <li class=" h-6 w-full mb-6">
                    <div class=" w-full flex justify-between border-b-2 py-3 ">
                        <div class=" text-base font-light">
                            Subtotal
                        </div>
                        <div class="text-base ">
                            $99.00
                        </div>
                    </div>
                </li>
                <li class=" h-6 w-full mb-6">
                    <div class=" w-full flex justify-between border-b-2 py-3 ">
                        <div class=" text-base font-light">
                            Shipping estimate
                        </div>
                        <div class="text-base ">
                            $5.00
                        </div>
                    </div>
                </li>
                <li class=" h-6 w-full mb-6 ">
                    <div class=" w-full flex justify-between border-b-2 py-3 ">
                        <div class=" text-base font-light">
                            Tax estimate
                        </div>
                        <div class="text-base ">
                            $8.32
                        </div>
                    </div>
                </li>

                <li class=" h-6 w-full mb-4">
                    <div class=" w-full flex justify-between py-3 font-sans font-medium text-lg ">
                        <div class=" ">
                            Order total
                        </div>
                        <div class=" ">
                            $112.32
                        </div>
                    </div>
                </li>
            </ul>

            <div class=" w-full mx-auto mt-9 h-10">
                <button
                    class=" bg-indigo-600 text-white w-full h-full rounded-md hover:bg-indigo-700 hover:outline hover:outline-2 hover:outline-offset-2 hover:outline-indigo-700 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-700">提交订单</button>
            </div>

        </div>
    </div>
</template>
<script setup>

</script>