const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const htmlPdfNode = require('html-pdf-node');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/generate-pdf', async (req, res) => {
    const { htmlContent, maxWordsPerPage, showPageNumbers } = req.body;

    const pages = splitTextIntoPages(htmlContent, maxWordsPerPage);
    let htmlPages = '';
    pages.forEach((pageText, index) => {
        const pageNumber = showPageNumbers ? `<footer>Page ${index + 1}</footer>` : '';
        const htmlPage = `
        <html>
        <head>
            <style>
                body { font-family: Arial; margin: 20px; }
                .page { page-break-after: always; }
                footer { text-align: center; margin-top: 20px; }
            </style>
        </head>
        <body>
            <div class="page">
                <div>${pageText}</div>
                ${pageNumber}
            </div>
        </body>
        </html>`;
        htmlPages += htmlPage;
    });

    const file = { content: htmlPages };

    try {
        const pdfBuffer = await htmlPdfNode.generatePdf(file, { format: 'A4' });
        const filePath = path.join(__dirname, 'output.pdf');
        fs.writeFileSync(filePath, pdfBuffer);
        res.download(filePath, 'output.pdf');
    } catch (error) {
        console.error('Error generating the PDF:', error);
        res.status(500).send('Error generating the PDF');
    }
});

app.listen(port, () => {
    console.log(`PDF generation server running at http://localhost:${port}`);
});

function splitTextIntoPages(text, maxWordsPerPage) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = text;
    const words = tempDiv.textContent.split(/\s+/);
    const pages = [];
    let currentPage = [];

    words.forEach(word => {
        if (currentPage.length + 1 <= maxWordsPerPage) {
            currentPage.push(word);
        } else {
            pages.push(currentPage.join(' '));
            currentPage = [word];
        }
    });

    if (currentPage.length > 0) {
        pages.push(currentPage.join(' '));
    }

    return pages;
}
