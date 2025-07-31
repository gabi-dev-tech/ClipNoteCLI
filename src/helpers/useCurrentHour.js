// import { useState, useEffect } from 'react';

// export const getFormattedTime = () => {
//   const ahora = new Date();
//   let hours = ahora.getHours();
//   const ampm = hours >= 12 ? 'pm' : 'am';
//   hours = hours % 12 || 12;
//   const minutes = ahora.getMinutes();
//   return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}${ampm}`;
// };

// export const getFormattedDate = () => {
//   const ahora = new Date();
//   const day = ahora.getDate().toString().padStart(2, '0');
//   const month = (ahora.getMonth() + 1).toString().padStart(2, '0');
//   return `${day}/${month}`;
// };



// export default function useCurrentHour() {
//   const [hora, setHora] = useState(getFormattedTime());
//   const [fecha, setFecha] = useState(getFormattedDate());

//   useEffect(() => {
//     const actualizar = () => {
//       const ahora = new Date();

//       // Obtener hora en formato 12h con am/pm
//       let hours = ahora.getHours();
//       const ampm = hours >= 12 ? 'pm' : 'am';
//       hours = hours % 12;
//       hours = hours ? hours : 12; // la hora '0' debería ser 12
//       const minutes = ahora.getMinutes();

//       const horaFormateada = 
//         `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}${ampm}`;

//       // Obtener fecha en formato DD/MM
//       const day = ahora.getDate().toString().padStart(2, '0');
//       const month = (ahora.getMonth() + 1).toString().padStart(2, '0'); // Mes inicia en 0

//       const fechaFormateada = `${day}/${month}`;

//       setHora(horaFormateada);
//       setFecha(fechaFormateada);
//     };

//     actualizar(); // primer llamado inmediato

//     const intervalo = setInterval(actualizar, 1000); // actualizar cada segundo

//     return () => clearInterval(intervalo);
//   }, []);

//   return { hora, fecha };
// }

export const getFormattedTime = () => {
  const ahora = new Date();
  let hours = ahora.getHours();
  const ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12 || 12;
  const minutes = ahora.getMinutes();
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}${ampm}`;
};

export const getFormattedDate = () => {
  const ahora = new Date();
  const day = ahora.getDate().toString().padStart(2, '0');
  const month = (ahora.getMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}`;
};

// Función que simplemente devuelve hora y fecha actuales cuando se llame
export const useCurrentHour = () => {
  return {
    hora: getFormattedTime(),
    fecha: getFormattedDate()
  };
};
