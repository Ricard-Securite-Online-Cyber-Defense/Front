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
                                <b-input name="name" v-model="process.name" required/>
                            </b-field>
                            <b-field label="Description">
                                <b-input name="name" type="textarea" v-model="process.description" required/>
                            </b-field>
                            <b-field label="Steps">
                                <b-taginput
                                    v-model="process.steps"
                                    :data="steps"
                                    autocomplete
                                    :open-on-focus="true"
                                    field="name"
                                    icon="tag"
                                    allow-new
                                    :required="!process.steps"
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
    name: "ProcessForm",
    props: {
        process: {
            required: false,
            type: Object,
            default: () => ({
                name: "",
                description: "",
                steps: null
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
            steps: [],
            showModal: false
        }
    },
    methods: {
        ...mapActions('step', {
            getStepsList: 'index'
        }),
        getSteps() {
            this.getStepsList()
                .then((data) => {
                    this.steps = data
                })
        },
        submit() {
            this.showModal = false
            this.$emit('submit', this.process)
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
        this.getSteps()
    }
}
</script>