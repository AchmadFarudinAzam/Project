document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('submitBtn').addEventListener('click', function () {
    console.log('Button clicked');

    const name = document.getElementById('name').value;
    const model = document.getElementById('model').value;
    const review = document.getElementById('review').value;

    if (name && model && review) {
      const output = document.getElementById('output');
      const reviewHTML = `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Model:</strong> ${model}</p>
        <p><strong>Review:</strong> ${review}</p>
        <hr>
      `;
      output.innerHTML += reviewHTML;

      document.getElementById('reviewForm').reset();
    } else {
      alert('Please fill out all fields!');
    }
  });
});
