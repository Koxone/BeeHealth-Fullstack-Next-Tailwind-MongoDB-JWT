/* Core */
import mongoose from 'mongoose';
const { Schema, model, models } = mongoose;

/* Subschemas: Información básica */
const InformacionBasicaSchema = new Schema(
  {
    fecha: Date,
    nombreCompleto: String,
    fechaNacimiento: Date,
    lugarNacimiento: String,
    edad: Number,
    genero: String,
    alturaCm: Number,
    pesoActualKg: Number,
    tallaCm: Number,
    ocupacion: String,
    estadoCivil: String,
    rfc: String,
    correo: String,
    domicilio: String,
    telefonoCelular: String,
    telefonoFijo: String,
    contactoEmergencia: String,
    telefonoEmergencia: String,
  },
  { _id: false }
);

/* Subschemas: Información general */
const EnfermedadesSchema = new Schema(
  {
    diabetes: Boolean,
    hipertension: Boolean,
    hepatitis: Boolean,
    vih: Boolean,
    cancer: Boolean,
    asma: Boolean,
    epilepsia: Boolean,
    gastritis: Boolean,
    ansiedadDepresion: Boolean,
    otras: String,
  },
  { _id: false }
);

const InformacionGeneralSchema = new Schema(
  {
    motivoConsulta: String,
    alergiasConocidas: String,
    medicamentosActuales: String,
    buenEstadoSalud: String,
    bajoTratamiento: String,
    tomandoMedicamentos: String,
    alergicoMedicamentos: String,
    operadoHospitalizado: String,
    hemorragias: String,
    problemasCicatrizacion: String,
    otrasEnfermedades: String,
    enfermedades: { type: EnfermedadesSchema, default: {} },
    consumoAlcohol: String,
    consumoTabaco: String,
    consumoDrogas: String,
    embarazo: String,
    lactancia: String,
    anticonceptivos: String,
    medicamentosPotencia: String,
    hijos: Number,
  },
  { _id: false }
);

/* Subschemas: Información clínica por especialidad */
const ControlPesoSchema = new Schema(
  {
    pesoObjetivo: Number,
    actividadFisica: String,
    horasSueno: Number,
    consumoAgua: Number,
    enfermedadesCronicas: String,
    medicamentosActuales: String,
    alergiasAlimentarias: String,
    tipoAlimentacion: String,
    cirugiasPrevias: String,
    motivoConsultaPeso: String,
  },
  { _id: false }
);

const OdontologiaSchema = new Schema(
  {
    motivoConsultaOdonto: String,
    primeraVisita: String,
    visitaAnteriorAgradable: String,
    fluor: String,
    extraccionDientes: String,
    sangradoPostExtraccion: String,
    tratamientosPrevios: String,
    perdidaDientes: String,
    sangradoEncias: String,
    cepilladoDiario: String,
    enjuagueBucal: String,
    hiloDental: String,
    usaCepillo: String,
    dolorDental: String,
    tipoDolor: String,
  },
  { _id: false }
);

const EsteticaSchema = new Schema(
  {
    motivoTratamiento: String,
    cirugiasPrevias: String,
    reaccionesAnestesia: String,
    enfermedadesInterfieren: String,
    condicionPiel: String,
    zonaInteres: String,
    tratamientosPrevios: String,
    expectativas: String,
    alergiasQuimicos: String,
  },
  { _id: false }
);

const InformacionClinicaSchema = new Schema(
  {
    controlPeso: { type: ControlPesoSchema, default: {} },
    odontologia: { type: OdontologiaSchema, default: {} },
    estetica: { type: EsteticaSchema, default: {} },
  },
  { _id: false }
);

/* Subschemas: Antecedentes */
const HeredoSchema = new Schema(
  {
    diabetes: Boolean,
    epilepsia: Boolean,
    hepatitis: Boolean,
    hipertension: Boolean,
    malformaciones: Boolean,
    artritis: Boolean,
  },
  { _id: false }
);

const PersonalesPatologicosSchema = new Schema(
  {
    cardiopatias: Boolean,
    enfermedadesMentales: Boolean,
    neoplasias: Boolean,
    enfermedadesRenales: Boolean,
    varicela: Boolean,
    sarampion: Boolean,
    neuralgia: Boolean,
    viasBiliares: Boolean,
    asma: Boolean,
    enfermedadesRespiratorias: Boolean,
    hepatitis: Boolean,
    digestivo: Boolean,
    hipotiroidismo: Boolean,
    migraña: Boolean,
    epilepsia: Boolean,
    ansiedadDepresion: Boolean,
    hipertension: Boolean,
    diabetes: Boolean,
    cancer: Boolean,
    vih: Boolean,
    ets: Boolean,
    piel: Boolean,
    fracturas: Boolean,
    hospitalizaciones: String,
    cirugias: String,
    alteracionesHormonales: String,
    hijos: Number,
    anticonceptivos: String,
    embarazo: String,
    lactancia: String,
  },
  { _id: false }
);

