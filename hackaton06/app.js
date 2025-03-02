const listReported = ['ABC', 'BCA', 'CAB', 'EDC']

class Telefono {
    constructor(serialNumber, imei, diagnostic, userAuthorization, initialPayment) {
      this.serialNumber = serialNumber;
      this.imei = imei;
      this.diagnostic = diagnostic;
      this.userAuthorization = userAuthorization;
      this.initialPayment = initialPayment;
      this.repuestos = [];
      this.reported = false;
      this.estado = "Pendiente";
    }
  
    agregarRepuesto(repuesto) {
      this.repuestos.push(repuesto);
    }
  
    actualizarEstado(nuevoEstado) {
      this.estado = nuevoEstado;
    }

    verifyImei(imei) {
        if(listReported.includes(imei)) {
            this.reported = true;
        } else {
            this.reported = false;
        }
    }
  }
  
  // Clase Técnico
  class Tecnico {
    constructor(nombre, skills) {
      this.nombre = nombre;
      this.skills = skills;
    }
  
    esApto(marca) {
      return this.skills.includes(marca);
    }
  }
  
  // Gestión de Teléfonos
  class GestionReparaciones {
    constructor() {
      this.telefonos = JSON.parse(localStorage.getItem("telefonos")) || [];
    }
  
    agregarTelefono(telefono) {
      if (this.esTelefonoValido(telefono)) {
        this.telefonos.push(telefono);
        this.guardarEnLocalStorage();
        return true;
      }
      return false;
    }
  
    esTelefonoValido({ serialNumber, imei }) {
      return !this.telefonos.some(t => t.serialNumber === serialNumber || t.imei === imei);
    }
  
    guardarEnLocalStorage() {
      localStorage.setItem("telefonos", JSON.stringify(this.telefonos));
    }
  
    obtenerTelefonos() {
      return this.telefonos;
    }
  }
  

const formPhone = document.getElementById('mobileInformation')
const telephone = document.getElementById('telefono');
const imei = document.getElementById('imei');
const serialNumber = document.getElementById('serialNumber');
const authorice = document.getElementById('authorice');
const initialPayment = document.getElementById('initialPayment')
const gestionReparaciones = new GestionReparaciones()


formPhone.addEventListener("submit", (event) => {
    event.preventDefault();
    if(!authorice.checked) {
        return alert('Debe authorizar para continuar...')
    }

    if(telephone.value === null || telephone.value === '') {
        return alert('ingresar telefono para continuar...')
    } else if (imei.value === null || imei.value === '') {
        return alert('Ingrese IMEI para continuar...')
    } else if (serialNumber.value === null || serialNumber.value === 'vacio' ){
        return alert('Ingrese numero de serie...')
    }
 
    const phone = new Telefono(serialNumber.value, imei.value, authorice.checked, initialPayment.value)

    if(phone.verifyImei(imei.value)) {
        return alert('El imei se encuentra bloqueado.')
    }

    if(gestionReparaciones.agregarTelefono(phone)) {
        
        formPhone.reset();

        return alert('El telefono fue agregado correctamente.')
    } else {
        return alert('Ocurrio un error.')
    }

})
