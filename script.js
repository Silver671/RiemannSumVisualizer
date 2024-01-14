var width = 1300;
var height = 600;
var domainX0 = -1.605;
var domainX1 = 5.618;
var domainY0 = -0.66;
var domainY1 = 3.876;

window.onload = function() {
  resizeGraph()
}

function conditionalVisualize() {
  const isShown = document.getElementById("content2").style.display == "initial";
  if (isShown) {
    visualize()
  }
}

function round(number, digits) {
  const factor = 10 ** digits;
  return Math.round(number * factor) / factor;
}

function intLinear(a, b) {
  const anti = x => (Math.pow(x, 2) / 2) + parseFloat(x);
  return round(anti(b) - anti(a), 3)
}

function sumLinear(a, b, n) {
  const func = x => x + 1;
  let sum = 0;
  for (let k = 1; k <= n; k++) {
    sum += func(a + (k) * ((b - a) / n)) * ((b - a) / n);
  } return round(sum, 3);
}

function intPolynomial(a, b) {
  const anti = x => (Math.pow(x, 3) / 3) + parseFloat(x);
  return round(anti(b) - anti(a), 3)
}

function sumPolynomial(a, b, n) {
  const func = x => Math.pow(x, 2) + 1;
  let sum = 0;
  for (let k = 1; k <= n; k++) {
    sum += func(a + (k) * ((b - a) / n)) * ((b - a) / n);
  } return round(sum, 3);
}

function intExponential(a, b) {
  const e = 2.718281828459045;
  return round(Math.pow(e, b) - Math.pow(e, a), 3)
}

function sumExponential(a, b, n) {
  const func = x => Math.pow(2.718281828459045, x);
  let sum = 0;
  for (let k = 1; k <= n; k++) {
    sum += func(a + (k) * ((b - a) / n)) * ((b - a) / n);
  } return round(sum, 3);
}

function intLogarithmic(a, b) {
  const anti = x => (x * Math.log(x) - x) / Math.log(10);
  return round(anti(b) - anti(a), 3)
}

function sumLogarithmic(a, b, n) {
  const func = x => Math.log(x) / Math.log(10);
  let sum = 0;
  for (let k = 1; k <= n; k++) {
    sum += func(a + (k) * ((b - a) / n)) * ((b - a) / n);
  } return round(sum, 3);
}

function intTrigonometric(a, b) {
  return round(Math.sin(b) - Math.sin(a), 3)
}

function sumTrigonometric(a, b, n) {
  const func = x => Math.cos(x);
  let sum = 0;
  for (let k = 1; k <= n; k++) {
    sum += func(a + (k) * ((b - a) / n)) * ((b - a) / n);
  } return round(sum, 3);
}

