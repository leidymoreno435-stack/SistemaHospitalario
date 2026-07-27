import { Routes } from '@angular/router';
import { ListaConsultas } from './shared/components/lista-consultas/lista-consultas';
import { ListaPaciente } from './shared/components/lista-paciente/lista-paciente';
import { ListaHabitaciones } from './shared/components/lista-habitaciones/lista-habitaciones';
import { ListaServicios } from './shared/components/lista-servicios/lista-servicios';
import { ListaRecetas } from './shared/components/lista-recetas/lista-recetas';
import { ListaFacturas } from './shared/components/lista-facturas/lista-facturas';
import { ListaIngresoHospitalario } from './shared/components/lista-ingreso-hospitalario/lista-ingreso-hospitalario';
import { FormPaciente } from './shared/components/form-paciente/form-paciente';
import { FormConsulta } from './shared/components/form-consulta/form-consulta';
import { FormServicio } from './shared/components/form-servicio/form-servicio';
import { FormReceta } from './shared/components/form-receta/form-receta';
import { FormFactura } from './shared/components/form-factura/form-factura';
import { FormIngreso } from './shared/components/form-ingreso/form-ingreso';
import { Layout } from './core/layout/layout';
import { FormLogin } from './feautures/modules/authentic/login/form-login/form-login';
import { Home } from './shared/home/home';
import { ListPacientes } from './feautures/modules/gestion-pacientes/pacientes/list-pacientes/list-pacientes';
import { FormPacientes } from './feautures/modules/gestion-pacientes/pacientes/form-pacientes/form-pacientes';
import { ListPersonal } from './feautures/modules/admi-personal/personal/list-personal/list-personal';
import { FormPersonal } from './feautures/modules/admi-personal/personal/form-personal/form-personal';
import { ListCamas } from './feautures/modules/gestion-pacientes/camas/list-camas/list-camas';
import { FormCamas } from './feautures/modules/gestion-pacientes/camas/form-camas/form-camas';
import { ListHabitacion } from './feautures/modules/gestion-pacientes/habitacion/list-habitacion/list-habitacion';
import { FormHabitacion } from './feautures/modules/gestion-pacientes/habitacion/form-habitacion/form-habitacion';
import { ListHistorial } from './feautures/modules/gestion-pacientes/historial/list-historial/list-historial';
import { FormHistorial } from './feautures/modules/gestion-pacientes/historial/form-historial/form-historial';
import { ListIngresos } from './feautures/modules/gestion-pacientes/ingresos/list-ingresos/list-ingresos';
import { FormIngresos } from './feautures/modules/gestion-pacientes/ingresos/form-ingresos/form-ingresos';
import { ListMedicamentos } from './feautures/modules/consultas-medicas/medicamentos/list-medicamentos/list-medicamentos';
import { ListQuirofano } from './feautures/modules/cirugia-quirofano/quirofano/list-quirofano/list-quirofano';
import { ListConsultas } from './feautures/modules/consultas-medicas/consultas/list-consultas/list-consultas';
import { FormConsultas } from './feautures/modules/consultas-medicas/consultas/form-consultas/form-consultas';
import { SolicitudExamenes } from './feautures/modules/consultas-medicas/examenes/solicitud-examenes';
import { ListSignosVitales } from './feautures/modules/gestion-pacientes/signos-vitales/list-signos-vitales/list-signos-vitales';
import { FormSignosVitales } from './feautures/modules/gestion-pacientes/signos-vitales/form-signos-vitales/form-signos-vitales';
import { ListConsultasPaciente } from './feautures/modules/consultas-medicas/consultas/list-consultas-paciente/list-consultas-paciente/list-consultas-paciente';
import { ListHistorialPaciente } from './feautures/modules/gestion-pacientes/historial/list-historial-paciente/list-historial-paciente/list-historial-paciente';
import { FormCirugia } from './feautures/modules/cirugia-quirofano/cirugia/form-cirugia/form-cirugia';
import { ListConsultorio } from './feautures/modules/admi-personal/consultorio/list-consultorio/list-consultorio';
import { ListEspecialidad } from './feautures/modules/admi-personal/especialidad/list-especialidad/list-especialidad';
import { ListUsuarios } from './feautures/modules/authentic/usuarios/list-usuarios/list-usuarios';
export const routes: Routes = [
  { path: 'login', component: FormLogin }, // Fuera del layout
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Ruta por defecto redirija a login
  {
    path: '', 
    component: Layout, // El "Padre" que tiene el Sidebar
    children: [
      { path: 'home', component: Home }, // El "Hijo" que se inyecta en el outlet
      { path: 'pacientes', component: ListPacientes },
      {path:'usuarios',component:ListUsuarios},
      { path: 'nuevo-pacientes', component: FormPacientes },
      { path: 'especialidades', component: ListEspecialidad },
      { path: 'personal', component: ListPersonal },
      { path: 'nuevo-personal', component: FormPersonal },
      { path: 'habitacion', component: ListHabitacion },
      { path: 'nuevo-habitacion', component: FormHabitacion },
      { path: 'camas', component: ListCamas },
      { path: 'nuevo-camas', component: FormCamas },
      { path: 'consultorio', component: ListConsultorio },
      { path: 'ingresos', component: ListIngresos },
      { path: 'nuevo-ingresos', component: FormIngresos },
      { path: 'historial', component: ListHistorial },
      { path: 'nuevo-historial', component: FormHistorial },
      { path: 'historial-paciente', component: ListHistorialPaciente },
      { path: 'medicamentos', component: ListMedicamentos },
      { path: 'quirofano', component: ListQuirofano },
      {path:'cirugia',component:FormCirugia},
      { path: 'consulta', component: ListConsultas },
      { path: 'nuevo-consulta-paciente', component: ListConsultasPaciente },
      { path: 'nuevo-consulta', component: FormConsultas },
      { path: 'recetas', component: ListaRecetas },
      { path: 'nueva-receta', component: FormReceta },
      { path: 'solicitud-examenes', component: SolicitudExamenes },
     /// { path: 'signos-vitales', component: ListSignosVitales },
      //{ path: 'nuevo-signos-vitales', component: FormSignosVitales },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

