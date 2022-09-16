<script setup>
const loading = ref(false)

onMounted(() => {})
</script>

<template>
    <div
        style="
            min-height: 100vh;
            background: #f4f2f2;
            display: flex;
            align-items: center;
        "
    >
        <div style="max-width: 400px; margin: 0 auto">
            <a-card title="Sample Card" style="width: 100%">
                <a-form layout="vertical">
                    <a-form-item label="Email">
                        <a-input></a-input>
                    </a-form-item>
                    <a-form-item label="password">
                        <a-input type="password"></a-input>
                    </a-form-item>
                    <a-button
                        type="primary"
                        :loading="loading"
                        @click="loading = true"
                        >Edwin</a-button
                    >
                </a-form>
            </a-card>
        </div>
    </div>
</template>