function updateTeX() {
  const n = parseInt(document.getElementById("rectanglesNumInput").value);
  const a = parseFloat(document.getElementById("startInput").value);
  const b = parseFloat(document.getElementById("endInput").value);
  const equation = document.getElementById("equation");
  const func = document.getElementById("currentFunction").innerHTML;
  if (func == "x + 1") {
    if (n == 0) {
      equation.innerHTML = `$$\\textrm{Area}=\\lim_{n\\to\\infty} \\sum_{k=1}^{n} \\Bigl(\\Bigl(${a}+\\frac{${round(b - a, 2)}k}{n} \\Bigr)+1\\Bigr)\\cdot\\frac{${round(b - a, 2)}}{n}=\\int_{${a}}^{${b}} (x+1)\\,dx=${intLinear(a, b)}$$`;
    } else {
      equation.innerHTML = `$$\\textrm{Area}\\approx\\sum_{k=1}^{${n}} \\Bigl(\\Bigl(${a}+\\frac{${round(b - a, 2)}k}{${n}} \\Bigr)+1\\Bigr)\\cdot\\frac{${round(b - a, 2)}}{${n}}=${sumLinear(a, b, n)}$$`
    }

  } else if (func == "x^2 + 1") {
    if (n == 0) {
      equation.innerHTML = `$$\\textrm{Area}=\\lim_{n\\to\\infty} \\sum_{k=1}^{n} \\Bigl(\\Bigl(${a}+\\frac{${round(b - a, 2)}k}{n} \\Bigr)^2+1\\Bigr)\\cdot\\frac{${round(b - a, 2)}}{n}=\\int_{${a}}^{${b}} (x^2+1)\\,dx=${intPolynomial(a, b)}$$`;
    } else {
      equation.innerHTML = `$$\\textrm{Area}\\approx\\sum_{k=1}^{${n}} \\Bigl(\\Bigl(${a}+\\frac{${round(b - a, 2)}k}{${n}} \\Bigr)^2+1\\Bigr)\\cdot\\frac{${round(b - a, 2)}}{${n}}=${sumPolynomial(a, b, n)}$$`
    }
  } else if (func == "1 + x + x^2/2 + x^3/6 + x^4/24 + x^5/120 + x^6/720 + x^7/50400 + x^8/40320 + x^9/362880 + x^10/3628800") {
    if (n == 0) {
      equation.innerHTML = `$$\\textrm{Area}=\\lim_{n\\to\\infty} \\sum_{k=1}^{n}
      \\Bigl(e^{${a}+\\frac{${round(b - a, 2)}k}{n}}\\Bigr)\\cdot\\frac{${round(b - a, 2)}}{n}=\\int_{${a}}^{${b}} e^{x}\\,dx=${intExponential(a, b)}$$`;
    } else {
      equation.innerHTML = `$$\\textrm{Area}\\approx\\sum_{k=1}^{${n}} \\Bigl(e^{${a}+\\frac{${round(b - a, 2)}k}{${n}}}\\Bigr)\\cdot\\frac{${round(b - a, 2)}}{${n}}=${sumExponential(a, b, n)}$$`
    }
  } else if (func == "log(x)/log(10)") {
    if (n == 0) {
      equation.innerHTML = `$$\\textrm{Area}=\\lim_{n\\to\\infty} \\sum_{k=1}^{n} \\Bigl(\\log\\Bigl(${a}+\\frac{${round(b - a, 2)}k}{n}\\Bigr)\\Bigr)\\cdot\\frac{${round(b - a, 2)}}{n}=\\int_{${a}}^{${b}} \\log(x)\\,dx=${intLogarithmic(a, b)}$$`
    } else {
      equation.innerHTML = `$$\\textrm{Area}\\approx\\sum_{k=1}^{${n}} \\Bigl(\\log\\Bigl(${a}+\\frac{${round(b - a, 2)}k}{${n}}\\Bigr)\\Bigr)\\cdot\\frac{${round(b - a, 2)}}{${n}}=${sumLogarithmic(a, b, n)}$$`
    }
  } else if (func == "cos(x)") {
    if (n == 0) {
      equation.innerHTML = `$$\\textrm{Area}=\\lim_{n\\to\\infty} \\sum_{k=1}^{n} \\Bigl(\\operatorname{cos}\\Bigl(${a}+\\frac{${round(b - a, 2)}k}{n}\\Bigr)\\Bigr)\\cdot\\frac{${round(b - a, 2)}}{n}=\\int_{${a}}^{${b}} \\operatorname{cos}(x)\\,dx=${intTrigonometric(a, b)}$$`
    } else {
      equation.innerHTML = `$$\\textrm{Area}\\approx\\sum_{k=1}^{${n}} \\Bigl(\\operatorname{cos}\\Bigl(${a}+\\frac{${round(b - a, 2)}k}{${n}}\\Bigr)\\Bigr)\\cdot\\frac{${round(b - a, 2)}}{${n}}=${sumTrigonometric(a, b, n)}$$`
    }
  }
  MathJax.typesetClear([equation]);
  MathJax.typesetPromise([equation]).then(() => {
    // Callback after the container has been re-typeset
    // Additional actions if needed
  });


}

function updateNumberField(fieldID, value) {
  document.getElementById(fieldID).value = value;
}

function updateSlider(fieldID, value) {
  document.getElementById(fieldID).value = value;
}

function resizeGraph() {
  const content2 = document.getElementById("widthMarker");
  const content2Bounds = content2.getBoundingClientRect();
  var ratio = content2Bounds.width / width;
  width *= ratio;
  height *= ratio;
}

function convertToLatex(string) {
  return "$$" + string + "$$"
}

