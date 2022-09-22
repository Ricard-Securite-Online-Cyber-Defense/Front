<template>
    <div
        class="
            h-full w-full
            flex flex-col justify-center items-center gap-2
        "
    >
        <h1>Se connecter</h1>
        <b-field label="Courriel">
            <b-input/>
        </b-field>
        <b-field label="Mot de passe">
            <b-input/>
        </b-field>
        <b-button label="Cliquez" type="is-light"/>
    </div>
</template>

<script>
export default {
    name: "LoginView"
}
</script>

<style scoped>

</style>