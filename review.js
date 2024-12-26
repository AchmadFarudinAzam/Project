document.getElementById('submitBtn').addEventListener('click', function () {
  console.log('button clik');
  // Ambil nilai dari formulir
  const name = document.getElementById('name').value;
  const model = document.getElementById('model').value;
  const review = document.getElementById('review').value;

  // Validasi data
  if (name && model && review) {
    // Tampilkan hasil di div output
    const output = document.getElementById('output');
    const reviewHTML = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Model:</strong> ${model}</p>
      <p><strong>Review:</strong> ${review}</p>
      <hr>
    `;
    output.innerHTML += reviewHTML;

    // Reset formulir
    document.getElementById('reviewForm').reset();
  } else {
    alert('Please fill out all fields!');
  }
});
