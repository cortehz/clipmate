(function steps() {
  const stepsContainer = document.querySelector('.steps');

  [
    'Download ClipMate.zip',
    'Unzip the file',
    'Drag ClipMate to Applications',
    'Launch ClipMate',
    'Grant permissions',
    'Enjoy your clipboard history!',
  ].map((step, index) => {
    const stepElement = document.createElement('li');
    stepElement.classList.add('flex');
    stepElement.classList.add('items-center');

    stepElement.innerHTML = `
            <span
              class="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-yellow-400 text-purple-800 rounded-full mr-3 font-bold"
            >
            ${index + 1}
          </span>
            ${step}
        `;
    stepsContainer.appendChild(stepElement);
  });
})();
