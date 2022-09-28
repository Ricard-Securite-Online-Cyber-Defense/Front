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
                <h1>Process</h1>
                <process-form :title="`Ajouter un process`" @submit="createProcess">
                    <b-button type="is-dark">
                        <b-icon icon="plus"/>
                    </b-button>
                </process-form>
            </div>
            <b-table
                class="w-full flex-auto"
                :data="process"
                paginated
                striped
                :mobile-cards="true"
                :striped="true"
                :paginated="true"
                :per-page="10"
                :total="process.length"
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
                            <process-form :title="`Modifier process ${props.row.id}`" :process="props.row" @submit="updateProcess">
                                <b-button type="is-dark">
                                    <b-icon icon="pen"/>
                                </b-button>
                            </process-form>
                            <b-button type="is-danger" @click="deleteProcess(props.row.id)">
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
import ProcessForm from "@/components/ProcessForm";

export default {
    name: "ProcessView",
    components: {
        ProcessForm
    },
    data() {
        return {
            process: [],
        }
    },
    mounted() {
        this.getProcess()
    },
    methods: {
        ...mapActions('process', {
            index: 'index',
            delete: 'delete',
            update: 'update',
            create: 'create',
        }),
        getProcess() {
            this.index().then((data) => {
                this.formatResult(data)
            })
        },
        updateProcess({id, name, description, steps}) {
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
        createProcess({name, description, steps}) {
            this.create({
                name: name,
                description: description,
                steps: steps
            }).then((data) => {
                this.formatResult(data)
            })
        },
        deleteProcess(id) {
            this.delete(id).then((data) => {
                this.formatResult(data)
            })
        },
        formatResult(data) {
            this.process = data
        }
    }
}
</script>