<template>
    <div>
        <div @click="showModal = true">
            <slot/>
        </div>
        <b-modal
            v-model="showModal"
            has-modal-card
            trap-focus
            :destroy-on-hide="true"
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
                    <form @submit.prevent="submit">
                        <section class="modal-card-body min-w-[500px]">
                            <b-field label="Nom">
                                <b-input name="name" v-model="frisbee.name" required/>
                            </b-field>
                            <b-field label="Description">
                                <b-input name="name" type="textarea" v-model="frisbee.description" required/>
                            </b-field>
                            <b-field label="Price">
                                <b-input name="name" type="number" v-model="frisbee.price" required/>
                            </b-field>
                            <b-field label="Gamme">
                                <b-taginput
                                    v-model="frisbee.range"
                                    :data="ranges"
                                    autocomplete
                                    :open-on-focus="true"
                                    field="name"
                                    icon="tag"
                                    allow-new
                                    maxtags="1"
                                    :required="!frisbee.ingredients"
                                    :create-tag="addToTagInput"
                                />
                            </b-field>
                            <b-field label="Processus">
                                <b-taginput
                                    v-model="frisbee.process"
                                    :data="processes"
                                    autocomplete
                                    :open-on-focus="true"
                                    field="name"
                                    icon="tag"
                                    allow-new
                                    maxtags="1"
                                    :required="!frisbee.ingredients"
                                    :create-tag="addToTagInput"
                                />
                            </b-field>
                            <b-field label="Ingredients">
                                <b-taginput
                                    v-model="frisbee.ingredients"
                                    :data="ingredients"
                                    autocomplete
                                    :open-on-focus="true"
                                    field="name"
                                    icon="tag"
                                    allow-new
                                    :required="!frisbee.ingredients"
                                    :create-tag="addToTagInput"
                                />
                            </b-field>
                        </section>
                        <footer class="modal-card-foot">
                            <b-button
                                label="Annuler"
                                @click="showModal = false"
                                type="is-danger"
                            />
                            <b-button
                                native-type="submit"
                                label="Sauvegarder"
                                type="is-dark"
                            />
                        </footer>
                    </form>
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
                ingredients: null,
                process: null
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
        getRanges() {
            this.getRangesList()
                .then(({data}) => {
                    this.ranges = data
                })
        },
        getProcesses() {
            this.getProcessesList()
                .then((data) => {
                    this.processes = data
                })
        },
        getIngredients() {
            this.getIngredientsList()
                .then((data) => {
                    this.ingredients = data
                })
        },
        submit() {
            this.showModal = false
            this.$emit('submit', this.frisbee)
        },
        addToTagInput(value) {
            if (!value.id) {
                return {
                    name: value
                }
            } else {
                return value
            }
        }
    },
    mounted() {
        this.getRanges()
        this.getProcesses()
        this.getIngredients()
    }
}
</script>