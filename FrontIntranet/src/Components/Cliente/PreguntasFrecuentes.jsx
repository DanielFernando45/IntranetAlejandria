// 📁 src/components/cliente/PreguntasFrecuentes.jsx
import PreguntaItem from './PreguntaItem';

const dataPreguntas = [
  {
    pregunta: '¿Quién evalúa mis fichas?',
    respuesta: 'La preinscripción es en forma virtual y el enlace estará disponible en las fechas que corresponda según el cronograma de cada semestre.'
  },
  {
    pregunta: '¿Qué sucede si pierdo el plazo de inscripción?',
    respuesta: 'Debes esperar al siguiente semestre, ya que fuera del cronograma no se aceptan inscripciones extemporáneas.'
  },
  {
    pregunta: '¿Puedo modificar mis datos luego de enviar mi ficha?',
    respuesta: 'Sí, pero solo dentro del plazo de edición que se publica junto con el cronograma oficial.'
  },
  {
    pregunta: '¿Puedo modificar mis datos luego de enviar mi ficha?',
    respuesta: 'Sí, pero solo dentro del plazo de edición que se publica junto con el cronograma oficial.'
  },
  {
    pregunta: '¿Quién evalúa mis fichas?',
    respuesta: 'La preinscripción es en forma virtual y el enlace estará disponible en las fechas que corresponda según el cronograma de cada semestre.'
  },
  {
    pregunta: '¿Qué sucede si pierdo el plazo de inscripción?',
    respuesta: 'Debes esperar al siguiente semestre, ya que fuera del cronograma no se aceptan inscripciones extemporáneas.'
  },
  {
    pregunta: '¿Puedo modificar mis datos luego de enviar mi ficha?',
    respuesta: 'Sí, pero solo dentro del plazo de edición que se publica junto con el cronograma oficial.'
  },
  {
    pregunta: '¿Puedo modificar mis datos luego de enviar mi ficha?',
    respuesta: 'Sí, pero solo dentro del plazo de edición que se publica junto con el cronograma oficial.'
  },
  {
    pregunta: '¿Puedo modificar mis datos luego de enviar mi ficha?',
    respuesta: 'Sí, pero solo dentro del plazo de edición que se publica junto con el cronograma oficial.'
  },
  {
    pregunta: '¿Puedo modificar mis datos luego de enviar mi ficha?',
    respuesta: 'Sí, pero solo dentro del plazo de edición que se publica junto con el cronograma oficial.'
  }
];

export default function PreguntasFrecuentes() {
  return (
    <div className='flex flex-col '>
      {dataPreguntas.map((item, index) => (
        <PreguntaItem key={index} pregunta={item.pregunta} respuesta={item.respuesta} />
      ))}
    </div>
  );
}
