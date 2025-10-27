<script setup>
import { computed, onBeforeMount, reactive, ref, resolveDirective, triggerRef, watch, watchEffect} from 'vue';
import TableComponent from '../components/TableComponent.vue';
import { useProjectStore } from '../stores/project';
import FilterComponent from '../components/FilterComponent.vue';
import ButtonComponent from '../components/ButtonComponent.vue';
import FormComponent from '../components/FormComponent.vue';

    const projectStore = useProjectStore();
    const statusModal = ref(false);
    const isEdit = ref(false);
    const idProject = ref("");
    const inputFilter = ref("");

    onBeforeMount(() => { //Luego añadir loaders y manejo de errores y volver a mounted
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

    const proyectoNuevo = reactive({
        name: "",
        description: "",
        status: ""
    })

    const validacionNombre = ref("");
    const validacionCompletitud = ref(false);
    const disableButton = ref(false);

    watch(() => proyectoNuevo.name, (newValue) => {
        if(newValue.length >= 21){
            validacionNombre.value = "No puede exceder los 20 caractéres"
        }
        else{
            validacionNombre.value = "";
        }
    })

    watchEffect(() => {
        if(!proyectoNuevo.name || !proyectoNuevo.description || !proyectoNuevo.status){
            disableButton.value = true;
        }
        else{
            disableButton.value = false;
        }
    })

    const guardaProyecto = async () => {
        validacionCompletitud.value = false;
        if(!proyectoNuevo.name || !proyectoNuevo.description || !proyectoNuevo.status){
            validacionCompletitud.value = true;
        }
        else{
            await projectStore.saveProject(proyectoNuevo);
            Object.assign(proyectoNuevo, {name: '', description: '', status: ''});
            await projectStore.getProyects();
        }
    }

    const mostrarObjeto = (objeto) => {
        isEdit.value = true;
        proyectoNuevo.name = objeto.name;
        proyectoNuevo.description = objeto.description;
        proyectoNuevo.status = objeto.status;
        idProject.value = objeto.id;
        console.log(proyectoNuevo);
        statusModal.value = true;
    }

    const modificarProyecto = async () => {
        await projectStore.updateProject(proyectoNuevo, idProject.value);
        await projectStore.getProyects();
    }
</script>

<template>
    <h2>Vista de proyectos</h2>
    <h3 v-if="projectStore.isLoadingList">Cargando...</h3>
    <h3 v-else-if="projectStore.loadError">{{ projectStore.loadError }}</h3>
    <div class="container-projects" v-else>
        <FilterComponent :configFilter="{typeInput: 'text', name:'nombreProyecto'}" v-model="inputFilter"/>
    
        <FilterComponent :configFilter="{typeInput: 'select', name: 'estadoProyecto'}" :arregloContenidos="estadosFilter" v-model="opcionSeleccionada"/>
        
        <TableComponent :objetos="projectosVista" @sendObject="mostrarObjeto"/>
    
        <ButtonComponent tipoCreacion="Proyecto" @clickBtn="statusModal = true"/>
    
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
    
                    <button type="submit" v-if="!isEdit" :disabled="projectStore.isSubmiting || disableButton">{{ projectStore.isSubmiting ? 'Creando...' : 'Crear' }}</button>
                    <button type="submit" v-else :disabled="projectStore.isSubmiting || disableButton">{{ projectStore.isSubmiting ? 'Editando...' : 'Editar' }}</button>
                    <p v-if="projectStore.submitError">{{ projectStore.submitError }}</p>
                    <p v-if="validacionCompletitud">Complete todos los campos para el envío</p>
                </form>
            </template>
    
            <template #footer class="footer-modal">
                <div class="footer-modal">
                    <button type="button" @click="statusModal = false; isEdit = false; Object.assign(proyectoNuevo, {name: '', description: '', status: ''}); idProject= ''; projectStore.submitError = null; validacionCompletitud= false;">Salir</button>
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