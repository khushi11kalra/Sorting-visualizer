// Get DOM elements
const algorithmSelect = document.getElementById('algorithm');
const speedRange = document.getElementById('speed');
const sizeRange = document.getElementById('size');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const themeSelect = document.getElementById('theme');
const visualization = document.querySelector('.visualization');

let barsArray = [];

// Generate random array of given size
function generateArray(size) {
  resetVisualization();
  
  const maxValue = 380;
  const array = [];
  size=size/3;
  
  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * maxValue) + 1);
  }
  
  createBars(array);
}

// Create visualization bars
function createBars(array) {
  const barWidth = (visualization.offsetWidth / array.length) - 2;
  
  barsArray = array.map(value => {
    const bar = document.createElement('div');
    bar.style.width = `${barWidth}px`;
    bar.style.height = `${value}px`;
    bar.style.marginRight = '2px';
    bar.classList.add('bar');
    
    visualization.appendChild(bar);
    
    return bar;
  });
}

// Reset visualization
function resetVisualization() {
  visualization.innerHTML = '';
}

// Swap two bars
function swap(i, j) {
  const tempHeight = barsArray[i].style.height;
  barsArray[i].style.height = barsArray[j].style.height;
  barsArray[j].style.height = tempHeight;
}

// Delay function to control animation speed
function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

// Bubble Sort
async function bubbleSort() {
  const n = barsArray.length;
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (parseInt(barsArray[j].style.height) > parseInt(barsArray[j + 1].style.height)) {
        swap(j, j + 1);
        await delay(1000 / speedRange.value);
      }
    }
  }
}

// Insertion Sort
async function insertionSort() {
  const n = barsArray.length;
  
  for (let i = 1; i < n; i++) {
    const keyHeight = parseInt(barsArray[i].style.height);
    let j = i - 1;
    
    while (j >= 0 && parseInt(barsArray[j].style.height) > keyHeight) {
      barsArray[j + 1].style.height = barsArray[j].style.height;
      j--;
      await delay(1000 / speedRange.value);
    }
    
    barsArray[j + 1].style.height = `${keyHeight}px`;
  }
}

// Merge Sort
async function mergeSort() {
  await mergeSortHelper(barsArray, 0, barsArray.length - 1);
}

async function mergeSortHelper(arr, start, end) {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    
    await mergeSortHelper(arr, start, mid);
    await mergeSortHelper(arr, mid + 1, end);
    
    await merge(arr, start, mid, end);
  }
}

async function merge(arr, start, mid, end) {
  const n1 = mid - start + 1;
  const n2 = end - mid;
  
  const leftArray = new Array(n1);
  const rightArray = new Array(n2);
  
  for (let i = 0; i < n1; i++) {
    leftArray[i] = parseInt(arr[start + i].style.height);
  }
  
  for (let j = 0; j < n2; j++) {
    rightArray[j] = parseInt(arr[mid + 1 + j].style.height);
  }
  
  let i = 0;
  let j = 0;
  let k = start;
  
  while (i < n1 && j < n2) {
    if (leftArray[i] <= rightArray[j]) {
      arr[k].style.height = `${leftArray[i]}px`;
      i++;
    } else {
      arr[k].style.height = `${rightArray[j]}px`;
      j++;
    }
    
    k++;
    await delay(1000 / speedRange.value);
  }
  
  while (i < n1) {
    arr[k].style.height = `${leftArray[i]}px`;
    i++;
    k++;
    await delay(1000 / speedRange.value);
  }
  
  while (j < n2) {
    arr[k].style.height = `${rightArray[j]}px`;
    j++;
    k++;
    await delay(1000 / speedRange.value);
  }
}

// Quick Sort
async function quickSort() {
  await quickSortHelper(barsArray, 0, barsArray.length - 1);
}

async function quickSortHelper(arr, low, high) {
  if (low < high) {
    const pivotIndex = await partition(arr, low, high);
    
    await quickSortHelper(arr, low, pivotIndex - 1);
    await quickSortHelper(arr, pivotIndex + 1, high);
  }
}

async function partition(arr, low, high) {
  const pivotHeight = parseInt(arr[high].style.height);
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (parseInt(arr[j].style.height) < pivotHeight) {
      i++;
      swap(i, j);
      await delay(1000 / speedRange.value);
    }
  }
  
  swap(i + 1, high);
  return i + 1;
}

// Event listeners
startBtn.addEventListener('click', () => {
  const algorithm = algorithmSelect.value;
  
  if (algorithm === 'bubble') {
    bubbleSort();
  } else if (algorithm === 'insertion') {
    insertionSort();
  } else if (algorithm === 'merge') {
    mergeSort();
  } else if (algorithm === 'quick') {
    quickSort();
  }
});

resetBtn.addEventListener('click', () => {
  const size = sizeRange.value;
  generateArray(size);
});

themeSelect.addEventListener('change', () => {
    const theme = themeSelect.value;
    const themeStyleLink = document.getElementById('theme-style');
    
    if (theme === 'light') {
      themeStyleLink.href = 'light-theme.css';
    } else if (theme === 'dark') {
      themeStyleLink.href = 'dark-theme.css';
    }
});
  

// Initial generation
generateArray(sizeRange.value);