const NoPatologicosSchema = new Schema(
  {
    tipoAlimentacion: String,
    comidasDia: String,
    intolerancias: String,
    alimentosNoConsume: String,
    lavadoManos: String,
    usoCepillo: String,
    usoEnjuague: String,
    usoHilo: String,
  },
  { _id: false }
);

const InmunizacionesSchema = new Schema(
  {
    poliomielitis: Boolean,
    tuberculosis: Boolean,
    dtp: Boolean,
    tripleViral: Boolean,
    sarampion: Boolean,
    hepatitisB: Boolean,
    otras: String,
  },
  { _id: false }
);

const HabitosSchema = new Schema(
  {
    alcohol: String,
    tabaco: String,
    drogas: String,
    deportes: String,
  },
  { _id: false }
);

const AntecedentesSchema = new Schema(
  {
    heredofamiliares: { type: HeredoSchema, default: {} },
    personalesPatologicos: { type: PersonalesPatologicosSchema, default: {} },
    noPatologicos: { type: NoPatologicosSchema, default: {} },
    inmunizaciones: { type: InmunizacionesSchema, default: {} },
    habitos: { type: HabitosSchema, default: {} },
  },
  { _id: false }
);

/* Subschemas: Exploración y signos vitales */
const ExploracionFisicaSchema = new Schema(
  {
    cabeza: String,
    cuello: String,
    torax: String,
    abdomen: String,
    extremidades: String,
  },
  { _id: false }
);

const SignosVitalesSchema = new Schema(
  {
    tensionArterial: String,
    frecuenciaCardiaca: { type: Number, min: 0 },
    frecuenciaRespiratoria: { type: Number, min: 0 },
    temperatura: String,
    saturacionOxigeno: String,
    imc: String,
    peso: Number,
    talla: Number,
  },
  { _id: false }
);

/* Subschemas: Campos del médico */
const CamposMedicoDatosClinicosSchema = new Schema(
  {
    fechaRegistro: Date,
    medicoResponsable: String,
    diagnosticoPreliminar: String,
    tratamientoSugerido: String,
    notas: String,
  },
  { _id: false }
);

const CamposMedicoOdontologiaSchema = new Schema(
  {
    cavidadBucal: String,
    cuelloEstructuras: String,
    diagnosticoDental: String,
    planTratamientoDental: String,
    materialesUsados: String,
    recomendacionesPaciente: String,
  },
  { _id: false }
);

const CamposMedicoEsteticaSchema = new Schema(
  {
    diagnosticoFacial: String,
    condicionPiel: String,
    zonasTratadas: String,
    productoTecnica: String,
    fechaTratamiento: Date,
    evolucion: String,
    complicaciones: String,
    recomendacionesPost: String,
  },
  { _id: false }
);

const CamposMedicoSeguimientoSchema = new Schema(
  {
    diagnosticoDefinitivo: String,
    tratamientoPrescrito: String,
    medicamentosIndicados: String,
    observacionesEvolucion: String,
    recomendacionesFinales: String,
    fechaRevisionSiguiente: Date,
    firmaMedico: String,
  },
  { _id: false }
);

const CamposMedicoSchema = new Schema(
  {
    datosClinicos: { type: CamposMedicoDatosClinicosSchema, default: {} },
    odontologia: { type: CamposMedicoOdontologiaSchema, default: {} },
    estetica: { type: CamposMedicoEsteticaSchema, default: {} },
    seguimiento: { type: CamposMedicoSeguimientoSchema, default: {} },
  },
  { _id: false }
);

/* Subschemas: Complementos */
const ComplementosSchema = new Schema(
  {
    pasatiempos: String,
    comoSeEntero: String,
    adultoResponsable: String,
    recomendadoPor: String,
    observacionesPersonales: String,
    comentarioLibre: String,
  },
  { _id: false }
);

/* Root schema */
const ClinicalRecordSchema = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    doctor: { type: Schema.Types.ObjectId, ref: 'User' },

    informacionBasica: { type: InformacionBasicaSchema, default: {} },
    informacionGeneral: { type: InformacionGeneralSchema, default: {} },
    informacionClinica: { type: InformacionClinicaSchema, default: {} },
    antecedentes: { type: AntecedentesSchema, default: {} },
    exploracionFisica: { type: ExploracionFisicaSchema, default: {} },
    signosVitales: { type: SignosVitalesSchema, default: {} },
    camposMedico: { type: CamposMedicoSchema, default: {} },
    complementos: { type: ComplementosSchema, default: {} },

    /* Mirror por qId */
    answersByQId: { type: Map, of: Schema.Types.Mixed, default: {} },
    /* Versión de template */
    templateVersion: { type: Number, default: 1 },
    /* Conjunto de qIds usados */
    selectedQIds: { type: [Number], default: [] },
  },
  { timestamps: true }
);

/* Export */
const ClinicalRecord = models.ClinicalRecord || model('ClinicalRecord', ClinicalRecordSchema);
export default ClinicalRecord;
