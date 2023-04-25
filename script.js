const inpnumb = document.querySelector("#inpnumb")
const error1 = document.querySelector(".er1")
const perc = document.querySelectorAll(".g")
const inpcust = document.querySelector("#inpcust")
const inpper = document.querySelector("#inpper")
const error2 = document.querySelector(".er2")
const numb = document.querySelector("#numb")
const numprs = document.querySelector("#numprs")
const btn = document.querySelector("#btn")
const n = document.querySelectorAll(".n")

function validateNumb() {
  inpnumb.addEventListener("blur", () => {
    if (inpnumb.value == "") {
      error1.style.display = "block"
      Btn()
    } else {
      error1.style.display = "none"
      reset()
    }
  })
  inpnumb.addEventListener("keyup", () => {
    let hasNClass = false;
    perc.forEach(p => {
      if (p.classList.contains("n")) {
        hasNClass = true;
      }
    });
    if ((inpcust.value !== "" || hasNClass) && inpnumb.value !== "" && inpper.value !== "") {
      calculate()
    } else {
      numb.innerText = "0.00"
      numprs.innerText = "0.00"
    }
  })
  inpnumb.addEventListener("input", (e) => {
    let value = e.target.value;
    value = value.replace(/[^\d]/g, '');
    if (value.length >= 2) {
      value = value.slice(0, -2) + '.' + value.slice(-2);
    }
    e.target.value = value;
  });
}

function validatePercent() {
  perc.forEach((p) => {
    p.addEventListener("click", () => {
      p.classList.remove("s")
      p.classList.add("n")
      Btn()
      perc.forEach((q) => {
        if (q !== p) {
          q.classList.remove("n")
          q.classList.add("s")
          inpcust.value = ''
          reset()
          let hasNClass = false;
          perc.forEach(p => {
            if (p.classList.contains("n")) {
              hasNClass = true;
            }
          });
          if ((inpcust.value !== "" || hasNClass) && inpnumb.value !== "" && inpper.value !== "") {
            calculate()
          } else {
            numb.innerText = "0.00"
            numprs.innerText = "0.00"
          }
        }
      })
    })
    inpcust.addEventListener("keyup", () => {
      inpcust.classList.add("cus")
      if (inpcust.classList.contains("cus")) {
        p.classList.remove("n")
        p.classList.add("s")
        let hasNClass = false;
        perc.forEach(p => {
          if (p.classList.contains("n")) {
            hasNClass = true;
          }
        });
        if ((inpcust.value !== "" || hasNClass) && inpnumb.value !== "" && inpper.value !== "") {
          calculate()
        } else {
          numb.innerText = "0.00"
          numprs.innerText = "0.00"
        }
        reset()
      } else {
        inpcust.classList.remove("cus")
        Btn()
      }

    })
    inpcust.addEventListener("blur", () => {
      if (inpcust.value == "") {
        Btn()
        inpcust.classList.remove("cus")
      }
    })
    inpcust.addEventListener("input", (e) => {
      const regex = /^[0-9]+$/;
      let value = e.target.value;
      if (!regex.test(value)) {
        e.target.value = value.slice(0, -1);
      }
    })
  });
}

function validatePer() {
  inpper.addEventListener("blur", () => {
    if (inpper.value == "") {
      error2.style.display = "block"
      Btn()
    } else {
      error2.style.display = "none"
      reset()
    }
  })
  inpper.addEventListener("keyup", () => {
    let hasNClass = false;
    perc.forEach(p => {
      if (p.classList.contains("n")) {
        hasNClass = true;
      }
    });
    if ((inpcust.value !== "" || hasNClass) && inpnumb.value !== "" && inpper.value !== "") {
      calculate()
    } else {
      numb.innerText = "0.00"
      numprs.innerText = "0.00"
    }
  })
  inpper.addEventListener("input", (e) => {
    const regex = /^[0-9]+$/;
    let value = e.target.value;
    if (!regex.test(value)) {
      e.target.value = value.slice(0, -1);
    }
  })
}

const calculate = () => {
  let hasNClass = false;
  perc.forEach(p => {
    if (p.classList.contains("n")) {
      hasNClass = true;
    }
  });
  const numpeople = parseFloat(inpper.value)
  const number = parseFloat(inpnumb.value)
  if (hasNClass) {
    cust = parseFloat(document.querySelector(".n").textContent)
  } else {
    cust = parseFloat(document.querySelector(".cus").value)
  }
  const totalAmount = parseFloat((cust / 100) * number).toFixed(2)
  const tipAmount = (totalAmount / numpeople).toFixed(2)
  const total = ((parseFloat(number) + parseFloat(totalAmount)) / parseFloat(numpeople)).toFixed(2)

  numb.innerHTML = tipAmount
  numprs.innerHTML = total

}


function Btn() { btn.setAttribute("disabled", "disabled") }
function reset() {
  btn.addEventListener("click", (e) => {
    inpcust.value = ''
    inpnumb.value = ''
    inpper.value = ''
    numb.innerText = "0.00"
    numprs.innerText = "0.00"
    inpcust.classList.remove("cus")
    perc.forEach((b) => {
      b.classList.remove("n")
      b.classList.add("s")
    })
    if (inpcust.value !== '' && inpnumb.value !== '') {
      calculate();
    }
    e.target.setAttribute("disabled", "disabled")
  })
  btn.removeAttribute("disabled")
}
validateNumb()
validatePer()
validatePercent()
