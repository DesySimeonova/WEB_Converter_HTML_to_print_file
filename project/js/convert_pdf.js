
document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileForm = document.getElementById('fileForm');
    const contentDiv = document.getElementById('content');
    const htmlContentInput = document.getElementById('htmlContent');
    const pdfForm = document.getElementById('pdfForm');
    const generatePDFButton = document.getElementById('generatePDF');
    const wordCountElement = document.getElementById('wordCount');

    fileForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting
    
        const file = fileInput.files[0];
        if (file && file.type === 'text/html') {
            const reader = new FileReader();
            reader.onload = function(e) {
                const content = e.target.result;
                contentDiv.innerHTML = content;
                htmlContentInput.value=content;
                contentDiv.classList.add('box');
                
                // Create a DOMParser to parse the HTML content
                const parser = new DOMParser();
                const doc = parser.parseFromString(content, 'text/html');
                
                // Extract text content from the body
                const textContent = doc.body.textContent || "";
                
                // Trim the text content to remove leading/trailing whitespace
                const trimmedText = textContent.trim();
                
                // Count words by splitting on whitespace
                const wordsArray = trimmedText.split(/\s+/);
                const wordCount = wordsArray.length;
                
                // Display word count
                wordCountElement.textContent = `Word Count: ${wordCount}`;
                
                console.log(wordsArray); // Log the array of words to the console
            };
            reader.readAsText(file);
        } else {
            alert('Please attach an HTML file.');
        }
    });

    /*pdfForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(pdfForm);

        // Append the selected font to the form data
        formData.append('fontSelection', fontSelection.value);

        fetch(pdfForm.action, {
            method: 'POST',
            body: formData
        })
        .then(response => response.blob())
        .then(blob => {
            const url = URL.createObjectURL(blob);
            downloadPDFLink.href = url;
            downloadPDFLink.style.display = 'block';
            downloadPDFLink.download = 'generated.pdf';
        })
        .catch(error => console.error('Error generating PDF:', error));
    });*/


});





/*document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileForm = document.getElementById('fileForm');
    const contentDiv = document.getElementById('content');
    const downloadPDFButton = document.getElementById('downloadPDF');
    //const optionsForm = document.getElementById('options');

    //let fileContent = '';
    //let advancedOptions = {};

    fileForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting

        const file = fileInput.files[0];
        if (file && file.type === 'text/html') {
            const reader = new FileReader();
            reader.onload = function(e) {
                //const innerDiv = document.createElement('div');
                //innerDiv.id='innerDiv';
                //innerDiv.innerHTML= e.target.result;
                contentDiv.classList.add('box'); 
                //contentDiv.appendChild(innerDiv); 
                contentDiv.innerHTML=e.target.result;
                console.log(contentDiv);
                //console.log(document.getElementById('innerDiv').innerHTML);

                console.log('HTML content loaded and .box class added');
            };
            reader.readAsText(file);
        } else {
            alert('Моля, прикачете HTML файл.');
        }
    });

    downloadPDFButton.addEventListener('click', async () => {
        if (!contentDiv) {
            alert("Please upload a file first.");
            return;
        }
        download_pdf();
    });

    function download_pdf(){
        var htmlContent= document.getElementById('innerDiv');
        console.log(htmlContent);
        html2pdf().from(htmlContent).save();
    }

});
*/



