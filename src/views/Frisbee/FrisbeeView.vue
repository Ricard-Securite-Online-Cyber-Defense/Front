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
                :data="frisbees.data"
                paginated
                striped
                :mobile-cards="true"
                :striped="true"
                :paginated="true"
                :per-page="frisbees.per_page"
                :total="frisbees.total"
                :debounce-search="500"
                backend-sorting
                backend-pagination
                backend-filtering
                @page-change="onPageChange"
                @sort="onSort"
                @filters-change="onFilterChange"
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
                        {{props.row.description}}
                    </template>
                </b-table-column>
                <b-table-column field="price" label="Prix" searchable>
                    <template v-slot="props">
                        {{props.row.price}}
                    </template>
                </b-table-column>
                <b-table-column field="range" label="Gamme">
                    <template v-slot="props">
                        {{props.row.range.name}}
                    </template>
                </b-table-column>
                <b-table-column field="range" label="Processus">
                    <template v-slot="props">
                        {{props.row.process.name}}
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
import FrisbeeForm from "@/components/frisbee/FrisbeeForm";

export default {
    name: "FrisbeeView",
    components: {
        FrisbeeForm
    },
    data() {
        return {
            frisbees: {},
            filters: null,
            page: 0,
            sort: null,
        }
    },
    mounted() {
        this.getFrisbee()
    },
    methods: {
        ...mapActions('frisbee', {
            get: 'index',
            delete: 'delete',
            update: 'patch'
        }),
        getFrisbee() {
            this.get({
                ...this.filters,
                page: this.page,
                sort: this.sort
            }).then(({data}) => {
                this.frisbees = data
            })
        },
        updateFrisbee({id, name, description, price, range, ingredients}) {
            this.update({
                name,
                description,
                price,
                range,
                ingredients
            }, id).then(({data}) => {
                console.log("urmomgay")
            })
        },
        createFrisbee({name, description, price, range, ingredients}) {
            this.get({
                name,
                description,
                price,
                range,
                ingredients
            }).then(({data}) => {
                this.frisbees = [...this.frisbees, data]
            })
        },
        deleteFrisbee(id) {
            this.delete(id).then((res) => {
                if (res.status) {
                    this.frisbees = this.frisbees.filter(frisbee => frisbee.id === id)
                }
            })
        },
        onFilterChange(filter) {
            this.filters = Object.keys(filter).map((element) => {
                return {
                    key: element,
                    value: filter[element],
                };
            });
            this.getFrisbee()
        },
        onPageChange(page) {
            this.page = page
            this.getFrisbee()
        },
        onSort(sort) {
            this.sort = sort
            this.getFrisbee()
        }
    }
}
</script>