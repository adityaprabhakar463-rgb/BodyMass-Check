// BMI Calculator script
// Expects 2 inputs with IDs #weight and #height and a button with ID #calculate
// Displays result in element with ID #bmiResult
// Saves last value to localStorage

const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const calculateBtn = document.getElementById('calculate-btn');
const resultEl = document.getElementById('result');

const STORAGE_KEY = 'bmiLastResult';
const indicatorEl = document.getElementById('bmiIndicator');

function formatNumber(num) {
  return Number(num.toFixed(1));
}

function getBMICategory(bmi) {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal weight';
  if (bmi < 30) return 'Overweight';
  return 'Obese';
}

function renderResult(bmi) {
  const category = getBMICategory(bmi);

  if (resultEl) {
    resultEl.innerHTML = `BMI: <strong>${formatNumber(bmi)}</strong><br>Category: <strong>${category}</strong>`;
    resultEl.style.color = '#1f2937';
    resultEl.style.backgroundColor = '#eff6ff';
    resultEl.style.border = '1px solid #93c5fd';
    resultEl.style.padding = '8px';
    resultEl.style.borderRadius = '6px';
  }

  if (indicatorEl) {
    const value = Math.min(40, Math.max(10, bmi));
    const normalized = (value - 10) / 30 * 100; // 10 – 40 range

    indicatorEl.style.width = '100%';
    indicatorEl.innerHTML = `
      <div class="bmi-track">
        <div class="bmi-progress" style="width: ${normalized}%;"></div>
      </div>
      <div class="bmi-scale">
        <span>10</span>
        <span>18.5</span>
        <span>25</span>
        <span>30</span>
        <span>40</span>
      </div>
    `;

    const colorMap = bmi < 18.5 ? '#60a5fa' : bmi < 25 ? '#22c55e' : bmi < 30 ? '#f59e0b' : '#ef4444';
    indicatorEl.querySelector('.bmi-progress').style.backgroundColor = colorMap;
    indicatorEl.setAttribute('aria-valuenow', formatNumber(bmi));
    indicatorEl.setAttribute('aria-valuemin', '10');
    indicatorEl.setAttribute('aria-valuemax', '40');
  }
}

function showError(message) {
  if (resultEl) {
    resultEl.textContent = message;
    resultEl.style.color = 'red';
    resultEl.style.backgroundColor = '#fee2e2';
    resultEl.style.border = '1px solid #fecaca';
    resultEl.style.padding = '8px';
    resultEl.style.borderRadius = '6px';
  }
}

function calculateBMI() {
  const weight = parseFloat(weightInput?.value);
  const heightCm = parseFloat(heightInput?.value);

  if (!weight || weight <= 0) {
    showError('Please enter a valid weight (kg).');
    return;
  }

  if (!heightCm || heightCm <= 0) {
    showError('Please enter a valid height (cm).');
    return;
  }

  const heightM = heightCm / 100;
  const bmi = weight / (heightM * heightM);
  const roundedBmi = formatNumber(bmi);

  if (roundedBmi < 10 || roundedBmi > 40) {
    showError('Calculated BMI is out of the valid range (10-40). Please check your inputs.');
    if (indicatorEl) {
      indicatorEl.innerHTML = '';
    }
    return;
  }

  renderResult(roundedBmi);
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ bmi: roundedBmi, timestamp: Date.now() }));
}

function loadSavedBMI() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed?.bmi) {
      renderResult(parsed.bmi);
    }
  } catch (e) {
    console.warn('Unable to load saved BMI', e);
  }
}

if (calculateBtn) {
  calculateBtn.addEventListener('click', calculateBMI);
}

loadSavedBMI();
