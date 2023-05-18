<script setup>
import gridCard from '../../../components/grid-card.vue'
import { ref } from 'vue';
import { reactive } from 'vue'

// do not use same name with ref
const form = reactive({
    bedroom: []
})

const onSubmit = () => {
    console.log('submit!')
}
const houses = ref([{
    src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    name: 'hamburger',
    money: 0,
    bedroom: 0,
    square: 0,
    description: 'hamburger',
    address: 'hamburger address'
},{
    src: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
    name: 'hamburger',
    money: 0,
    bedroom: 0,
    square: 0,
    description: 'hamburger',
    address: 'hamburger address'
},])
const value = ref(100);
const value2 = ref(100);
const marks = ref({
    0: '0',
    10: '10'
})
</script>
<template>
    <div class="mx-10">
        <div class="recommend__title">Nhà đất phù hợp với bạn</div>
        <div class="recommend__filter">
            <div>
                <el-dropdown :hide-on-click="false">
                    <el-button>Khoảng giá</el-button>
                    <template #dropdown>
                        <el-dropdown-menu class="!p-4">
                            <div>Chọn giá tiền</div>
                            <div class="slider-demo-block">
                                <el-slider v-model="value" range :marks="marks" show-stops :max="100"
                                    style="width: 250px;" />
                            </div>
                            <el-button type="primary">Áp dụng</el-button>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                <el-dropdown :hide-on-click="false">
                    <el-button>Diện tích</el-button>
                    <template #dropdown>
                        <el-dropdown-menu class="!p-4">
                            <div>Chọn giá tiền</div>
                            <div class="slider-demo-block">
                                <el-slider v-model="value2" range show-stops :max="10" />
                            </div>
                            <el-button type="primary">Áp dụng</el-button>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>

                <el-dropdown :hide-on-click="false">
                    <el-button>Thêm</el-button>
                    <template #dropdown>
                        <el-dropdown-menu class="!p-4">
                            <el-form label-position="top" label-width="100px" :model="form" style="max-width: 460px">
                                <el-form-item label="Name">
                                    <el-checkbox-group v-model="form.bedroom">
                                        <el-checkbox label="Option A" />
                                        <el-checkbox label="Option B" />
                                        <el-checkbox label="Option C" />
                                        <el-checkbox label="disabled" disabled />
                                        <el-checkbox label="selected and disabled" disabled />
                                    </el-checkbox-group>
                                </el-form-item>
                            </el-form>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div>
                <el-dropdown>
                    <el-button type="primary">
                        Sắp xếp
                    </el-button>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>Action 1</el-dropdown-item>
                            <el-dropdown-item>Action 2</el-dropdown-item>
                            <el-dropdown-item>Action 3</el-dropdown-item>
                            <el-dropdown-item>Action 4</el-dropdown-item>
                            <el-dropdown-item>Action 5</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
        <grid-card :items="houses"></grid-card>
        <div class="recommend__footer">
            <el-button link>Xem tất cả ></el-button>
        </div>
    </div>
</template>
<style scoped>
el-dropdown-menu {
    padding: 12px;
}

.slider-demo-block {
    width: 300px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.slider-demo-block .el-slider {
    margin-top: 0;
    margin-left: 12px;
}

.recommend__filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>