/*document.addEventListener('DOMContentLoaded', function() {
    // Get the form and input elements
    const fileForm = document.getElementById('fileForm');
    const fileInput = document.getElementById('fileInput');
    const optionsForm=document.getElementById('options');
    const contentDiv = document.getElementById('content');
    const downloadPDFButton = document.getElementById('downloadPDF');
    let pageSize, pageOrientation, maxCharsPerPage, maxWordsPerPage;
    let fileContent = '';
    // Handle file upload and display content
    fileForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent form from submitting

        const file = fileInput.files[0];
        if (file && file.type === 'text/html') {
            const reader = new FileReader();
            reader.onload = function(e) {
                const innerDiv = document.createElement('div');
                innerDiv.innerHTML = e.target.result;
                innerDiv.classList.add('box'); // Add the 'box' class for styling
                contentDiv.innerHTML = ''; // Clear previous content
                contentDiv.appendChild(innerDiv); // Append the new content

                console.log('HTML content loaded and .box class added');
            };
            reader.readAsText(file);
        } else {
            alert('Моля, прикачете HTML файл.');
        }
    });

    // Handle advanced settings
    const advancedSettingsForm = document.querySelector('#options');
    advancedSettingsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        applyAdvancedSettings();
    });

    optionsForm.addEventListener('submit', (event) => {
        event.preventDefault();
        advancedOptions = {
            pageSize: document.getElementById('pageSize').value,
            pageOrientation: document.getElementById('pageOrientation').value,
            maxCharsPerPage: document.getElementById('maxCharsPerPage').value,
            maxWordsPerPage: document.getElementById('maxWordsPerPage').value,
            showPageNumbers: document.getElementById('showPageNumbers').checked,
            hidePageNumbers: document.getElementById('hidePageNumbers').checked,
            lineNumbers: document.querySelector('input[name="lineNumbers"]:checked')?.id,
            numberingAllPages: document.getElementById('numberingAllPages').checked,
            numberingCurrentPage: document.getElementById('numberingCurrentPage').checked
        };
    
        console.log(advancedOptions);

    });

    downloadPDFButton.addEventListener('click', async () => {
        if (!fileContent) {
            alert("Please upload a file first.");
            return;
        }

        const pdfDoc = await PDFLib.PDFDocument.create();
        const page = pdfDoc.addPage();
        
        const { width, height } = page.getSize();

        page.drawText(fileContent, {
            x: 50,
            y: height - 50,
            size: 12,
            maxWidth: width - 100,
            lineHeight: 14
        });

        if (advancedOptions.pageOrientation === 'Landscape') {
            page.setRotation(PDFLib.degrees(90));
        }

        if (advancedOptions.showPageNumbers) {
            const pageCount = pdfDoc.getPageCount();
            for (let i = 0; i < pageCount; i++) {
                const page = pdfDoc.getPage(i);
                page.drawText(`${i + 1}`, {
                    x: width / 2,
                    y: 20,
                    size: 10
                });
            }
        }

        const pdfBytes = await pdfDoc.save();

        download(pdfBytes, "converted_file.pdf", "application/pdf");
    });

    function download(data, filename, type) {
        const blob = new Blob([data], { type: type });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
    }
});


    /*function paginateContent(div, maxCharsPerPage, maxWordsPerPage, pageSize, pageOrientation) {
        console.log('Paginating content');
        const pageHeight = pageSize === 'A4' ? 1122 : 792; // Example dimensions in pixels
        const pageWidth = pageOrientation === 'Landscape' ? 1122 : 792;

        div.style.width = `${pageWidth}px`;
        div.style.height = `${pageHeight}px`;
        div.style.overflow = 'hidden';

        const contentText = div.innerText;
        const words = contentText.split(/\s+/);
        let currentPage = document.createElement('div');
        currentPage.classList.add('page');
        currentPage.style.height = `${pageHeight}px`;
        currentPage.style.width = `${pageWidth}px`;
        currentPage.style.overflow = 'hidden';
        div.innerHTML = '';
        div.appendChild(currentPage);

        let wordCount = 0;
        let charCount = 0;

        for (let word of words) {
            charCount += word.length;
            wordCount++;
            if (charCount > maxCharsPerPage || wordCount > maxWordsPerPage) {
                currentPage = document.createElement('div');
                currentPage.classList.add('page');
                currentPage.style.height = `${pageHeight}px`;
                currentPage.style.width = `${pageWidth}px`;
                currentPage.style.overflow = 'hidden';
                div.appendChild(currentPage);
                wordCount = 0;
                charCount = 0;
            }
            currentPage.innerText += (charCount > word.length ? '\t' : '') + word + ' ';
        }
    }

    downloadPDFButton.addEventListener('click', function() {
        if (contentDiv) {
            generatePDF();
        } else {
            alert('Please upload and configure the HTML file first.');
        }
    });

    function generatePDF() {
        console.log('Generating PDF...');
        const options = {
            orientation: pageOrientation ? pageOrientation.toLowerCase() : 'portrait',
            unit: 'px',
            format: pageSize ? pageSize.toLowerCase() : 'a4'
        };
        const doc = new jsPDF(options);
        doc.html(contentDiv, {
            callback: function(pdf) {
                pdf.save('converted_file.pdf');
                console.log("PDF generated successfully.");
            }
        });
    }
});
*/