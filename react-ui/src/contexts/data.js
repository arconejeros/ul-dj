import carnetExplanation from '../assets/carnetExplanation.png';
import {regiones} from '../utils/regiones';

export const data=[
  {
    type: "question",
    question: "¿Tienes tu cédula de identidad en este momento?",
    answer: true,
    negativeFeedback: "Para contestar este formulario, es necesario que tengas tu cédula de identidad y que esta se encuentre vigente al menos al año 2020."
  },
  {
    type: "question",
    question: "¿Tu cédula de identidad está vigente al año 2019?",
    description: "En caso de que la fecha de vencimiento sea 2018 o anterior debes contestar NO",
    answer: true,
    negativeFeedback: "Para contestar este formulario, es necesario que tengas tu cédula de identidad vigente al año 2019."
  },
  {
    type: "question",
    question: "¿Estás respondiendo desde un celular o smartphone?",
    answer: true,
    negativeFeedback: "<div style='display: flex;flex-direction: column;'>Por favor, responde este formulario desde un teléfono celular smartphone, ya que es necesario utilizar la cámara y la pantalla táctil.\n" +
      "\n" +
      "Puedes acceder a través del siguiente código QR:" +
      "<img style='width: 75%;margin-top: 20px;' src='data:image/png;base64,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' /></div>"
  },
  {
    type: "photo",
    text: "Muy bien, tienes todo lo necesario para completar el formulario.\n" +
      "\n" +
      "Para comenzar, debes tomar 2 fotografías a tu cédula de identidad.\n" +
      "La primera debe ser a la parte frontal de tu cédula y la segunda a la parte posterior, como se indica en la siguiente imagen.\n",
    img: carnetExplanation,
    front: false,
    rear: false,
    answer: true,
  },
  {
    type: "region",
    regiones,
    region: null,
    comuna: null,
    answer: true,
  },
  {
    type: "basic-data",
    answer: true,
  },
  {
    type: "rut",
    answer: true,
  },
  {
    type: "confirmation",
    text: "¿Confirma que tu nombre completo es Angelo Conejeros y que tu rut es 16976777-7?",
    answer: true,
  },
  {
    type: "dj",
    text: "<h3 style='text-align: center;'>1ª DECLARACIÓN JURADA PARTICIPANTE</h3>\n\n" +
      "\n" +
      "<h4 style='text-align: center;'>Acreditación de recepción conforme de Manual de Autoinstrucción</h4>\n" +
      "\n" +
      "<div style='text-align: justify'>En  a 21 de Agosto del 2021 quien suscribe <b>ANGELO CONEJEROS </b>, cédula de identidad N° <b>16.976.777-7</b>, comuna de <b>Huechuraba</b>, <b>Región del Maule</b>, vengo en declarar que recibí manual de autoinstrucción sobre curso denominado <b>“Técnicas de Servicio y Atención al Cliente”</b>, código <b>SENCE N°1238014720</b> ID de acción N°XXXXX, ejecutado entre el XX de Marzo de 2021 y XX de Abril de 2021, por el OTEC “Up-level Capacitación” RUT N°76786713-1, y que la misma se desarrolló en los términos autorizados por el Servicio Nacional de Capacitación y Empleo.\n" +
      "Asimismo, declaro que estoy en pleno conocimiento que la falsedad en la presente declaración, faculta al Servicio Nacional de Capacitación y Empleo para realizar la denuncia ante el Ministerio Público.</div>",
    answer: true,
  },
  {
    type: "dj",
    text: "<h3>2ª DECLARACIÓN JURADA PARTICIPANTE</h3>\n\n" +
      "\n" +
      "<h4 style='text-align: center;'>Acreditación de asistencia y cumplimiento de acción de capacitación en modalidad a distancia</h4>\n" +
      "\n" +
      "<div style='text-align: justify'>En  a 21 de Agosto del 2021 quien suscribe <b>ANGELO CONEJEROS</b>, cédula de identidad N° <b>16.976.777-7</b>, comuna de <b>Huechuraba</b>, <b>Región del Maule</b>, dando cumplimiento a lo exigido en el artículo 29 del Decreto Supremo N°98 de 1997, del Ministerio y Previsión Social vengo en declarar que ejecuté como participante el curso denominado “Técnicas de Servicio y Atención al Cliente”, código SENCE N°1238014720 ID de acción N°XXXXX, ejecutado entre el XX de Marzo de 2021 y XX de Abril de 2021, por el OTEC “XP Capacitación Spa” RUT N°76786713-1, y que la misma se desarrolló en los términos autorizados por el Servicio Nacional de Capacitación y Empleo.\n" +
      "Asimismo, declaro que estoy en pleno conocimiento que la falsedad en la presente declaración, faculta al Servicio Nacional de Capacitación y Empleo para realizar la denuncia ante el Ministerio Público.</div>",
    answer: true,
  },
  {
    type: "sign",
    answer: true,
  },
  {
    type: "confirmation",
    text: "¿Tu firma es igual o muy similar a la de tu cédula de identidad?",
    answer: true,
  },
  {type: "send"}

]
