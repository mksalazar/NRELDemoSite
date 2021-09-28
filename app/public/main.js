window.onload=function(){
   const update = document.querySelector('#update-button'); 
   const deleteButton = document.querySelector('#delete-button');

   update.addEventListener('click', _ => {
    fetch('/input', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            input: 'text has been updated!'
        })
    })
    });

    deleteButton.addEventListener('click', _ => {
        fetch('/input', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                input: 'text has been updated!'
            })
        }).then(res => {
            if(res.ok) return res.json()
        }).then(data => {
            window.location.reload()
        })
    });
}








