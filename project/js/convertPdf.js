
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileForm = document.getElementById('fileForm');
    const contentDiv = document.getElementById('content');
    const htmlContentInput = document.getElementById('htmlContent');
    const wordCountElement = document.getElementById('wordCount');

    fileForm.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const file = fileInput.files[0];
        if (file && file.type === 'text/html') {
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                contentDiv.innerHTML = content;
                htmlContentInput.value=content;
                contentDiv.classList.add('box');
                
                const parser = new DOMParser();
                const doc = parser.parseFromString(content, 'text/html');

                const textContent = doc.body.textContent || "";
                
                
                const trimmedText = textContent.trim();
                
                
                const wordsArray = trimmedText.split(/\s+/);
                const wordCount = wordsArray.length;
                
                
                wordCountElement.textContent = `Word Count: ${wordCount}`;
                
                console.log(wordsArray); 
            };
            reader.readAsText(file);
        } else {
            alert('Please attach an HTML file.');
        }

        if (file && file.type === 'text/html') {
            const formData = new FormData();
            formData.append('file', file);
    
            fetch('php/save_history.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'SUCCESS') {
                    alert('Файлът успешно е записан в базата данни.');
                    
                    fileInput.value = '';
    
                } else {
                    alert('Грешка при запис на файл: ' + data.message);
                }
            })
            .catch(error => console.error('Грешка:', error));
        } else {
            alert('Моля, прикачете HTML файл.');
        }
    });

    /*document.getElementById('pdfForm').addEventListener('submit', function(event) {
        event.preventDefault();
    
        const file = fileInput.files[0];
        if (file && file.type === 'text/html') {
            const formData = new FormData();
            formData.append('file', file);
    
            fetch('php/save_history.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.status === 'SUCCESS') {
                    alert('Файлът успешно е записан в базата данни.');
                    
                    fileInput.value = '';
    
                } else {
                    alert('Грешка при запис на файл: ' + data.message);
                }
            })
            .catch(error => console.error('Грешка:', error));
        } else {
            alert('Моля, прикачете HTML файл.');
        }
    });*/
    
    
});


