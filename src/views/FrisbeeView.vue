<template>
    <div
        class="
            w-full h-full
            flex items-center justify-center
            p-8 gap-4
        "
    >
        <div class="w-full max-w-[1280px] min-h-[785px]">
            <div class="flex justify-between">
                <h1>Frisbee</h1>
                <frisbee-form :title="`Ajouter un frisbee`" @submit="createFrisbee">
                    <b-button type="is-dark">
                        <b-icon icon="plus"/>
                    </b-button>
                </frisbee-form>
            </div>
            <b-table
                class="w-full flex-auto"
                :data="frisbees"
                paginated
                striped
                :mobile-cards="true"
                :striped="true"
                :paginated="true"
                :per-page="10"
                :total="frisbees.length"
                :debounce-search="500"
            >
                <b-table-column field="id" label="ID" searchable centered>
                    <template v-slot="props">
                        {{props.row.id}}
                    </template>
                </b-table-column>
                <b-table-column field="name" label="Nom" searchable>
                    <template v-slot="props">
                        {{props.row.name}}
                    </template>
                </b-table-column>
                <b-table-column field="descritption" width="300" label="Description">
                    <template v-slot="props">
                        <p class="break-all">
                            {{props.row.description}}
                        </p>
                    </template>
                </b-table-column>
                <b-table-column field="price" label="Prix" searchable>
                    <template v-slot="props">
                        {{props.row.price}}
                    </template>
                </b-table-column>
                <b-table-column field="range" label="Gamme">
                    <template v-slot="props">
                        {{props.row.range[0].name}}
                    </template>
                </b-table-column>
                <b-table-column field="process" label="Processus">
                    <template v-slot="props">
                        {{props.row.process && props.row.process[0] ? props.row.process[0].name : "Non rensaigné"}}
                    </template>
                </b-table-column>
                <b-table-column label="Actions">
                    <template v-slot="props">
                        <div class="flex gap-2">
                            <frisbee-form :title="`Modifier frisbee ${props.row.id}`" :frisbee="props.row" @submit="updateFrisbee">
                                <b-button type="is-dark">
                                    <b-icon icon="pen"/>
                                </b-button>
                            </frisbee-form>
                            <b-button type="is-danger" @click="deleteFrisbee(props.row.id)">
                                <b-icon icon="trash"/>
                            </b-button>
                        </div>
                    </template>
                </b-table-column>
            </b-table>
        </div>
    </div>
</template>

<script>
import {mapActions} from "vuex";
import FrisbeeForm from "@/components/FrisbeeForm";

export default {
    name: "FrisbeeView",
    components: {
        FrisbeeForm
    },
    data() {
        return {
            frisbees: [],
        }
    },
    mounted() {
        this.getFrisbee()
    },
    methods: {
        ...mapActions('frisbee', {
            index: 'index',
            delete: 'delete',
            update: 'update',
            create: 'create',
        }),
        getFrisbee() {
            this.index().then((data) => {
                this.formatResult(data)
            })
        },
        updateFrisbee({id, name, description, price, range, ingredients, process}) {
            this.update({
                id,
                params: {
                    name: name,
                    description: description,
                    price: price,
                    range: range[0],
                    ingredients: ingredients,
                    process: process[0]
                }
            }).then((data) => {
                this.formatResult(data)
            })
        },
        createFrisbee({name, description, price, range, ingredients, process}) {
            this.create({
                name: name,
                description: description,
                price: price,
                range: range[0],
                ingredients: ingredients,
                process: process[0]
            }).then((data) => {
                this.formatResult(data)
            })
        },
        deleteFrisbee(id) {
            this.delete(id).then((data) => {
                this.formatResult(data)
            })
        },
        formatResult(data) {
            this.frisbees = data.map(e => ({
                ...e,
                range: [e.range],
                process: [e.process],
            }))
        }
    }
}
</script>