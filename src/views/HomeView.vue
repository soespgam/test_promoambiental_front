<template>
  <div class="row">
    <div class="row">
      <div class="col-10 offset-1 mt-3">
        <div class="alert alert-primary text-center" role="alert">
          <h3>Seguimiento de Clientes</h3>
        </div>
      </div>
    </div>

    <div class="col-12" style="padding: 20px">
      <table class="table table-striped table-bordered">
        <thead class="thead-light">
          <tr>
            <th scope="col"><b>#</b></th>
            <th scope="col"><b>Nombres</b></th>
            <th scope="col"><b>Apellidos</b></th>
            <th scope="col"><b>Asunto</b></th>
            <th scope="col"><b>correo</b></th>
            <th scope="col"><b>Telefono</b></th>
            <th scope="col"><b>fecha</b></th>
            <th scope="col"><b>dias</b></th>
            <th scope="col"><b>fecha proximo seguimiento</b></th>
            <th scope="col"><b>Opciones</b></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="seguimiento in seguimientos" :key="seguimiento.id">
            <th scope="row">{{ seguimiento.id }}</th>
            <td>{{ seguimiento.Nombres }}</td>
            <td>{{ seguimiento.Apellidos }}</td>
            <td>{{ seguimiento.Asunto }}</td>
            <td>{{ seguimiento.correo }}</td>
            <td>{{ seguimiento.Telefono }}</td>
            <td>{{ seguimiento.fecha }}</td>
            <td>{{ seguimiento.dias }}</td>
            <td>{{ seguimiento.proximo_seguimiento }}</td>
            <td>
              <div class="row">
                <div class="col-6" style="color: green">
                  <i
                    class="fas fa-edit"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#Update"
                    @click="get_seguimiento_by_id(seguimiento.id)"
                  ></i>
                </div>
                <div class="col-6" style="color: red">
                  <i
                    class="fas fa-trash-alt"
                    @click="delete_seguimiento_by_id(seguimiento.id)"
                  ></i>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Edit -->
    <div
      class="modal fade"
      id="Update"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              <b>Editar seguimiento</b>
            </h5>
            <button
              id="closeModal"
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form action="">
              <div class="row">
                <div class="col-12">
                  <div class="row">
                    <div class="col-6">
                      <label class="form-label"><b>Nombres</b></label>
                      <input
                        v-model.trim="seguimiento.Nombres"
                        label="name"
                        class="form-control"
                      />
                    </div>
                    <div class="col-6">
                      <label class="form-label"><b>Apellidos</b></label>
                      <input
                        v-model.trim="seguimiento.Apellidos"
                        label="name"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <label class="form-label"><b>Asunto</b></label>
                  <input
                    v-model.trim="seguimiento.Asunto"
                    label="name"
                    class="form-control"
                  />
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-6">
                      <label class="form-label"><b>Correo</b></label>
                      <input
                        v-model.trim="seguimiento.correo"
                        label="name"
                        class="form-control"
                      />
                    </div>
                    <div class="col-6">
                      <label class="form-label"><b>Telefono</b></label>
                      <input
                        v-model.trim="seguimiento.Telefono"
                        label="name"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="row">
                    <div class="col-4">
                      <label class="form-label"><b>Fecha Actual</b></label>
                      <input
                        v-model.trim="seguimiento.fecha"
                        label="name"
                        readonly
                        class="form-control"
                      />
                    </div>
                    <div class="col-4">
                      <label class="form-label"><b>Dias</b></label>
                      <input
                        v-model.trim="seguimiento.dias"
                        label="name"
                        class="form-control"
                      />
                    </div>
                    <div class="col-4">
                      <label class="form-label"
                        ><b>Proximo seguimiento</b></label
                      >
                      <input
                        v-model.trim="seguimiento.proximo_seguimiento"
                        readonly
                        label="name"
                        class="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="updateSeguimiento()"
            >
              guardar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      seguimientos: [],
      seguimiento: [],
      update_seguimiento: {
        id: "",
        Nombres: "",
        Apellidos: "",
        Asunto: "",
        correo: "",
        Telefono: "",
        fecha: "",
        dias: "",
        fecha_proximo_seguimiento: "",
      },
      proximo_seguimiento: "",
    };
  },
  mounted() {
    this.getSeguimientos();
  },
  methods: {
    async getSeguimientos() {
      try {
        const seguimientos = axios.get(
          "http://127.0.0.1:8000/api/seguimientos"
        );
        this.seguimientos = seguimientos.data;
      } catch (error) {
        this.$swal("Error al Consultar los seguimientos");
      }
    },

    async get_seguimiento_by_id(id) {
      try {
        const seguimiento_by_id = await axios.get(
          `http://127.0.0.1:8000/api/seguimiento/${id}`
        );
        this.seguimiento = seguimiento_by_id.data;
      } catch (error) {
        this.$swal("Error al Consultar el seguimiento");
      }
    },

    async delete_seguimiento_by_id(id) {
      try {
        const responseDelete = await axios.delete(
          `http://127.0.0.1:8000/api/seguimiento/${id}`
        );
        console.log(responseDelete);
        this.$swal("seguimiento eliminado exitosamente");
        this.getSeguimientos();
      } catch (error) {
        this.$swal("Error al borrar");
      }
    },

    calculoFecha() {
      let fecha = new Date();
      this.update_seguimiento.fecha = fecha.toISOString().split("T")[0];
      console.log(this.update_seguimiento.fecha);

      let diaEnMilisegundos = 1000 * 60 * 60 * 24;
      let calculo =
        fecha.getTime() + diaEnMilisegundos * this.update_seguimiento.dias;
      this.proximo_seguimiento = new Date(calculo);
    },

    validateDate() {
      if (!this.update_seguimiento.Nombres) {
        this.$swal("falta el nombre!!!");
        return;
      }

      if (!this.update_seguimiento.Apellidos) {
        this.$swal("falta el Apellidos!!!");
        return;
      }

      if (!this.update_seguimiento.Asunto) {
        this.$swal("falta el Asunto!!!");
        return;
      }

      if (!this.update_seguimiento.correo) {
        this.$swal("falta el correo!!!");
        return;
      }

      if (!this.update_seguimiento.Telefono) {
        this.$swal("falta el Telefono!!!");
        return;
      }
    },

    async updateSeguimiento() {
      let buttonClose = document.getElementById("closeModal");
      this.update_seguimiento.fecha_proximo_seguimiento =
        this.proximo_seguimiento.toISOString().split("T")[0];

      try {
        this.update_seguimiento.id = this.seguimiento.id;
        this.update_seguimiento.Nombres = this.seguimiento.Nombres;
        this.update_seguimiento.Apellidos = this.seguimiento.Apellidos;
        this.update_seguimiento.Asunto = this.seguimiento.Asunto;
        this.update_seguimiento.correo = this.seguimiento.correo;
        this.update_seguimiento.Telefono = this.seguimiento.Telefono;
        this.update_seguimiento.dias = this.seguimiento.dias;
        this.validateDate();
        this.calculoFecha();
        let fecha_proximo_seguimiento_dia = this.proximo_seguimiento.getDay();

        if (
          fecha_proximo_seguimiento_dia == 6 ||
          fecha_proximo_seguimiento_dia == 0
        ) {
          this.$swal(
            "la fecha del proximo seguimiento cae un dia no laboral , intente colocando mas o menos dias "
          );
          return;
        } else {
          const updateSeguimiento = await axios.post(
            "http://127.0.0.1:8000/api/update/",
            this.update_seguimiento
          );
          console.log();
          this.$swal("seguimiento actuallizado exitosamente");
          this.getSeguimientos();
          console.log(updateSeguimiento);
          buttonClose.click();
        }
      } catch (error) {
        this.$swal("error al actualizar");
      }
    },
  },
};
</script>

