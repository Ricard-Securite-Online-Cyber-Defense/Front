<template>
    <div>
        <div @click="showModal = true">
            <slot/>
        </div>
        <b-modal
            v-model="showModal"
            has-modal-card
            trap-focus
            :destroy-on-hide="false"
            aria-role="dialog"
            :aria-label="title"
            close-button-aria-label="Fermer"
            aria-modal
        >
            <template>
                <div class="modal-card">
                    <header class="modal-card-head">
                        <p class="modal-card-title">
                            {{title}}
                        </p>
                        <button
                            type="button"
                            class="delete"
                            @click="$emit('close')"/>
                    </header>
                    <section class="modal-card-body min-w-[500px]">
                        <form @submit="submit">
                            <b-field label="Nom">
                                <b-input name="name" :value="frisbee.name"/>
                            </b-field>
                            <b-field label="Description">
                                <b-input name="name" type="text-area" :value="frisbee.description"/>
                            </b-field>
                            <b-field label="Price">
                                <b-input name="name" type="number" :value="frisbee.price"/>
                            </b-field>
                            <b-field label="Gamme">
                                <b-select v-model="frisbee.range" expanded>
                                    <option :value="range" v-for="range in ranges" :key="`range_${range.id}`">
                                        {{range.name}}
                                    </option>
                                </b-select>
                            </b-field>
                            <b-field label="Processus">
                                <b-select v-model="frisbee.process" expanded>
                                    <option :value="process" v-for="process in processes" :key="`process_${process.id}`">
                                        {{process.name}}
                                    </option>
                                </b-select>
                            </b-field>
                            <b-field label="Ingredients">
                                <b-taginput
                                    v-model="frisbee.ingredients"
                                    :data="ingredients"
                                    autocomplete
                                    :open-on-focus="true"
                                    field="name"
                                    icon="tag"
                                    @typing="onIngredientTyping"
                                />
                            </b-field>
                        </form>
                    </section>
                    <footer class="modal-card-foot">
                        <b-button
                            label="Annuler"
                            @click="$emit('close')"
                            type="is-danger"
                        />
                        <b-button
                            native-type="submit"
                            label="Sauvegarder"
                            type="is-dark"
                        />
                    </footer>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
    name: "FrisbeeForm",
    props: {
        frisbee: {
            required: false,
            type: Object,
            default: () => ({
                name: "",
                description: "",
                price: null,
                range: null,
                ingredients: [],
            })
        },
        title: {
            required: false,
            type: String,
            default: "Editer"
        }
    },
    data() {
        return {
            ranges: [],
            ingredients: [],
            processes: [],
            showModal: false
        }
    },
    methods: {
        ...mapActions('range', {
            getRangesList: 'index'
        }),
        ...mapActions('process', {
            getProcessesList: 'index'
        }),
        ...mapActions('ingredient', {
            getIngredientsList: 'index'
        }),
        getRanges(value) {
            this.getRangesList({filter: {name: value}})
                .then(({data}) => {
                    this.ranges = data
                })
        },
        getProcesses(value) {
            this.getProcessesList({filter: {name: value}})
                .then(({data}) => {
                    this.ranges = data
                })
        },
        onIngredientTyping(value) {
            this.getRangesList({filter: {name: value}})
                .then(({data}) => {
                    this.ingredients = data
                })
        },
        submit() {
            this.$emit('submit', this.frisbee)
        }
    },
    mounted() {
        this.getRanges()
        this.getProcesses()
    }
}
</script>

<style scoped>

</style>