<script setup>
import { computed, onBeforeMount, ref} from 'vue';
import TableComponent from '../components/TableComponent.vue';
import { useProjectStore } from '../stores/project';
import FilterComponent from '../components/FilterComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import FormComponent from '../components/FormComponent.vue';
import { useProjectForm } from '../composibles/useProjectForm';

    const projectStore = useProjectStore();
    const {
        proyectoNuevo, 
        isEdit, 
        validacionNombre, 
        disableButton, 
        mostrarObjeto, 
        resetearForm, 
        guardaProyecto, 
        modificarProyecto} = useProjectForm();
    const statusModal = ref(false);
    const inputFilter = ref("");

    onBeforeMount(() => {
        projectStore.getProyects();
    })

    const opcionSeleccionada = ref("");

    const projectosVista = computed(() => { //Aquí manejamos la lógica del filtrado

        if(opcionSeleccionada.value != ""){
            return proyectosFiltradosNombre.value.filter((project) => project.status === opcionSeleccionada.value);
        }

        return proyectosFiltradosNombre.value;
    });

    const proyectosFiltradosNombre = computed(() => {
        if(inputFilter.value != ""){
            return projectStore.projects.filter((project) => project.name.toLowerCase().includes(inputFilter.value.toLowerCase()));
        }

        return projectStore.projects;
    })

    const estadosFilter = computed(() =>{
        return [...new Set(proyectosFiltradosNombre.value.map((project) => project.status))]; 
    })  //Aquí seleccionamos los estados para pasar al filtro


    const mostrarModal = (objeto) => {
        mostrarObjeto(objeto);
        statusModal.value = true;
    }

    const cerrarModal = () => {
        resetearForm();
        statusModal.value = false;
        projectStore.submitError = null;
    }

</script>

<template>
    <h2>Vista de proyectos</h2>
    <h3 v-if="projectStore.isLoadingList">Cargando...</h3>
    <h3 v-else-if="projectStore.loadError">{{ projectStore.loadError }}</h3>
    <div class="container-projects" v-else>
        <div class="header-vista">
            <FilterComponent :configFilter="{typeInput: 'text', name:'nombreProyecto'}" v-model="inputFilter"/>
        
            <FilterComponent :configFilter="{typeInput: 'select', name: 'estadoProyecto'}" :arregloContenidos="estadosFilter" v-model="opcionSeleccionada"/>
    
            <ButtonComponent tipoCreacion="Proyecto" @clickBtn="statusModal = true"/>
        </div>
        
        <TableComponent :objetos="projectosVista" @sendObject="mostrarModal"/>
    
        <FormComponent v-if="statusModal">
            <template #header>
                <div class="header-modal">
                    <h3 v-if="!isEdit">Crea un nuevo Proyecto</h3>
                    <h3 v-else>Edita el Proyecto</h3>
                </div>
            </template>
    
            <template #body>
                <form class="form-proyect"  @submit.prevent="isEdit ? modificarProyecto() : guardaProyecto()"> 
                    <label for="nombre">Nombre del proyecto</label>
                    <input type="text" name="nombre" id="nombre" v-model="proyectoNuevo.name">
                    <p v-if="validacionNombre" class="error-form">{{ validacionNombre }}</p>
                    
                    <label for="descripcion">Descripción del proyecto</label>
                    <input type="text" name="descripcion" id="dsc" v-model="proyectoNuevo.description">
                    
                    <label for="status">Estado del Proyecto</label>
                    <select name="status" id="status" v-model="proyectoNuevo.status"> <!--Esto se tiene que modificar luego con los datos dinamicamente-->
                        <option value="">Selecciona el estado</option>
                        <option value="activo">Activo</option>
                        <option value="inactivo">Inactivo</option>
                    </select>
    
                    <button type="submit" v-if="!isEdit" :disabled="projectStore.isSubmiting || disableButton || validacionNombre != 0">{{ projectStore.isSubmiting ? 'Creando...' : 'Crear' }}</button>
                    <button type="submit" v-else :disabled="projectStore.isSubmiting || disableButton || validacionNombre != 0">{{ projectStore.isSubmiting ? 'Editando...' : 'Editar' }}</button>
                    <p v-if="projectStore.submitError">{{ projectStore.submitError }}</p>
                </form>
            </template>
    
            <template #footer class="footer-modal">
                <div class="footer-modal">
                    <button type="button" @click="cerrarModal">Salir</button>
                </div>
            </template>
        </FormComponent>
    </div>
</template>

<style scoped>
    .form-proyect{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
    }
    button{
        width: 80px;
        height: 60px;
        background-color: yellow;
    }
    .footer-modal{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 30px;
        margin-top: 30px;
    }
    .header-modal{
        display: flex;
        justify-content: center;
        margin-bottom: 30px;
    }
    .error-form{
        margin-top: 0px;
        margin-bottom: 0px;
        color: red;
    }
</style>