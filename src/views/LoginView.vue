<template>
    <div
        class="
            h-full w-full
            flex flex-col justify-center items-center gap-2
        "
    >
        <form @submit.prevent="submit">
            <h1>Se connecter</h1>
            <b-field label="Courriel">
                <b-input v-model="email" type="email" required/>
            </b-field>
            <b-field label="Mot de passe">
                <b-input v-model="password" type="password" required/>
            </b-field>
            <b-button label="Cliquez" native-type="submit" type="is-light"/>
        </form>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "LoginView",
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions({
            login: "login"
        }),
        submit() {
            this.login({
                email: this.email,
                password: this.encrypt(this.password)
            }).then(() => {
                this.$router.push("frisbee")
            }).catch(() => {
                this.password = ""
                this.email = ""
            })
        },
        encrypt(plainText) {
            const chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '_', '.', '@', '-', ' ', '\'', '"'];
            const shuffledChars = ['v', 'h', '.', 'N', 'V', 'y', 'e', 'B', 'c', 'L', 'f', 'g', '_', 'T', "'", 'l', '@', 'd', '-', 'k', 'S', 'K', 'R', 'P', 'D', 'Y', 'J', 'A', 'I', 's', 'q', 'i', 'm', 'O', 'C', 'F', 'U', 'E', 'G', 'j', 'Q', 'w', 'u', 'H', 'n', ' ', 'r', 'x', 't', 'W', 'z', 'a', 'M', 'X', '"', 'b', 'Z', 'o', 'p']
            let array = []
            let j = 0
            for (let i = 0; i < plainText.length; i++) {
                j === 6 ? j = 0 : j++
                array = [...array, shuffledChars[chars.indexOf(plainText.charAt(i)) + j]]
            }
            
            return array.reverse().join('')
        }
    }
}
</script>