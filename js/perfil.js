/* perfil.js — el demo para enseñar (27-oct-2026).
 *
 * Fernando: "haz otro pero exclusivo para demos para que no haya problemas". Es el
 * que se le puede enseñar a cualquiera: el condominio, los vecinos, los importes y
 * la cuenta bancaria son inventados, no hay ningún teléfono real y los WhatsApp que
 * se manden desde aquí le llegan a quien lo está probando (demoPublico, js/demo.js).
 * Los correos de los vecinos son de example.com, un dominio que no es de nadie.
 *
 * Trae todo lo que sabe hacer el sistema: recargos por tramos, banco y caja chica,
 * egresos con recibo firmado, reservas de áreas, registro de visitas y pago anual
 * adelantado. Los demos de Mallorca y Villas Cádiz siguen aparte, para esos clientes.
 */
window.CC = window.CC || {};
CC.Perfil = {
  id: 'demo',
  semilla: 'demo-1',
  demoPublico: true,
  dominioCorreo: 'example.com',

  condominio: {
    nombre: 'Condominio Ejemplo',
    direccion: '',
    ciudad: 'Guadalajara, Jalisco',
    administrador: 'Administración',
    telefono: '',
    email: '',
    cuenta: 'Banco Ejemplo — CLABE 000 000 0000 0000 0000 (cuenta de ejemplo)',
    diaVencimiento: 5,
    recargoModo: 'tramos',
    recargoTramos: [{ dia: 6, monto: 50 }, { dia: 18, monto: 100 }],
    tasaMoraMensual: 0,
    saldoInicialCaja: 380000,
    registroVisitas: true,
    mesesGratisAnualidad: 1
  },

  /* 120 casas que se conocen por su número */
  calles: ['Condominio Ejemplo'],
  casasPorCalle: 120,
  formatoClave: '{n}',
  prototipos: [
    { tipo: 'A', m2: 160, peso: 55 },
    { tipo: 'B', m2: 200, peso: 45 }
  ],
  cuotaFija: 1400,
  presupuestoMensual: 168000,   // 120 casas x $1,400
  cuotaExtra: 0,
  metodosPago: ['Transferencia', 'Transferencia', 'Transferencia', 'Depósito', 'Efectivo', 'Efectivo'],

  /* [categoría, presupuesto mensual, proveedor, grupo, 'caja' si se paga en efectivo] */
  categorias: [
    ['Vigilancia', 62000, 'Seguridad privada', 'fijo'],
    ['Administración', 15000, 'Honorarios de administración', 'fijo'],
    ['Limpieza general', 13000, 'Personal de limpieza', 'fijo'],
    ['Jardinería', 11000, 'Jardinero', 'fijo'],
    ['Alberca', 8000, 'Mantenimiento de alberca', 'fijo'],
    ['Recolección de basura', 8000, 'Recolección semanal', 'fijo', 'caja'],
    ['Seguro del inmueble', 3500, 'Aseguradora — póliza anual', 'fijo'],
    ['Energía eléctrica', 17000, 'CFE', 'variable'],
    ['Agua', 7500, 'Organismo de agua', 'variable'],
    ['Mantenimiento', 8000, 'Varios', 'variable'],
    ['Casa club', 3000, 'Mantenimiento de la casa club', 'variable'],
    ['Insumos de limpieza', 0, 'Varios', 'variable'],
    ['Papelería y copias', 0, 'Papelería', 'variable'],
    ['Comisiones bancarias', 25, 'Banco', 'otro']
  ],

  /* Lo que se paga en efectivo desde la caja chica, con su recibo firmado */
  gastosCaja: [
    [[3, 10, 17, 24], 'Recolección de basura de la semana', 'Recolección de basura', 2000, 'Recolector de basura', 'Se paga cada semana'],
    [[4, 18], 'Agua para los guardias (garrafones)', 'Insumos de limpieza', 165, 'Purificadora', ''],
    [[9], 'Duplicado de llaves y candado', 'Mantenimiento', 490, 'Cerrajería', ''],
    [[12], 'Limpieza de la alberca', 'Alberca', 1000, 'Encargado de la alberca', ''],
    [[21], 'Tornillos y copias', 'Papelería y copias', 186, 'Papelería', '']
  ],

  casaPrueba: null,   // ningún teléfono real: "Pruébalo en vivo" usa el de quien prueba

  amenidades: [
    {
      id: 'ame_padel', nombre: 'Cancha de pádel', tipo: 'padel',
      abre: '07:00', cierra: '22:00', maxHorasDia: 2, anticipacionDias: 7, mesesBloqueo: 3
    },
    {
      id: 'ame_club', nombre: 'Casa club', tipo: 'club',
      abre: '09:00', cierra: '23:00', maxHorasDia: 6, anticipacionDias: 60, mesesBloqueo: 3,
      costo: 1000, deposito: 1500
    }
  ],

  /* Pagos adelantados: unas casas pagaron el año en julio (12 meses por 11) */
  anualidad: { mesesGratis: 1, cada: 11 },
  registroVisitas: true,

  capitulosExtra: [
    {
      nombre: 'Cancha de pádel',
      articulos: [
        'La cancha de pádel es para los residentes y sus invitados. Se aparta con la administración o desde el portal, por bloques de una hora, de 7:00 a 22:00 h.',
        'Cada casa puede apartar hasta dos horas al día, con un máximo de siete días de anticipación.',
        'Las casas con tres o más mensualidades vencidas no pueden apartar la cancha ni la casa club hasta ponerse al corriente o tener un convenio de pago al día.'
      ]
    },
    {
      nombre: 'Casa club',
      articulos: [
        'La casa club se aparta con hasta sesenta días de anticipación, por un máximo de seis horas, entre las 9:00 y las 23:00 h.',
        'Al apartarla se paga una renta de $1,000 y un depósito en garantía de $1,500, que se devuelve si el área se entrega limpia y sin daños. La renta se carga al estado de cuenta de la casa.',
        'La casa que apartó responde por sus invitados y por cualquier daño al mobiliario y a la construcción.'
      ]
    },
    {
      nombre: 'Visitas y acceso',
      articulos: [
        'Toda visita se registra en la caseta con su nombre, la casa a la que va y, si llega en auto, sus placas.',
        'Los residentes pueden avisar desde el portal quién los va a visitar; el guardia la deja pasar con solo confirmar su nombre.'
      ]
    }
  ],

  avisoHorario: {
    titulo: 'Paguen el año y llévense un mes gratis',
    cuerpo: 'Quien pague por adelantado las doce cuotas del año paga solo once. En el portal ven hasta qué mes tienen pagado y bajan todos sus recibos.'
  },
  temaAsamblea: 'el mantenimiento de la alberca, el reglamento de la casa club',
  papeleria: 'Papelería'
};
