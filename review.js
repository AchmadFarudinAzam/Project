document.getElementById('submitBtn').addEventListener('click', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const model = document.getElementById('model').value;
  const review = document.getElementById('review').value;

  if (name && model && review) {
    // Simpan data ke sessionStorage
    const reviewData = { name, model, review };
    sessionStorage.setItem('reviewData', JSON.stringify(reviewData));

    // Arahkan ke halaman baru
    window.location.href = 'submitted.html';
  } else {
    alert('Please fill out all fields!');
  }
});
