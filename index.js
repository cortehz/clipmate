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

const supabaseUrl = 'https://wrwjndcrfeqomsczuwzp.supabase.co';
const bucketName = 'clippy-app';
const filePath = 'clippy.dmg.zip';
const publicApiKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indyd2puZGNyZmVxb21zY3p1d3pwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU5MjE3NDksImV4cCI6MjA1MTQ5Nzc0OX0.0qFeWjcLWdvzqrKqFL23lCALrLEcJC-tfOIiriCz2eU';

const downloadFile = async () => {
  try {
    const response = await fetch(
      `${supabaseUrl}/storage/v1/object/public/${bucketName}/${filePath}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`Error downloading file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filePath.split('/').pop(); // Extracts the file name
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);

    fetch(`${supabaseUrl}/rest/v1/download`, {
      method: 'POST',
      headers: {
        apikey: publicApiKey,
        Authorization: `Bearer ${publicApiKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        created_at: new Date(),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  } catch (error) {
    console.error('Download error:', error);
  }
};
