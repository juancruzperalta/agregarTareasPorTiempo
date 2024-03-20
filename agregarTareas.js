const btnAgregarTarea = document.querySelector("#btnAgregarTarea");
const espacioTareas = document.querySelector("#espacioTareas");
const Tareas = document.querySelector("#Tareas");
const btnStart = document.querySelector("#btnStart");
const inputMins = document.querySelector("#inputMinutos");
let nuevoBoton;
// Los nuevos(especifico) crean un nuevo elemento en el DOM para ser usado, botones  e inputs..
btnAgregarTarea.addEventListener("click", () => {
  const inputTarea = document.querySelector("#inputTarea").value;
  if (inputTarea == "") {
    return;
  }
  espacioTareas.classList.remove("hidden");
  nuevaTarea(inputTarea);
  nuevoBoton = document.createElement("button");
  nuevoBoton.innerText = "Start";

  btnStart.appendChild(nuevoBoton);
  const inputNumeroMinutos = nuevoInputMinutos();
  nuevoBoton.addEventListener("click", () => {
    const inputNums = inputNumeroMinutos.value;
    if (inputNums <= 60) {
      startPomodoro(inputNums);
      nuevoBoton.disabled = true;
      btnAgregarTarea.disabled = true;
      if (inputNums == 0 || inputNums == null) {
        startPomodoro(25);
        nuevoBoton.disabled = true;
        btnAgregarTarea.disabled = true;
      }
    } else {
      alert(
        "No existe esa cantidad de minutos, ingresa de 0 a 60 (algo real) "
      );
    }
  });
});
function startPomodoro(minutes) {
  let segundos = minutes * 60;
  const intervalo = setInterval(() => {
    const minutosRest = Math.floor(segundos / 60);
    const segundosRest = segundos % 60;

    const contador = `${minutosRest}:${segundosRest}`;
    if (minutosRest <= 0 && segundosRest <= 0) {
      clearInterval(intervalo);
      nuevoBoton.disabled = false;
    }
    if (minutosRest == 25) {
      nuevoBoton.disabled = true;
    }
    segundos--;
    const similarContador = document.querySelector("#contador");
    similarContador.innerHTML = contador;
    if (segundos < 0) {
      clearInterval(intervalo);
    }
  }, 1000);
}
let contadorTareas = 0;
const nuevaTarea = (inputTarea) => {
  const nuevoPTarea = document.createElement("p");
  nuevoPTarea.innerText = inputTarea;
  Tareas.append(nuevoPTarea);
  contadorTareas++;
  if (contadorTareas >= 4) {
    btnAgregarTarea.disabled = true;
  }
};

const nuevoInputMinutos = () => {
  const nuevoInputMinutos = document.createElement("input");
  nuevoInputMinutos.type = "number";
  nuevoInputMinutos.max = "60";
  nuevoInputMinutos.min = "0";
  nuevoInputMinutos.placeholder = "Minutos";
  inputMins.appendChild(nuevoInputMinutos);

  return nuevoInputMinutos;
};
