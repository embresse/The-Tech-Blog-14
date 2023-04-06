const newForm = async function(event) {
    event.preventDefault();
  
    const post_title = document.querySelector('input[name="post-title"]').value;
    const body = document.querySelector('textarea[name="post-body"]').value;
  
    await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        post_title,
        body,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    document.location.replace('/');
  };
  
  document
    .querySelector('#new-post-form')
    .addEventListener('submit', newForm);
  