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
                <h1>Ingredient</h1>
                <ingredient-form :title="`Ajouter un ingredient`" @submit="createIngredient">
                    <b-button type="is-dark">
                        <b-icon icon="plus"/>
                    </b-button>
                </ingredient-form>
            </div>
            <b-table
                class="w-full flex-auto"
                :data="ingredients"
                paginated
                striped
                :mobile-cards="true"
                :striped="true"
                :paginated="true"
                :per-page="10"
                :total="ingredients.length"
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
                <b-table-column label="Actions">
                    <template v-slot="props">
                        <div class="flex gap-2">
                            <ingredient-form :title="`Modifier ingredient ${props.row.id}`" :ingredient="props.row" @submit="updateIngredient">
                                <b-button type="is-dark">
                                    <b-icon icon="pen"/>
                                </b-button>
                            </ingredient-form>
                            <b-button type="is-danger" @click="deleteIngredient(props.row.id)">
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
import IngredientForm from "@/components/IngredientForm";

export default {
    name: "IngredientView",
    components: {
        IngredientForm
    },
    data() {
        return {
            ingredients: [],
        }
    },
    mounted() {
        this.getIngredient()
    },
    methods: {
        ...mapActions('ingredient', {
            index: 'index',
            delete: 'delete',
            update: 'update',
            create: 'create',
        }),
        getIngredient() {
            this.index().then((data) => {
                this.formatResult(data)
            })
        },
        updateIngredient({id, name, description, steps}) {
            this.update({
                id,
                params: {
                    name: name,
                    description: description,
                    steps: steps
                }
            }).then((data) => {
                this.formatResult(data)
            })
        },
        createIngredient({name, description, steps}) {
            this.create({
                name: name,
                description: description,
                steps: steps
            }).then((data) => {
                this.formatResult(data)
            })
        },
        deleteIngredient(id) {
            this.delete(id).then((data) => {
                this.formatResult(data)
            })
        },
        formatResult(data) {
            this.ingredients = data
        }
    }
}
</script>