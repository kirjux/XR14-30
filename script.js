document.getElementById('fileInput').addEventListener('change', handleFile);

function handleFile() {
    let file = document.getElementById('fileInput').files[0];
    if (file) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function(e) {
            let data = new Uint8Array(e.target.result);
            let workbook = XLSX.read(data, { type: 'array' });
            displayData(workbook);
        };
    }
}

function displayData(workbook) {
    let sheetNames = workbook.SheetNames;
    let output = '<h2>Выберите дату</h2>';
    
    sheetNames.forEach(sheetName => {
        let sheet = workbook.Sheets[sheetName];
        let json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        
        if (json.length > 1) {
            let date = json[1][0]; 
            let projectCount = json.length - 1;
            output += `<p><strong>${date}</strong> (Всего изделий: ${projectCount})</p>`;
            output += `<button onclick="showProjects('${sheetName}')">Открыть</button>`;
        }
    });
    
    document.getElementById('dataDisplay').innerHTML = output;
}

function showProjects(sheetName) {
    alert(`Переход в проекты: ${sheetName}`);
}