function updateParameters(functionType) {
  var startInput = document.getElementById('startInput');
  var endInput = document.getElementById('endInput');
  var currentFunction = document.getElementById('currentFunction');

  // Set default values based on the selected radio button
  switch (functionType) {
    case 'linear':
      startInput.value = '0';
      updateSlider("startSlideInput", startInput.value)
      endInput.value = '2';
      updateSlider("endSlideInput", endInput.value)
      currentFunction.innerHTML = "x + 1"
      document.getElementById("graphTitle").innerHTML = convertToLatex("f(x)=" + currentFunction.innerHTML);
      MathJax.typeset()
      domainX0 = -1.605;
      domainX1 = 5.618;
      domainY0 = -0.66;
      domainY1 = 3.876;
      break;

    case 'poly':
      startInput.value = '-1';
      updateSlider("startSlideInput", startInput.value)
      endInput.value = '2';
      updateSlider("endSlideInput", endInput.value)
      currentFunction.innerHTML = "x^2 + 1"
      document.getElementById("graphTitle").innerHTML = convertToLatex("f(x)=x^2+1");
      MathJax.typeset()
      domainX0 = -3.2;
      domainX1 = 6.58;
      domainY0 = -4.742;
      domainY1 = 9.478;
      break;

    case 'exp':
      startInput.value = '0';
      updateSlider("startSlideInput", startInput.value)
      endInput.value = '1';
      updateSlider("endSlideInput", endInput.value)
      currentFunction.innerHTML = "1 + x + x^2/2 + x^3/6 + x^4/24 + x^5/120 + x^6/720 + x^7/50400 + x^8/40320 + x^9/362880 + x^10/3628800"
      document.getElementById("graphTitle").innerHTML = convertToLatex("f(x)=e^x");
      MathJax.typeset()
      domainX0 = -1.075;
      domainX1 = 2;
      domainY0 = -0.194;
      domainY1 = 3.366;
      break;

    case 'log':
      startInput.value = '2';
      updateSlider("startSlideInput", startInput.value)
      endInput.value = '5';
      updateSlider("endSlideInput", endInput.value)
      currentFunction.innerHTML = "log(x)/log(10)"
      document.getElementById("graphTitle").innerHTML = convertToLatex("f(x)=\\log(x)");
      MathJax.typeset()
      domainX0 = 0;
      domainX1 = 5.2;
      domainY0 = -0.5;
      domainY1 = 1.1054;
      break;

    case 'trig':
      startInput.value = '0';
      updateSlider("startSlideInput", startInput.value)
      endInput.value = '3.1415';
      updateSlider("endSlideInput", endInput.value)
      currentFunction.innerHTML = "cos(x)"
      document.getElementById("graphTitle").innerHTML = convertToLatex("f(x)=\\operatorname{cos}(x)");
      MathJax.typeset()
      domainX0 = -0.945;
      domainX1 = 4.5;
      domainY0 = -1.8251;
      domainY1 = 2.0066;
      break;

    default:
      break;
  }
}

function visualize() {
  resizeGraph();
  updateTeX();
  document.getElementById("content2").style.display = "initial";
  document.getElementById("graphTitle").style.display = "initial";
  document.querySelector('footer').style.visibility = 'visible'
  document.getElementById("startLabel").style.marginTop = '0px';
  // Get input values
  const func = document.getElementById("currentFunction").innerHTML;
  const a = parseFloat(document.getElementById('startInput').value);
  const b = parseFloat(document.getElementById('endInput').value);
  const n = parseInt(document.getElementById('rectanglesNumInput').value);
  let realN = 0;
  if (n != 0) { realN = n + 1 }
  else { realN = n }

  const datum = [
    {
      fn: func,
    },
    {
      fn: func,
      nSamples: realN,
      range: [a, b],
      color: 'blue',
      graphType: 'interval',
      closed: true
    }
  ];

  // Plot the function and rectangles
  functionPlot({
    title: " ",
    width: width,
    height: height,
    target: '#plot',
    data: datum,
    grid: true,
    disableZoom: true,
    xAxis: { domain: [domainX0, domainX1] },
    yAxis: { domain: [domainY0, domainY1] },
    annotations: [
      { x: a, text: 'a\u2002' },
      { x: b, text: 'b\u2002' }
    ],
    tip: {
      xLine: true,
      yLine: true,
    }
  });

}
