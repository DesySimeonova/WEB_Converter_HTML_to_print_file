document.addEventListener('DOMContentLoaded', function() {
    console.log("JS loaded and running");
    
    if (typeof window.docx === 'undefined') {
        console.error('docx library is not loaded');
        alert('docx library is not loaded');
        return;
    } else {
        console.log('docx library is loaded');
    }

    // Скриване на съдържанието до качване на файл
    document.getElementById('content').style.display = 'none';

    // Четене на HTML файл и визуализация на съдържанието
    document.getElementById('fileForm').addEventListener('submit', function(event) {
        event.preventDefault();
        console.log("Form submitted");

        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];
        if (file && file.type === 'text/html') {
            console.log("HTML file selected");
            const reader = new FileReader();
            reader.onload = function(e) {
                const contentDiv = document.getElementById('content');
                const plainText = e.target.result;
                contentDiv.innerHTML = plainText;
                contentDiv.style.display = 'block';
                contentDiv.classList.add('box');
                console.log("File content loaded");
            };
            reader.readAsText(file);
        } else {
            alert('Моля, прикачете HTML файл.');
        }
    });

    document.getElementById('downloadDocx').addEventListener('click', function() {
        console.log("Download as .docx clicked");
        if (typeof window.docx === 'undefined') {
            console.error('docx library is not loaded');
            alert('docx library is not loaded');
            return;
        }
        downloadDocx();
    });

    function downloadDocx() {
        const contentDiv = document.getElementById('content');
        const textContent = contentDiv.innerText;

        const { Document, Packer, Paragraph } = window.docx;

        const doc = new Document({
            sections: [{
                properties: {},
                children: textContent.split('\n').map(line => new Paragraph(line))
            }]
        });

        Packer.toBlob(doc).then(blob => {
            saveAs(blob, 'output.docx');
            console.log("Document generated and downloaded");
        }).catch(error => {
            console.error('Error creating document:', error);
            alert('Error creating document');
        });
    }
});
