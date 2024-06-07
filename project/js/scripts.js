console.log("JS working!");

/*document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fileForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвратете изпращането на формата

        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        if (file && file.type === 'text/html') {
            const reader = new FileReader();
            reader.onload = function(e) {
                const contentDiv = document.getElementById('content');
                contentDiv.innerHTML = e.target.result;

               // contentDiv.classList.add('box');
            };
            reader.readAsText(file);
        } else {
            alert('Моля, прикачете HTML файл.');
        }
    });
});  */

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fileForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Предотвратете изпращането на формата

        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        if (file && file.type === 'text/html') {
            const reader = new FileReader();
            reader.onload = function(e) {
                const contentDiv = document.getElementById('content');
                const innerDiv = document.createElement('div');
                innerDiv.innerHTML = e.target.result;
              //  innerDiv.classList.add('box');

                //console.log('HTML content loaded and .box class added');
            };
            reader.readAsText(file);
        } else {
            alert('Моля, прикачете HTML файл.');
        }
    });
});

